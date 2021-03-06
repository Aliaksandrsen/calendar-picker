import React, { useState } from "react";
import styled, { css } from "styled-components";

import "./App.css";

const calendarDates = Array(31)
  .fill(0)
  .map((e, i) => i);

export const App = () => {
  const [choosingType, setChoosingType] = useState("start"); // start or end
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const updateDay = (chosenDay) => {
    // handle if a user chose before our current range
    if (startDate && chosenDay < startDate) {
      setStartDate(chosenDay);
      return setChoosingType("end");
    }

    // handle if a user chose after our current range
    if (endDate && chosenDay > endDate) {
      setEndDate(chosenDay);
      return setChoosingType("end");
    }

    if (choosingType === "start") {
      setStartDate(chosenDay);
      return setChoosingType("end");
    }

    if (choosingType === "end") {
      setEndDate(chosenDay);
      setChoosingType("start"); //for the case choose the end date before start date
    }
  };

  const checkInBetween = (day) => {
    if (startDate && !endDate && day < hoverDate) {
      return day > startDate;
    }

    return day > startDate && day < endDate;
  };

  return (
    <>
      <StyledDateChooser>
        <StyledDateChooserButton
          isChoosing={choosingType === "start"}
          onClick={() => setChoosingType("start")}
        >
          Start Date <span>{startDate}</span>
        </StyledDateChooserButton>

        <StyledDateChooserButton
          isChoosing={choosingType === "end"}
          onClick={() => setChoosingType("end")}
        >
          End Date <span>{endDate}</span>
        </StyledDateChooserButton>
      </StyledDateChooser>

      <StyledCalendar>
        {calendarDates.map((day, index) => {
          const dayNumber = day + 1;

          let isSelected = dayNumber === startDate || dayNumber === endDate;
          let isInBetween = checkInBetween(dayNumber);

          return (
            <StyledCalendarDay
              key={index}
              isSelected={isSelected}
              isInBetween={isInBetween}
              onClick={() => updateDay(dayNumber)}
              onMouseOver={() => setHoverDate(dayNumber)}
            >
              {dayNumber}
            </StyledCalendarDay>
          );
        })}
      </StyledCalendar>
    </>
  );
};

const StyledDateChooser = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const StyledDateChooserButton = styled.button`
  color: #0b204c;
  text-transform: uppercase;
  flex: 1;
  padding: 15px;
  background: none;
  cursor: pointer;
  border: none;
  border-bottom: 2px solid rgba(11, 32, 76, 0.2);
  outline: none;
  border-color: ${(props) => (props.isChoosing ? "#0b204c" : "none")};

  span {
    display: block;
    min-height: 60px;
    font-size: 50px;
  }
`;

const StyledCalendar = styled.div`
  max-width: 400px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: #0b204c;
  color: #fff;
  padding: 20px;
`;

const StyledCalendarDay = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: 0.3s ease background;
  border: none;
  outline: none;
  cursor: pointer;
  color: #8096c1;
  background: none;

  ${(props) => {
    return (
      props.isSelected &&
      css`
        color: #eeeeee;
        background: #1a1a1a !important;
      `
    );
  }}

  ${(props) => {
    return (
      props.isInBetween &&
      css`
        color: #eeeeee;
        background: #254381 !important;
      `
    );
  }}

  &:hover {
    color: #eee;
    background: #254381;
  }
`;
