import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, BookOpen, FileText, AlertCircle } from "lucide-react";

export default function Notes() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Fetch all user notes
  const { data: notes, isLoading } = useQuery({
    queryKey: ['/api/user/notes'],
    queryFn: async () => {
      if (!user) return [];
      const response = await fetch('/api/user/notes', {
        credentials: 'include'
      });
      if (response.status === 401) return [];
      if (!response.ok) throw new Error('Failed to fetch notes');
      return response.json();
    },
    enabled: !!user
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-4">
                Please sign in to view your personal notes.
              </p>
              <Button onClick={() => setLocation('/auth')} data-testid="button-signin">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/')}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              My Notes
            </h1>
            <p className="text-muted-foreground">
              Your personal procedure notes and reminders
            </p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : notes && notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note: any) => (
              <Card key={note.id} className="hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {note.procedureTitle || `Procedure Notes`}
                  </CardTitle>
                  {note.procedureTitle && (
                    <CardDescription>
                      {note.specialtyName && `${note.specialtyName} • `}
                      Last updated {new Date(note.updatedAt).toLocaleDateString()}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-sm">
                      {note.content}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {note.content.length} characters
                    </span>
                    {note.procedureId && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setLocation(`/procedures/${note.specialtyId || 'all'}/${note.procedureId}`)}
                        data-testid={`button-view-procedure-${note.procedureId}`}
                      >
                        View Procedure
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Notes Yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't saved any procedure notes yet. Start by browsing procedures and adding your personal notes.
              </p>
              <Button onClick={() => setLocation('/specialties')} data-testid="button-browse-procedures">
                Browse Procedures
              </Button>
            </CardContent>
          </Card>
        )}

        {/* HIPAA Notice */}
        <Card className="mt-8 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-orange-800 dark:text-orange-200 mb-1">
                  HIPAA Compliance Reminder
                </h4>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  Your personal notes should never include patient-identifying information such as names, 
                  dates of birth, medical record numbers, or any other PHI.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}