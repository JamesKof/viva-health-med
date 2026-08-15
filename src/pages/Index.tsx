import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VolunteerSection } from "@/components/VolunteerSection";
import { BlogSection } from "@/components/BlogSection";
import { FeaturedVideos } from "@/components/FeaturedVideos";

import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { StickySubNav } from "@/components/StickySubNav";
import { PageTransition } from "@/components/PageTransition";
import { NewsletterSubscription } from "@/components/NewsletterSubscription";
import { Heart } from "lucide-react";

const Index = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Viva Health Medical Foundation"
          description="Free medical outreaches, screenings, and health education programs bringing quality care to underserved communities in Ghana."
        />
        <Navbar />
        <StickySubNav />
        <Hero />
        <FeatureCards />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <VolunteerSection />
        <BlogSection />
        <FeaturedVideos />

        
        {/* Newsletter Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <NewsletterSubscription />
          </div>
        </section>
        
        <Footer />
        
        {/* Floating Donate Button */}
        <Link
          to="/donate"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold shadow-lifted hover:scale-105 transition-transform"
        >
          <Heart className="w-5 h-5" />
          Donate Now
        </Link>
      </main>
    </PageTransition>
  );
};

export default Index;