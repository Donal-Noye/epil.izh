import { CardContent } from "@/shared/ui/card";
import { Spinner } from "@/shared/ui/spinner";
import { Button } from "@/shared/ui/button";
import { SharedUser } from "@/kernel/domain/user";

export function UsersPreview({
  users,
  isLoading,
  onShowAll,
}: {
  users: SharedUser[];
  isLoading: boolean;
  onShowAll: () => void;
}) {
  return (
    <CardContent className="h-40 overflow-hidden">
      <div className="flex flex-col space-y-2 p-2">
        {isLoading ? (
          <Spinner className="mx-auto mt-10" />
        ) : (
          users.slice(0, 5).map((u) => <div key={u.id}>{u.name}</div>)
        )}
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-3 left-0 w-full flex justify-center">
        <Button
          size="sm"
          variant="secondary"
          className="z-10"
          onClick={onShowAll}
        >
          Показать всех
        </Button>
      </div>
    </CardContent>
  );
}
