import { useState } from 'react';
import BottomNavigation from '../BottomNavigation';

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen relative">
      <div className="p-4 pb-20">
        <h1 className="text-xl font-bold mb-4">Current Tab: {activeTab}</h1>
        <p className="text-muted-foreground">
          Tap the navigation items below to see the active state change.
        </p>
      </div>
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}