'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';

export function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      ref={ref}
      className="relative sm:overflow-hidden h-svh bg-[#977a6c]"
    >
      <div className="absolute inset-0 w-full sm:h-full">
        <Image
          src="/images/hero.jpg"
          alt="Hero"
          priority
          className="w-full h-full object-cover will-change-transform"
          sizes="100vw"
          fill={false}
          width={1920}
          height={1080}
        />
      </div>

      <motion.div
        style={{ y }}
        className="absolute bottom-20 sm:bottom-10 w-full flex justify-center items-center flex-col"
      >
        <h1 className="scroll-m-20 mb-10 text-center text-[20vw] sm:text-[14vw] font-extrabold -tracking-wider leading-[.8] text-balance text-white">
          Лазерная эпиляция
        </h1>
        <Button size="lg" className="h-10 px-6 text-lg">
          Записаться
        </Button>
      </motion.div>
    </section>
  );
}
