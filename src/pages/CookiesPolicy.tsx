import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { FadeInUp } from "@/components/AnimatedSection";
import { PageSEO } from "@/components/PageSEO";
import { PageHeroBackground } from "@/components/PageHeroBackground";
import { Cookie, Settings, BarChart, Shield, Clock, ToggleRight } from "lucide-react";

const CookiesPolicy = () => {
  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.",
      examples: [
        "Session management",
        "Security tokens",
        "Load balancing"
      ],
      canDisable: false
    },
    {
      icon: BarChart,
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: [
        "Page view tracking",
        "User journey analysis",
        "Performance monitoring"
      ],
      canDisable: true
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences.",
      examples: [
        "Language preferences",
        "Region settings",
        "Form data remembering"
      ],
      canDisable: true
    }
  ];

  return (
    <PageTransition>
      <PageSEO
        title="Cookies Policy | Viva Health Medical Foundation"
        description="Learn about how Viva Health Medical Foundation uses cookies to improve your website experience."
      />
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
          <PageHeroBackground />
          <div className="container mx-auto px-4 relative z-10">
            <FadeInUp>
              <div className="max-w-3xl mx-auto text-center text-primary-foreground">
                <Cookie className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Cookies Policy
                </h1>
                <p className="text-xl opacity-90">
                  This policy explains how we use cookies and similar technologies 
                  to recognize you when you visit our website.
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
              {/* What Are Cookies */}
              <FadeInUp>
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    What Are Cookies?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cookies are small text files that are stored on your computer or mobile device 
                    when you visit a website. They are widely used to make websites work more 
                    efficiently and provide information to website owners. Cookies help us provide 
                    you with a better experience by enabling us to monitor which pages you find 
                    useful and which you do not.
                  </p>
                </div>
              </FadeInUp>

              {/* Cookie Types */}
              <FadeInUp delay={0.1}>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Types of Cookies We Use
                </h2>
              </FadeInUp>

              <div className="space-y-6 mb-12">
                {cookieTypes.map((type, index) => (
                  <FadeInUp key={type.title} delay={0.2 + index * 0.1}>
                    <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <type.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-foreground">
                              {type.title}
                            </h3>
                            <span className={`text-xs px-3 py-1 rounded-full ${
                              type.canDisable 
                                ? "bg-muted text-muted-foreground" 
                                : "bg-primary/10 text-primary"
                            }`}>
                              {type.canDisable ? "Optional" : "Required"}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {type.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {type.examples.map((example, exIndex) => (
                              <span 
                                key={exIndex}
                                className="text-sm bg-muted/50 text-muted-foreground px-3 py-1 rounded-full"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>

              {/* Cookie Duration */}
              <FadeInUp delay={0.5}>
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        How Long Do Cookies Last?
                      </h2>
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Session cookies:</strong> These are 
                          temporary cookies that expire when you close your browser. They are used 
                          to remember your actions during a single browsing session.
                        </p>
                        <p>
                          <strong className="text-foreground">Persistent cookies:</strong> These 
                          cookies remain on your device for a set period or until you delete them. 
                          They are used to remember your preferences for future visits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>

              {/* Managing Cookies */}
              <FadeInUp delay={0.6}>
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <ToggleRight className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        Managing Your Cookie Preferences
                      </h2>
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          You can control and manage cookies in various ways. Please note that 
                          removing or blocking cookies may impact your user experience and parts 
                          of our website may no longer be fully accessible.
                        </p>
                        <p>
                          <strong className="text-foreground">Browser settings:</strong> Most 
                          browsers allow you to refuse or accept cookies, delete existing cookies, 
                          and set preferences for certain websites. Check your browser's help 
                          section for instructions.
                        </p>
                        <p>
                          <strong className="text-foreground">Third-party tools:</strong> You can 
                          opt out of third-party cookies by visiting the Network Advertising 
                          Initiative's opt-out page or using browser extensions designed to block 
                          tracking cookies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>

              {/* Contact */}
              <FadeInUp delay={0.7}>
                <div className="p-8 bg-primary/5 rounded-2xl">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Questions About Cookies?
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about our use of cookies, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> info@vivahealthmedfoundation.org</p>
                    <p><strong>Phone:</strong> +233 53 083 9578</p>
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

export default CookiesPolicy;
