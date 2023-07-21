import { Link } from "@yext/pages/components";
import * as React from "react";
import { formatPhoneNumber } from "react-phone-number-input";

type phoneProps={
  mainPhone:string;
  wrapperClassName?:string;
}
const Phone = (props: phoneProps) => {
  const { mainPhone, wrapperClassName } = props;  
  return (
    <>
      <div className="Phone Phone--main">
        <div className="Phone-label">
          <span className="sr-only">phone</span>
        </div>
        <div className={wrapperClassName?wrapperClassName:"Phone-numberWrapper"}>
          <div className="Phone-display l-hidden-xs Phone-display--withLink">
          <span className="Phone-text Phone-display">
              {formatPhoneNumber(mainPhone)}
            </span>
          </div>
          <div className="Phone-linkWrapper l-visible-only-xs">
            <Link className="Phone-link"
            href={`tel:${mainPhone}`}
            data-ya-track="phone"
            eventName={`Phone`}>
              {formatPhoneNumber(mainPhone)}
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};
export default Phone;
