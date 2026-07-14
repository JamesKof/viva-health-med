import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { PageHeroBackground } from "@/components/PageHeroBackground";
import { StickySubNav } from "@/components/StickySubNav";
import { X, Camera, MapPin, Calendar } from "lucide-react";
import { FadeInUp } from "@/components/AnimatedSection";
import { PageTransition, PageHero } from "@/components/PageTransition";

// Import all images
import outreach1 from "@/assets/blog/outreach-1.jpeg";
import accraGirls from "@/assets/blog/accra-girls.jpg";
import mentalHealth from "@/assets/blog/mental-health.png";
import loadingSupplies from "@/assets/keta-outreach/loading-supplies.jpg";
import teamBriefing from "@/assets/keta-outreach/team-briefing.jpg";
import waterSupplies from "@/assets/keta-outreach/water-supplies.jpg";
import volunteersCoordinating from "@/assets/keta-outreach/volunteers-coordinating.jpg";
import medicalStaffPpe from "@/assets/keta-outreach/medical-staff-ppe.jpg";
import photographerDocumenting from "@/assets/keta-outreach/photographer-documenting.jpg";
import surgeonPreparing from "@/assets/keta-outreach/surgeon-preparing.jpg";
import medicalTeamAction from "@/assets/keta-outreach/medical-team-action.jpg";
import nursePreparing from "@/assets/keta-outreach/nurse-preparing.jpg";
import surgeryInProgress from "@/assets/keta-outreach/surgery-in-progress.jpg";
import surgeryCloseupBw from "@/assets/keta-outreach/surgery-closeup-bw.jpg";
import surgicalProcedure from "@/assets/keta-outreach/surgical-procedure.jpg";
import doctorPatientCare from "@/assets/keta-outreach/doctor-patient-care.jpg";
import busLoading from "@/assets/keta-outreach/bus-loading.jpg";
import heroCommunity from "@/assets/hero-community.jpeg";

const categories = ["All", "Keta Outreach", "Accra", "Schools", "Community"];

const galleryItems = [
  { id: 1, image: busLoading, title: "Journey to Keta", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 2, image: doctorPatientCare, title: "Patient Care", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 3, image: surgeryInProgress, title: "Life-Saving Surgery", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 4, image: surgeonPreparing, title: "Surgeon Preparation", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 5, image: medicalTeamAction, title: "Medical Team in Action", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 6, image: nursePreparing, title: "Nursing Excellence", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 7, image: surgeryCloseupBw, title: "Surgical Precision", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 8, image: surgicalProcedure, title: "Saving Lives", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 9, image: teamBriefing, title: "Team Coordination", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 10, image: loadingSupplies, title: "Loading Medical Supplies", location: "Accra, Ghana", date: "November 2024", category: "Keta Outreach" },
  { id: 11, image: volunteersCoordinating, title: "Volunteers United", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 12, image: medicalStaffPpe, title: "Safety First", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 13, image: waterSupplies, title: "Community Support", location: "Keta, Volta Region", date: "November 2024", category: "Community" },
  { id: 14, image: photographerDocumenting, title: "Documenting Impact", location: "Keta, Volta Region", date: "November 2024", category: "Keta Outreach" },
  { id: 15, image: accraGirls, title: "Menstrual Hygiene Day", location: "Accra Girls SHS", date: "May 2024", category: "Schools" },
  { id: 16, image: mentalHealth, title: "Mental Health Awareness", location: "O'Reilly SHS", date: "October 2024", category: "Schools" },
  { id: 17, image: outreach1, title: "Community Outreach", location: "Pupuni & Tortibo", date: "October 2024", category: "Community" },
  { id: 18, image: heroCommunity, title: "Team Viva Health", location: "Greater Accra", date: "2024", category: "Community" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Outreach Gallery"
          description="Photos from Viva Health Medical Foundation outreaches, screenings, and community initiatives across Ghana."
        />
        <Navbar />
        <StickySubNav />
        <section className="pt-24 pb-8 bg-primary">
          <div className="relative h-[50vh] overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1 opacity-50">
              <div className="col-span-2 row-span-2">
                <img src={surgeryInProgress} alt="Surgery" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 row-span-1">
                <img src={doctorPatientCare} alt="Patient care" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 row-span-1">
                <img src={teamBriefing} alt="Team" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 row-span-1">
                <img src={nursePreparing} alt="Nurse" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 row-span-1">
                <img src={volunteersCoordinating} alt="Volunteers" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/70 to-primary" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <PageHero>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground font-medium text-sm mb-4">
                    <Camera className="w-4 h-4" />
                    Photo Gallery
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    Moments That Matter
                  </h1>
                </PageHero>
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Masonry Gallery */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-soft">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        index % 3 === 0 ? "h-80" : index % 3 === 1 ? "h-64" : "h-72"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-foreground font-semibold mb-1">{item.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-card/80 text-foreground hover:bg-card transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full max-h-[75vh] object-contain rounded-2xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {selectedImage.title}
                  </h3>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedImage.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedImage.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Gallery;