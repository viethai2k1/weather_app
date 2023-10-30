import React from "react";
import { BsFillSunriseFill, BsFillSunsetFill, BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Head from 'next/head'

export default function Home() {
  const [trangthaimau, setTrangThaiMau] = useState("C");
  const [tenthanhpho, setTenthanhpho] = useState("Roma");
  const [tenthanhphoDebounce] = useDebounce(tenthanhpho, 500);
  const [thongtinnhietdo, setThongTinNhietDo] = useState({});

  useEffect(() => {
    if (tenthanhpho.length < 3) {
      return;
    }
    const URL = `https://ngoc.fly.dev/weather?city=${tenthanhpho}`;

    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          setThongTinNhietDo(res);
          console.log(res);
        } else {
          console.log("Nhap sai thanh pho");
        }
      });
  }, [tenthanhphoDebounce]);

  return (
    <div className="w-screen h-screen bg-[#D1D5DB] flex justify-center items-center ">
      
      <Head>
        <title>{tenthanhpho}</title>
        <link rel="icon" href={`https://ngoc.fly.dev/${thongtinnhietdo?.current?.weather[0].icon}.svg`}></link>
      </Head>
      <div className="w-[1100px] h-[620px] bg-[yellow] rounded-[30px] flex">
        <div className="w-[270px] h-[620px] bg-[#242F40] rounded-l-3xl p-[30px]">
          <div className="relative">
            <input
              value={tenthanhpho}
              onChange={(e) => {
                setTenthanhpho(e.target.value);
              }}
              className="bg-[#242F40] border-[none] text-[white] h-[35px] pl-[26px] text-[15px] outline-none"
              placeholder="Search city ...."
            ></input>
            <BsSearch className="text-[white] absolute top-[10px] pl-[5px]"></BsSearch>
          </div>
          <div className="flex flex-col">
            <img
              src={`https://ngoc.fly.dev/${thongtinnhietdo?.current?.weather[0].icon}.svg`}
            ></img>
            <div className="flex gap-[5px]">
              <div className="text-[55px] text-[white]">
                {dinhDangNhietDo(thongtinnhietdo?.current?.temp, trangthaimau)}
              </div>
              <div className="text-[white] text-[22px]">°{trangthaimau}</div>
            </div>

            <div className="text-[white]">{formatDate3(thongtinnhietdo?.current?.dt)}</div>
            <div className="border-[1px] mt-[20px]"></div>
          </div>
          <div>
            <div className="mt-[15px]">
              <div className="text-[white]">
                {thongtinnhietdo?.current?.weather[0].main}
              </div>
              <div className="text-[white]">
                {thongtinnhietdo?.current?.weather[0].description}
              </div>
            </div>
            <div className="mt-[15px]">
              <img
                className="  w-[200px] h-[120px] rounded-[10px]"
                src={thongtinnhietdo.image}
              ></img>
            </div>
          </div>
        </div>
        <div className="w-[830px] h-[620px] bg-[#F6F6F8] rounded-r-3xl p-[30px]">
          <div className="flex justify-between">
            <div className="font-medium">Week</div>
            <div className="flex gap-[10px]">
              <div
                style={{
                  background: trangthaimau === "C" ? "black" : "none",
                  color: trangthaimau === "C" ? "white" : "black",
                }}
                onClick={() => {
                  setTrangThaiMau("C");
                }}
                className="w-[30px] h-[30px] border rounded-[40px] flex justify-center items-center"
              >
                °C
              </div>
              <div
                style={{
                  background: trangthaimau === "F" ? "black" : "none",
                  color: trangthaimau === "F" ? "white" : "black",
                }}
                onClick={() => {
                  setTrangThaiMau("F");
                }}
                className="w-[30px] h-[30px] border rounded-[40px] flex justify-center items-center"
              >
                °F
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-7 gap-[10px] mt-[10px]">
              {thongtinnhietdo.daily &&
                thongtinnhietdo.daily.slice(0, 7).map((ngay, index) => {
                  return (
                    <div key={index} className=" h-[140px] rounded-[10px] bg-[white] flex gap-[10px] flex-col items-center justify-center">
                      <div className="text-[14px] font-medium">
                        {formatDate2(ngay?.dt)}
                      </div>
                      <img
                        className="w-[55px] h-[55px]"
                        src={`https://ngoc.fly.dev/${ngay.weather[0].icon}.svg`}
                      ></img>
                      <div className="flex gap-[10px]">
                        <div>
                          {Math.round(
                            dinhDangNhietDo(ngay.temp.max, trangthaimau)
                          )}
                          °
                        </div>
                        <div className="text-[gray]">
                          {Math.round(
                            dinhDangNhietDo(ngay.temp.min, trangthaimau)
                          )}
                          °
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex flex-col gap-[15px]">
              <div className="font-semibold mt-[25px]">Today&apos;s Highlights</div>
              <div className="grid grid-cols-3 gap-[20px]  ">
                <div className="w-[250px] h-[150px] bg-[white] rounded-[20px] p-[20px]">
                  <div className="text-[gray] text-[13px]">UV Index</div>
                  <div className="flex justify-center items-center mt-3">
                    <div
                      className="half-arc "
                      style={{
                        "--percentage": `${
                          (thongtinnhietdo?.current?.uvi * 100) / 15
                        }%`,
                      }}
                    >
                      <span className="label">
                        {/* // Cái số dưới cầu vồng  */}
                        {thongtinnhietdo?.current?.uvi}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-[250px] h-[150px] bg-[white] rounded-[20px] p-[20px] flex flex-col gap-[10px] justify-center ">
                  <div className="text-[gray] text-[13px]">Wild Status</div>
                  <div className="flex gap-[10px] items-center font-bold">
                    <div className="text-[30px] ">
                      {thongtinnhietdo?.current?.wind_speed}
                    </div>
                    <div>km/h</div>
                  </div>
                  <div className="text-[14px] font-bold">WSW</div>
                </div>
                <div className="w-[250px] h-[150px] bg-[white] rounded-[20px] p-[20px] flex flex-col gap-[15px]">
                  <div className="text-[gray] text-[13px]">
                    Sunrise & Sunset
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex items-center gap-[10px]">
                      <BsFillSunriseFill className="text-[35px] text-[#FFDD4A]"></BsFillSunriseFill>
                      <div className="font-medium ">
                        {formatDate(thongtinnhietdo.current?.sunset)}
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <BsFillSunsetFill className="text-[35px] text-[#FFDD4A]"></BsFillSunsetFill>
                      <div className="font-medium ">
                        {formatDate(thongtinnhietdo.current?.sunrise)}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="w-[250px] h-[150px] bg-[white] rounded-[20px] p-[20px]">
                  <div className="text-[gray] text-[13px]">Humidity</div>
                  <div className="flex items-center mt-[5px] gap-[5px]">
                    <div className="text-[30px] font-bold">
                      {thongtinnhietdo?.current?.humidity}
                    </div>
                    <div className="font-medium">%</div>
                  </div>
                </div>
                <div className="w-[250px] h-[150px] bg-[white] rounded-[20px] p-[20px]">
                  <div className="text-[gray] text-[13px]">Visibility</div>
                  <div className="flex items-center mt-[5px] gap-[5px]">
                    <div className="text-[30px] font-bold">
                      {thongtinnhietdo?.current?.visibility / 1000}
                    </div>
                    <div className="font-medium mt-[10px]">km</div>
                  </div>
                </div>
                <div className="w-[250px] h-[150px] bg-[white] rounded-[20px] p-[20px]">
                  <div className="text-[gray] text-[13px]">Dew Point</div>
                  <div className="flex items-center mt-[5px]">
                    <div className="text-[30px] font-bold">
                      {thongtinnhietdo?.current?.dew_point}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const dinhDangNhietDo = (doK, kieuNhietDo) => {
  switch (kieuNhietDo) {
    case "C":
      return Math.round((doK - 273.15) * 10) / 10;
    case "F":
      return Math.round((1.8 * (doK - 273) + 32) * 10) / 10;
    default:
      return doK;
  }
};

const formatDate = (inputTime) => {
  var a = new Date(inputTime * 1000);

  var hours = a.getHours();
  var minutes = a.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeek = days[a.getDay()];
  return strTime;
};

const formatDate2 = (inputTime) => {
  var a = new Date(inputTime * 1000);

  var hours = a.getHours();
  var minutes = a.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeek = days[a.getDay()];
  return dayOfWeek;
};


const formatDate3= (inputTime) => {
  var a = new Date(inputTime * 1000);

  var hours = a.getHours();
  var minutes = a.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeek = days[a.getDay()];
  return `${dayOfWeek}, ${strTime}`;
};
