import { ParentComponent } from "solid-js";

export const Select: ParentComponent<
  {
    label: string;
    id: string;
    class?: string;
  } & (
    | {
        onChange?: (value: string[]) => void;
        size?: number;
        multiple: true;
      }
    | {
        onChange?: (value: string) => void;
        multiple?: false;
        size?: never;
      }
  )
> = (props) => {
  return (
    <fieldset class={props.class}>
      <label
        for={props.id}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <select
        id={props.id}
        name={props.id}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        multiple={props.multiple}
        size={props.size}
        onChange={(e) => {
          const target = e.target;

          if (props.multiple) {
            const values = [...target.getElementsByTagName("option")]
              .filter((opt) => opt.selected)
              .map((opt) => opt.value);

            if (props.onChange) props.onChange(values);
          } else {
            const value = target.value;
            if (props.onChange) props.onChange(value);
          }
        }}
      >
        {props.children}
      </select>
    </fieldset>
  );
};
