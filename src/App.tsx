import "./App.css";
import "flowbite";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { QueryClientProvider } from "@tanstack/solid-query";
import { queryClient } from "./lib/Query";
import { Topbar } from "./features/flowbite";
import { ParentComponent } from "solid-js";
import { A, Route, Router, useMatch } from "@solidjs/router";
import { Versus } from "./routes/Versus";
import { Timings } from "./routes/Timings";

const NavbarLink: ParentComponent<{
  href: string;
  position: "start" | "middle" | "end";
}> = (props) => {
  const match = useMatch(() => props.href);
  const current = () => match()?.path === "href";
  return (
    <A
      href={props.href}
      {...(current() ? { "aria-current": "page" } : {})}
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
      activeClass="bg-grey-100 text-blue-700"
      classList={{
        "rounded-s-lg dark:hover:bg-gray-700": props.position === "start",
        "border-t border-b": props.position === "middle",
        "rounded-e-lg": props.position === "end",
      }}
    >
      {props.children}
    </A>
  );
};

const Navbar = () => {
  return (
    <nav class="max-w-screen-xl mx-auto px-4 pb-4">
      <div class="inline-flex rounded-md shadow-sm">
        <NavbarLink position="start" href="/versus">
          Versus
        </NavbarLink>
        <NavbarLink position="end" href="/timings">
          Timings
        </NavbarLink>
      </div>
    </nav>
  );
};

const Layout: ParentComponent = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

function App() {
  if (window.location.pathname === "/") {
    window.history.replaceState({}, "", "/versus");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <Topbar title="Grand Prix Laps" />
      <Router>
        <Route path="/" component={Layout}>
          <Route path="/versus" component={Versus} />
          <Route path="/timings" component={Timings} />
        </Route>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
