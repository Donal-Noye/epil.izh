import { getUserRecordsAction } from "@/entities/record/actions/get-user-records";
import { UserId } from "@/kernel/domain/user";
import { createRecordAction } from "@/entities/record/actions/create-record";
import { getAllRecordsAction } from "@/entities/record/actions/get-all-records";

const baseKey = "record";

export const getUserRecordsQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getUserRecords"],
  queryFn: () => getUserRecordsAction({ userId }),
});

export const getAllRecordsQuery = () => ({
  queryKey: [baseKey, "getAllRecords"],
  queryFn: getAllRecordsAction,
});

export const createRecordQuery = () => ({
  queryKey: [baseKey, "createRecord"],
  queryFn: createRecordAction,
});
