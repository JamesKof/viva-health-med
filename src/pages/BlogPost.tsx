import { useParams, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { PageTransition } from "@/components/PageTransition";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { DefaultArticle } from "@/components/blog/DefaultArticle";
import NotFound from "./NotFound";

// Article component registry - each blog post renders independently
const articleComponents: Record<string, React.ComponentType> = {};

// Lazy load article components for better performance
const AjumakoArticle = lazy(() => import("@/components/blog/AjumakoArticle").then(m => ({ default: m.AjumakoArticle })));
const SafeSchoolArticle = lazy(() => import("@/components/blog/SafeSchoolArticle").then(m => ({ default: m.SafeSchoolArticle })));
const PodoeArticle = lazy(() => import("@/components/blog/PodoeArticle").then(m => ({ default: m.PodoeArticle })));
const TemaOutreachArticle = lazy(() => import("@/components/blog/TemaOutreachArticle").then(m => ({ default: m.TemaOutreachArticle })));

// Map slugs to their article components
const articleRegistry: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "ajumako-world-oral-health-day-outreach": AjumakoArticle,
  "safe-school-project-bullying-cyberbullying": SafeSchoolArticle,
  "podoe-community-health-outreach": PodoeArticle,
  "free-medical-outreach-tema-naval-base": TemaOutreachArticle,
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const ArticleComponent = slug ? articleRegistry[slug] : null;

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO title={post.title} description={post.excerpt} />
        <Navbar />

        {/* Hero */}
        <section className="pt-24 bg-primary">
          <div className="relative min-h-[50vh] flex items-end">
            <div className="absolute inset-0">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/80 to-primary" />
            </div>
            <div className="container mx-auto px-4 relative z-10 pb-12">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-4xl mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {post.author}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
              {ArticleComponent ? (
                <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading article...</div>}>
                  <ArticleComponent />
                </Suspense>
              ) : (
                <DefaultArticle post={post} />
              )}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">More Stories</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-card rounded-2xl overflow-hidden shadow-soft border border-border/60 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground mb-2">{relatedPost.date}</p>
                      <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default BlogPost;
