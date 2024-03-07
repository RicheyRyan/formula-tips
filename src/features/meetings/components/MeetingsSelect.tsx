import { For, Show } from "solid-js";
import { useMeetings } from "..";
import { Select } from "../../flowbite";
import { useSearchParams } from "../../../lib/Search";

export const MeetingsSelect = () => {
  const meetings = useMeetings();

  const [searchParams, setSearchParam] = useSearchParams();

  return (
    <Select
      id="meetings-select"
      label="Select meeting"
      class="mb-3"
      onChange={(value) => {
        setSearchParam({
          meetingKey: value,
          driverNumber: undefined,
          sessionKey: undefined,
        });
      }}
    >
      <Show when={!searchParams().meetingKey}>
        <option selected={true}>Select meeting</option>
      </Show>
      <For each={meetings.data}>
        {(meeting) => (
          <option
            value={meeting.meetingKey}
            selected={searchParams().meetingKey === meeting.meetingKey}
          >
            {meeting.meetingName} - {meeting.year}
          </option>
        )}
      </For>
    </Select>
  );
};
