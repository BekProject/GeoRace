import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useStateContext } from "../context";
import { auth } from "../firebase";

export default function SidebarView({ country, skip }) {
  const { updateMenu, globeRef, score, highest, updateStats } =
    useStateContext();
  const [open, setOpen] = useState(true);

  return (
    <div
      className="absolute top-2 left-2 z-10 flex-col justify-between border-e border-zinc-900 bg-black bg-opacity-10  sidebar rounded-lg
     "
    >
      <div className="px-2 py-3 mt-2">
        <span className="grid w-full ml-5  text-left rounded-lg text-xl text-bold text-white">
          {country}
        </span>

        <nav aria-label="Main Nav" className="mt-2 flex flex-col space-y-1">
          <div className="flex">
            <a className="w-1/2 flex items-center gap-2 rounded-lg  px-4 py-2 text-white hover:bg-black">
              <span className="text-lg">✅ : {score}/178 </span>
            </a>

            <a className="w-1/2 flex items-center gap-2 rounded-lg  px-4 py-2 text-white hover:bg-black">
              <span className="text-lg font-medium"> 🔥 : {highest} </span>
            </a>
          </div>
          <div className="flex">
            <a
              href="#"
              className="w-1/2 flex items-center gap-2 rounded-lg  px-4 py-2 text-white hover:bg-black"
            >
              <span
                onClick={() => {
                  updateStats();
                  updateMenu(true);
                }}
                className="text-lg"
              >
                👈 Menu
              </span>
            </a>

            <a
              onClick={() => skip()}
              className="w-1/2 flex items-center gap-2 rounded-lg  px-4 py-2 text-white hover:bg-black"
            >
              <span className="text-lg"> ⏩ Skip </span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
