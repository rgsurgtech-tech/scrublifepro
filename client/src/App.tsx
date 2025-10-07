import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { BetaBanner } from "@/components/BetaBanner";
import { BetaAccessModal } from "@/components/BetaAccessModal";
import { useState, useEffect } from "react";

import Home from "@/pages/Home";
import Specialties from "@/pages/Specialties";
import Procedures from "@/pages/Procedures";
import VideoLibrary from "@/pages/VideoLibrary";
import Community from "@/pages/Community";
import Profile from "@/pages/Profile";
import Notes from "@/pages/Notes";
import Subscribe from "@/pages/Subscribe";
import TestPage from "@/pages/TestPage";
import BetaQR from "@/pages/BetaQR";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/AuthPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/specialties" component={Specialties} />
      <Route path="/procedures/:specialtyId" component={Procedures} />
      <Route path="/procedures/:specialtyId/:procedureId" component={Procedures} />
      <Route path="/videos" component={VideoLibrary} />
      <Route path="/community" component={Community} />
      <Route path="/profile" component={Profile} />
      <Route path="/notes" component={Notes} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/test" component={TestPage} />
      <Route path="/qr" component={BetaQR} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [isCheckingBeta, setIsCheckingBeta] = useState(true);

  useEffect(() => {
    const checkBetaAccess = async () => {
      const betaEmail = localStorage.getItem('betaEmail');
      
      if (betaEmail) {
        // Check if this email is still in beta list
        try {
          const response = await fetch(`/api/beta/check/${encodeURIComponent(betaEmail)}`);
          const data = await response.json();
          
          if (data.hasAccess) {
            setShowBetaModal(false);
          } else {
            setShowBetaModal(true);
          }
        } catch (error) {
          console.error('Beta check error:', error);
          setShowBetaModal(true);
        }
      } else {
        setShowBetaModal(true);
      }
      
      setIsCheckingBeta(false);
    };

    checkBetaAccess();
  }, []);

  const handleBetaAccessGranted = (email: string) => {
    localStorage.setItem('betaEmail', email);
    setShowBetaModal(false);
  };

  if (isCheckingBeta) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BetaAccessModal 
            open={showBetaModal} 
            onAccessGranted={handleBetaAccessGranted}
          />
          {!showBetaModal && (
            <>
              <BetaBanner />
              <Router />
            </>
          )}
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}