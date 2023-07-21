import * as React from "react";
import Phone from "../commons/phone";
import { StaticData } from "../../../sites-global/staticData";
import GetDirection from "../commons/GetDirection";
import { locationUrl } from "../../config/globalConfig";
import { TreaserDetailProps } from "../../types/PropTypes";
import OpenCloseBlock from "./OpenCloseBlock";
import { Address } from "@yext/pages/components";
import { Link } from "@yext/pages/components";


type TeaserLocationCardProp = {
  teaserDetails: TreaserDetailProps;
  basePath: string;
};

const TeaserLocationCard = (props: TeaserLocationCardProp) => {
  const { teaserDetails, basePath } = props;

  const mLocationUrl = teaserDetails.meta?.entityType.id ? teaserDetails.meta?.entityType.id : teaserDetails.meta?.entityType;

  return (
    <article className="Teaser Teaser--custom">
      <h3 className="Teaser-title">
        <Link
          className="Teaser-titleLink"
          href={
            basePath +
            locationUrl(
              mLocationUrl as string,
              teaserDetails.address
            )
          }
          data-ya-track={`Nearby Location Heading`}
          eventName={`Nearby Location Heading`}
        >
          {teaserDetails.geomodifier}
        </Link>
      </h3>

      {teaserDetails.hours && teaserDetails.timezone ? (
        <div className="Teaser-open">
          <OpenCloseBlock
            hoursData={teaserDetails.hours}
            timeZone={teaserDetails.timezone}
          />
        </div>
      ) : (
        <></>
      )}

      {teaserDetails.mainPhone ? (
        <div className="Teaser-phone">
          <Phone mainPhone={teaserDetails.mainPhone} />
        </div>
      ) : (
        <></>
      )}

      {teaserDetails.c_linkedATMNew ? (
        <div className="Teaser-atm">ATM Available</div>
      ) : (
        <></>
      )}
      {teaserDetails.address ? (
        <div className="Teaser-address">
          <Address
            address={teaserDetails.address}
            lines={[
              ["line1"],
              ["line2"],
              ["city", ",", "region", "postalCode"],
            ]}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="Teaser-links">
        <div className="Teaser-link Teaser-directions">
          <div className="c-get-directions">
            <div className="c-get-directions-button-wrapper">
              <GetDirection
                buttonText={
                  teaserDetails.heroCTA2 &&
                  typeof teaserDetails.heroCTA2.label !== "undefined"
                    ? teaserDetails.heroCTA2.label
                    : StaticData.getDirectionText
                }
                className="c-get-directions-button"
                placeId={teaserDetails.googlePlaceId}
                address={teaserDetails.address}
                dataTrackText="Nearby Get Direction CTA"
                eventName="Nearby Get Direction CTA"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
export default TeaserLocationCard;
