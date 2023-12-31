import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { SiteData } from "../../types/locations";

export interface PageLayoutProps {
  children?: React.ReactNode;
  _site : SiteData;
}

const PageLayout = ({ children, _site }: PageLayoutProps) => {
  return (
    <div className="body-wrapper">
      <Header _site={_site} />
      {children}
      <Footer _site={_site} />
    </div>
  );
};

export default PageLayout;
