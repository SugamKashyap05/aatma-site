import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui/reveal";

/**
 * 404 page — shown when no route matches.
 * Provides navigation back to home and key sections.
 */
export function NotFoundPage() {
  const navigate = useNavigate();
  const hasHistory = window.history.length > 1;

  return (
    <PageLayout
      badge="Error"
      title={
        <>
          Page <span className="text-gold">Not Found</span>
        </>
      }
      subtitle="The page you're looking for doesn't exist or has been moved."
      heroPaddingBottom="pb-20"
    >
      <section className="relative pb-20 overflow-hidden">
        <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
          <Reveal variant="fade" delay={0}>
            <div className="font-display font-bold text-[120px] md:text-[180px] leading-none text-gold/20 select-none">
              404
            </div>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 -mt-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gold text-green-deep font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold-light transition-colors duration-300"
              >
                <Home size={16} />
                Go to Home
              </Link>
              {hasHistory && (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-sm font-medium px-6 py-3 border border-white/15 rounded-sm hover:border-gold/30 transition-colors duration-300"
                >
                  <ArrowLeft size={16} />
                  Go Back
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

export default NotFoundPage;
