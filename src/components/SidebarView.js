import { useStateContext } from "../context";

export default function SidebarView({ country, skip }) {
  const { updateMenu, score, highest, updateStats } = useStateContext();

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
            <h2 className="w-1/2 flex items-center gap-2 rounded-lg  px-4 py-2 text-white hover:bg-black">
              <span className="text-lg">✅ : {score}/178 </span>
            </h2>

            <h2 className="w-1/2 flex items-center gap-2 rounded-lg  px-4 py-2 text-white hover:bg-black">
              <span className="text-lg font-medium"> 🔥 : {highest} </span>
            </h2>
          </div>
          <div className="flex">
            <h2
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
            </h2>

            <h2
              onClick={() => skip()}
              className="w-1/2 flex items-center gap-2 rounded-lg  px-4 py-2 text-white hover:bg-black"
            >
              <span className="text-lg"> ⏩ Skip </span>
            </h2>
          </div>
        </nav>
      </div>
    </div>
  );
}
