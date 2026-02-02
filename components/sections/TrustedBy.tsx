"use client";

import Image from "next/image";
import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";

const companies = [
  { name: "Dimer Health", logo: "/logos/imgi_8_Frame_277132765_1765364669731-3olcNXaP.png" },
  { name: "Viaduct", logo: "/logos/imgi_9_Layer_1_1765364669731-CXFrdHhN.png" },
  { name: "Eraser", logo: "/logos/imgi_10_Eraser_idS7vosxyg_1_1_1765364669732-BkOMPqIq.png" },
  { name: "Liqid", logo: "/logos/imgi_11_LIQID_idalCP1jMO_1_1_1765364669732-RqQKDu9T.png" },
  { name: "Seamless.AI", logo: "/logos/imgi_12_Seamless_AI_Logo_1_1765364669732-CEQ3A-Wa.png" },
  { name: "Radisson Hotels", logo: "/logos/imgi_13_Radisson_Hotel_idRe5QavwV_0_1_1765364669732-R3ZAbgZj.png" },
  { name: "Montblanc", logo: "/logos/imgi_14_Montblanc_1765364669732-CO9W13yj.png" },
  { name: "MindLabPro", logo: "/logos/imgi_15_mindlablogo_(1)_1765364669732-D_nZU-aU.png" },
  { name: "Lokai", logo: "/logos/imgi_16_Lokai_Black_Logo_(1)_(1)_1765364669733-C8tLLeDZ.png" },
];

export function TrustedBy() {
  return (
    <section className="py-10 md:py-12 border-y border-[#E4E7EC] bg-gray-50/30">
      <Container>
        <AnimatedSection>
          <p className="text-center text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-6">
            Trusted by the teams behind
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-10">
            {companies.map((company) => (
              <div
                key={company.name}
                className="opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={120}
                  height={24}
                  className="h-4 md:h-5 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
