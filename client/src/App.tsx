import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "@/pages/Home";
import Specialties from "@/pages/Specialties";
import Procedures from "@/pages/Procedures";
import VideoLibrary from "@/pages/VideoLibrary";
import Community from "@/pages/Community";
import Profile from "@/pages/Profile";
import Notes from "@/pages/Notes";
import Subscribe from "@/pages/Subscribe";
import SubscriptionSuccess from "@/pages/SubscriptionSuccess";
import SubscriptionCancel from "@/pages/SubscriptionCancel";
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
      <Route path="/subscription/success" component={SubscriptionSuccess} />
      <Route path="/subscription/cancel" component={SubscriptionCancel} />
      <Route path="/test" component={TestPage} />
      <Route path="/qr" component={BetaQR} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}