"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, MessageCircle, Terminal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTestimonials, type Testimonial } from "@/hooks/use-testimonials";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i <= rating
              ? "fill-primary text-primary"
              : "fill-muted/30 text-muted/30",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="group relative w-[340px] md:w-[400px] flex-shrink-0 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      {/* Terminal-style top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full bg-terminal-red/60"
            aria-hidden="true"
          />
          <div
            className="w-2 h-2 rounded-full bg-terminal-yellow/60"
            aria-hidden="true"
          />
          <div
            className="w-2 h-2 rounded-full bg-terminal-green/60"
            aria-hidden="true"
          />
          <span className="ml-2 text-[11px] font-mono text-muted-foreground/40">
            testimonial.md
          </span>
        </div>
        {testimonial.rating !== null && testimonial.rating > 0 && (
          <StarRating rating={testimonial.rating} />
        )}
      </div>

      {/* Quote content */}
      <div className="relative mb-5">
        <Quote
          className="absolute -top-1 -left-1 w-6 h-6 text-primary/15"
          aria-hidden="true"
        />
        <blockquote className="text-foreground/85 text-sm leading-relaxed pl-6 line-clamp-4">
          {testimonial.content}
        </blockquote>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-border/50">
        <Avatar className="h-10 w-10 border border-primary/15">
          {testimonial.avatar ? (
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <cite className="not-italic font-medium text-sm text-foreground block truncate">
            {testimonial.name}
          </cite>
          <div className="text-xs text-muted-foreground truncate">
            {testimonial.role}
            {testimonial.company && (
              <>
                {" "}
                <span className="text-muted-foreground/40" aria-hidden="true">
                  @
                </span>{" "}
                {testimonial.companyUrl ? (
                  <a
                    href={testimonial.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/70 hover:text-primary hover:underline"
                  >
                    {testimonial.company}
                  </a>
                ) : (
                  <span>{testimonial.company}</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  testimonials,
  direction = "left",
  speed = 40,
  prefersReducedMotion,
}: {
  testimonials: Testimonial[];
  direction?: "left" | "right";
  speed?: number;
  prefersReducedMotion: boolean;
}) {
  if (testimonials.length === 0) return null;

  // Repeat cards enough times so one "half" always exceeds viewport width.
  // Each card is ~424px (400px + 24px gap). We need at least ~2200px per half
  // to cover the widest screens, so repeat until we have enough.
  const minCardsPerHalf = Math.max(6, testimonials.length);
  const repeatCount = Math.ceil(minCardsPerHalf / testimonials.length);
  const repeatedSet: Testimonial[] = [];
  for (let r = 0; r < repeatCount; r++) {
    repeatedSet.push(...testimonials);
  }

  return (
    <div
      className="relative overflow-hidden group/marquee"
      role="marquee"
      aria-label={`Testimonials scrolling ${direction}`}
    >
      <div
        className={cn(
          "flex gap-6 w-max",
          !prefersReducedMotion &&
            (direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"),
          !prefersReducedMotion &&
            "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {/* Two identical halves for seamless loop */}
        {[...repeatedSet, ...repeatedSet].map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}

function StaticGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-8 rounded-2xl border border-dashed border-border bg-muted/20"
    >
      <MessageCircle
        className="w-16 h-16 text-muted-foreground/50 mb-4"
        aria-hidden="true"
      />
      <p className="text-muted-foreground text-center max-w-md">
        Testimonials from clients and colleagues will appear here. Add some in
        the admin panel to get started.
      </p>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[0, 1].map((row) => (
        <div key={row} className="flex gap-6 overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[340px] md:w-[400px] flex-shrink-0 h-[200px] rounded-xl border border-border bg-card/20 animate-pulse"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { data, isLoading } = useTestimonials({ limit: 12 });
  const testimonials = data?.testimonials ?? [];
  const prefersReducedMotion = useReducedMotion();

  // Split testimonials into two rows for the marquee
  const mid = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, mid);
  const row2 = testimonials.slice(mid);
  const useMarquee = testimonials.length >= 4 && !prefersReducedMotion;

  const sectionHeader = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
        <Terminal className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-mono text-primary">
          cat testimonials.json
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        What People{" "}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Say
        </span>
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Kind words from clients and colleagues I&apos;ve worked with
      </p>
    </motion.div>
  );

  if (isLoading) {
    return (
      <section
        ref={sectionRef}
        id="testimonials"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-dots opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-mesh opacity-30"
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
          {sectionHeader}
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section
        ref={sectionRef}
        id="testimonials"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-dots opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-mesh opacity-30"
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
          {sectionHeader}
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 bg-mesh opacity-30" aria-hidden="true" />

      {/* Section header inside container */}
      <div className="container mx-auto px-4 relative z-10">
        {sectionHeader}
      </div>

      {/* Testimonials content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }
        }
        className="relative z-10"
      >
        {useMarquee ? (
          <>
            {/* Gradient fade edges */}
            <div
              className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"
              aria-hidden="true"
            />

            <div className="space-y-6">
              <MarqueeRow
                testimonials={row1}
                direction="left"
                speed={40}
                prefersReducedMotion={prefersReducedMotion}
              />
              {row2.length > 0 && (
                <MarqueeRow
                  testimonials={row2}
                  direction="right"
                  speed={45}
                  prefersReducedMotion={prefersReducedMotion}
                />
              )}
            </div>
          </>
        ) : (
          <StaticGrid testimonials={testimonials} />
        )}
      </motion.div>
    </section>
  );
}
