import { Accessor, createMemo } from "solid-js";
import { createQuery, http } from "../../lib/Query";

export * from "./components/DriversSelect";

export interface Driver {
  broadcastName: string;
  countryCode: string;
  driverNumber: number;
  firstName: string;
  fullName: string;
  headshotUrl: string;
  lastName: string;
  meetingKey: number;
  nameAcronym: string;
  sessionKey: number;
  teamColour: string;
  teamName: string;
}

export const useDrivers = ({
  sessionKey,
}: {
  sessionKey: Accessor<number>;
}) => {
  return createQuery(() => ({
    skip: !sessionKey(),
    queryKey: ["drivers", sessionKey()],
    queryFn: async () => {
      return http
        .get("drivers", {
          searchParams: {
            session_key: sessionKey(),
          },
        })
        .json<Driver[]>();
    },
  }));
};

export const useDriver = ({
  driverNumber,
  sessionKey,
}: {
  driverNumber: Accessor<number>;
  sessionKey: Accessor<number>;
}) => {
  const driver = createMemo(() => {
    const drivers = useDrivers({ sessionKey });
    return drivers.data?.find(
      (driver) => driver.driverNumber === driverNumber(),
    );
  });
  return driver;
};
