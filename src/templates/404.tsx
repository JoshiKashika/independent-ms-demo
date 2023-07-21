import * as React from "react";
import "../assets/css/index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetRedirects
} from "@yext/pages";
import { Link } from "@yext/pages/components";
import DocumentTemplateProps from "../types/locations";
import favicon from "../assets/images/favicon.png";

export const config: TemplateConfig = {
  name: "404",
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 */
export const getRedirects: GetRedirects<TemplateProps> = () => {
    return [`/404.html`, `/index.html`];
  };


export const getPath: GetPath<TemplateProps> = () => {
  return `404.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "404 Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
    ],
  };
};

const FourOhFour: Template<DocumentTemplateProps> = ({relativePrefixToRoot} : DocumentTemplateProps) => {
  return (
    <>
          <div>
            <p>Sorry we could not find the URL you are looking for.</p>
            <p>If you are not automatically redirect to our homepage,&nbsp;    <Link href={`${relativePrefixToRoot}index.html`}>please click here</Link> </p>
          </div>
    </>
  );
};

export default FourOhFour;