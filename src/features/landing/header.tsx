"use client"

import { MapPinned, Phone } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/shared/ui/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 640) {
        setScrolled(false);
        return;
      }
      setScrolled(window.scrollY > window.innerHeight - 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className="fixed left-0 z-10 w-full flex justify-center p-4 sm:px-8 pointer-events-none">
      <div className="w-full max-w-screen-xl flex items-center justify-between rounded-3xl p-4 sm:px-6 sm:py-3 backdrop-blur-sm sm:backdrop-blur-none">
        <div className="flex items-center gap-4">
          <Image
            className="w-13 h-13 sm:w-[70px] sm:h-[70px]"
            width={70}
            height={70}
            src="/images/logo.png"
            alt=""
            unoptimized
          />
          <p
            className={cn(
              "hidden sm:block text-2xl sm:text-3xl lg:text-4xl font-extrabold transition-colors duration-300",
              scrolled ? "text-black" : "text-white",
            )}
          >
            Epil.Izh
          </p>
        </div>

        <div className="flex sm:flex-col md:flex-row items-center sm:items-end md:items-center gap-2 sm:gap-4 pointer-events-auto sm:backdrop-blur-md rounded-3xl sm:p-4">
          <div className="flex flex-col items-end">
            <a
              className={cn(
                "text-sm md:text-base lg:text-lg text-neutral-200 hover:underline hidden sm:flex items-center gap-2",
                scrolled && "text-black"
              )}
              target="_blank"
              href="https://2gis.ru/izhevsk/firm/70000001060681476"
            >
              <MapPinned width={18} height={18} />
              Улица им. Вадима Сивкова, 273
            </a>
            <a
              href="tel:+79991894025"
              className={cn(
                "text-sm md:text-base lg:text-lg text-neutral-200 hover:underline hidden sm:flex items-center gap-2",
                scrolled && "text-black"
              )}
            >
              <Phone width={18} height={18} />
              +7 (999) 189-40-25
            </a>
          </div>
          <div className="flex items-center gap-2 sm:hidden">
            <Button variant="outline" asChild size="icon">
              <a
                className="text-sm md:text-base lg:text-lg hover:underline hidden sm:flex items-center gap-2"
                target="_blank"
                href="https://2gis.ru/izhevsk/firm/70000001060681476"
              >
                <MapPinned width={18} height={18} />
              </a>
            </Button>
            <Button variant="outline" asChild size="icon">
              <a
                href="tel:+79991894025"
                className="text-sm md:text-base lg:text-lg hover:underline hidden sm:flex items-center gap-2"
              >
                <Phone width={18} height={18} />
              </a>
            </Button>
          </div>
          <Button variant="secondary" className="text-base" size="lg">
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
}
