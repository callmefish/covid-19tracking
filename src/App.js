import Header from "./components/header";
import Map from "./components/map";
import Chart from "./components/chart";
import { useState } from "react";

function App() {
  const [oneState, setOneState] = useState("");
  const [mapType, setMapType] = useState("");
  return (
    <div>
      <Header
        setMapType={setMapType}
      />
      <Map 
        oneState={oneState}
        setOneState={setOneState}
        mapType={mapType}
        setMapType={setMapType}
      />
      <Chart 
        oneState={oneState}
        mapType={mapType}
      />
    </div>
  );
}

export default App;
