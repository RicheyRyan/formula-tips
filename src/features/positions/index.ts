import { Accessor } from "solid-js";
import { createQuery, http } from "../../lib/Query";

export interface Position {
  date: string;
  driverNumber: number;
  meetingKey: number;
  position: number;
  sessionKey: number;
}

export const usePositions = ({
  sessionKey,
}: {
  sessionKey: Accessor<number>;
}) => {
  return createQuery(() => ({
    skip: !sessionKey,
    queryKey: ["position", sessionKey()],
    queryFn: async () => {
      return http
        .get("position", {
          searchParams: {
            session_key: sessionKey(),
          },
        })
        .json<Position[]>();
    },
  }));
};
