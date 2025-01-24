import React, { useEffect, useState } from "react";
import "./calendar.css";
export default function Calendar() {
  const today = new Date(); // Current date
  const [start, setStart] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [fullMonthDays, setFullMonthDays] = useState([]);
  const [firstDay, setFirstDay] = useState(start.getDay());

  const [overlay, setoverlay] = useState(false);
  const [selecteddate, setselecteddate] = useState(null);

  useEffect(() => {
    const calculateDays = () => {
      const days = [];
      let tempDate = new Date(start); // Create a copy of `start` to avoid mutating it
      while (tempDate.getMonth() === start.getMonth()) {
        days.push(new Date(tempDate));
        tempDate.setDate(tempDate.getDate() + 1);
      }
      setFullMonthDays(days);
      setFirstDay(new Date(start.getFullYear(), start.getMonth(), 1).getDay());
      // console.log(days);
    };
    calculateDays();
  }, [start]);

  const handleNext = () => {
    setStart(new Date(start.getFullYear(), start.getMonth() + 1, 1));
  };

  const handlePrev = () => {
    setStart(new Date(start.getFullYear(), start.getMonth() - 1, 1));
  };

  const totalCells = fullMonthDays.length + firstDay;
  const lastRowEmptyCells = (7 - (totalCells % 7)) % 7; // Empty cells to complete the last row

  function handlebtnclick(day) {
    console.log(day.getDate());
    setoverlay((p) => !p);
    setselecteddate(day);
  }

  function handlebtnclickclose() {
    setoverlay((p) => !p);
  }

  return (
    <div className="calendarContainer">
      <div className="">
        <div className="container  con-1 text-center Calendar">
          {/* Header with current month and year */}
          <div className="row title">
            <div className="col text-center ">
              {start.toLocaleString("default", { month: "long" })}{" "}
              {start.getFullYear()}
            </div>
          </div>
          {/* Days of the Week */}
          <div className="row week">
            <div className="col">Sun</div>
            <div className="col">Mon</div>
            <div className="col">Tue</div>
            <div className="col">Wed</div>
            <div className="col">Thu</div>
            <div className="col">Fri</div>
            <div className="col">Sat</div>
          </div>
          {/* Rendering Days */}
          <div className="row align-content-start dates ">
            {/* Empty slots before the 1st of the month */}
            {Array(firstDay)
              .fill(null)
              .map((_, index) => {
                return (
                  <>
                    <div className="col" key={"empty-" + index}></div>
                  </>
                );
              })}

            {/* Display days of the month */}
            {fullMonthDays.map((day, index) => {
              const isToday =
                day.getDate() === today.getDate() &&
                day.getMonth() === today.getMonth() &&
                day.getFullYear() === today.getFullYear();

              return (
                <React.Fragment key={index}>
                  <div
                    onClick={() => handlebtnclick(day)}
                    className={`col days ${isToday ? "today" : ""}`}
                  >
                    {day.getDate()}
                  </div>
                  {/* Break row after every 7 days */}
                  {(index + firstDay + 1) % 7 === 0 && (
                    <div className="w-100"></div>
                  )}
                </React.Fragment>
              );
            })}
            {/* Empty cells at the end of the last row */}
            {Array(lastRowEmptyCells)
              .fill(null)
              .map((_, index) => (
                <div className="col" key={"empty-end-" + index}></div>
              ))}
          </div>
          {/* Navigation Buttons */}
        </div>
        <div className="container mt-3 CalNavButtons">
          <div className="row">
            <button
              className="btn btn-primary col-2 offset-2"
              onClick={handlePrev}
            >
              Prev
            </button>
            <button
              className="btn btn-primary col-2 offset-4"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {overlay && (
        <>
          <div className="contianer-fluid ">
            <div className="overlay">
              {/* close btn  */}
              <div className="row">
                <div className="col-1  closebtn">
                  <button
                    className="btn btn-close btn-close-white"
                    onClick={handlebtnclickclose}
                  ></button>
                </div>
              </div>

              <div className="row">
                {/* form left side */}
                <div className="col-lg-6 formcont">
                  <form action="" className="eventform ">
                    <h3 className="mb-5">
                      Event planner ({selecteddate.getDate()}{" "}
                      {selecteddate.toLocaleString("default", {
                        month: "short",
                      })}{" "}
                      {selecteddate.getFullYear()} )
                    </h3>

                    <div className="row">
                      <label htmlFor="" className="col-4">
                        Event Name:
                      </label>
                      <div className="col-7 p-0">
                      <input
                        className="form-control w-100 "
                        type="text"
                        placeholder="Event name"
                      />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <label htmlFor="" className="col-4">
                        Description:
                      </label>
                      <div className="col-7 p-0">
                        <textarea
                          name=""
                          className="form-control w-100"
                          id=""
                          placeholder="description"
                        ></textarea>
                      </div>
                    </div>

                    <br />
                    <div className="row">
                      <label htmlFor="" className="col-4 ">
                        Event Nature:
                      </label>

                      <div className="col-7">
                        <input
                          type="radio"
                          name="event"
                          value="normal"
                          className="mx-2"
                        />
                        <label htmlFor="html">Normal</label>
                        <input type="radio" name="event" className="mx-2 ms-3" value="urgent" />
                        <label htmlFor="css">Urgent</label>
                      </div>
                    </div>
                    <br />
                    <br /><br />
                    <br /><br />  
                    <div className="row">
                      <div className="col m-auto text-center">
                        <div className="btn btn-primary mx-2">submit</div>
                        <div className="btn btn-primary">reset</div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* event right side */}

                <div className="col-lg-6 eventcont ">
                  <div className="eventlist">
                  <h3 className="mb-5 text-center">
                      Event planner ({selecteddate.getDate()}{" "}
                      {selecteddate.toLocaleString("default", {
                        month: "short",
                      })}{" "}
                      {selecteddate.getFullYear()} )
                    </h3>
                  <br />
                  <ul>
                    <li>birday </li>
                  </ul>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}




// css


.calendarContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .month {
    font-size: 25px;
    text-transform: capitalize;
  }

  .con-1 {
    height: 500px;
    border: 2px solid black;
    border-radius: 10px;
  }
  .container {
    /* background: #000; */

    width: 700px;
    /* background: #000; */

    .week {
      background-color: cadetblue;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      .col {
        /* background-color: transparent; */
        /* background-color: red; */
        /* border: 2px solid red; */
      }
    }
    .title {
      background: blanchedalmond;
      display: flex;
      justify-content: center;
      margin: 5px;
      padding: 10px;
      height: 80px;
      align-items: center;
      font-size: 35px;
    }

    .row {
      /* background-color: red; */
      margin: 10px;

      .col {
        padding: 0;
        width: 100px;
      }
      .days:hover {
        transform: scale(1.1);
        background-color: #b89595;
        /* border-radius:; */
      }
    }
    .today {
      background: red;
      cursor: pointer;
    }

    .datebtn {
      border: none;
      background-color: transparent;
    }
    .days {
      height: 53px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  }

  a {
    text-decoration: none;
    font-size: 20px;
  }
}


.contianer-fluid{
  position: absolute;
  background: red;
  height: 100vh;

  .overlay{
    position: fixed;
    /* display: none; */
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .8);
    
  
    z-index: 2;
    cursor: pointer;
    /* border: 2px solid red; */

    .closebtn{
      position: absolute;
      right: 0;
      display: flex;
      align-items: end;
      justify-content: end;
      padding: 10px;
      
    }


   .eventcont{
    /* background: #000; */
    justify-content: center;
    align-items: center;
    border-left: 2px solid rgb(201, 201, 201);
    display: flex;
    .eventlist{
      z-index: 3;
      /* background: red; */
      display: flex;
      background:rgb(202, 230, 247);

      
      
      flex-direction: column;
      border-radius: 10px;
      
      /* justify-content: center; */
      
      width: 80%;
      height:77%;
      padding: 3%;
      h2{
        /* background: red; */
        color: wheat;

      }
    }
   }


    .formcont{
      /* background: #000;  */
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column  ;
      padding: 20px;
      height: 100vh;
      border-right: 1px solid rgb(201, 201, 201);


      .eventform{
        background:rgb(202, 230, 247);

        padding: 30px;
        border-radius: 10px;
        width: 80%;
        height: 80%;

        .form-control{
          width: inherit;
        }
      }
      
    }

  }
}