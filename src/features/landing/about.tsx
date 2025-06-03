'use client';

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="container py-20 sm:py-28 space-y-10">
      <motion.p
        className="text-center text-2xl sm:text-3xl md:text-[3vw] max-w-4xl mx-auto leading-none"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Лазерная эпиляция на сегодняшний день — это один из самых быстрых и
        действенных способов убрать лишние волосы на долгий срок.
      </motion.p>

      <motion.p
        className="text-center text-2xl sm:text-3xl md:text-[3vw] max-w-4xl mx-auto leading-none"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Электроэпиляция — удаление волос{" "}
        <span className="relative inline-block">
          НАВСЕГДА
          <motion.span
            className="absolute inset-0 bg-primary/30 z-[-1]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: .8, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              transformOrigin: "left",
            }}
          />
        </span>
        . Наши мастера имеют медицинское образование.
      </motion.p>
    </section>
  );
}
