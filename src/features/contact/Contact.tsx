import { cn, type ClassValue } from "@/lib/utils";
import { useRef, useState, useCallback } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { Reveal } from "@/components/ui/reveal";

export function Contact({ className, deviceTier }: { className?: ClassValue; deviceTier?: "mobile" | "tablet" | "desktop" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const isMobile = deviceTier === "mobile";

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = useCallback((): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 text-white",
        className
      )}
    >
      <AmbientMotion
        variant={isMobile ? "fog" : "fog"}
        theme="dark"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 75 : 65}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.10)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-sm mb-4">
              Get in Touch
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl leading-tight mb-6">
              Connect with AATMA
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Whether you are a trader, a cultivator, a manufacturer, or a buyer looking to source documented agarwood from Assam — we are here to connect.
            </p>
          </Reveal>
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 md:gap-10 md:grid-cols-[1fr_360px]">
          {/* Info card */}
          <Reveal variant="left" delay={0} className="h-full">
            <div className="card-hover backdrop-blur-sm bg-white/[0.10] border border-white/15 rounded-sm p-5 md:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-gold text-xs font-semibold tracking-[0.15em] uppercase">
                  Association Office
                </span>
              </div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Head Office", value: "Main Road, Hojai – 782435, Assam, India" },
                  { icon: Phone, label: "Phone", value: "+91 94014 82133" },
                  { icon: Mail, label: "Email", value: "aatma20676@gmail.com" },
                  { icon: MapPin, label: "Registered", value: "Registrar of Societies — Reg. No. 664 of 78–79" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="mt-0.5 text-gold flex-shrink-0">
                      <item.icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs font-medium tracking-wide text-uppercase mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-white text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-white/50 text-xs font-medium tracking-wide text-uppercase mb-3">
                  Available on
                </div>
                <div className="text-cream font-medium text-sm">Monday – Saturday</div>
                <div className="text-white/50 text-xs mt-1">9:00 AM – 5:00 PM (IST)</div>
              </div>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal variant="right" delay={150} className="h-full">
            <div className="card-hover backdrop-blur-sm bg-white/[0.10] border border-white/15 rounded-sm p-5 md:p-8 h-full">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-gold" />
                  </div>
                  <div className="font-display text-xl text-white">Message received</div>
                  <p className="text-white/60 text-sm">
                    Thank you for reaching out. AATMA's office will get back to you shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-2 text-gold text-sm underline underline-offset-4 decoration-gold/40 hover:text-gold-light transition-colors duration-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  {Object.keys(errors).length > 0 && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 bg-gold/10 border border-gold/30 rounded-sm p-4 mb-4"
                    >
                      <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gold text-sm font-semibold mb-2">
                          Please fix the following:
                        </p>
                        <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
                          {Object.entries(errors).map(([key, msg]) => (
                            <li key={key}>{msg}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-gold text-xs font-semibold tracking-wide text-uppercase block">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handle}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your full name"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={cn(
                        "w-full bg-black/30 border rounded-sm px-4 py-3.5 md:py-3 text-cream placeholder-white/30 text-sm transition-all duration-300",
                        errors.name && focusedField === "name"
                          ? "border-gold/60 outline outline-1 outline-gold/40 bg-gold/5"
                          : "border-white/20",
                        "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
                      )}
                    />
                    {errors.name ? (
                      <p id="contact-name-error" className="text-gold text-xs mt-1" role="alert">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-gold text-xs font-semibold tracking-wide text-uppercase block">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handle}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com"
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={cn(
                        "w-full bg-black/30 border rounded-sm px-4 py-3.5 md:py-3 text-cream placeholder-white/30 text-sm transition-all duration-300",
                        errors.email && focusedField === "email"
                          ? "border-gold/60 outline outline-1 outline-gold/40 bg-gold/5"
                          : "border-white/20",
                        "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
                      )}
                    />
                    {errors.email ? (
                      <p id="contact-email-error" className="text-gold text-xs mt-1" role="alert">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-gold text-xs font-semibold tracking-wide text-uppercase block">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handle}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us how we can help..."
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className={cn(
                        "w-full bg-black/30 border rounded-sm px-4 py-3.5 md:py-3 text-cream placeholder-white/30 text-sm transition-all duration-300 resize-none",
                        errors.message && focusedField === "message"
                          ? "border-gold/60 outline outline-1 outline-gold/40 bg-gold/5"
                          : "border-white/20",
                        "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
                      )}
                    />
                    {errors.message ? (
                      <p id="contact-message-error" className="text-gold text-xs mt-1" role="alert">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-green-deep font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                  <p className="text-white/40 text-xs text-center">
                    We respect your privacy. Your details are used only to respond to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
