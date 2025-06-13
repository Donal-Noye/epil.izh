import { Separator } from "@/shared/ui/separator";

export default async function NewUserPage() {

  return (
    <main className="space-y-6 py-14 container max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Последний шаг</h3>
        <p className="text-sm text-muted-foreground">
          Ведь даже лазер любит знать, для кого он работает!
        </p>
      </div>
      <Separator />
    </main>
  );
}