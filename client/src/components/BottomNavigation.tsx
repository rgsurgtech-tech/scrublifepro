import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Search, FileText, Play, Users, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'procedures', label: 'Procedures', icon: FileText },
  { id: 'videos', label: 'Videos', icon: Play },
  { id: 'community', label: 'Community', icon: Users, hasNotification: true },
  { id: 'profile', label: 'Profile', icon: User }
];

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => onTabChange(item.id)}
              data-testid={`nav-${item.id}`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                {item.hasNotification && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 w-2 h-2 p-0 rounded-full"
                  />
                )}
              </div>
              <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}