import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, Search, Shield } from "lucide-react";
import { format } from "date-fns";

interface Donation {
  id: string;
  donor_name: string | null;
  email: string;
  phone: string | null;
  amount: number;
  currency: string | null;
  payment_status: string | null;
  payment_reference: string;
  created_at: string;
  donation_type: string | null;
}

const AdminPayments = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const { toast } = useToast();

  const verifyPassword = async () => {
    setIsVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-admin-password", {
        body: { password },
      });

      if (error) throw error;

      if (data.success) {
        setIsAuthenticated(true);
        toast({
          title: "Access Granted",
          description: "Welcome to the admin dashboard.",
        });
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Error",
        description: "Failed to verify password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const fetchDonations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error("Error fetching donations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch donations.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (paymentReference: string) => {
    setVerifyingId(paymentReference);
    try {
      const { data, error } = await supabase.functions.invoke("hubtel-verify", {
        body: { clientReference: paymentReference },
      });

      if (error) throw error;

      toast({
        title: data.status === "success" ? "Payment Verified" : "Verification Complete",
        description: data.message,
        variant: data.status === "failed" ? "destructive" : "default",
      });

      // Refresh donations after verification
      await fetchDonations();
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Error",
        description: "Failed to verify payment with Hubtel.",
        variant: "destructive",
      });
    } finally {
      setVerifyingId(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDonations();
    }
  }, [isAuthenticated]);

  const filteredDonations = donations.filter((donation) => {
    const matchesStatus =
      statusFilter === "all" || donation.payment_status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      donation.donor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.payment_reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500 hover:bg-red-600">Failed</Badge>;
      default:
        return <Badge variant="outline">{status || "Unknown"}</Badge>;
    }
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Access Required
            </DialogTitle>
            <DialogDescription>
              Enter the admin password to access the payments dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    verifyPassword();
                  }
                }}
              />
            </div>
            <Button
              onClick={verifyPassword}
              disabled={isVerifying || !password}
              className="w-full"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payments Dashboard</h1>
            <p className="text-muted-foreground">
              View and verify all donation payments
            </p>
          </div>
          <Button onClick={fetchDonations} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No donations found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Donor Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(donation.created_at), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell>{donation.donor_name || "Anonymous"}</TableCell>
                      <TableCell>{donation.email}</TableCell>
                      <TableCell>{donation.phone || "-"}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {donation.currency || "GHS"} {donation.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(donation.payment_status)}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {donation.payment_reference}
                      </TableCell>
                      <TableCell>
                        {(donation.payment_status === "pending" ||
                          donation.payment_status === "failed") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => verifyPayment(donation.payment_reference)}
                            disabled={verifyingId === donation.payment_reference}
                          >
                            {verifyingId === donation.payment_reference ? (
                              <>
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                Verifying
                              </>
                            ) : (
                              "Verify"
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredDonations.length} of {donations.length} donations
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
