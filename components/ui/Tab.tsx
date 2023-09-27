"use client";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
import { Tab as HeadlessTab } from "@headlessui/react";
import { ReactNode } from "react";
import { Text } from "./Text";

export const Group = HeadlessTab.Group;
export function Panel({ children }: { children: ReactNode }) {
  return (
    <HeadlessTab.Panel
      className={classNames(
        "rounded-xl bg-white p-3",
        "ring-white ring-opacity-60 ring-offset-2 ring-offset-brand-400 focus:outline-none focus:ring-2"
      )}
    >
      {children}
    </HeadlessTab.Panel>
  );
}
export function Panels({ children }: { children: ReactNode }) {
  return <HeadlessTab.Panels className="mt-2">{children}</HeadlessTab.Panels>;
}
export function List({ children }: { children: ReactNode }) {
  return (
    <HeadlessTab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
      {children}
    </HeadlessTab.List>
  );
}
export function Tab({ children }: { children: ReactNode }) {
  return (
    <HeadlessTab
      className={({ selected }) =>
        classNames(
          "w-full rounded-lg py-2.5",
          "ring-white ring-opacity-60 ring-offset-2 ring-offset-brand-400 focus:outline-none focus:ring-2",
          selected
            ? "bg-white text-brand-600 shadow"
            : "text-gray-600 hover:bg-white/[0.12] hover:text-brand-600"
        )
      }
    >
      <Text variant="large/normal">{children}</Text>
    </HeadlessTab>
  );
}
