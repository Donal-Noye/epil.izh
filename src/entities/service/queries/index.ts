import { getServiceListAction } from "@/entities/service/actions/get-service-list";

const baseKey = "service";

// export const getSpecialistQuery = (id: string) => ({
//   queryKey: [baseKey, "getSpecialistById", id],
//   queryFn: () => getSpecialistAction({ id }),
// });

export const getServiceListQuery = () => ({
  queryKey: [baseKey, "getServiceList"],
  queryFn: () => getServiceListAction(),
});
