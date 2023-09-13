"use client";
import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Text } from "./ui/Text";
import { User } from "@prisma/client";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Divider from "./ui/Divider";

export default function ComboBox({ data }: { data: User[] }) {
  const [selectedPerson, setSelectedPerson] = useState<User>();
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? data
      : data.filter((person) => {
          return person.username.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="flex flex-col gap-4">
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <div className="relative">
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>

        <Combobox.Options className="rounded overflow-hidden mt-1">
          {filteredPeople.map((person) => (
            <Combobox.Option
              key={person.id}
              value={person}
              className="border w-full flex items-center hover:bg-blue-200 cursor-pointer"
            >
              <button
                className="w-full flex items-center hover:bg-blue-200 cursor-pointer"
                // onClick={onClick}
              >
                <div className="w-14 h-14 min-w-[3.5rem] flex">
                  <img
                    src={person.imageUrl}
                    alt={person.username}
                    className="flex-grow object-cover"
                  />
                </div>
                <Text variant="small/light">
                  <h2 className="p-2 text-left overflow-hidden text-ellipsis whitespace-nowrap w-full">
                    {person.username}
                  </h2>
                </Text>
              </button>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      {selectedPerson && (
        <div>
          {" "}
          <Divider className="pb-1">
            <Text variant="medium/light">Selected User</Text>
          </Divider>
          <div
            className="w-full flex items-center flex-grow border rounded overflow-hidden"
            // onClick={onClick}
          >
            <div className="w-14 h-14 min-w-[3.5rem] flex">
              <img
                src={selectedPerson.imageUrl}
                alt={selectedPerson.username}
                className="flex-grow object-cover"
              />
            </div>

            <Text variant="small/light">
              <h2 className="p-2 overflow-hidden text-ellipsis whitespace-nowrap w-full">
                {selectedPerson.username}
              </h2>
            </Text>
          </div>
        </div>
      )}
    </div>
  );
}
