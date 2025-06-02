import { MapPinned, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="container px-6 py-4">
      <div className="flex flex-col">
        <a
          className="text-xs sm:text-sm md:text-base lg:text-lg hover:underline text-muted-foreground flex items-center gap-2"
          target="_blank"
          href="https://2gis.ru/izhevsk/firm/70000001060681476"
        >
          <MapPinned width={18} height={18} />
          Улица им. Вадима Сивкова, 273
        </a>
        <a
          href="tel:+79991894025"
          className="text-xs sm:text-sm md:text-base lg:text-lg hover:underline text-muted-foreground flex items-center gap-2"
        >
          <Phone width={18} height={18} />
          +7 (999) 189-40-25
        </a>
      </div>
    </footer>
  )
}