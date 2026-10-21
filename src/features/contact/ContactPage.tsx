import { useState } from "react";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui/reveal";
import { MapPin, Mail, Phone, Send } from "lucide-react";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageLayout
      badge="Contact"
      badgeIcon={<Mail size={14} />}
      title="Contact AATMA"
      subtitle="Get in touch with the All Assam Agar Traders and Agaroil Manufacturers Association."
    >
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <Reveal variant="fade" delay={0}>
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-cream mb-6">
                  Head Office
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-light mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-cream font-medium">Address</div>
                      <div className="text-cream/70 text-sm">
                        AATMA Head Office, Hojai, Assam, India
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold-light mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-cream font-medium">Email</div>
                      <div className="text-cream/70 text-sm">
                        sugamkashyap1@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="fade" delay={200}>
              <div className="glass-card rounded-lg p-6">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-gold-light text-4xl mb-4">✓</div>
                    <h3 className="font-display text-xl text-cream mb-2">Message sent</h3>
                    <p className="text-cream/70 text-sm">
                      Thank you for reaching out. We will respond shortly.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="block text-cream/80 text-sm mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full bg-white/[0.08] border border-white/15 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-cream/80 text-sm mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full bg-white/[0.08] border border-white/15 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-cream/80 text-sm mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        className="w-full bg-white/[0.08] border border-white/15 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                        placeholder="How can we help?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gold text-green-deep font-semibold rounded-lg px-6 py-3 hover:bg-gold-light transition-colors min-h-[44px]"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ContactPage;
