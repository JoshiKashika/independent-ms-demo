import * as React from "react";
import { svgIcons } from "../../assets/svgIcon/svgIcon";
import Phone from "../commons/phone";
import { formatPhoneNumber } from "react-phone-number-input";
import { ContactProps } from "../../types/PropTypes";
import { Address } from "@yext/pages/components";

const Contact = (props: ContactProps) => {
  const { address, fax, mainPhone, routingNumber } = props;

  return (
    <>
      {/* address container */}
      {address ? (
        <div className="Teaser-address">
          <Address
            address={address}
            lines={[
              ["line1"],
              ["line2"],
              ["city", ",", "region", ",", "postalCode"],
            ]}
          />

        </div>
      ) : (
        <></>
      )}

      {/* phone number container */}
      {mainPhone ? (
        <div className="Teaser-phone">
          <Phone mainPhone={mainPhone} />{" "}
        </div>
      ) : (
        <></>
      )}

      {/* fax container */}
      {fax ? (
        <div className="block faxIcon">
          <span className="icon">{svgIcons.Fax}</span>
          <span className="content">{formatPhoneNumber(fax)}</span>
        </div>
      ) : (
        <></>
      )}

      {/* routing no container */}
      {routingNumber ? (
        <div className="block routingIcon">
          <span className="icon">{svgIcons.bankIcon}</span>
          <span className="content">{routingNumber}</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Contact;
