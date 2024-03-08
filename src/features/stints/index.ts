import { Accessor } from "solid-js";
import { createQuery, http } from "../../lib/Query";

export interface Stint {
  compound: "SOFT" | "MEDIUM" | "HARD";
  driverNumber: number;
  lapEnd: number;
  lapStart: number;
  meetingKey: number;
  sessionKey: number;
  stintNumber: number;
  tyreAgeAtStart: number;
}

export const useStints = ({
  sessionKey,
  driverNumber,
}: {
  sessionKey: Accessor<number>;
  driverNumber: Accessor<number>;
}) => {
  return createQuery(() => ({
    skip: !sessionKey || !driverNumber,
    queryKey: ["stints", sessionKey(), driverNumber()],
    queryFn: async () => {
      return http
        .get("stints", {
          searchParams: {
            session_key: sessionKey(),
            driver_number: driverNumber(),
          },
        })
        .json<Stint[]>();
    },
  }));
};
