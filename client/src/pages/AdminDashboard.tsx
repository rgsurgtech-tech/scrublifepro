import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, Ticket, User, Search, CheckCircle, XCircle, Database } from "lucide-react";

export default function AdminDashboard() {
  const { user, isLoading: isLoadingAuth } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // User search state
  const [userEmail, setUserEmail] = useState("");
  const [searchedUser, setSearchedUser] = useState<any>(null);

  // Promo code form state
  const [promoCode, setPromoCode] = useState("");
  const [influencerName, setInfluencerName] = useState("");
  const [influencerContact, setInfluencerContact] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "amount">("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [duration, setDuration] = useState<"once" | "forever" | "repeating">("forever");
  const [notes, setNotes] = useState("");

  // Fetch all promo codes (must be called before any early returns)
  const { data: promoCodes, isLoading: isLoadingCodes, refetch: refetchCodes } = useQuery({
    queryKey: ["/api/admin/promo-codes"],
    enabled: !!user && !isLoadingAuth, // Only run when user is loaded
    retry: (failureCount, error: any) => {
      // Don't retry on 403 errors
      if (error?.message === "Not authorized") {
        return false;
      }
      return failureCount < 3;
    },
    queryFn: async () => {
      const response = await fetch("/api/admin/promo-codes", {
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 403) {
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges",
            variant: "destructive",
          });
          navigate("/");
          throw new Error("Not authorized");
        }
        throw new Error("Failed to fetch promo codes");
      }
      return response.json();
    },
  });

  // ONE-CLICK reseed mutation (clears and reseeds all procedures)
  const reseedProceduresMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/reseed-procedures");
      return response.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "Success!",
        description: `Reseeded ${data.after} procedures (was ${data.before})`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to reseed procedures",
        variant: "destructive",
      });
    },
  });

  // Search user mutation
  const searchUserMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(`/api/users/search?email=${encodeURIComponent(email)}`, {
        credentials: "include",
      });
      if (response.status === 403) {
        throw new Error("FORBIDDEN");
      }
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setSearchedUser(data);
      toast({
        title: "User Found",
        description: `Found user: ${data.email}`,
      });
    },
    onError: (error: Error) => {
      if (error.message === "FORBIDDEN") {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      setSearchedUser(null);
      toast({
        title: "User Not Found",
        description: "No user found with that email",
        variant: "destructive",
      });
    },
  });

  // Grant lifetime access mutation
  const grantLifetimeMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiRequest("POST", "/api/admin/lifetime-access/grant", { userId });
      return response.json();
    },
    onSuccess: (data) => {
      setSearchedUser(data.user);
      toast({
        title: "Success",
        description: "Lifetime access granted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to grant lifetime access",
        variant: "destructive",
      });
    },
  });

  // Revoke lifetime access mutation
  const revokeLifetimeMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiRequest("POST", "/api/admin/lifetime-access/revoke", { userId });
      return response.json();
    },
    onSuccess: (data) => {
      setSearchedUser(data.user);
      toast({
        title: "Success",
        description: "Lifetime access revoked successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to revoke lifetime access",
        variant: "destructive",
      });
    },
  });

  // Create promo code mutation
  const createPromoMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/admin/promo-codes", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Promotional code created successfully",
      });
      // Reset form
      setPromoCode("");
      setInfluencerName("");
      setInfluencerContact("");
      setDiscountValue("");
      setNotes("");
      refetchCodes();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create promotional code",
        variant: "destructive",
      });
    },
  });

  // Deactivate promo code mutation
  const deactivatePromoMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("POST", `/api/admin/promo-codes/${id}/deactivate`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Promotional code deactivated",
      });
      refetchCodes();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to deactivate code",
        variant: "destructive",
      });
    },
  });

  const handleSearchUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail.trim()) {
      searchUserMutation.mutate(userEmail.trim());
    }
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!promoCode.trim() || !influencerName.trim() || !discountValue) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    let numericValue = parseFloat(discountValue);
    
    // For amount discounts, round to 2 decimal places
    if (discountType === "amount") {
      numericValue = Math.round(numericValue * 100) / 100;
    }
    
    if (isNaN(numericValue) || numericValue <= 0) {
      toast({
        title: "Validation Error",
        description: "Discount value must be a positive number",
        variant: "destructive",
      });
      return;
    }

    if (discountType === "percentage") {
      if (!Number.isInteger(numericValue)) {
        toast({
          title: "Validation Error",
          description: "Percentage discount must be a whole number",
          variant: "destructive",
        });
        return;
      }
      if (numericValue < 1 || numericValue > 100) {
        toast({
          title: "Validation Error",
          description: "Percentage discount must be between 1 and 100",
          variant: "destructive",
        });
        return;
      }
    }

    if (discountType === "amount") {
      if (numericValue < 0.01) {
        toast({
          title: "Validation Error",
          description: "Amount discount must be at least $0.01",
          variant: "destructive",
        });
        return;
      }
      if (numericValue > 10000) {
        toast({
          title: "Validation Error",
          description: "Amount discount cannot exceed $10,000",
          variant: "destructive",
        });
        return;
      }
    }

    createPromoMutation.mutate({
      code: promoCode.trim(),
      influencerName: influencerName.trim(),
      influencerContact: influencerContact.trim() || undefined,
      discountType,
      discountValue: numericValue,
      duration,
      notes: notes.trim() || undefined,
    });
  };

  // Show loading while auth is being checked
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is logged in (redirect to auth if not)
  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Manage lifetime memberships, promotional codes, and database
          </p>
        </div>

        {/* Database Management */}
        <Card className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <CardTitle>Production Database</CardTitle>
                <CardDescription>
                  Seed the production database with all procedures (223 across all specialties)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* ONE-CLICK Reseed */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  if (confirm("This will CLEAR and RESEED all procedures. Your user data will be safe. Continue?")) {
                    reseedProceduresMutation.mutate();
                  }
                }}
                disabled={reseedProceduresMutation.isPending}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                data-testid="button-reseed-procedures"
              >
                {reseedProceduresMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Reseeding ALL Procedures...
                  </>
                ) : (
                  <>
                    <Database className="w-5 h-5 mr-2" />
                    🔄 ONE-CLICK RESEED (Clear + Reload All 223 Procedures)
                  </>
                )}
              </Button>
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold">Clears old data and adds fresh procedures</p>
                <p className="text-xs">⚠️ Clears: user activity, favorites, notes (to fix foreign key errors)</p>
                <p className="text-xs">✅ Keeps: users, forums, subscriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="lifetime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="lifetime" data-testid="tab-lifetime">
              <User className="w-4 h-4 mr-2" />
              Lifetime Access
            </TabsTrigger>
            <TabsTrigger value="promo" data-testid="tab-promo">
              <Ticket className="w-4 h-4 mr-2" />
              Promo Codes
            </TabsTrigger>
          </TabsList>

          {/* Lifetime Access Tab */}
          <TabsContent value="lifetime" className="space-y-6">
            {/* User Search */}
            <Card>
              <CardHeader>
                <CardTitle>Search User</CardTitle>
                <CardDescription>
                  Find a user by email to manage their lifetime access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearchUser} className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        data-testid="input-user-email"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={searchUserMutation.isPending}
                      data-testid="button-search-user"
                    >
                      {searchUserMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Search
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                {/* User Details */}
                {searchedUser && (
                  <div className="mt-6 p-4 border rounded-lg bg-card">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="font-medium">{searchedUser.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Name</Label>
                        <p className="font-medium">
                          {searchedUser.firstName} {searchedUser.lastName}
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Current Tier</Label>
                        <div className="mt-1">
                          <Badge variant={searchedUser.subscriptionTier === "premium" ? "default" : "secondary"}>
                            {searchedUser.subscriptionTier}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Lifetime Access</Label>
                        <div className="mt-1">
                          {searchedUser.hasLifetimeAccess ? (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <XCircle className="w-3 h-3 mr-1" />
                              Inactive
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Grant/Revoke Buttons */}
                      <div className="pt-3 flex gap-2">
                        {!searchedUser.hasLifetimeAccess ? (
                          <Button
                            onClick={() => grantLifetimeMutation.mutate(searchedUser.id)}
                            disabled={grantLifetimeMutation.isPending}
                            data-testid="button-grant-lifetime"
                          >
                            {grantLifetimeMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            )}
                            Grant Lifetime Access
                          </Button>
                        ) : (
                          <Button
                            onClick={() => revokeLifetimeMutation.mutate(searchedUser.id)}
                            disabled={revokeLifetimeMutation.isPending}
                            variant="destructive"
                            data-testid="button-revoke-lifetime"
                          >
                            {revokeLifetimeMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <XCircle className="w-4 h-4 mr-2" />
                            )}
                            Revoke Lifetime Access
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promo Codes Tab */}
          <TabsContent value="promo" className="space-y-6">
            {/* Create Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle>Create Promotional Code</CardTitle>
                <CardDescription>
                  Generate a new discount code for an influencer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePromo} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="promo-code">Promo Code *</Label>
                      <Input
                        id="promo-code"
                        placeholder="INFLUENCER10"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        data-testid="input-promo-code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="influencer-name">Influencer Name *</Label>
                      <Input
                        id="influencer-name"
                        placeholder="Dr. Sarah Johnson"
                        value={influencerName}
                        onChange={(e) => setInfluencerName(e.target.value)}
                        data-testid="input-influencer-name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="discount-type">Discount Type *</Label>
                      <Select value={discountType} onValueChange={(value: any) => setDiscountType(value)}>
                        <SelectTrigger data-testid="select-discount-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="amount">Fixed Amount ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discount-value">Discount Value *</Label>
                      <Input
                        id="discount-value"
                        type="number"
                        placeholder={discountType === "percentage" ? "10" : "5"}
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        data-testid="input-discount-value"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration *</Label>
                      <Select value={duration} onValueChange={(value: any) => setDuration(value)}>
                        <SelectTrigger data-testid="select-duration">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once">Once</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                          <SelectItem value="repeating">Repeating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="influencer-contact">Contact (Optional)</Label>
                      <Input
                        id="influencer-contact"
                        placeholder="sarah@example.com"
                        value={influencerContact}
                        onChange={(e) => setInfluencerContact(e.target.value)}
                        data-testid="input-influencer-contact"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      placeholder="Special promotion for Dr. Johnson's followers"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      data-testid="input-notes"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={createPromoMutation.isPending}
                    data-testid="button-create-promo"
                  >
                    {createPromoMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Ticket className="w-4 h-4 mr-2" />
                    )}
                    Create Promo Code
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Promo Codes List */}
            <Card>
              <CardHeader>
                <CardTitle>All Promotional Codes</CardTitle>
                <CardDescription>
                  View and manage existing promotional codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingCodes ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : promoCodes && promoCodes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead>Influencer</TableHead>
                          <TableHead>Discount</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Times Used</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {promoCodes.map((code: any) => (
                          <TableRow key={code.id} data-testid={`row-promo-${code.code}`}>
                            <TableCell className="font-mono font-bold">
                              {code.code}
                            </TableCell>
                            <TableCell>{code.influencerName}</TableCell>
                            <TableCell>
                              {code.discountType === "percentage" 
                                ? `${code.discountValue}%` 
                                : `$${code.discountValue}`}
                            </TableCell>
                            <TableCell className="capitalize">{code.duration}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{code.timesUsed}</Badge>
                            </TableCell>
                            <TableCell>
                              {code.isActive ? (
                                <Badge variant="default" className="bg-green-600">Active</Badge>
                              ) : (
                                <Badge variant="secondary">Inactive</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {code.isActive && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deactivatePromoMutation.mutate(code.id)}
                                  disabled={deactivatePromoMutation.isPending}
                                  data-testid={`button-deactivate-${code.code}`}
                                >
                                  Deactivate
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No promotional codes yet. Create your first one above!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
