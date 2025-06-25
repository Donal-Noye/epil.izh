import { getUserRecordsAction } from "@/entities/record/actions/get-user-records";
import { UserId } from "@/kernel/domain/user";
import { createRecordAction } from "@/entities/record/actions/create-record";

const baseKey = "record";

export const getUserRecordsQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getUserRecords"],
  queryFn: () => getUserRecordsAction({ userId }),
});


export const createRecordQuery = () => ({
  queryKey: [baseKey, "createRecord"],
  queryFn: createRecordAction,
});
