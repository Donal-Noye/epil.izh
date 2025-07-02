import { getSpecialistAction } from "@/entities/specialist/actions/get-specialist";
import { getSpecialistListAction } from "@/entities/specialist/actions/get-specialist-list";
import { removeSpecialistAction } from "@/entities/specialist/actions/remove-specialist";

const baseKey = "specialist";

export const getSpecialistQuery = (id: string) => ({
  queryKey: [baseKey, "getSpecialistById", id],
  queryFn: () => getSpecialistAction({ id }),
});

export const getSpecialistListQuery = () => ({
  queryKey: [baseKey, "getSpecialistList"],
  queryFn: getSpecialistListAction,
});

export const removeSpecialistQuery = (specialistId: string) => ({
  queryKey: [baseKey, "removeSpecialist", specialistId],
  queryFn: () => removeSpecialistAction({ specialistId }),
});
