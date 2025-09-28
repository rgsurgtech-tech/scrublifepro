import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ExternalLink, TestTube } from "lucide-react";

interface Procedure {
  id: string;
  name: string;
  specialty_id: string;
}

interface Specialty {
  id: string;
  name: string;
}

export default function TestPage() {
  const { data: specialties = [], isLoading: specialtiesLoading } = useQuery<Specialty[]>({
    queryKey: ['/api/specialties']
  });

  const { data: allProcedures = [], isLoading: proceduresLoading } = useQuery<Procedure[]>({
    queryKey: ['/api/procedures/all']
  });

  if (specialtiesLoading || proceduresLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Group procedures by specialty
  const proceduresBySpecialty = specialties.map(specialty => ({
    ...specialty,
    procedures: allProcedures.filter(proc => proc.specialty_id === specialty.id)
  })).filter(specialty => specialty.procedures.length > 0);

  const totalProcedures = allProcedures.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TestTube className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Instrumentation Test Page
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Direct links to Setup tabs for all {totalProcedures} procedures to verify instrumentation details
          </p>
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm">
              <strong>How to use:</strong> Click any procedure link below to go directly to its Setup tab. 
              Check that all instruments show detailed information (not "Information Not Available").
            </p>
          </div>
        </div>

        {/* Procedures by Specialty */}
        <div className="space-y-6">
          {proceduresBySpecialty.map((specialty) => (
            <Card key={specialty.id} className="overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">{specialty.name}</span>
                  <span className="text-sm font-normal text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
                    {specialty.procedures.length} procedures
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {specialty.procedures.map((procedure) => (
                    <Link
                      key={procedure.id}
                      href={`/procedures/${specialty.id}/${procedure.id}?tab=setup`}
                      className="block"
                    >
                      <div className="group p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 hover-elevate">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                            {procedure.name}
                          </h3>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Click to test instrumentation setup
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 p-6 bg-card border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Testing Instructions</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Each link opens the procedure's Setup tab directly</li>
            <li>• Test both Basic Sets and Special Instruments sections</li>
            <li>• Verify all instrument items show detailed modals (not "Information Not Available")</li>
            <li>• Check that modals display: name, description, contents, usage, specifications, setup tips</li>
            <li>• Report any procedures that still show missing instrumentation data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}