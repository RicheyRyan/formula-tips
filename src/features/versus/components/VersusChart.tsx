import { Chart, Title, Legend, Colors, Tooltip } from "chart.js";
import { Line } from "solid-chartjs";
import { Accessor, Component, createMemo, onMount } from "solid-js";
import { useLaps } from "../../laps";
import { useDriver } from "../../drivers";
import { range } from "../../../lib/Utils";
import { useStints } from "../../stints";

export const VersusChart: Component<{
  sessionKey: Accessor<number>;
  driverNumber: Accessor<number[]>;
}> = (props) => {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  });

  const chartData = createMemo(() => {
    const drivers = props.driverNumber().map((number) => () => ({
      info: useDriver({
        driverNumber: () => number,
        sessionKey: props.sessionKey,
      }),
      laps: () =>
        useLaps({
          sessionKey: props.sessionKey,
          driverNumber: () => number,
        }),
      stints: () =>
        useStints({ sessionKey: props.sessionKey, driverNumber: () => number }),
    }));

    const totalLaps = [];

    for (const driver of drivers) {
      const laps = driver().laps;
      const lapData = laps()?.data;
      if (lapData) {
        totalLaps.push(lapData);
      }
    }

    const lapsRange = range(
      1,
      totalLaps.sort((a = [], b = []) => a.length - b.length)[0]?.length ?? 0,
    );

    return {
      labels: lapsRange,
      datasets: drivers.map((driver) => {
        const info = driver().info;
        const laps = driver().laps;
        return {
          label: info()?.fullName,
          data: laps()?.data?.map((lap) => lap.lapDuration),
        };
      }),
    };
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Lap number",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Lap time (s)",
        },
      },
    },
  };

  return (
    <div>
      <Line
        data={chartData()}
        options={chartOptions}
        width={1000}
        height={500}
      />
    </div>
  );
};
