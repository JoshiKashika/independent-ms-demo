import * as React from "react";
import { Address } from "../../types/Address";
import { baseurl, slugify } from "../../config/globalConfig";
import { DocumentDataProps } from "../../types/PropTypes";
import { Link } from "@yext/pages/components";

export interface BreadCrumbProps {
  name: string;
  slug?: string;
  meta?: {entityType: {id: string }};
  address?: Address;
}

export interface BreadCrumbsProps {
  name?: string;
  breadcrumbs?: Array<BreadCrumbProps>;
  meta?: { entityType: { id: string } };
  address?: Address;
  document?: DocumentDataProps;
  c_addressRegionDisplayName?:string;
  slug?:string;
}

const BreadCrumbs = (props: BreadCrumbsProps) => {
  const { name, breadcrumbs, meta, address, document } = props;
  let displayname;
  let breadcrumb;
  const breadcrumbsData = breadcrumbs?.slice(1);
  if (breadcrumbsData) {
    breadcrumbsData[0].name = "All";
    breadcrumbsData.forEach((e: BreadCrumbsProps) => {
      if (e.meta?.entityType.id == "ce_region") {
        e.name = e.c_addressRegionDisplayName;
      }
    });
    if (meta?.entityType.id == "atm") {
      const linkedATMlocationUrl = document?.c_linkedATMNew
        ? `${slugify(
            address ? document?.c_linkedATMNew[0].address.region : ""
          )}/${slugify(
            address ? document?.c_linkedATMNew[0].address.city : ""
          )}/${slugify(
            address ? document?.c_linkedATMNew[0].address.line1 : ""
          )}`
        : "";

      const locationUrl = `${slugify(address ? address.region : "")}/${slugify(
        address ? address.city : ""
      )}/${slugify(address ? address.line1 : "")}`;
      const breadcrumbLocationLink=document?.c_linkedATMNew ? linkedATMlocationUrl : locationUrl;
      displayname = (
        <React.Fragment>
          <li>
            <Link
              href={
                baseurl + breadcrumbLocationLink
              }
              data-ya-track={`Breadcrumb 4`}
              eventName={`Breadcrumb 4`}
            >
              {document?.c_linkedATMNew
                ? address
                  ? document?.c_linkedATMNew[0].address.line1
                  : undefined
                : address?.line1}
            </Link>
          </li>
          <li>
            {document?.c_atmType == "SMART_ATM"
              ? "Smart ATM"
              : document?.c_atmType.replaceAll("_", " ")}
          </li>
        </React.Fragment>
      );
    } else if (meta?.entityType.id == "location") {
      displayname = <li>{address ? address.line1 : undefined} </li>;
    } else {
      displayname = <li>{name}</li>;
    }
    breadcrumb = breadcrumbsData.map((crumb:BreadCrumbsProps, i: number) => (
      <li key={i}>
        <Link 
        href={baseurl + crumb.slug}
        data-ya-track={`Breadcrumb ${i+1}`}
        eventName={`Breadcrumb ${i+1}`}>
          {crumb.name}</Link>
      </li>
    ));
  } else {
    displayname = <li>All</li>;
  }
  return (
    <div className="BreadCrumbs">
      <div className="container">
        <ul>
          {breadcrumb}
          {displayname}
        </ul>
      </div>
    </div>
  );
};
export default BreadCrumbs;
