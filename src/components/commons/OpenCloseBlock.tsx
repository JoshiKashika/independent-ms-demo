import * as React from "react";
import useOpenClose from "../../hooks/useOpenClose";
import { StaticData } from "../../../sites-global/staticData";
import { Hours } from "../../types/locations";

interface OpenCloseBlock {
  hoursData: Hours;
  timeZone: string;
}

function OpenCloseBlock({ hoursData, timeZone }: OpenCloseBlock) {
  const { openObject } = useOpenClose(hoursData, timeZone);
  type Week = Record<string, string>;
  const week: Week = {
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
  };

  const formatTime = (time: string) => {
    const tempDate = new Date("January 1, 2020 " + time);
    const localeString = "en-US";
    return tempDate.toLocaleTimeString(localeString.replace("_", "-"), {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (hoursData.reopenDate) {
    return (
      <div className="hours-info">
        <span className="font-second-main-font font-bold">Closed</span>
      </div>
    );
  }
  if (openObject.stateset) {
    if (openObject.isOpen) {
      if (openObject.start === "00:00" && openObject.end === "23:59") {
        return (
          <div className={"opendot notHighlight"}>
            {StaticData.Open24HoursText}
          </div>
        );
      } else {
        return (
          <div className={"opendot notHighlight green-dot"}>
            <div className="hours-info ">
              <span className="font-second-main-font font-bold notHighlight">
                Open now{" "}
              </span>
              <span className="Hours-statusSeparator"> - </span>
              <span className="notHighlight">Closes at</span>{" "}
              <span className="notHighlight">{formatTime(openObject.end)}</span>
            </div>
          </div>
        );
      }
    } else if (openObject.isClosed && openObject.start) {
      return (
        <div className={"closeddot notHighlight 4"}>
          <div className="red-dot">
            <div className="hours-info ">
              <span className="font-second-main-font font-bold notHighlight">
                Closed -{" "}
              </span>
              <span className="notHighlight "> Opens at </span>
              <span className="notHighlight">
                {formatTime(openObject.start)}
              </span>{" "}
              <span className="notHighlight">
                {openObject.day
                  ? week[openObject.day] != "Sunday"
                    ? week[openObject.day].slice(0, 3)
                    : ""
                  : ""}
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="closeddot notHighlight 2">
          <div className="red-dot">
            <div className="hours-info notHighlight ">Closed</div>
          </div>
        </div>
      );
    }
  } else {
    return <></>;
  }
}

export default OpenCloseBlock;
