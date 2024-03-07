import { Component } from "solid-js";

export const Topbar: Component<{ title: string }> = (props) => {
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {props.title}
          </span>
        </a>
      </div>
    </nav>
  );
};
