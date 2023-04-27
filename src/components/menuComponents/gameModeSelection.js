import { useStateContext } from "../../context";

export default function GameSelection() {
  const { updateEarthSpin, updateStats, updateMenu } = useStateContext();
  return (
    <div className="menuContainerButtonContainers">
      {/* <div className="menuContainerButtonContainersMax">
        <Typography variant="body1" component="h1" style={{ color: "#1976d2" }}>
          Select :
        </Typography>

        <ButtonGroup
          style={{ width: "100%", marginTop: "10px" }}
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button
            onClick={() => setUserSettingSelection(0)}
            style={{ width: "100%" }}
            variant={userSettingsSelection === 0 ? "contained" : "outlined"}
          >
            All
          </Button>
          <Button
            onClick={() => setUserSettingSelection(1)}
            style={{ width: "100%" }}
            variant={userSettingsSelection === 1 ? "contained" : "outlined"}
          >
            Continent
          </Button>
          <Button style={{ width: "100%" }}>Custom (in progress)</Button>
        </ButtonGroup>
        {userSettingsSelection === 1 ? (
          <>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <NativeSelect
                id="demo-customized-select-native"
                value={tempValue}
                defaultValue={0}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTempValue(e.target.value);

                  if (e.target.value === "0") {
                    setTempValue(e.target.value);
                    updateSetContinent("all");
                  }
                  if (e.target.value === "10") {
                    setTempValue(e.target.value);
                    updateSetContinent("Asia");
                  }
                  if (e.target.value === "20") {
                    setTempValue(e.target.value);
                    console.log(continentFilter);
                    updateSetContinent("Europe");
                  }
                  if (e.target.value === "30") {
                    setTempValue(e.target.value);
                    updateSetContinent("South America");
                  }
                  if (e.target.value === "40") {
                    setTempValue(e.target.value);
                    updateSetContinent("North America");
                  }
                  if (e.target.value === "50") {
                    setTempValue(e.target.value);
                    updateSetContinent("Australia");
                  }
                }}
                input={<BootstrapInput />}
              >
                <option value={0}>All</option>
                <option value={10}>Asia</option>
                <option value={20}>Europe</option>
                <option value={30}>South America</option>
                <option value={40}>North America</option>
                <option value={50}>Australia</option>
              </NativeSelect>
            </FormControl>
          </>
        ) : (
          <></>
        )}
        <Button
          style={{ width: "100%", height: "40px", marginTop: "30px" }}
          variant="outlined"
          onClick={() => {
            updateEarthSpin(false);
            updateStats(true);
            updateMenu(false);
          }}
        >
          Start 🏁
        </Button>
      </div> */}
      <div className="flex flex-col md:flex-row ">
        <div
          onClick={() => {
            updateEarthSpin(false);
            updateStats(true);
            updateMenu(false);
          }}
          className="w-full md:w-1/2 p-5 cursor-pointer"
        >
          <div className="group relative block bg-black rounded-xl">
            <img
              alt="Developer"
              src="https://c4.wallpaperflare.com/wallpaper/719/652/911/earth-horizon-wallpaper-preview.jpg"
              className="absolute inset-0 rounded-xl h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-yellow-500">
                Casual
              </p>

              <p className="text-xl font-bold text-white sm:text-2xl">
                Exploration Mode
              </p>

              <div className="mt-32 sm:mt-48 lg:mt-64">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white">
                    Discover the world in a fun and stress-free way with Explore
                    Mode! Take your time exploring different countries and their
                    cultures with unlimited time and extra hints. Perfect for
                    sharpening your geography skills!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            updateEarthSpin(false);
            updateStats(true);
            updateMenu(false);
          }}
          className="w-full md:w-1/2 p-5 cursor-pointer"
        >
          <div className="group relative block bg-black rounded-xl">
            <img
              alt="Developer"
              src="https://cdn.wallpapersafari.com/88/66/Uowyg0.jpg"
              className="absolute inset-0 rounded-xl h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                Hardcore
              </p>

              <p className="text-xl font-bold text-white sm:text-2xl">
                Race Mode
              </p>

              <div className="mt-32 sm:mt-48 lg:mt-64">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white">
                    With fast-paced action and challenging obstacles, Race Mode
                    is perfect for those who love a good challenge. So, gear up
                    and race to the finish line, and see if you have what it
                    takes to become a global explorer!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
