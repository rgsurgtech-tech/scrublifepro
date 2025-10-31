import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  TrendingUp,
  TrendingDown,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import type { ExamQuestion } from "@shared/schema";

interface ReviewModeProps {
  domain: string;
  onExit: () => void;
}

export default function ReviewMode({ domain, onExit }: ReviewModeProps) {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Fetch questions for the selected domain (in real app, this would fetch only incorrect ones)
  const { data: questions, isLoading } = useQuery<ExamQuestion[]>({
    queryKey: [`/api/exam-prep/questions?domain=${domain}`],
    enabled: !!user && !!domain
  });

  const totalQuestions = questions?.length || 0;
  const currentQuestion = questions?.[currentQuestionIndex];

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-12 text-center">
            <RefreshCw className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Loading review questions...</p>
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
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold">No Questions to Review!</h2>
            <p className="text-muted-foreground">
              Great job! You haven't missed any questions yet, or there are no questions available for this domain.
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
            Review Mode
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
                  Reviewing questions to strengthen weak areas
                </span>
              </div>
              <Progress 
                value={((currentQuestionIndex + 1) / totalQuestions) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-cyan-500/50 bg-cyan-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-cyan-500 mb-1">Study Tip</p>
                <p className="text-sm text-muted-foreground">
                  Review mode shows you questions from this domain. Focus on understanding the explanations to strengthen your knowledge.
                </p>
              </div>
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
              {/* Answer Options - All shown with correct answer highlighted */}
              {((currentQuestion.options as string[]) || []).map((option, index) => {
                const letter = String.fromCharCode(65 + index); // A, B, C, D
                const isCorrect = currentQuestion.correctAnswer === option;
                const displayText = option.replace(/^[A-D]\.\s*/, '');

                return (
                  <div
                    key={option}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-border'
                    }`}
                    data-testid={`answer-option-${letter.toLowerCase()}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {letter}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className={isCorrect ? 'font-medium' : ''}>
                          {displayText}
                        </p>
                      </div>
                      {isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Explanation - Always shown */}
              {currentQuestion.explanation && (
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
                {currentQuestionIndex === totalQuestions - 1 ? (
                  <Button
                    onClick={onExit}
                    data-testid="button-finish-review"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Finish Review
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
