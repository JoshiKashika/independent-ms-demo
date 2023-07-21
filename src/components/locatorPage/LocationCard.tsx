import * as React from "react";
import Location from "../../types/locations";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import { convertMetersToMiles, locationUrl } from "../../config/globalConfig";
import { SearchContext } from "../commons/SearchContextProvider";
import Phone from "../commons/phone";
import OpenCloseBlock from "../commons/OpenCloseBlock";
import { Link } from "@yext/pages/components";

const LocationCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const location = result?.rawData;
  const { clickLocation, setHoverLocation, setClickLocation } =
    React.useContext(SearchContext);

  let gridClass = "";
  if (clickLocation === result.rawData.id) {
    gridClass += " fixed-hover";
  }

  return (
    <li
      className={`result-list-item result-list-inner-${result.index} result ${gridClass} location-card-item`}
      id={`result-${result.index}`}
      onClick={() => {
        setClickLocation(result.rawData.id);
      }}
      onMouseEnter={() => {
        setHoverLocation(result.rawData.id);
      }}
      onMouseLeave={() => {
        setHoverLocation("");
      }}
    >
      <article className="location-card">
        <div className="flex justify-between">
          <h3 className="location-name">
            <Link href={locationUrl(location.type, location.address)}
            data-ya-track={`Locator Listing Heading Click`}
            eventName={`Locator Listing Heading Click`}>
              {location.geomodifier}
            </Link>
          </h3>
          
          <div className="Teaser-miles text-sm">
              {convertMetersToMiles(Number(result.distance))} mi
          </div>

        </div>
        <div className="location-info">
          <div className="info-left">
            {location.hours && location.driveThroughHours ? (
              <div className="location-hours">
                {location.hours && location.c_mobilePrimaryHoursTitle && location.timezone ? (
                  <div className="hours-details flex">
                    <span className="opentitle">
                      {location.c_mobilePrimaryHoursTitle}:
                    </span>
                    <span className="hours-status">
                    <OpenCloseBlock hoursData={location.hours} timeZone={location.timezone} />
                    </span>
                  </div>
                ) : (
                  <></>
                )}

                {location.driveThroughHours &&
                location.c_mobileSecondaryHoursTitle && location.timezone ? (
                  <div className="hours-details flex">
                    <span className="opentitle">
                      {location.c_mobileSecondaryHoursTitle}:
                    </span>
                    <span className="hours-status">
                    <OpenCloseBlock hoursData={location.driveThroughHours} timeZone={location.timezone} />
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}

            <div className="location-links">
              <Link href={locationUrl(location.type, location.address)}
              data-ya-track="Locator Listing CTA Click"
              eventName={`Locator Listing CTA Click`}>
                Learn More
              </Link>
            </div>
          </div>
          <div className="info-right">
            {location.mainPhone ? (
            <div className="location-phone">
              <div className="location-row-phone">
                <Phone mainPhone={location.mainPhone}/>
              </div>
            </div>)
            :""}            
            <div className="location-address">
              <div className="location-row-address">
                <address className="loc-address">
                  <div>{location.address.line1}</div>
                  <div>
                    {location.address.city}, {location.address.region}{" "}
                    {location.address.postalCode}
                  </div>
                </address>
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};
export default LocationCard;
