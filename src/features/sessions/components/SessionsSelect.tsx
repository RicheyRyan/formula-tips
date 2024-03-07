import { Accessor, Component, For, Show } from "solid-js";
import { useSessions } from "..";
import { Select } from "../../flowbite";
import { useSearchParams } from "../../../lib/Search";

export const SessionsSelect: Component<{ meetingKey: Accessor<number> }> = (
  props,
) => {
  const sessions = useSessions({ meetingKey: props.meetingKey });

  const [searchParams, setSearchParam] = useSearchParams();

  return (
    <Select
      id="sessions-select"
      label="Select session"
      class="mb-3"
      onChange={(value) => {
        setSearchParam({ sessionKey: value, driverNumber: undefined });
      }}
    >
      <Show when={!searchParams().sessionKey}>
        <option selected={true}>Select session</option>
      </Show>
      <For each={sessions.data}>
        {(session) => (
          <option
            value={session.sessionKey}
            selected={searchParams().sessionKey === session.sessionKey}
          >
            {session.sessionName}
          </option>
        )}
      </For>
    </Select>
  );
};
