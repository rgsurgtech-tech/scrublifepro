import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Home,
  RefreshCw,
  BookOpen,
  Award
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ExamQuestion } from "@shared/schema";

interface PracticeModeProps {
  domain: string;
  onExit: () => void;
}

export default function PracticeMode({ domain, onExit }: PracticeModeProps) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Fetch questions for the selected domain
  const { data: questions, isLoading } = useQuery<ExamQuestion[]>({
    queryKey: ['/api/exam-prep/questions', { domain }],
    enabled: !!user && !!domain
  });

  // Submit answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: async (data: { questionId: string; selectedAnswer: string; isCorrect: boolean }) => {
      return apiRequest('/api/exam-prep/submit-answer', 'POST', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exam-prep/statistics'] });
    }
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const totalQuestions = questions?.length || 0;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(([qId, answer]) => {
    const q = questions?.find(q => q.id === qId);
    const options = (q?.options as string[]) || [];
    const correctOption = options.find(opt => opt === q?.correctAnswer);
    return correctOption === answer;
  }).length;

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion) return;

    const options = (currentQuestion.options as string[]) || [];
    const isCorrect = options.find(opt => opt === currentQuestion.correctAnswer) === answer;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
    
    setShowExplanation(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));

    // Submit to backend
    submitAnswerMutation.mutate({
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setSessionCompleted(false);
  };

  const getAnswerClassName = (answer: string) => {
    if (!currentQuestion) return "";
    
    const selected = selectedAnswers[currentQuestion.id];
    const isSelected = selected === answer;
    const options = (currentQuestion.options as string[]) || [];
    const correctOption = options.find(opt => opt === currentQuestion.correctAnswer);
    const isCorrect = correctOption === answer;
    const hasAnswered = !!selected;

    if (!hasAnswered) {
      return "border-2 border-border hover-elevate cursor-pointer";
    }

    if (isSelected && isCorrect) {
      return "border-2 border-green-500 bg-green-500/10";
    }

    if (isSelected && !isCorrect) {
      return "border-2 border-red-500 bg-red-500/10";
    }

    if (!isSelected && isCorrect) {
      return "border-2 border-green-500 bg-green-500/5";
    }

    return "border-2 border-border opacity-50";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-12 text-center">
            <RefreshCw className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Loading practice questions...</p>
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
            <p className="text-muted-foreground">
              There are no practice questions available for this domain yet.
            </p>
            <Button onClick={onExit} data-testid="button-back-to-domains">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Domains
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessionCompleted) {
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Award className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl">Practice Session Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-card border">
                  <div className="text-4xl font-bold text-cyan-500 mb-2">{answeredCount}</div>
                  <div className="text-sm text-muted-foreground">Questions Answered</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border">
                  <div className="text-4xl font-bold text-green-500 mb-2">{correctCount}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border">
                  <div className="text-4xl font-bold text-purple-500 mb-2">{accuracy}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Performance</span>
                  <span>{accuracy}%</span>
                </div>
                <Progress value={accuracy} className="h-3" />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleRestart} 
                  className="flex-1"
                  data-testid="button-restart-practice"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Practice Again
                </Button>
                <Button 
                  onClick={onExit}
                  variant="outline"
                  className="flex-1"
                  data-testid="button-exit-practice"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onExit}
            data-testid="button-exit-to-domains"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Exit
          </Button>
          <Badge variant="outline" className="text-sm">
            Practice Mode
          </Badge>
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
                  {answeredCount} answered · {correctCount} correct
                </span>
              </div>
              <Progress 
                value={((currentQuestionIndex + 1) / totalQuestions) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

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
                const isCorrect = currentQuestion.correctAnswer === option;
                const hasAnswered = !!selectedAnswers[currentQuestion.id];
                // Remove the letter prefix from display text
                const displayText = option.replace(/^[A-D]\.\s*/, '');

                return (
                  <div
                    key={option}
                    className={`p-4 rounded-lg transition-all ${getAnswerClassName(option)}`}
                    onClick={() => !hasAnswered && handleAnswerSelect(option)}
                    data-testid={`answer-option-${letter.toLowerCase()}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${
                        hasAnswered && isCorrect ? 'bg-green-500 text-white' :
                        hasAnswered && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {letter}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className={hasAnswered && isCorrect ? 'font-medium' : ''}>
                          {displayText}
                        </p>
                      </div>
                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Explanation */}
              {showExplanation[currentQuestion.id] && currentQuestion.explanation && (
                <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-cyan-500 mb-2">Explanation</p>
                      <p className="text-sm leading-relaxed">{currentQuestion.explanation}</p>
                      {currentQuestion.reference && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Reference: {currentQuestion.reference}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

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
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestion.id]}
                  data-testid="button-next-question"
                >
                  {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
