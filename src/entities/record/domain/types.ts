export type RecordStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

export const RECORD_STATUS: Record<RecordStatus, RecordStatus> = {
  SCHEDULED: "SCHEDULED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  NO_SHOW: "NO_SHOW",
};

export interface RecordEntity {
  id: string;
  userId: string;
  specialistId: string;
  serviceId: string;
  date: Date;
  status: RecordStatus;
  notes?: string | null;
  createdAt: Date;
}
