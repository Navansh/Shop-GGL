import React, { useEffect, useState } from "react";
import Navbar from "../components/Nav";
import FiltersC from "../components/FiltersCarriers";
import FiltersD from "../components/FiltersDevices";
import Map from "../components/Map";
import "../components/styles.css";
import { GrFilter } from "react-icons/gr";
import data from "../components/testData";

// loading thing for fast react fetching

function Dash() {
  const [carrier, setCarrier] = useState("");
  const [device, setDevice] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const [apiData, setApiData] = useState([]);
  // const [values, setValues] = useState({
  //   totalSales: -1,
  //   wow: -1,
  //   targetAch: -1,
  // });

  const [totalSales, setTotalSales] = useState(-1);
  const [wow, setWow] = useState(-1);
  const [targetAch, setTargetAch] = useState(-1);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getData();
    // console.log(apiData);
  }, []);

  // let filteredData = [];

  useEffect(() => {
    if (carrier && device && year && week) {
      setFilteredData(
        apiData &&
          apiData.filter(
            (tuple) =>
              tuple.week === parseInt(week) &&
              tuple.year === parseInt(year) &&
              tuple.Product_Model === device &&
              tuple.chain_name.includes(carrier, 1)
          )
      );
      console.log(filteredData);

      const sumAcutalSellout = filteredData
        .filter((item) => item.Actual_Sellout !== undefined)
        .map((item) => parseInt(item.Actual_Sellout, 10))
        .reduce((acc, curr) => acc + curr, 0);

      // setValues({ ...values, totalSales: sumAcutalSellout });
      setTotalSales(sumAcutalSellout);

      const sumTarget = filteredData
        .filter((item) => item.Target !== undefined)
        .map((item) => parseInt(item.Target, 10))
        .reduce((acc, curr) => acc + curr, 0);

      // setValues({ ...values, targetAch: (sumAcutalSellout / sumTarget) * 100 })
      setTargetAch((sumAcutalSellout / sumTarget) * 100);

      const sumPreSellout = apiData
        .filter(
          (tuple) =>
            tuple.week === parseInt(week) - 1 &&
            tuple.year === parseInt(year) &&
            tuple.Product_Model === device &&
            tuple.chain_name.includes(carrier, 1)
        )
        .map((item) => parseInt(item.Actual_Sellout))
        .reduce((acc, curr) => curr + acc, 0);

      // setValues({ ...values, wow: (sumAcutalSellout / sumPreSellout) * 100 });
      setWow((sumAcutalSellout / sumPreSellout) * 100);
    }
    // console.log(apiData);
    // let filteredData = apiData.filter(() => {
    //   tuple;
    //   // return (
    //   //   // tuple.chain_name.includes(carrier, 1) && tuple.Product_model === device
    //   //   tuple
    //   // );
    // });
    // console.log(filteredData);
  }, [carrier, device, year, week, apiData]);

  // let apiData = [];

  // const getData = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://script.googleusercontent.com/macros/echo?user_content_key=cPgOYf8JYX-jeXLVOyYJR4Drx1WMMFRxvQgXsZSFO2gQRoZxDyL9RSNH1uEJXwmH0onlXnmxWzdZ5Agmf-PRO1lRe_CTIhSsm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOptTkAkfT00XUELqQQ0A7ryNqvp-2ylB4zwrfVmltecnV2bAbXGNMVAv6IMS_j6YDDyAC_aH6Jf8Hh-laR9ucSvru7BhmMUZNz9Jw9Md8uu&lib=MYh46KwtR1PGqq2iJu_X2srTH389liFSA"
  //     );
  //     const data = await res.json();
  //     setApiData(data.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const getData = () => {
    setApiData(data.data);
  };
  const handleYearChange = async (e) => {
    setYear(e.target.value);
  };
  const handleWeekChange = async (e) => {
    setWeek(e.target.value);
  };

  const changeCarrier = (val) => {
    setCarrier(val);
  };
  const changeDevice = (val) => {
    setDevice(val);
  };

  return (
    <>
      <div className="layer">
        <div className="topDiv">
          <Navbar />
          <div className="searchDiv">
            <div className="searchDivContent">
              <span>Result </span>
              <span> For: </span>
              <div className="yearDiv" style={{ margin: "0 20px" }}>
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={handleYearChange}
                  defaultValue="default"
                >
                  <option value="default" disabled>
                    Select Year
                  </option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="weekDiv">
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={handleWeekChange}
                  defaultValue="default"
                >
                  <option value="default" disabled>
                    Select Week
                  </option>
                  <option value="10">10</option>
                  <option value="9">9</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="paramsDiv">
            <FiltersC changeCarrier={changeCarrier} />
            <FiltersD changeDevice={changeDevice} />
          </div>
          <div className="rightDiv">
            <div className="filteredRatioDiv">
              <div>
                <GrFilter />
                {"  "} KPI Filters :
              </div>
              <div className="param">
                {/* {values.totalSales === -1 ? "Total Sales" : values.totalSales} */}
                {totalSales === -1
                  ? "Total Sales"
                  : `Total Sales: ${totalSales}`}
              </div>
              <div className="param">
                {/* {values.wow === -1 ? "WOW" : values.wow} */}
                {wow === -1 ? "WOW" : `WOW: ${wow}`}
              </div>
              <div className="param">
                {/* {values.targetAch === -1
                  ? "Target Achievement"
                  : values.targetAch} */}
                {targetAch === -1
                  ? "Target Achievement"
                  : `Target Achievement: ${targetAch}`}
              </div>
            </div>
            <div className="mapDiv">
              <Map filteredData={filteredData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dash;
