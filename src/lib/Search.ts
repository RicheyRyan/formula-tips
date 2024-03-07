import { useSearchParams as useSearch } from "@solidjs/router";

export type SearchParams = {
  meetingKey?: string;
  sessionKey?: string;
  driverNumber?: string;
  mode?: "versus";
};

export const useSearchParams = () => {
  const [params, setParams] = useSearch<SearchParams>();

  return [
    () => ({
      meetingKey: params.meetingKey ? Number(params.meetingKey) : undefined,
      sessionKey: params.sessionKey ? Number(params.sessionKey) : undefined,
      driverNumber: params.driverNumber
        ? decodeURIComponent(params.driverNumber).split(",").map(Number)
        : undefined,
      mode: "versus",
    }),
    (newParams: SearchParams) => setParams(newParams),
  ] as const;
};
