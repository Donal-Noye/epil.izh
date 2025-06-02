import Image from "next/image";
import { Button } from "@/shared/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden h-screen bg-[#977a6c]">
      <div className="absolute inset-0 w-full sm:h-full">
        <Image
          src="/images/hero.jpg"
          alt="Hero"
          fill
          className="object-cover"

        />
      </div>
      <div className="absolute bottom-10 w-full flex justify-center items-center flex-col">
        <h1 className="scroll-m-20 mb-10 text-center text-[14vw] font-extrabold -tracking-wider leading-[.8] text-balance text-white">
          Лазерная эпиляция
        </h1>
        <Button size="lg" className="h-10 px-6 text-lg">Записаться</Button>
      </div>
    </section>
  );
}
