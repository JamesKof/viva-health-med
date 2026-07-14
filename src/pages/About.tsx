import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { StickySubNav } from "@/components/StickySubNav";
import { Heart, Target, Eye, Users, Sparkles, Shield, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { PageTransition, PageHero } from "@/components/PageTransition";
import vivaSmileAsset from "@/assets/vivasmile.jpeg.asset.json";
import heroCommunity from "@/assets/hero-community.jpeg";
import surgeryInProgress from "@/assets/keta-outreach/surgery-in-progress.jpg";
import medicalTeamAction from "@/assets/keta-outreach/medical-team-action.jpg";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every patient with empathy, dignity, and genuine care.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We work alongside communities, not just for them, building lasting partnerships.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparency and accountability guide every decision we make.",
  },
  {
    icon: HandHeart,
    title: "Service",
    description: "We believe healthcare is a right, not a privilege, for every person.",
  },
];

const milestones = [
  { year: "2018", title: "Foundation Established", description: "Viva Health Medical Foundation was born with a vision to serve underserved communities." },
  { year: "2019", title: "First Major Outreach", description: "Conducted our first large-scale medical outreach reaching over 500 patients." },
  { year: "2021", title: "School Health Initiative", description: "Launched health education programs in schools across Greater Accra." },
  { year: "2023", title: "Surgical Missions Begin", description: "Expanded services to include surgical interventions during outreaches." },
  { year: "2024", title: "Keta Outreach Success", description: "Record-breaking outreach in Volta Region with comprehensive surgical care." },
];

const About = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="About Viva Health"
          description="Discover the story, mission, and values of Viva Health Medical Foundation and our commitment to underserved communities."
        />
        <Navbar />
        <StickySubNav />
        <section className="relative min-h-[70vh] flex items-center bg-primary overflow-hidden">
          <PageHeroBackground />

          <div className="container mx-auto px-4 relative z-10 py-32">
            <PageHero className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground font-medium text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                A Movement for{" "}
                <span className="text-accent">Dignified Healthcare</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                Since 2018, Viva Health Medical Foundation has united clinicians, volunteers, and communities 
                to deliver compassionate, practical healthcare where it's needed most. We believe every person 
                deserves respectful, high-quality care regardless of location or income.
              </p>
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-foreground text-primary font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                <Heart className="w-5 h-5" />
                Join Our Mission
              </Link>
            </PageHero>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <SlideInLeft>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="relative bg-card rounded-3xl p-8 shadow-soft border border-border/60 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      A world where every individual has access to quality healthcare, 
                      regardless of their socioeconomic status or geographic location.
                    </p>
                  </div>
                </div>
              </SlideInLeft>

              <SlideInRight>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="relative bg-card rounded-3xl p-8 shadow-soft border border-border/60 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                      <Target className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Empowering lives through medical outreach, free screenings, surgical interventions, 
                      and accessible health education for all.
                    </p>
                  </div>
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From humble beginnings to impacting thousands of lives across Ghana.
              </p>
            </FadeInUp>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 transform md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <FadeInUp key={milestone.year} delay={index * 0.1}>
                  <div
                    className={`relative flex items-center mb-12 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform md:-translate-x-1/2 z-10 shadow-glow" />

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60 card-lift">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-3">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 section-gradient">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at Viva Health.
              </p>
            </FadeInUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="group bg-card rounded-2xl p-6 shadow-soft border border-border/60 card-lift text-center h-full">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      <value.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Impact Gallery */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <SlideInLeft className="grid grid-cols-2 gap-4">
                <img
                  src={surgeryInProgress}
                  alt="Surgery in progress"
                  className="rounded-2xl shadow-lifted w-full h-48 object-cover"
                />
                <img
                  src={medicalTeamAction}
                  alt="Medical team in action"
                  className="rounded-2xl shadow-lifted w-full h-48 object-cover mt-8"
                />
              </SlideInLeft>
              <SlideInRight>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Making a Difference, One Life at a Time
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Every outreach, every surgery, every consultation represents a life touched. 
                  Our dedicated team of medical professionals and volunteers work tirelessly 
                  to bring hope and healing to communities across Ghana.
                </p>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  View Our Gallery
                </Link>
              </SlideInRight>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;