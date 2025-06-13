import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image width={50} height={50} src="/images/logo.png" alt="Epil.izh" />
      <p className="text-lg font-medium tracking-tight group-data-[collapsible=icon]:hidden">
        Epil.Izh
      </p>
    </div>
  );
}
