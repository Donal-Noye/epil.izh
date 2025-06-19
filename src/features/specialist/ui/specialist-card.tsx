import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import Image from "next/image";
import { Button } from "@/shared/ui/button";

export function SpecialistCard({
  name,
  image,
  bio,
  position,
}: {
  name?: string | null;
  image?: string | null;
  bio?: string | null;
  position?: string | null;
}) {
  return (
    <Card className="grid">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
        <Image
          className="rounded-full"
          width={80}
          height={80}
          src={image as string}
          alt={name ?? "Специалист"}
          unoptimized={true}
        />
        <div className="grid gap-1">
          <CardTitle>{name}</CardTitle>
          <CardDescription className="">{position}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="">{bio}</p>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full" variant="outline">
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
}
