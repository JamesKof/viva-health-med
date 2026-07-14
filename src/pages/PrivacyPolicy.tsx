import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { FadeInUp } from "@/components/AnimatedSection";
import { PageSEO } from "@/components/PageSEO";
import { PageHeroBackground } from "@/components/PageHeroBackground";
import { Shield, Lock, Eye, UserCheck, Database, Bell } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal identification information (name, email address, phone number)",
        "Donation and payment information processed securely through our payment partners",
        "Volunteer registration details including skills and availability",
        "Event registration information",
        "Newsletter subscription preferences",
        "Website usage data through cookies and analytics"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Process donations and issue tax receipts where applicable",
        "Communicate about our programs, events, and volunteer opportunities",
        "Send newsletters and updates (with your consent)",
        "Improve our website and services",
        "Comply with legal obligations",
        "Respond to your inquiries and provide support"
      ]
    },
    {
      icon: Shield,
      title: "Data Protection",
      content: [
        "We implement industry-standard security measures to protect your data",
        "Payment information is processed through PCI-DSS compliant payment processors",
        "Access to personal data is restricted to authorized personnel only",
        "We regularly review and update our security practices",
        "Data is encrypted in transit and at rest"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal information we hold",
        "Request correction of inaccurate data",
        "Request deletion of your data (subject to legal requirements)",
        "Opt-out of marketing communications at any time",
        "Withdraw consent for data processing",
        "Lodge a complaint with relevant data protection authorities"
      ]
    },
    {
      icon: Lock,
      title: "Data Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "We may share data with trusted service providers who assist our operations",
        "All third-party providers are bound by confidentiality agreements",
        "We may disclose information when required by law"
      ]
    },
    {
      icon: Bell,
      title: "Communications",
      content: [
        "We may send you updates about our programs and impact",
        "You can unsubscribe from newsletters at any time",
        "Transactional emails (donation receipts, event confirmations) will still be sent",
        "We respect your communication preferences"
      ]
    }
  ];

  return (
    <PageTransition>
      <PageSEO
        title="Privacy Policy | Viva Health Medical Foundation"
        description="Learn how Viva Health Medical Foundation protects your privacy and handles your personal information."
      />
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-primary">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary" />
          <div className="container mx-auto px-4 relative z-10">
            <FadeInUp>
              <div className="max-w-3xl mx-auto text-center text-primary-foreground">
                <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Privacy Policy
                </h1>
                <p className="text-xl opacity-90">
                  Your privacy is important to us. This policy explains how we collect, 
                  use, and protect your personal information.
                </p>
                <p className="text-sm opacity-75 mt-4">
                  Last updated: December 2024
                </p>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FadeInUp>
                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Viva Health Medical Foundation ("we," "our," or "us") is committed to protecting 
                    your privacy. This Privacy Policy explains how we collect, use, disclose, and 
                    safeguard your information when you visit our website, make donations, register 
                    for events, or volunteer with us.
                  </p>
                </div>
              </FadeInUp>

              <div className="space-y-12">
                {sections.map((section, index) => (
                  <FadeInUp key={section.title} delay={index * 0.1}>
                    <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <section.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-foreground mb-4">
                            {section.title}
                          </h2>
                          <ul className="space-y-3">
                            {section.content.map((item, itemIndex) => (
                              <li 
                                key={itemIndex}
                                className="flex items-start gap-3 text-muted-foreground"
                              >
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>

              <FadeInUp delay={0.6}>
                <div className="mt-12 p-8 bg-primary/5 rounded-2xl">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Contact Us About Privacy
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy or our data practices, 
                    please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> info@vivahealthmedfoundation.org</p>
                    <p><strong>Phone:</strong> +233 53 083 9578</p>
                    <p><strong>Location:</strong> Ghana, West Africa</p>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default PrivacyPolicy;
