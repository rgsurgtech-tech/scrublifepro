import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, CheckCircle2, BookOpen, Lock, TrendingUp, Target, Award, ChevronRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "wouter";
import type { ExamStatistics } from "@shared/schema";

export default function ExamPrep() {
  const { user } = useAuth();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Fetch user statistics
  const { data: stats } = useQuery<ExamStatistics>({
    queryKey: ['/api/exam-prep/statistics'],
    enabled: !!user
  });

  // Domain information based on NBSTSA CST Exam outline
  const domains = [
    {
      id: "perioperative_care",
      title: "Perioperative Care",
      description: "Pre-operative, intra-operative, and post-operative procedures",
      percentage: "60.7%",
      topics: ["Sterile Technique", "Patient Care", "Surgical Procedures", "Counts & Documentation"],
      icon: Brain,
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "ancillary_duties",
      title: "Ancillary Duties",
      description: "Administrative functions and equipment sterilization",
      percentage: "17.3%",
      topics: ["Resource Management", "Sterilization", "Equipment Care", "Safety Protocols"],
      icon: Target,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: "basic_science",
      title: "Basic Science",
      description: "Anatomy, physiology, microbiology, and pharmacology",
      percentage: "22%",
      topics: ["Anatomy & Physiology", "Microbiology", "Pharmacology", "Pathophysiology"],
      icon: Award,
      color: "from-green-500 to-teal-600"
    }
  ];

  // Study modes with tier access
  const studyModes = [
    {
      id: "practice",
      title: "Practice Mode",
      description: "Study at your own pace with immediate feedback",
      icon: BookOpen,
      features: ["Instant answer feedback", "Detailed explanations", "Reference materials", "No time limit"],
      tierAccess: "free",
      color: "cyan"
    },
    {
      id: "timed",
      title: "Timed Exam",
      description: "Simulate real CST exam conditions",
      icon: Clock,
      features: ["175 questions", "4-hour time limit", "No immediate feedback", "Real exam simulation"],
      tierAccess: "standard",
      color: "purple"
    },
    {
      id: "review",
      title: "Review Mode",
      description: "Review your missed questions and weak areas",
      icon: CheckCircle2,
      features: ["Focus on incorrect answers", "Track improvement", "Personalized recommendations", "Study notes"],
      tierAccess: "standard",
      color: "green"
    }
  ];

  const canAccessMode = (mode: typeof studyModes[0]) => {
    if (!user) return false;
    if (mode.tierAccess === "free") return true;
    if (mode.tierAccess === "standard") {
      return user.subscriptionTier === "standard" || user.subscriptionTier === "premium";
    }
    return user.subscriptionTier === "premium";
  };

  const getQuestionLimit = () => {
    if (!user) return 0;
    if (user.subscriptionTier === "free") return 10;
    if (user.subscriptionTier === "standard") return 50;
    return "Unlimited";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CST Exam Prep
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prepare for your Certified Surgical Technologist exam with comprehensive practice questions
              based on the official NBSTSA content outline.
            </p>
            {user && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Badge variant="outline" className="bg-card/50">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stats?.overallAccuracy || 0}% Overall Accuracy
                </Badge>
                <Badge variant="outline" className="bg-card/50">
                  {stats?.totalQuestionsAttempted || 0} Questions Attempted
                </Badge>
                <Badge variant="outline" className={`${
                  user.subscriptionTier === "premium" ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500/50" :
                  user.subscriptionTier === "standard" ? "bg-blue-500/20 border-blue-500/50" :
                  "bg-muted"
                }`}>
                  {user.subscriptionTier === "free" ? "Free Tier" :
                   user.subscriptionTier === "standard" ? "Standard Plan" :
                   "Premium Plan"} • {getQuestionLimit()} Questions
                </Badge>
              </div>
            )}
          </div>

          {/* Study Domains */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Exam Domain</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {domains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <Card
                    key={domain.id}
                    className={`cursor-pointer transition-all hover-elevate ${
                      selectedDomain === domain.id
                        ? "ring-2 ring-primary shadow-lg shadow-primary/20"
                        : ""
                    }`}
                    onClick={() => setSelectedDomain(domain.id)}
                    data-testid={`card-domain-${domain.id}`}
                  >
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${domain.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="flex items-center justify-between">
                        <span>{domain.title}</span>
                        <Badge variant="secondary">{domain.percentage}</Badge>
                      </CardTitle>
                      <CardDescription>{domain.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {domain.topics.map((topic, i) => (
                          <div key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Study Modes */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Choose Study Mode</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {studyModes.map((mode) => {
                const Icon = mode.icon;
                const canAccess = canAccessMode(mode);
                
                return (
                  <Card
                    key={mode.id}
                    className={`relative transition-all ${canAccess ? "hover-elevate" : "opacity-60"}`}
                    data-testid={`card-mode-${mode.id}`}
                  >
                    {!canAccess && (
                      <div className="absolute top-4 right-4">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-${mode.color}-500/10 border border-${mode.color}-500/20 flex items-center justify-center mb-3`}>
                        <Icon className={`w-6 h-6 text-${mode.color}-500`} />
                      </div>
                      <CardTitle>{mode.title}</CardTitle>
                      <CardDescription>{mode.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {mode.features.map((feature, i) => (
                          <div key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {canAccess ? (
                        <Button
                          className="w-full"
                          disabled={!selectedDomain}
                          data-testid={`button-start-${mode.id}`}
                        >
                          {selectedDomain ? `Start ${mode.title}` : "Select a Domain First"}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Link href="/subscribe">
                          <Button variant="outline" className="w-full" data-testid={`button-upgrade-${mode.id}`}>
                            <Lock className="w-4 h-4 mr-2" />
                            Upgrade to {mode.tierAccess === "standard" ? "Standard" : "Premium"}
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Performance Stats (if user has attempted questions) */}
          {stats && (stats.totalQuestionsAttempted ?? 0) > 0 && (
            <Card className="bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your exam preparation journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-500">
                      {stats.overallAccuracy}%
                    </div>
                    <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-cyan-500">
                      {stats.totalQuestionsAttempted}
                    </div>
                    <div className="text-sm text-muted-foreground">Questions Attempted</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-purple-500">
                      {stats.practiceSessionsCompleted}
                    </div>
                    <div className="text-sm text-muted-foreground">Practice Sessions</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-pink-500">
                      {stats.timedExamsCompleted}
                    </div>
                    <div className="text-sm text-muted-foreground">Timed Exams</div>
                  </div>
                </div>

                {(stats.weakestDomain || stats.strongestDomain) && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    {stats.strongestDomain && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Strongest Domain:</span>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                          {stats.strongestDomain}
                        </Badge>
                      </div>
                    )}
                    {stats.weakestDomain && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Needs Improvement:</span>
                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                          {stats.weakestDomain}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Tier-based Access Info */}
          {user && user.subscriptionTier === "free" && (
            <Card className="border-amber-500/50 bg-gradient-to-br from-amber-500/5 to-amber-600/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Unlock More Questions & Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-3xl font-bold mb-1">10</div>
                    <div className="text-sm text-muted-foreground">Questions (Free)</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-3xl font-bold mb-1 text-blue-500">50</div>
                    <div className="text-sm text-muted-foreground">Questions (Standard)</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-3xl font-bold mb-1 text-purple-500">∞</div>
                    <div className="text-sm text-muted-foreground">Questions (Premium)</div>
                  </div>
                </div>
                <Link href="/subscribe">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600" data-testid="button-upgrade">
                    Upgrade Now for Full Access
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
  );
}
