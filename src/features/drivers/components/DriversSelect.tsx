import { Component, For, Show } from "solid-js";
import { useDrivers } from "..";
import { Select } from "../../flowbite";
import { useSearchParams } from "../../../lib/Search";

/**
 * We know there 10 teams and therefore 20 drivers
 * Maybe some day Andretti :'(
 */
const numDrivers = 20;

export const DriversSelect: Component<{
  sessionKey: () => number;
}> = (props) => {
  const drivers = useDrivers({
    sessionKey: props.sessionKey,
  });

  const [searchParams, setSearchParam] = useSearchParams();

  return (
    <Select
      id="drivers-select"
      label="Select driver"
      class="mb-3"
      multiple
      size={drivers.data?.length ?? numDrivers}
      onChange={(value) => {
        setSearchParam({ driverNumber: value.join(",") });
      }}
    >
      <Show when={!searchParams().driverNumber}>
        <option selected={true}>Select driver</option>
      </Show>
      <For each={drivers.data}>
        {(driver) => (
          <option
            value={driver.driverNumber}
            selected={searchParams().driverNumber?.includes(
              driver.driverNumber,
            )}
          >
            {driver.fullName}
          </option>
        )}
      </For>
    </Select>
  );
};
