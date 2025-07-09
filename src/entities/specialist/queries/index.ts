import { getSpecialistAction } from "@/entities/specialist/actions/get-specialist";
import { getSpecialistListAction } from "@/entities/specialist/actions/get-specialist-list";

const baseKey = "specialist";

export const getSpecialistQuery = (id: string) => ({
  queryKey: [baseKey, "getSpecialistById", id],
  queryFn: () => getSpecialistAction({ id }),
});

export const getSpecialistListQuery = () => ({
  queryKey: [baseKey, "getSpecialistList"],
  queryFn: getSpecialistListAction,
});