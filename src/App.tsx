import "./App.css";
import "flowbite";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { QueryClientProvider } from "@tanstack/solid-query";
import { queryClient } from "./lib/Query";
import { MeetingsSelect } from "./features/meetings";
import { Topbar } from "./features/flowbite";
import { Show, onMount } from "solid-js";
import { SessionsSelect } from "./features/sessions";
import { Route, Router } from "@solidjs/router";
import { useSearchParams } from "./lib/Search";
import { DriversSelect } from "./features/drivers";
import { VersusChart } from "./features/versus";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      searchSync: string;
    }
  }
}

const Versus = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  onMount(() => {
    setSearchParam({ mode: "versus" });
  });

  return (
    <form class="max-w-xxl mx-auto px-14">
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <Topbar title="Formula Tips" />
      <Router>
        <Route path="" component={Versus} />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
