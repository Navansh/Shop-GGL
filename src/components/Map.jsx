import React from "react";
import { MapContainer, useMap, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./mapData";
import "./styles.css";

function Map({ filteredData }) {
  const center = [40.150868, -92.912024];

  // const handleStateClick = (e, state, index) => {
  //   setOpenValue(true);

  //   const map = mapRef.current;
  //   map.setView(e.target.getCenter(), 5);
  //   setSelectedState(state);
  //   setVisibilityStates(visibilityStates.map((_, i) => i === index));
  //   const apiData = () => {
  //     fetch(
  //       "https://script.googleusercontent.com/macros/echo?user_content_key=X7_4nZxzSBBeBIxT8S17vSRKuVabIng5cYGbnCv2SbBPOCJXbbkoDI0GC2np2Thu0synEnUix_1e3BCUefygcPj3Zg_aHPYAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnA0MGqPd1-iidTFCwRrONenz88FpuLqTlaCLh6RzoFqf1P-ZXHNaoq_MuXD4x-MwkiRBOsVP33cDT0zTLt9cMLqDWWgWoOPbutz9Jw9Md8uu&lib=MYh46KwtR1PGqq2iJu_X2srTH389liFSA"
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const filteredData = data.data.filter(
  //           (item) => item.store_state === state.properties.name
  //         );
  //         setApiD(filteredData);
  //       });
  //   };
  //   apiData();
  // };

  return (
    <MapContainer
      center={center}
      zoom={3.5}
      style={{ width: "55vw", height: "75vh", backgroundColor: "#0000" }}
      zoomControl={false}
      attributionControl={false}
    >
      {statesData.features.map((state) => {
        let color = "";

        const stateSumSellout = filteredData
          .filter(
            (item) =>
              item.state_name === state.properties.name &&
              item.Actual_Sellout !== undefined
          )
          .map((item) => {
            parseInt(item.Actual_Sellout);
          })
          .reduce((acc, curr) => acc + curr, 0);

        const stateSumTarget = filteredData
          .filter((item) => {
            item.state_name === state.properties.name &&
              item.Target !== undefined;
          })
          .map((item) => {
            console.log(item);
            parseInt(item.Target);
          })
          .reduce((acc, curr) => acc + curr, 0);

        color = stateSumTarget > stateSumSellout ? "red" : "green";
        // filteredData.map((item) => {
        //   if (item.state_name === state.properties.name) {
        //     // console.log(item.state_name);
        //     item.Actual_Sellout < item.Target
        //       ? (color = "red")
        //       : (color = "green");
        //   }
        // });

        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        return (
          <Polygon
            key={state.properties.name}
            pathOptions={{
              fillColor: { color },
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: "white",
            }}
            positions={coordinates}
            eventHandlers={{
              click: (e) => {},
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: 3,
                  color: "dark-grey",
                  fillColor: "light-green",
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: { color },
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: "white",
                });
              },
            }}
          >
            {/* <Tooltip
              direction="center"
              offset={[0, 0]}
              opacity={1}
              permanent
              className="custom-tooltip"
            >
              {state.properties.name}
            </Tooltip> */}
          </Polygon>
        );
      })}
    </MapContainer>
  );
}

export default Map;
