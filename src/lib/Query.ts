import { QueryClient } from "@tanstack/solid-query";
import ky from "ky";
import { camelCase } from "./Utils";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

export * from "@tanstack/solid-query";

export const API_BASE_V1 = "https://api.openf1.org/v1/";

const mapBody = (
  body:
    | Record<string, unknown>
    | URLSearchParams
    | Record<string, unknown>[]
    | URLSearchParams[],
  transformer: (key: string) => string,
) => {
  const convert = (obj: Record<string, unknown> | URLSearchParams) => {
    const newObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[transformer(key)] = value;
    }
    return newObj;
  };

  return Array.isArray(body)
    ? body.map((item) => convert(item))
    : convert(body);
};

const responseToCamelCase = async (
  _request: Request,
  _options: unknown,
  response: Response,
) => {
  try {
    const body = await response.json();
    return new Response(JSON.stringify(mapBody(body, camelCase)), response);
  } catch (e) {
    return;
  }
};

export const http = ky.create({
  prefixUrl: API_BASE_V1,
  hooks: {
    afterResponse: [responseToCamelCase],
  },
});
