import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DonationStats } from "@/components/DonationStats";
import { PageSEO } from "@/components/PageSEO";
import { StickySubNav } from "@/components/StickySubNav";
import { MemberOnboardingForm } from "@/components/MemberOnboardingForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  HandCoins,
  Megaphone,
  CheckCircle2,
  Star,
  ArrowRight,
  Quote,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { PageTransition, PageHero } from "@/components/PageTransition";
import vivaSmileAsset from "@/assets/vivasmile.jpeg.asset.json";
import volunteersCoordinating from "@/assets/keta-outreach/volunteers-coordinating.jpg";
import teamBriefing from "@/assets/keta-outreach/team-briefing.jpg";

const VOLUNTEER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe7vJKmCjINn7aX7KVfysHMiWIALOMJJPhiLl6BJY4T6YdK2w/viewform";

const volunteerOptions = [
  {
    icon: Users,
    title: "Volunteer Your Time",
    description: "Join our team of dedicated healthcare volunteers making a difference in communities.",
  },
  {
    icon: HandCoins,
    title: "Financial Support",
    description: "Your donations directly fund medical screenings, medications, and surgical interventions.",
  },
  {
    icon: Megaphone,
    title: "Spread the Word",
    description: "Help amplify our mission through your networks and social media platforms.",
  },
];

const memberBenefits = [
  "Official Viva Health ID card and certificate",
  "Priority placement for outreach volunteer slots",
  "Access to training and capacity-building sessions",
  "Networking with health professionals and NGO partners",
  "Eligibility for leadership roles within the organization",
  "Official recommendation letters for career advancement",
];

const nonMemberBenefits = [
  "Flexible involvement without long-term commitment",
  "Certificate for each outreach participated",
  "Hands-on experience in public health outreach",
  "Clear pathway to becoming a Member Volunteer",
];

const Volunteer = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Volunteer & Donate"
          description="Become a Viva Health volunteer or supporter and help deliver life-changing healthcare to underserved communities."
        />
        <Navbar />
        <StickySubNav />
        <section className="relative min-h-[70vh] flex items-center bg-primary overflow-hidden">
          <PageHeroBackground />

          <div className="container mx-auto px-4 relative z-10 py-32">
            <PageHero className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground font-medium text-sm mb-6">
                <Heart className="w-4 h-4" />
                Join the Movement
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Your Skills Can{" "}
                <span className="text-accent">Save Lives</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                Whether you're a healthcare professional, student, or simply someone who cares, 
                there's a place for you in the Viva Health family. Join hundreds of volunteers 
                who are transforming healthcare access across Ghana.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={VOLUNTEER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-foreground text-primary font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
                >
                  <Users className="w-5 h-5" />
                  Become a Volunteer
                </a>
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary-foreground hover:text-primary"
                >
                  <Heart className="w-5 h-5" />
                  Donate Instead
                </Link>
              </div>
            </PageHero>
          </div>
        </section>

        {/* Donation Stats */}
        <DonationStats />

        {/* Ways to Contribute */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ways to Get Involved
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                There are many ways to contribute to our mission. Choose what works best for you.
              </p>
            </FadeInUp>

            <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {volunteerOptions.map((option) => (
                <StaggerItem key={option.title}>
                  <div className="group bg-card rounded-2xl p-8 shadow-soft border border-border/60 card-lift text-center h-full">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      <option.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{option.title}</h3>
                    <p className="text-muted-foreground">{option.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Volunteer Paths Comparison */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Path
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer flexible volunteer options to match your availability and commitment level.
              </p>
            </FadeInUp>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Member Volunteer Card */}
              <SlideInLeft>
                <div className="relative group h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative bg-card rounded-3xl p-8 shadow-soft border border-border/60 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BadgeCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Member Volunteer</h3>
                        <p className="text-sm text-muted-foreground">Registered member of Viva Health</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-3">
                          What You Commit To
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            Complete membership registration with annual dues
                          </li>
                          <li className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            Participate in at least 3 activities per year
                          </li>
                          <li className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            Attend member meetings and training sessions
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-3">
                          What You Receive
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {memberBenefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2 text-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a
                      href={VOLUNTEER_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-glow transition-all duration-300"
                    >
                      Apply for Membership
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </SlideInLeft>

              {/* Non-Member Volunteer Card */}
              <SlideInRight>
                <div className="bg-card rounded-3xl p-8 shadow-soft border border-border/60 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <Clock className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Non-Member Volunteer</h3>
                      <p className="text-sm text-muted-foreground">Occasional supporter</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-3">
                        What You Commit To
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          Join specific events upon invitation
                        </li>
                        <li className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          Complete a short orientation before events
                        </li>
                        <li className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          Follow event guidelines and team leads
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-3">
                        What You Receive
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {nonMemberBenefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href={VOLUNTEER_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Join as Non-Member
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <FadeInUp>
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                  "Volunteering with Viva Health has been one of the most rewarding experiences of my life. 
                  Seeing the smiles on patients' faces after receiving care they couldn't otherwise afford 
                  reminds me why I chose medicine in the first place."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={teamBriefing}
                    alt="Volunteer"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Dr. Kwame Mensah</p>
                    <p className="text-sm text-muted-foreground">Member Volunteer since 2020</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInUp>

        {/* Member Onboarding Form */}
        <MemberOnboardingForm />

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Volunteer;