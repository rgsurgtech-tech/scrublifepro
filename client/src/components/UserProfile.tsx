import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, CreditCard, Bell, Shield, Moon, Download, Star, LogOut, Crown } from "lucide-react";

interface UserProfileProps {
  onBack: () => void;
}

export default function UserProfile({ onBack }: UserProfileProps) {
  const [userInfo, setUserInfo] = useState({
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@hospital.com",
    certificationNumber: "12345",
    yearsExperience: "5-10",
    primarySpecialty: "General Surgery"
  });

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    offlineSync: true,
    communityNotifications: true
  });

  // TODO: Remove mock data when implementing real backend
  const userTier: 'free' | 'standard' | 'premium' = "standard";
  const selectedSpecialties = ["General Surgery", "Orthopedics", "Gynecology"];
  const usageStats = {
    proceduresViewed: 127,
    notesCreated: 23,
    communityPosts: 8,
    daysActive: 45
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', userInfo);
  };

  const handleSettingsUpdate = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    console.log('Settings updated:', { [key]: value });
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon" data-testid="button-settings">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* User Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-lg font-semibold">
                {userInfo.firstName[0]}{userInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{userInfo.firstName} {userInfo.lastName}</h2>
              <p className="text-sm text-muted-foreground">{userInfo.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="default" className="text-xs">
                  {userTier === 'free' ? (
                    'Free Plan'
                  ) : userTier === 'standard' ? (
                    <>
                      <Crown className="h-3 w-3 mr-1" />
                      Standard Plan
                    </>
                  ) : (
                    <>
                      <Crown className="h-3 w-3 mr-1" />
                      Premium Plan
                    </>
                  )}
                </Badge>
                <Badge variant="outline" className="text-xs">{userInfo.yearsExperience} experience</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-md">
              <div className="text-2xl font-bold text-primary">{usageStats.proceduresViewed}</div>
              <div className="text-xs text-muted-foreground">Procedures Viewed</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-md">
              <div className="text-2xl font-bold text-primary">{usageStats.notesCreated}</div>
              <div className="text-xs text-muted-foreground">Personal Notes</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-md">
              <div className="text-2xl font-bold text-primary">{usageStats.communityPosts}</div>
              <div className="text-xs text-muted-foreground">Community Posts</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-md">
              <div className="text-2xl font-bold text-primary">{usageStats.daysActive}</div>
              <div className="text-xs text-muted-foreground">Days Active</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Specialties */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Specialties</CardTitle>
          <CardDescription className="text-xs">
            Manage your surgical specialty access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSpecialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm" data-testid="button-manage-specialties">
            Manage Specialties
          </Button>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm">First Name</Label>
                <Input
                  id="firstName"
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                  data-testid="input-firstName"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                <Input
                  id="lastName"
                  value={userInfo.lastName}
                  onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                  data-testid="input-lastName"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                data-testid="input-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificationNumber" className="text-sm">CST Certification Number</Label>
              <Input
                id="certificationNumber"
                value={userInfo.certificationNumber}
                onChange={(e) => setUserInfo({ ...userInfo, certificationNumber: e.target.value })}
                data-testid="input-certification"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="yearsExperience" className="text-sm">Years Experience</Label>
                <Select 
                  value={userInfo.yearsExperience} 
                  onValueChange={(value) => setUserInfo({ ...userInfo, yearsExperience: value })}
                >
                  <SelectTrigger data-testid="select-experience">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primarySpecialty" className="text-sm">Primary Specialty</Label>
                <Select 
                  value={userInfo.primarySpecialty} 
                  onValueChange={(value) => setUserInfo({ ...userInfo, primarySpecialty: value })}
                >
                  <SelectTrigger data-testid="select-specialty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Surgery">General Surgery</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Cardiovascular">Cardiovascular</SelectItem>
                    <SelectItem value="Neurosurgery">Neurosurgery</SelectItem>
                    <SelectItem value="Gynecology">Gynecology</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" data-testid="button-update-profile">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="h-4 w-4" />
            App Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Push Notifications</Label>
              <p className="text-xs text-muted-foreground">Receive app notifications</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingsUpdate('notifications', checked)}
              data-testid="switch-notifications"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Dark Mode</Label>
              <p className="text-xs text-muted-foreground">Use dark theme</p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSettingsUpdate('darkMode', checked)}
              data-testid="switch-dark-mode"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Offline Sync</Label>
              <p className="text-xs text-muted-foreground">Download content for offline use</p>
            </div>
            <Switch
              checked={settings.offlineSync}
              onCheckedChange={(checked) => handleSettingsUpdate('offlineSync', checked)}
              data-testid="switch-offline-sync"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Community Notifications</Label>
              <p className="text-xs text-muted-foreground">Get notified about forum activity</p>
            </div>
            <Switch
              checked={settings.communityNotifications}
              onCheckedChange={(checked) => handleSettingsUpdate('communityNotifications', checked)}
              data-testid="switch-community-notifications"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" data-testid="button-subscription">
            <CreditCard className="h-4 w-4 mr-3" />
            Manage Subscription
          </Button>
          <Button variant="outline" className="w-full justify-start" data-testid="button-offline-content">
            <Download className="h-4 w-4 mr-3" />
            Manage Offline Content
          </Button>
          <Button variant="outline" className="w-full justify-start" data-testid="button-privacy">
            <Shield className="h-4 w-4 mr-3" />
            Privacy & Security
          </Button>
          <Button variant="outline" className="w-full justify-start" data-testid="button-support">
            <Star className="h-4 w-4 mr-3" />
            Help & Support
          </Button>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card>
        <CardContent className="p-4">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={() => console.log('Sign out clicked')}
            data-testid="button-sign-out"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* App Version */}
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground">
          SurgiTech Connect v1.0.0
        </p>
      </div>
    </div>
  );
}