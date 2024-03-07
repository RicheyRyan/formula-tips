import { createQuery, http } from "../../lib/Query";
export * from "./components/MeetingsSelect";

interface Meeting {
  circuitKey: number;
  circuitShort_name: string;
  countryCode: string;
  countryKey: number;
  countryName: string;
  dateStart: string;
  gmtOffset: string;
  location: string;
  meetingKey: number;
  meetingName: string;
  meetingOfficialName: string;
  year: number;
}

export const useMeetings = () => {
  return createQuery(() => ({
    queryKey: ["meetings"],
    queryFn: async () => {
      return http.get("meetings").json<Meeting[]>();
    },
  }));
};
