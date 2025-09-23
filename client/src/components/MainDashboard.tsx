import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, BookOpen, Star, Filter, Bookmark, Download } from "lucide-react";

interface MainDashboardProps {
  onProcedureSelect: (procedure: any) => void;
  onSpecialtySelect: () => void;
}

// TODO: Remove mock data when implementing real backend
const mockProcedures = [
  {
    id: 1,
    name: "Laparoscopic Cholecystectomy",
    specialty: "General Surgery",
    duration: "45-90 min",
    difficulty: "Intermediate",
    isFavorite: true,
    lastViewed: "2 hours ago",
    description: "Minimally invasive removal of gallbladder"
  },
  {
    id: 2,
    name: "Total Knee Replacement",
    specialty: "Orthopedics",
    duration: "60-120 min",
    difficulty: "Advanced",
    isFavorite: false,
    lastViewed: null,
    description: "Complete knee joint replacement procedure"
  },
  {
    id: 3,
    name: "Cataract Extraction",
    specialty: "Ophthalmology", 
    duration: "15-30 min",
    difficulty: "Basic",
    isFavorite: true,
    lastViewed: "1 day ago",
    description: "Phacoemulsification with IOL implantation"
  },
  {
    id: 4,
    name: "Appendectomy",
    specialty: "General Surgery",
    duration: "30-60 min", 
    difficulty: "Basic",
    isFavorite: false,
    lastViewed: null,
    description: "Surgical removal of appendix"
  }
];

const mockRecentSearches = [
  "laparoscopic", "knee replacement", "cataract", "appendectomy"
];

export default function MainDashboard({ onProcedureSelect, onSpecialtySelect }: MainDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [procedures, setProcedures] = useState(mockProcedures);

  const specialties = ["General Surgery", "Orthopedics", "Ophthalmology", "Neurosurgery", "Cardiovascular"];

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         procedure.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || procedure.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const favoriteProcedures = procedures.filter(p => p.isFavorite);
  const recentProcedures = procedures.filter(p => p.lastViewed);

  const toggleFavorite = (procedureId: number) => {
    setProcedures(prev => prev.map(p => 
      p.id === procedureId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Good morning! 👋</h1>
          <p className="text-muted-foreground text-sm">Ready to assist in the OR today?</p>
        </div>
        <Button variant="outline" size="icon" data-testid="button-profile">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
            JS
          </div>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search procedures, instruments, or techniques..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>

      {/* Recent Searches */}
      {searchQuery === "" && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {mockRecentSearches.map((search) => (
              <Badge 
                key={search} 
                variant="secondary" 
                className="cursor-pointer hover-elevate"
                onClick={() => setSearchQuery(search)}
                data-testid={`badge-recent-${search}`}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Specialty Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Specialties</h3>
          <Button variant="ghost" size="sm" onClick={onSpecialtySelect} data-testid="button-manage-specialties">
            <Filter className="h-4 w-4 mr-2" />
            Manage
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={selectedSpecialty === null ? "default" : "secondary"}
            className="cursor-pointer hover-elevate"
            onClick={() => setSelectedSpecialty(null)}
            data-testid="badge-all-specialties"
          >
            All
          </Badge>
          {specialties.map((specialty) => (
            <Badge 
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "secondary"}
              className="cursor-pointer hover-elevate"
              onClick={() => setSelectedSpecialty(specialty)}
              data-testid={`badge-specialty-${specialty}`}
            >
              {specialty}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quick Access Sections */}
      {searchQuery === "" && (
        <>
          {/* Favorites */}
          {favoriteProcedures.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">⭐ Your Favorites</h3>
              <div className="space-y-2">
                {favoriteProcedures.slice(0, 3).map((procedure) => (
                  <Card 
                    key={procedure.id} 
                    className="cursor-pointer hover-elevate"
                    onClick={() => onProcedureSelect(procedure)}
                    data-testid={`card-favorite-${procedure.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{procedure.name}</h4>
                          <p className="text-xs text-muted-foreground">{procedure.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">{procedure.specialty}</Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {procedure.duration}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(procedure.id);
                          }}
                          data-testid={`button-favorite-${procedure.id}`}
                        >
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Recently Viewed */}
          {recentProcedures.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">📖 Recently Viewed</h3>
              <div className="space-y-2">
                {recentProcedures.slice(0, 3).map((procedure) => (
                  <Card 
                    key={procedure.id} 
                    className="cursor-pointer hover-elevate"
                    onClick={() => onProcedureSelect(procedure)}
                    data-testid={`card-recent-${procedure.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{procedure.name}</h4>
                          <p className="text-xs text-muted-foreground">{procedure.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">{procedure.specialty}</Badge>
                            <span className="text-xs text-muted-foreground">{procedure.lastViewed}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Download for offline');
                            }}
                            data-testid={`button-download-${procedure.id}`}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(procedure.id);
                            }}
                            data-testid={`button-favorite-recent-${procedure.id}`}
                          >
                            <Star className={`h-4 w-4 ${procedure.isFavorite ? 'fill-primary text-primary' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Search Results */}
      {(searchQuery !== "" || selectedSpecialty) && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            {searchQuery ? `Search Results (${filteredProcedures.length})` : `${selectedSpecialty} Procedures`}
          </h3>
          <div className="space-y-2">
            {filteredProcedures.map((procedure) => (
              <Card 
                key={procedure.id} 
                className="cursor-pointer hover-elevate"
                onClick={() => onProcedureSelect(procedure)}
                data-testid={`card-procedure-${procedure.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{procedure.name}</h4>
                      <p className="text-xs text-muted-foreground">{procedure.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">{procedure.specialty}</Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {procedure.duration}
                        </div>
                        <Badge 
                          variant={procedure.difficulty === 'Basic' ? 'secondary' : 
                                  procedure.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {procedure.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Download for offline');
                        }}
                        data-testid={`button-download-search-${procedure.id}`}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(procedure.id);
                        }}
                        data-testid={`button-favorite-search-${procedure.id}`}
                      >
                        <Star className={`h-4 w-4 ${procedure.isFavorite ? 'fill-primary text-primary' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProcedures.length === 0 && (searchQuery !== "" || selectedSpecialty) && (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No procedures found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or browse by specialty
          </p>
        </div>
      )}
    </div>
  );
}