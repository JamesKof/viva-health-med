import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { StickySubNav } from "@/components/StickySubNav";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  HeartPulse, 
  GraduationCap, 
  Syringe, 
  Users, 
  Building2,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { FadeInUp, SlideInLeft, SlideInRight } from "@/components/AnimatedSection";
import { PageTransition, PageHero } from "@/components/PageTransition";
import vivaSmileAsset from "@/assets/vivasmile.jpeg.asset.json";
import medicalTeamAction from "@/assets/keta-outreach/medical-team-action.jpg";
import surgeryInProgress from "@/assets/keta-outreach/surgery-in-progress.jpg";
import doctorPatientCare from "@/assets/keta-outreach/doctor-patient-care.jpg";

const stats = [
  { value: "10,000+", label: "Lives Touched" },
  { value: "25+", label: "Outreaches" },
  { value: "500+", label: "Surgeries" },
  { value: "50+", label: "Communities" },
];

const programs = [
  {
    icon: Stethoscope,
    title: "Free Medical Screenings",
    description: "Comprehensive health screenings including blood pressure, blood sugar, BMI, and general health assessments.",
    features: ["Hypertension screening", "Diabetes testing", "General consultations", "Health counseling"],
    image: doctorPatientCare,
  },
  {
    icon: HeartPulse,
    title: "Surgical Missions",
    description: "Life-saving surgical interventions for patients who otherwise cannot afford or access surgical care.",
    features: ["Hernia repairs", "Hydrocelectomy", "Minor surgeries", "Post-op care"],
    image: surgeryInProgress,
  },
  {
    icon: GraduationCap,
    title: "Health Education",
    description: "Empowering communities with knowledge about disease prevention, hygiene, and healthy living.",
    features: ["School health talks", "Community workshops", "Menstrual hygiene", "Mental health awareness"],
    image: medicalTeamAction,
  },
  {
    icon: Syringe,
    title: "Medication Distribution",
    description: "Providing free essential medications to patients during and after our medical outreaches.",
    features: ["Prescription drugs", "Chronic disease meds", "Supplements", "First aid supplies"],
  },
];

const WhatWeDo = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="What We Do"
          description="See how Viva Health Medical Foundation delivers free clinics, screenings, and health education across Ghana."
        />
        <Navbar />
        <StickySubNav />
        <section className="relative min-h-[60vh] flex items-center bg-primary overflow-hidden">
          <PageHeroBackground />

          <div className="container mx-auto px-4 relative z-10 py-32">
            <PageHero className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground font-medium text-sm mb-6">
                <HeartPulse className="w-4 h-4" />
                Our Programs
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Transforming Lives Through{" "}
                <span className="text-accent">Healthcare Access</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                From pop-up clinics to surgical missions, we bring comprehensive healthcare 
                to communities that need it most. Every programme is built in collaboration 
                with local leaders and health professionals.
              </p>
            </PageHero>
          </div>
        </section>

        {/* Impact Statistics Bar */}
        <section className="py-8 bg-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-accent-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-accent-foreground/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Programs
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each programme addresses critical healthcare gaps in underserved communities.
              </p>
            </FadeInUp>

            <div className="space-y-24">
              {programs.map((program, index) => (
                <div
                  key={program.title}
                  className={`grid lg:grid-cols-2 gap-12 items-center`}
                >
                  {index % 2 === 0 ? (
                    <>
                      <SlideInLeft>
                        {program.image ? (
                          <div className="relative rounded-3xl overflow-hidden shadow-lifted">
                            <img
                              src={program.image}
                              alt={program.title}
                              className="w-full h-80 object-cover"
                            />
                            <div className="absolute top-6 left-6">
                              <div className="w-14 h-14 rounded-2xl bg-primary/90 flex items-center justify-center">
                                <program.icon className="w-7 h-7 text-primary-foreground" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 h-80 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center">
                              <program.icon className="w-12 h-12 text-primary" />
                            </div>
                          </div>
                        )}
                      </SlideInLeft>
                      <SlideInRight>
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
                          <program.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                          {program.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {program.description}
                        </p>
                        <ul className="space-y-3">
                          {program.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-foreground">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </SlideInRight>
                    </>
                  ) : (
                    <>
                      <SlideInLeft className="lg:order-2">
                        {program.image ? (
                          <div className="relative rounded-3xl overflow-hidden shadow-lifted">
                            <img
                              src={program.image}
                              alt={program.title}
                              className="w-full h-80 object-cover"
                            />
                            <div className="absolute top-6 left-6">
                              <div className="w-14 h-14 rounded-2xl bg-primary/90 flex items-center justify-center">
                                <program.icon className="w-7 h-7 text-primary-foreground" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 h-80 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center">
                              <program.icon className="w-12 h-12 text-primary" />
                            </div>
                          </div>
                        )}
                      </SlideInLeft>
                      <SlideInRight className="lg:order-1">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
                          <program.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                          {program.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {program.description}
                        </p>
                        <ul className="space-y-3">
                          {program.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-foreground">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </SlideInRight>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership CTA */}
        <FadeInUp>
          <section className="py-24 section-gradient">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Partner With Us
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Are you a hospital, pharmaceutical company, NGO, or corporate organization? 
                  Join us in expanding healthcare access. Together, we can reach more communities 
                  and save more lives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
                  >
                    <Users className="w-5 h-5" />
                    Become a Partner
                  </Link>
                  <Link
                    to="/donate"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    Support Our Work
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </FadeInUp>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default WhatWeDo;