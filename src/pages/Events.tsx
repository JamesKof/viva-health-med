import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Users, Clock, ArrowRight, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { StickySubNav } from "@/components/StickySubNav";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Link } from "react-router-dom";
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { PageTransition, PageHero } from "@/components/PageTransition";
import vivaSmileAsset from "@/assets/vivasmile.jpeg.asset.json";
import teamBriefing from "@/assets/keta-outreach/team-briefing.jpg";
import volunteersCoordinating from "@/assets/keta-outreach/volunteers-coordinating.jpg";

type Event = Tables<"events">;

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      setEvents(data || []);
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  const now = new Date();
  const upcoming = events.filter((event) => new Date(event.event_date) >= now);
  const past = events.filter((event) => new Date(event.event_date) < now).reverse();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatShortDate = (iso: string) => {
    const date = new Date(iso);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString(undefined, { month: "short" }),
    };
  };

  const featuredEvent = upcoming[0];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Events & Outreaches"
          description="Upcoming and past Viva Health Medical Foundation outreaches, clinics, and community programmes."
        />
        <Navbar />
        <StickySubNav />
        <section className="relative min-h-[50vh] flex items-center bg-primary overflow-hidden">
          <PageHeroBackground />

          <div className="container mx-auto px-4 relative z-10 py-32">
            <PageHero className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground font-medium text-sm mb-6">
                <CalendarDays className="w-4 h-4" />
                Events & Outreaches
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Be Part of{" "}
                <span className="text-accent">Something Meaningful</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Join us at our upcoming outreaches, clinics, and community events. 
                Every event is an opportunity to make a difference in someone's life.
              </p>
            </PageHero>
          </div>
        </section>

        {/* Featured Upcoming Event */}
        {featuredEvent && (
          <section className="py-12 bg-secondary/50">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <SlideInLeft>
                  <div className="relative rounded-3xl overflow-hidden shadow-lifted">
                    <img
                      src={volunteersCoordinating}
                      alt="Volunteers at outreach"
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <div className="bg-primary text-primary-foreground rounded-2xl p-4 text-center shadow-lg">
                        <div className="text-3xl font-bold">{formatShortDate(featuredEvent.event_date).day}</div>
                        <div className="text-sm uppercase">{formatShortDate(featuredEvent.event_date).month}</div>
                      </div>
                    </div>
                  </div>
                </SlideInLeft>

                <SlideInRight>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
                    <Bell className="w-3 h-3" />
                    Next Upcoming Event
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {featuredEvent.title}
                  </h2>
                  {featuredEvent.description && (
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredEvent.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {formatDate(featuredEvent.event_date)}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {featuredEvent.location}
                    </span>
                    {featuredEvent.max_attendees && (
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        {featuredEvent.max_attendees} spots available
                      </span>
                    )}
                  </div>
                  <Link
                    to="/volunteer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-glow transition-all duration-300"
                  >
                    Join as Volunteer
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </SlideInRight>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <FadeInUp>
              <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                Upcoming Events
              </h2>
            </FadeInUp>

            {isLoading && !events.length ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl p-6 animate-pulse">
                    <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                    <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : upcoming.length === 0 ? (
              <FadeInUp>
                <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-border/60">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Upcoming Events</h3>
                  <p className="text-muted-foreground mb-6">
                    There are no upcoming events scheduled at the moment. Follow our social channels for announcements.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary font-medium"
                  >
                    Get Notified
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeInUp>
            ) : (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.slice(featuredEvent ? 1 : 0).map((event) => {
                  const dateInfo = formatShortDate(event.event_date);
                  return (
                    <StaggerItem key={event.id}>
                      <article className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/60 card-lift h-full">
                        <div className="flex items-start gap-4 p-6">
                          <div className="bg-primary/10 rounded-xl p-3 text-center flex-shrink-0">
                            <div className="text-2xl font-bold text-primary">{dateInfo.day}</div>
                            <div className="text-xs text-primary uppercase">{dateInfo.month}</div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                            {event.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {event.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </span>
                              {event.max_attendees && (
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {event.max_attendees} spots
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}
          </div>
        </section>

        {/* Past Events Archive */}
        <section className="py-16 section-gradient">
          <div className="container mx-auto px-4">
            <FadeInUp>
              <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-muted-foreground" />
                </div>
                Past Outreaches
              </h2>
            </FadeInUp>

            {past.length === 0 ? (
              <p className="text-muted-foreground">
                Past outreaches will appear here as we continue to grow our programmes.
              </p>
            ) : (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {past.slice(0, 8).map((event) => (
                  <StaggerItem key={event.id}>
                    <article className="bg-card/50 rounded-xl p-4 border border-border/40">
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        {formatDate(event.event_date)}
                      </p>
                      <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                        {event.title}
                      </h3>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {past.length > 8 && (
              <FadeInUp className="text-center mt-8">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 text-primary font-medium"
                >
                  View All Past Events in Gallery
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeInUp>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 bg-primary"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Want to Host an Outreach in Your Community?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              We partner with community leaders, churches, schools, and organizations to bring 
              healthcare to those who need it most.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background text-foreground font-semibold hover:shadow-lifted transition-all duration-300"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Events;