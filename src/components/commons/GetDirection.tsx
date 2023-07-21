import { Link } from "@yext/pages/components";
import * as React from "react";
import { Address } from "../../types/Address";

type GetDirection = {
  buttonText: string;
  className: string;
  placeId?: number;
  address?: Address;
  dataTrackText?: string;
  eventName?:string;
};

const GetDirection = (props: GetDirection) => {
  const { buttonText, className, placeId, address, dataTrackText, eventName } = props;

  let address_string =
    `${address?.line1},` +
    `${address?.line2},` +
    `${address?.city},` +
    `${address?.region},` +
    `${address?.postalCode},` +
    `${address?.countryCode}`;

  address_string = address_string.replace("undefined,", "");

  const getDirectionUrlLink = `https://www.google.com/maps/search/?api=1&query=${address_string}${
    placeId ? `&query_place_id=${placeId}` : ""
  }`;

  return (
    <>
      <Link
        data-ya-track={dataTrackText}
        eventName={eventName}
        className={className}
        target="_blank"
        href={getDirectionUrlLink}
        rel="noopener noreferrer"
      >
        {buttonText}
        <span className="sr-only wcag-new-tab-hover">
          &nbsp;Link Opens in New Tab
        </span>
      </Link>
    </>
  );
};
export default GetDirection;
