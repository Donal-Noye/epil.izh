import { getServiceListAction } from "@/entities/service/actions/get-service-list";
import { getServiceAction } from "@/entities/service/actions/get-service";

const baseKey = "service";

// export const getSpecialistQuery = (id: string) => ({
//   queryKey: [baseKey, "getSpecialistById", id],
//   queryFn: () => getSpecialistAction({ id }),
// });

export const getServiceListQuery = () => ({
  queryKey: [baseKey, "getServiceList"],
  queryFn: () => getServiceListAction(),
});

export const getServiceQuery = ({ serviceId }: { serviceId: string }) => ({
  queryKey: [baseKey, "getService"],
  queryFn: () => getServiceAction({ serviceId }),
});
