import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  // References
  const yearErr = useRef();
  const monthErr = useRef();
  const dayErr = useRef();

  const yearFErr = useRef();
  const monthFErr = useRef();
  const dayFErr = useRef();

  const submitRef = useRef();
  const yearRes = useRef();
  const monthRes = useRef();
  const dayRes = useRef();

  // to get the current date
  let date = new Date();
  // to get the current year
  const cuurentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDay();
  console.log(cuurentYear, currentMonth, currentDay);
  // ==================
  const checkYears = () => {
    if (year == null) {
      yearFErr.current.classList.add("border-[#f25a59]");
      yearErr.current.innerHTML = "This field is requird";
      return false;
    } else if (year > cuurentYear) {
      yearFErr.current.classList.add("border-[#f25a59]");
      yearErr.current.innerHTML = "Must be in past";
      return false;
    } else if (year < 0) {
      yearFErr.current.classList.add("border-[#f25a59]");
      yearErr.current.innerHTML = "Must be valid";
      return false;
    } else {
      yearFErr.current.classList.remove("border-[#f25a59]");
      yearErr.current.innerHTML = "";
      return true;
    }
  };

  const checkMonths = () => {
    if (month > 12 || month < 1) {
      monthFErr.current.classList.add("border-[#f25a59]");
      monthErr.current.innerHTML = "Must be valid";
      return false;
    } else if (month == null) {
      monthFErr.current.classList.add("border-[#f25a59]");
      monthErr.current.innerHTML = "This is required";
      return false;
    } else {
      monthFErr.current.classList.remove("border-[#f25a59]");
      monthErr.current.innerHTML = "";
      return true;
    }
  };

  // thirty one day monthes array
  const tODMonths = [1, 3, 5, 7, 8, 10, 12];
  const checkDays = () => {
    if (day == null) {
      dayFErr.current.classList.add("border-[#f25a59]");
      dayErr.current.innerHTML = "This is Required";
      return false;
    } else if (day < 1 || day > 31) {
      dayFErr.current.classList.add("border-[#f25a59]");
      dayErr.current.innerHTML = "Must be valid";
      return false;
    } else if (day === 31) {
      if (tODMonths.indexOf(+month) === -1) {
        dayFErr.current.classList.add("border-[#f25a59]");
        dayErr.current.innerHTML = "Must be valid";
        return false;
      } else {
        dayFErr.current.classList.remove("border-[#f25a59]");
        dayErr.current.innerHTML = "";
        return true;
      }
    } else {
      dayFErr.current.classList.remove("border-[#f25a59]");
      dayErr.current.innerHTML = "";
      return true;
    }
  };
  // ==============
  const handleform = (e) => {
    e.preventDefault();
    let checkY = checkYears();
    let checkM = checkMonths();
    let checkD = checkDays();
    if (checkY && checkM && checkD) {
      calculateAge();
    }
  };

  const calculateAge = () => {
    let years;
    let months;
    let days;

    years = cuurentYear - year;
    months = Math.abs(month - currentMonth);
    days = Math.abs(day - currentDay);

    submitRef.current.classList.add("bg-primarycolor");
    yearRes.current.innerHTML = years;
    monthRes.current.innerHTML = months;
    dayRes.current.innerHTML = days;
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-[#f0f0f0] flex items-center justify-center">
      {/* absolute top-[50%] left-[50%] w-[300px] translate-x-[-50%] translate-y-[-50%]*/}
      <div className="width-[350px] sm:w-[550px] p-6 bg-white rounded-lg rounded-br-[35%]">
        <form onSubmit={handleform}>
          <div className="flex gap-4">
            <div className="basis-[25%]">
              <label className="block mb-2 text-sm text-[#808080] tracking-widest font-semibold">
                Day
              </label>
              <input
                ref={dayFErr}
                type="number"
                className="block outline-0 p-2 w-[100px] border-solid border-[#f0f0f0] border-[1px] focus-within:border-primarycolor caret-primarycolor rounded-lg font-semibold transition-colors duration-200 hover:border-primarycolor"
                onChange={(e) => setDay(e.target.value)}
              />
              <small ref={dayErr} className="text-[#f25a59] text-xs"></small>
            </div>
            <div className="basis-[25%]">
              <label className="block mb-2 text-sm text-[#808080] tracking-widest font-semibold">
                Month
              </label>
              <input
                ref={monthFErr}
                type="number"
                className="block outline-0 p-2 w-[100px] border-solid border-[#f0f0f0] border-[1px] focus-within:border-primarycolor caret-primarycolor rounded-lg font-semibold transition-colors duration-200 hover:border-primarycolor"
                onChange={(e) => setMonth(e.target.value)}
              />
              <small ref={monthErr} className="text-[#f25a59] text-xs"></small>
            </div>
            <div className="basis-[25%]">
              <label className="block mb-2 text-sm text-[#808080] tracking-widest font-semibold">
                year
              </label>
              <input
                ref={yearFErr}
                type="number"
                className="block outline-0 p-2 w-[100px] border-solid border-[#f0f0f0] border-[1px] focus-within:border-primarycolor caret-primarycolor rounded-lg font-semibold transition-colors duration-200 hover:border-primarycolor"
                onChange={(e) => setYear(e.target.value)}
              />
              <small ref={yearErr} className="text-[#f25a59] text-xs"></small>
            </div>
          </div>
          {/*  after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:w-full after:h-[1px] after:bg-[#f0f0f0] */}
          <div className="submit-section text-center sm:text-right p-4 relative">
            <div className="absolute top-[50%] left-0 bg-[#f0f0f0] w-full sm:w-[92%] h-[2px] translate-y-[50%] "></div>
            <button
              ref={submitRef}
              type="submit"
              className="relative bg-[#000] w-[50px] h-[50px] rounded-full text-white transition-colors duration-200 hover:bg-primarycolor"
            >
              <i className="fa-solid fa-arrow-down text-xl"></i>
            </button>
          </div>
        </form>
        {/* result div */}
        <div className="">
          <div>
            <p className="text-[50px] font-extrabold">
              <span ref={yearRes} className="text-primarycolor">
                --
              </span>
              years
            </p>
          </div>
          <div>
            <p className="text-[50px] font-extrabold">
              <span ref={monthRes} className="text-primarycolor">
                --
              </span>
              months
            </p>
          </div>
          <div>
            <p className="text-[50px] font-extrabold">
              <span ref={dayRes} className="text-primarycolor">
                --
              </span>
              days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
