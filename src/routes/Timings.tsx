import { Show } from "solid-js";
import { MeetingsSelect } from "../features/meetings";
import { SessionsSelect } from "../features/sessions";
import { useSearchParams } from "../lib/Search";
import { TimingsTable } from "../features/timings";

export const Timings = () => {
  const [searchParams] = useSearchParams();
  return (
    <form class="max-w-screen-xl mx-auto px-4 pb-4">
      <MeetingsSelect />
      <Show when={searchParams().meetingKey}>
        <SessionsSelect meetingKey={() => searchParams().meetingKey!} />
      </Show>
      <Show when={searchParams().sessionKey && searchParams().meetingKey}>
        <TimingsTable sessionKey={() => searchParams().sessionKey!} />
      </Show>
    </form>
  );
};
