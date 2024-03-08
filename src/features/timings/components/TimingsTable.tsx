import { Accessor, Component, For } from "solid-js";

const columns = ["Driver", "Start position", "End position", "Best lap time"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DriverRow: Component<{
  driver: string;
  driverImage: string;
  startPosition: number;
  endPosition: number;
  bestLapTime: number;
}> = (props) => {
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          class="w-10 h-10 rounded-full"
          src={props.driverImage}
          alt={props.driver}
        />
        <div class="ps-3">
          <div class="text-base font-semibold">{props.driver}</div>
        </div>
      </th>
      <td class="px-6 py-4">{props.startPosition}</td>
      <td class="px-6 py-4">{props.endPosition}</td>
      <td class="px-6 py-4">{props.bestLapTime}</td>
    </tr>
  );
};

export const TimingsTable: Component<{
  sessionKey: Accessor<number>;
}> = () => {
  //   usePositions({ sessionKey: props.sessionKey });
  return (
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <For each={columns}>{(column) => <th class="p-4">{column}</th>}</For>
        </tr>
      </thead>
      <tbody>
        {/* <For each={drivers}>
          {(driver) => (
            <DriverRow
              driver={driver.driver}
              driverImage={driver.driverImage}
              startPosition={driver.startPosition}
              endPosition={driver.endPosition}
              bestLapTime={driver.bestLapTime}
            />
          )}
        </For> */}
      </tbody>
    </table>
  );
};
