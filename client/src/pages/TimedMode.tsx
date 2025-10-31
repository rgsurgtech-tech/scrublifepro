import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Home,
  RefreshCw,
  BookOpen,
  Award,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ExamQuestion } from "@shared/schema";

interface TimedModeProps {
  domain: string;
  onExit: () => void;
}

export default function TimedMode({ domain, onExit }: TimedModeProps) {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(4 * 60 * 60); // 4 hours in seconds
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Fetch questions for the selected domain
  const { data: questions, isLoading } = useQuery<ExamQuestion[]>({
    queryKey: [`/api/exam-prep/questions?domain=${domain}`],
    enabled: !!user && !!domain
  });

  // Submit session mutation
  const submitSessionMutation = useMutation({
    mutationFn: async (data: { 
      sessionType: string;
      domain: string;
      questionsAttempted: number;
      correctAnswers: number;
      timeSpent: number;
    }) => {
      return apiRequest('/api/exam-prep/sessions', 'POST', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exam-prep/statistics'] });
    }
  });

  // Timer countdown
  useEffect(() => {
    if (examSubmitted || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examSubmitted, showResults]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalQuestions = questions?.length || 0;
  const answeredCount = Object.keys(selectedAnswers).length;
  const currentQuestion = questions?.[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion || examSubmitted) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    
    // Calculate results
    const correctCount = Object.entries(selectedAnswers).filter(([qId, answer]) => {
      const q = questions?.find(q => q.id === qId);
      return q?.correctAnswer === answer;
    }).length;

    const timeSpent = (4 * 60 * 60) - timeRemaining;

    // Submit each answer
    Object.entries(selectedAnswers).forEach(([questionId, selectedAnswer]) => {
      const q = questions?.find(q => q.id === questionId);
      if (q) {
        apiRequest('/api/exam-prep/submit-answer', 'POST', {
          questionId,
          selectedAnswer,
          isCorrect: q.correctAnswer === selectedAnswer
        });
      }
    });

    // Submit session
    submitSessionMutation.mutate({
      sessionType: 'timed',
      domain,
      questionsAttempted: answeredCount,
      correctAnswers: correctCount,
      timeSpent
    });

    setShowResults(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-12 text-center">
            <RefreshCw className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Loading timed exam...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-12 text-center space-y-4">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-bold">No Questions Available</h2>
            <Button onClick={onExit} data-testid="button-back-to-domains">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Domains
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const correctCount = Object.entries(selectedAnswers).filter(([qId, answer]) => {
      const q = questions?.find(q => q.id === qId);
      return q?.correctAnswer === answer;
    }).length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const timeSpent = (4 * 60 * 60) - timeRemaining;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Award className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl">Timed Exam Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-card border">
                  <div className="text-4xl font-bold text-purple-500 mb-2">{accuracy}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border">
                  <div className="text-4xl font-bold text-cyan-500 mb-2">{answeredCount}</div>
                  <div className="text-sm text-muted-foreground">Answered</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border">
                  <div className="text-4xl font-bold text-green-500 mb-2">{correctCount}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border">
                  <div className="text-3xl font-bold text-amber-500 mb-2">{formatTime(timeSpent)}</div>
                  <div className="text-sm text-muted-foreground">Time Spent</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Performance</span>
                  <span>{accuracy}%</span>
                </div>
                <Progress value={accuracy} className="h-3" />
              </div>

              {accuracy >= 70 && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-500">Passing Score!</p>
                      <p className="text-sm text-muted-foreground">
                        Great job! You've demonstrated strong knowledge of the material.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  onClick={onExit}
                  variant="outline"
                  className="flex-1"
                  data-testid="button-exit-timed"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Exit to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isLowTime = timeRemaining < 600; // Less than 10 minutes

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-sm">
            Timed Exam Mode
          </Badge>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isLowTime ? 'bg-red-500/10 border border-red-500/20' : 'bg-card border'
          }`}>
            <Clock className={`w-5 h-5 ${isLowTime ? 'text-red-500' : 'text-primary'}`} />
            <span className={`font-mono text-lg font-semibold ${isLowTime ? 'text-red-500' : ''}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span className="text-muted-foreground">
                  {answeredCount} of {totalQuestions} answered
                </span>
              </div>
              <Progress 
                value={(answeredCount / totalQuestions) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Warning for unanswered questions */}
        {answeredCount < totalQuestions && (
          <Card className="border-amber-500/50 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="text-muted-foreground">
                  You have {totalQuestions - answeredCount} unanswered question{totalQuestions - answeredCount !== 1 ? 's' : ''}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Card */}
        {currentQuestion && (
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-3">
                    {currentQuestion.category}
                  </Badge>
                  <CardTitle className="text-xl leading-relaxed">
                    {currentQuestion.questionText}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Answer Options */}
              {((currentQuestion.options as string[]) || []).map((option, index) => {
                const letter = String.fromCharCode(65 + index); // A, B, C, D
                const isSelected = selectedAnswers[currentQuestion.id] === option;
                const displayText = option.replace(/^[A-D]\.\s*/, '');

                return (
                  <div
                    key={option}
                    className={`p-4 rounded-lg transition-all border-2 ${
                      isSelected 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover-elevate cursor-pointer'
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                    data-testid={`answer-option-${letter.toLowerCase()}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {letter}
                      </div>
                      <div className="flex-1 pt-1">
                        <p>{displayText}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  data-testid="button-previous-question"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <div className="flex gap-2">
                  {currentQuestionIndex === totalQuestions - 1 ? (
                    <Button
                      onClick={handleSubmitExam}
                      className="bg-gradient-to-r from-purple-500 to-pink-500"
                      data-testid="button-submit-exam"
                    >
                      Submit Exam
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      data-testid="button-next-question"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
