import { createQuery, http } from "../../lib/Query";
export * from "./components/SessionsSelect";

interface Session {
  circuitKey: number;
  circuitShortName: string;
  countryCode: string;
  countryKey: number;
  countryName: string;
  dateEnd: string;
  dateStart: string;
  gmtOffset: string;
  location: string;
  meetingKey: number;
  sessionKey: number;
  sessionName: string;
  sessionType: string;
  year: number;
}

export const useSessions = ({ meetingKey }: { meetingKey: () => number }) => {
  return createQuery(() => ({
    skip: !meetingKey(),
    queryKey: ["sessions", meetingKey()],
    queryFn: async () => {
      return http
        .get("sessions", {
          searchParams: { meeting_key: meetingKey() },
        })
        .json<Session[]>();
    },
  }));
};
