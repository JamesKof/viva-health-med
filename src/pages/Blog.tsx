import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { PageHeroBackground } from "@/components/PageHeroBackground";
import { StickySubNav } from "@/components/StickySubNav";
import { Calendar, User, ArrowRight, Mail, BookOpen } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { PageTransition, PageHero } from "@/components/PageTransition";
import { blogPosts } from "@/data/blogPosts";

const categories = ["All", "Outreach", "Stories", "Updates", "Health Tips"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter((post) => post !== featuredPost);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Stories & Updates"
          description="Stories, reflections, and impact updates from Viva Health Medical Foundation outreaches and programmes."
        />
        <Navbar />
        <StickySubNav />
        <section className="pt-24 bg-primary">
          <div className="relative min-h-[60vh] flex items-end">
            <div className="absolute inset-0">
              <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/80 to-primary" />
            </div>
            <div className="container mx-auto px-4 relative z-10 pb-16">
              <PageHero className="max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">Featured</span>
                  <span className="px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-medium">{featuredPost.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{featuredPost.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{featuredPost.date}</span>
                  <span className="flex items-center gap-2"><User className="w-4 h-4" />{featuredPost.author}</span>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:shadow-glow transition-all duration-300"
                >
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </Link>
              </PageHero>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <FadeInUp className="flex flex-wrap items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </FadeInUp>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <article className="group bg-card rounded-2xl overflow-hidden shadow-soft card-lift border border-border/60 h-full">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">{post.category}</div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
                          <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                          Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Newsletter */}
        <FadeInUp>
          <section className="py-16 section-gradient">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Stay Updated on Our Impact</h2>
                <p className="text-muted-foreground mb-8">Subscribe to receive stories, updates, and announcements about our outreaches and programmes.</p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <button type="submit" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-glow transition-all duration-300">Subscribe</button>
                </form>
              </div>
            </div>
          </section>
        </FadeInUp>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Blog;
