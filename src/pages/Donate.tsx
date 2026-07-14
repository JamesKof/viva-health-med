import { useState } from "react";
import { Heart, CreditCard, Smartphone, Building2, Copy, Check, Loader2, Users, Stethoscope, Pill, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { StickySubNav } from "@/components/StickySubNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAnalytics } from "@/hooks/useAnalytics";
import { KetaOutreachGallery } from "@/components/KetaOutreachGallery";
import { PageTransition, PageHero } from "@/components/PageTransition";
import vivaSmileAsset from "@/assets/vivasmile.jpeg.asset.json";
import surgeryInProgress from "@/assets/keta-outreach/surgery-in-progress.jpg";

const BANK_DETAILS = {
  bankName: "Ecobank Ghana",
  accountName: "Viva Health Medical Foundation",
  accountNumber: "1234567890",
};

const donationAmounts = [50, 100, 200, 500, 1000, 2000];

const impactStats = [
  { icon: Users, value: "10,000+", label: "Lives Touched" },
  { icon: Stethoscope, value: "50+", label: "Medical Outreaches" },
  { icon: Pill, value: "5,000+", label: "Free Medications" },
];

type PaymentMethod = "card" | "momo" | "bank";

const Donate = () => {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const amount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleDonate = async () => {
    if (!amount || amount < 1) {
      toast({ title: "Invalid Amount", description: "Please enter a valid donation amount.", variant: "destructive" });
      return;
    }

    if (!email) {
      toast({ title: "Email Required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }

    if ((paymentMethod === "momo" || paymentMethod === "card") && !phone) {
      toast({ title: "Phone Required", description: "Please enter your phone number.", variant: "destructive" });
      return;
    }

    if (paymentMethod === "bank") {
      toast({ title: "Bank Transfer", description: "Please use the bank details provided to make your transfer.", variant: "default" });
      return;
    }

    setIsLoading(true);
    trackEvent("donation_flow_started", { paymentMethod, amount });

    try {
      const clientReference = `viva_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

      const { data, error } = await supabase.functions.invoke("hubtel-initiate", {
        body: {
          totalAmount: amount,
          description: "Donation to Viva Health Medical Foundation",
          clientReference,
          email,
          donorName: name || "Anonymous",
          phone,
        },
      });

      if (error) {
        console.error("Hubtel initiate error:", error);
        throw error;
      }

      if (data?.checkoutUrl) {
        trackEvent("donation_checkout_opened", { paymentMethod, amount, clientReference });
        setCheckoutUrl(data.checkoutUrl);
      } else {
        throw new Error("Failed to get checkout URL");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast({ title: "Error", description: "Failed to initialize payment. Please try again.", variant: "destructive" });
      setIsLoading(false);
    }
  };

  const handleCloseCheckout = () => {
    setCheckoutUrl(null);
    setIsLoading(false);
    trackEvent("donation_checkout_closed", { paymentMethod, amount });
  };

  const resetForm = () => {
    setSelectedAmount(100);
    setCustomAmount("");
    setEmail("");
    setName("");
    setPhone("");
    setIsLoading(false);
    setCheckoutUrl(null);
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Donate to Viva Health Medical Foundation"
          description="Support free healthcare for underserved communities in Ghana. Donate via Mobile Money, Card, or Bank Transfer."
        />
        <Navbar />
        <StickySubNav />

        {/* Hubtel Checkout Modal */}
        {checkoutUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-card rounded-2xl shadow-lifted w-full max-w-lg mx-4 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Complete Your Donation</h3>
                <button
                  onClick={handleCloseCheckout}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Close checkout"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <iframe
                src={checkoutUrl}
                className="w-full h-[500px] border-0"
                title="Hubtel Checkout"
                allow="payment"
              />
            </div>
          </div>
        )}

        {/* Hero Section with Green Background */}
        <section className="relative min-h-[60vh] flex items-center bg-primary overflow-hidden">
          <PageHeroBackground />
          <div className="container mx-auto px-4 relative z-10 py-32">
            <PageHero className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground font-medium text-sm mb-6">
                <Heart className="w-4 h-4" />
                Make a Difference
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Your Generosity{" "}
                <span className="text-accent">Saves Lives</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                Every donation directly funds free medical screenings, medications, and health education for communities that need it most.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                    <div className="text-xs text-primary-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </PageHero>
          </div>
        </section>

        {/* Donation Form Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Donation Form */}
            <div className="bg-card rounded-3xl p-8 shadow-lifted border border-border/60 sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                Make Your Donation
              </h2>

              <div className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Select Amount (GHS)</Label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {donationAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                        className={`p-3 rounded-xl border-2 transition-all font-medium ${
                          selectedAmount === amt && !customAmount ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">GHS</span>
                    <Input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="pl-14"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod("momo")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        paymentMethod === "momo" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Smartphone className="w-6 h-6 text-primary" />
                      <span className="font-medium text-sm">Mobile Money</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <CreditCard className="w-6 h-6 text-primary" />
                      <span className="font-medium text-sm">Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("bank")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        paymentMethod === "bank" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Building2 className="w-6 h-6 text-primary" />
                      <span className="font-medium text-sm">Bank</span>
                    </button>
                  </div>
                </div>

                {/* Bank Details */}
                {paymentMethod === "bank" && (
                  <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                    <h4 className="font-semibold text-foreground">Bank Transfer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Bank Name</span>
                        <span className="font-medium">{BANK_DETAILS.bankName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Account Name</span>
                        <span className="font-medium">{BANK_DETAILS.accountName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Account Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium font-mono">{BANK_DETAILS.accountNumber}</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
                              toast({ title: "Copied!", description: "Account number copied to clipboard." });
                            }}
                            className="p-1 hover:bg-secondary rounded"
                          >
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      After making the transfer, please fill in your details below so we can acknowledge your donation.
                    </p>
                  </div>
                )}

                {/* Donor Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium mb-2 block">Full Name (Optional)</Label>
                    <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">Email Address *</Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium mb-2 block">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="e.g., 0241234567" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                </div>

                {/* Summary */}
                {amount && amount > 0 && (
                  <div className="bg-primary/5 rounded-xl p-4 space-y-2 border border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Donation Amount</span>
                      <span className="font-semibold text-lg">GHS {amount}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button onClick={handleDonate} disabled={isLoading || !amount} className="w-full py-6 rounded-xl text-lg font-semibold">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : paymentMethod === "bank" ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      I've Made the Transfer
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2" />
                      Donate GHS {amount || 0}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secured by Hubtel. Your donation supports healthcare for underserved communities.
                </p>
              </div>
            </div>

            {/* Impact Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Your Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every donation, no matter the size, helps us bring quality healthcare to communities that need it most. Here's how your generosity makes a difference:
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-6 border border-border/60">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">GHS 50</h4>
                      <p className="text-sm text-muted-foreground">Provides basic medications for one patient during our outreach programs.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border/60">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">GHS 200</h4>
                      <p className="text-sm text-muted-foreground">Covers a complete health screening including blood pressure, blood sugar, and eye examination.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border/60">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">GHS 1,000</h4>
                      <p className="text-sm text-muted-foreground">Helps fund a community health education session reaching over 100 people.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <p className="text-foreground italic mb-4">
                  "Thanks to the free screening at the Keta outreach, they discovered my diabetes early. The medication they provided has helped me manage it. I'm grateful for this foundation."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">MA</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Mama Ama</p>
                    <p className="text-xs text-muted-foreground">Keta Outreach Beneficiary</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">See Your Donations in Action</h2>
            <KetaOutreachGallery />
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Donate;
