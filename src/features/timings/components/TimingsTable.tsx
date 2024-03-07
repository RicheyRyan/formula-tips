import { Accessor, Component } from "solid-js";

export const TimingsTable: Component<{
  sessionKey: Accessor<number>;
  driverNumber: Accessor<number[]>;
}> = () => {
  return <div>TimingsTable</div>;
};
