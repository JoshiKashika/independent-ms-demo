// locator.tsx

import * as React from "react";
import "../assets/css/index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
  TemplateConfig,
  HeadConfig,
} from "@yext/pages";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  AnswerExperienceConfig,
  baseurl,
  robotTagStatus,
} from "../config/globalConfig";
import SearchLayout from "../components/locatorPage/SearchLayout";
import { StaticData } from "../../sites-global/staticData";
import logo from "../assets/images/logo.webp";
import "../assets/css/locator.css";
import { DocumentDataProps } from "../types/PropTypes";
import { JsonLd } from "react-schemaorg";
import { AnalyticsProvider, AnalyticsScopeProvider, Link } from "@yext/pages/components";
import { GoogleMapContextProvider } from "../components/commons/GoogleMapContextProvider";
import Header from "../components/layouts/Header";
import favicon from "../assets/images/favicon.png";

export const config: TemplateConfig = {
  stream: {
    $id: "Locator",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: ["name", "slug", "c_metaTitle", "c_metaDescription"],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["global-data"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};
export const getPath: GetPath<TemplateProps> = () => {
  return `search`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  // get metaTitle
  const metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : `Independent Financial Branch and ATM Locator`;

  // get metaDescription
  const metaDescription = `${
    document.c_metaDescription
      ? document.c_metaDescription
      : `Find an Independent Financial location near you.`
  }`;

  // get canonical URL link
  const canonicalLink = baseurl + "search";

  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=3",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
          type:"image/png",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: metaDescription,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "author",
          content: StaticData.Brandname,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: robotTagStatus,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: canonicalLink,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: metaDescription,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: metaTitle,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: document.logo ? document.logo.image.url : logo,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${baseurl}search`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:title",
          content: metaTitle,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: metaDescription,
        },
      },
      /// twitter tag
    ],
  };
};

const searcher = provideHeadless({
  apiKey: AnswerExperienceConfig.apiKey,
  experienceKey: AnswerExperienceConfig.experienceKey,
  locale: AnswerExperienceConfig.locale,
  endpoints: AnswerExperienceConfig.endpoints,
  verticalKey: AnswerExperienceConfig.verticalKey,
});

type LocatorProps = TemplateRenderProps & {
  document: DocumentDataProps;
};

const Locator: Template<LocatorProps> = ({ document, path, __meta }: LocatorProps) => {
  const { _site } = document;
  const templateData = { document: document, __meta: __meta }
  return (
    <>
      <JsonLd<FinancialService>
        item={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "Search",
          image: `${document.logo ? document.logo.image.url : logo}`,
          "@id": `${baseurl}${path}`,
          url: `${baseurl}${path}`,
        }}
      />
      <Link href="#first-anchor" className="focusable" id="skip-nav">
        Skip to content
      </Link>
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        <AnalyticsScopeProvider name={""}>
      <div className="body-wrapper">
        <Header _site={_site} />
        <Link href="#skip-nav" className="focusable" id="first-anchor">
          Return to Nav
        </Link>
        <SearchHeadlessProvider searcher={searcher}>
          <GoogleMapContextProvider>
            <SearchLayout _site={_site} />
          </GoogleMapContextProvider>
        </SearchHeadlessProvider>
      </div>
      </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Locator;
