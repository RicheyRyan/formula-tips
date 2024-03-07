import { Show } from "solid-js";
import { DriversSelect } from "../features/drivers";
import { MeetingsSelect } from "../features/meetings";
import { SessionsSelect } from "../features/sessions";
import { VersusChart } from "../features/versus";
import { useSearchParams } from "../lib/Search";

export const Versus = () => {
  const [searchParams] = useSearchParams();
  return (
    <form class="max-w-screen-xl mx-auto px-4 pb-4">
      <MeetingsSelect />
      <Show when={searchParams().meetingKey}>
        <SessionsSelect meetingKey={() => searchParams().meetingKey!} />
      </Show>
      <Show when={searchParams().sessionKey && searchParams().meetingKey}>
        <DriversSelect sessionKey={() => searchParams().sessionKey!} />
      </Show>
      <Show
        when={
          searchParams().sessionKey &&
          searchParams().meetingKey &&
          searchParams().driverNumber
        }
      >
        <VersusChart
          sessionKey={() => searchParams().sessionKey!}
          driverNumber={() => searchParams().driverNumber!}
        />
      </Show>
    </form>
  );
};
