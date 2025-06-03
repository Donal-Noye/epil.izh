import { MapPinned, Phone } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="container px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-10">
        <div className="flex flex-col lg:flex-row items-start gap-3 sm:gap-6">
          <iframe
            id="map_983527677"
            frameBorder="0"
            width="300px"
            height="300px"
            src="https://makemap.2gis.ru/widget?data=eJw1js1uhDAMhN_FvaJVICQEHqBVb3urtNUeKHjbSAFHwSvtFvHuNT_1yfKMZ74ZKPWYsH9DGpCTxwmazxn4GREaeMWW7wkhg5goYuJNn6GjQEn0l9tNfSklOnsO64esPU5d8pE9jfvh933s8QFNrv5nyeB7L3yucUfbmfzI4u9IoPzY8gZj9KlQus5dZuzJWWMqe5V_30NT1mq5ZjC08UyT3wtnCC1Dc3hdbXVdOVO4DMIqH2nWlIUp61xrwSMaBK6SUAGnED5-EMNlu3K64_IHHlBZlQ"
            sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          ></iframe>

          <div className="grid gap-2">
            <a
              className="text-sm md:text-base lg:text-xl text-muted-foreground hover:underline flex items-center gap-3"
              target="_blank"
              href="https://2gis.ru/izhevsk/firm/70000001060681476"
            >
              <MapPinned width={22} height={22} />
              Улица им. Вадима Сивкова, 273
            </a>
            <a
              href="tel:+79991894025"
              className="text-sm md:text-base lg:text-xl text-muted-foreground hover:underline flex items-center gap-3"
            >
              <Phone width={22} height={22} />
              +7 (999) 189-40-25
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xl text-muted-foreground">Связаться с нами:</p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="size-16 text-muted-foreground hover:text-primary"
            >
              <a
                href="https://api.whatsapp.com/send/?phone=79991894025&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%0A%0A%D0%9F%D0%B8%D1%88%D1%83+%D0%B8%D0%B7+%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F+2%D0%93%D0%98%D0%A1.%0A%0A&type=phone_number&app_absent=0"
                target="_blank"
                aria-label="WhatsApp"
              >
                <Image
                  width={52}
                  height={52}
                  src="/images/whatsapp.svg"
                  alt="WhatsApp"
                />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="size-16 text-muted-foreground hover:text-primary"
            >
              <a
                href="https://t.me/epilizh"
                target="_blank"
                aria-label="Telegram"
              >
                <Image
                  width={42}
                  height={42}
                  src="/images/telegram.svg"
                  alt="Telegram"
                />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="size-16 text-muted-foreground hover:text-primary"
            >
              <a
                href="https://vk.com/epilizhevsk"
                target="_blank"
                aria-label="Vk"
              >
                <Image
                  width={42}
                  height={42}
                  src="/images/vk.svg"
                  alt="Vk"
                />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Epil.Izh. Все права защищены.
      </p>
    </footer>
  );
}
