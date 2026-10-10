import { BookOpen, Microscope, FileText, TreePine, ArrowRight } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoCard } from "@/components/ui/bento-card";
import { Link } from "react-router-dom";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui/reveal";
import { BOOKS } from "@/data/books";

interface ResearchCard {
  icon: React.ReactNode;
  title: string;
  body: string;
  colSpan?: 1 | 2 | 3;
}

const RESEARCH_CARDS: ResearchCard[] = [
  {
    icon: <BookOpen className="w-6 h-6" strokeWidth={1.5} />,
    title: "The Agarwood Trade of Assam",
    body: "A comprehensive digital publication by the AATMA Research Wing — covering the resin's formation, cultivation practices, distillation craft, and the global market for Assam's agarwood. Available as a free digital download.",
    colSpan: 2,
  },
  {
    icon: <Microscope className="w-6 h-6" strokeWidth={1.5} />,
    title: "Seminar on Agar Plantation in the Northeast",
    body: "Co-organised in Nagaon with proceedings published — an early contribution to building a knowledge base for agar cultivation in the region. A foundational document for researchers and cultivators alike.",
  },
  {
    icon: <TreePine className="w-6 h-6" strokeWidth={1.5} />,
    title: "Cultivation & Economic Studies",
    body: "Empirical studies of agar cultivation in Assam have found that every ₹100 invested can yield ₹623 in net benefit, making agar one of the most rewarding crops a farmer can plant. Ongoing research covers yield optimization, infection techniques, and sustainable harvesting.",
  },
  {
    icon: <FileText className="w-6 h-6" strokeWidth={1.5} />,
    title: "Policy Research & Advocacy",
    body: "AATMA's research wing compiles data, case studies, and policy analysis to support advocacy efforts — from the 2000 Guwahati seminar to the 2020 Assam Agarwood Promotion Policy and beyond.",
  },
];

/**
 * Research page — dedicated route for research publications and knowledge resources.
 */
export function ResearchPage() {
  return (
    <PageLayout
      badge="Research & Publications"
      badgeIcon={<BookOpen size={14} />}
      title={
        <>
          Research &amp; <span className="text-gold">Knowledge</span>
        </>
      }
      subtitle="Publications, studies, and knowledge resources from AATMA's research wing — building the evidence base for a sustainable agarwood economy."
      heroPaddingBottom="pb-12"
    >
      {/* Research cards */}
      <section className="relative pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <BentoGrid>
            {RESEARCH_CARDS.map((card, i) => (
              <BentoCard
                key={i}
                title={card.title}
                description={card.body}
                icon={card.icon}
                colSpan={card.colSpan}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Books section */}
      <section className="relative pb-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal variant="fade" delay={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <h2 className="font-display font-bold text-white text-lg md:text-xl tracking-wide">
                Digital Library
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {BOOKS.map((book, i) => (
              <Reveal key={book.id} variant="up" delay={i * 100}>
                <div className="card-hover group relative h-full flex flex-col bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-sm overflow-hidden">
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-20 rounded-sm bg-gradient-to-br from-green-deep to-green-mid border border-gold/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={24} className="text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-white text-base md:text-lg leading-snug group-hover:text-gold transition-colors duration-300">
                          {book.title}
                        </h3>
                        <p className="text-white/50 text-xs mt-1">{book.author}</p>
                        <p className="text-white/40 text-xs mt-0.5">
                          {book.publishedYear} · {book.format}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-white/60 text-sm leading-relaxed flex-1">
                      {book.description}
                    </p>
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-white/40 text-xs">
                        {book.chapterCount} chapters · {book.readingTime} min read
                      </span>
                      <Link
                        to="/books"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-light transition-colors duration-300 group/link"
                      >
                        Read now
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ResearchPage;
