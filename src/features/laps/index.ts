import { Accessor } from "solid-js";
import { createQuery, http } from "../../lib/Query";

export interface Lap {
  dateStart: string;
  driverNumber: number;
  durationSector1: number;
  durationSector2: number;
  durationSector3: number;
  i1Speed: number;
  i2Speed: number;
  isPitOutLap: boolean;
  lapDuration: number;
  lapNumber: number;
  meetingKey: number;
  segmentsSector1: number[];
  segmentsSector2: number[];
  segmentsSector3: number[];
  sessionKey: number;
  stSpeed: number;
}

export const useLaps = ({
  sessionKey,
  driverNumber,
}: {
  sessionKey: Accessor<number>;
  driverNumber: Accessor<number>;
}) => {
  return createQuery(() => ({
    skip: !sessionKey || !driverNumber,
    queryKey: ["laps", sessionKey(), driverNumber()],
    queryFn: async () => {
      return http
        .get("laps", {
          searchParams: {
            session_key: sessionKey(),
            driver_number: driverNumber(),
          },
        })
        .json<Lap[]>();
    },
  }));
};
