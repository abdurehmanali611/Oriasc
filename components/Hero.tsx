"use client";
import { Hero as HeroData } from "@/constants";
import Image from "next/image";
import { useLayoutEffect } from "react";

interface HeroProps {
  title?: string;
}

export default function Hero({ title }: HeroProps) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const activeHeroes =
    HeroData && HeroData.length > 0
      ? HeroData.filter((hero: any) => {
          if (!hero.startDate || !hero.endDate) return false;

          const parseYYYYMMDD = (dateStr: any) => {
            if (dateStr instanceof Date) return dateStr;

            const parts = dateStr.split("-");
            if (parts.length === 3) {
              const year = parseInt(parts[0], 10);
              const month = parseInt(parts[1], 10) - 1;
              const day = parseInt(parts[2], 10);
              return new Date(year, month, day);
            }

            return new Date(dateStr);
          };

          const startDate = parseYYYYMMDD(hero.startDate);
          const endDate = parseYYYYMMDD(hero.endDate);

          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);

          return currentDate >= startDate && currentDate <= endDate;
        })
      : [];

  useLayoutEffect(() => {
    activeHeroes;
  });

  const activeHero = activeHeroes.length > 0 ? activeHeroes[0] : null;

  if (!activeHero) {
    return (
      <div
        className="w-full py-20 flex items-center justify-center h-screen"
        style={{
          backgroundImage: 'url("/assets/hero.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{title || "Welcome"}</h1>
          <p className="text-xl">Stay tuned for updates!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 md:py-20 bg-gray-50 h-screen xl:h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activeHero.ImageUrl || "/assets/hero-1.jpg"}
                alt={activeHero.Title || "Hero Image"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 text-gray-900">
              {activeHero.Title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed">
              {activeHero.Body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
