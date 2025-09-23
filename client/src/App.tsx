import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import all components
import WelcomeScreen from "@/components/WelcomeScreen";
import LoginForm from "@/components/LoginForm";
import MainDashboard from "@/components/MainDashboard";
import ProcedureDetail from "@/components/ProcedureDetail";
import CommunityForum from "@/components/CommunityForum";
import SpecialtySelector from "@/components/SpecialtySelector";
import UserProfile from "@/components/UserProfile";
import BottomNavigation from "@/components/BottomNavigation";

type AppScreen = 
  | 'welcome'
  | 'login' 
  | 'dashboard'
  | 'procedure'
  | 'community'
  | 'specialty'
  | 'profile';

// TODO: Remove mock data when implementing real backend
const mockUser = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane.smith@hospital.com',
  tier: 'standard' as const,
  specialties: ['General Surgery', 'Orthopedics', 'Gynecology']
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [selectedProcedure, setSelectedProcedure] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('home');

  // Handle authentication flow
  const handleAuthSuccess = () => {
    setUser(mockUser);
    setCurrentScreen('dashboard');
    setActiveTab('home');
  };

  // Handle main navigation
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('dashboard');
        break;
      case 'search':
        setCurrentScreen('dashboard');
        break;
      case 'procedures':
        setCurrentScreen('dashboard');
        break;
      case 'community':
        setCurrentScreen('community');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  // Handle procedure selection
  const handleProcedureSelect = (procedure: any) => {
    setSelectedProcedure(procedure);
    setCurrentScreen('procedure');
  };

  // Handle specialty management
  const handleSpecialtyManagement = () => {
    setCurrentScreen('specialty');
  };

  // Handle specialty selection save
  const handleSpecialtySave = (selections: string[]) => {
    console.log('Saving specialties:', selections);
    // Update user specialties in real app
    setCurrentScreen('dashboard');
  };

  // Render current screen
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onGetStarted={() => setCurrentScreen('login')}
            onLogin={() => setCurrentScreen('login')}
          />
        );

      case 'login':
        return (
          <LoginForm
            onBack={() => setCurrentScreen('welcome')}
            onSuccess={handleAuthSuccess}
          />
        );

      case 'dashboard':
        return (
          <div className="pb-16">
            <MainDashboard
              onProcedureSelect={handleProcedureSelect}
              onSpecialtySelect={handleSpecialtyManagement}
            />
          </div>
        );

      case 'procedure':
        return (
          <ProcedureDetail
            procedure={selectedProcedure}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );

      case 'community':
        return (
          <div className="pb-16">
            <CommunityForum
              onBack={() => setCurrentScreen('dashboard')}
            />
          </div>
        );

      case 'specialty':
        return (
          <SpecialtySelector
            onBack={() => setCurrentScreen('dashboard')}
            userTier={user?.tier || 'free'}
            currentSelections={user?.specialties || []}
            onSave={handleSpecialtySave}
          />
        );

      case 'profile':
        return (
          <div className="pb-16">
            <UserProfile
              onBack={() => setCurrentScreen('dashboard')}
            />
          </div>
        );

      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p>Screen not found</p>
          </div>
        );
    }
  };

  // Show bottom navigation only when user is authenticated and not on auth screens
  const showBottomNav = user && !['welcome', 'login', 'procedure', 'specialty'].includes(currentScreen);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          {renderCurrentScreen()}
          
          {showBottomNav && (
            <BottomNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;