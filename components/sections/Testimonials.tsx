"use client";

import Image from "next/image";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";
import { Star, Quote } from "lucide-react";
import jordanHeadshot from "@/components/images/Jordan in blue podcast 1 copy.png";
import arnelHeadshot from "@/components/images/Arnel headshot copy.jpeg";
import hayesLogo from "@/components/images/Hayes Logo.png";
import loudfaceLogo from "@/components/images/Loudface Logo.png";

const testimonials = [
  {
    quote:
      "Running a 23-person remote marketing agency, losing key people has quietly cost us $100,000's in lost momentum and client disruption. Before Yander, I had no reliable way to see burnout or disengagement until it was too late. Now we have a clear view of engagement and workload for every person, and we've already prevented costly resignations and client issues as a result.",
    name: "Jordan Hayes",
    title: "Founder & CEO",
    company: "Hayes Media",
    companyLogo: hayesLogo,
    logoClassName: "h-6 w-auto",
    image: jordanHeadshot,
  },
  {
    quote:
      "Working with brands like Montblanc and Radisson, I can't afford blind spots in my team. With everyone remote, it used to be almost impossible to know who was engaged, collaborating well, or quietly burning out behind the scenes. Yander gives me the insights to keep my team performing at the level our clients expect and to step in early when something's off, instead of finding out when it's too late.",
    name: "Arnel Bukva",
    title: "Founder & CEO",
    company: "Loudface",
    companyLogo: loudfaceLogo,
    logoClassName: "h-4 w-auto",
    image: arnelHeadshot,
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-[#fafafa] border-y border-[#e5e5e5] relative">
      {/* Peec.ai signature gradient overlay */}
      <div className="absolute inset-0 bg-peec-gradient-subtle pointer-events-none" />
      <Container>
        <AnimatedSection className="text-center mb-14">
          <SectionLabel number="04" centered>Testimonials</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 max-w-2xl mx-auto">
            Trusted By Leaders Who Know Winning Starts With Their Team
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <div className="bg-white rounded-[12px] p-6 border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-150 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <StarRating />
                  <Quote className="w-5 h-5 text-gray-200" />
                </div>
                <blockquote className="text-sm text-gray-600 leading-relaxed flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-[#e5e5e5] flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.title}</p>
                  </div>
                  {"companyLogo" in testimonial && testimonial.companyLogo ? (
                    <Image
                      src={testimonial.companyLogo}
                      alt={testimonial.company}
                      className={"logoClassName" in testimonial ? testimonial.logoClassName : "h-5 w-auto"}
                    />
                  ) : (
                    <span className="text-xs font-medium text-gray-400">
                      {testimonial.company}
                    </span>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
