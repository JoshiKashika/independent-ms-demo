import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/layouts/PageLayout";
import BreadCrumbs from "../components/layouts/Breadcrumbs";
import "../assets/css/index.css";
import "../assets/css/dm.css";
import SearchBar from "../components/SearchBar";
import { Wrapper } from "@googlemaps/react-wrapper";
import {
  baseurl,
  googleMapsApiKey,
  robotTagStatus,
  AnalyticsEnableDebugging, 
  AnalyticsEnableTrackingCookie
} from "../config/globalConfig";
import { StaticData } from "../../sites-global/staticData";
import TeaserLocationCard from "../components/commons/TeaserLocationCard";
import { DirectoryChild } from "../types/DirectoryChild";
import logo from "../assets/images/logo.webp";
import { JsonLd } from "react-schemaorg";
import DocumentTemplateProps from "../types/locations";
import { AnalyticsProvider, AnalyticsScopeProvider, Link } from "@yext/pages/components";
import { DirectoryParent } from "../types/DirectoryParent";
import favicon from "../assets/images/favicon.png";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "location-city",
    filter: {
      savedFilterIds: [
        "dm_independent-financial-directory-manager_address_city",
      ],
    },
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_metaTitle",
      "c_metaDescription",
      "dm_baseEntityCount",
      // directory parents
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
      // directory childre
      "dm_directoryChildren.geomodifier",
      "dm_directoryChildren.address",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.c_linkedATMNew",
      "dm_directoryChildren.googlePlaceId",
      "dm_directoryChildren.meta",
      "dm_directoryChildren.name",
      "dm_directoryChildren.timezone",
    ],
    // Defines the scope of entities that qualify for this stream.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: To preview production URLs locally, you must return document.slug from this function
 * and ensure that each entity has the slug field pouplated.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  // set canonicalPath
  const canonicalPath = `${document.slug}`;

  const directoryParent = document.dm_directoryParents.filter(
    (directoryParent: DirectoryParent) => {
      return directoryParent.meta.entityType.id == "ce_region";
    }
  );

  let region = "";
  if (directoryParent[0]?.c_addressRegionDisplayName) {
    region = directoryParent[0]?.c_addressRegionDisplayName;
  }
  // get metaTitle
  const metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : `Independent Financial locations in ${document.name}, ${region}`;

  // get metaDescription
  const metaDescription = `${
    document.c_metaDescription
      ? document.c_metaDescription
      : `Browse all Independent Financial locations in ${document.name}, ${region}.`
  }`;

  // get canonical URL link
  const canonicalLink = `${baseurl}${canonicalPath}`;

  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=3",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
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
          property: "og:url",
          content: baseurl + document.slug,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "keywords",
          content: "",
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
          property: "og:type",
          content: `website`,
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

const City: Template<DocumentTemplateProps> = ({
  relativePrefixToRoot,
  document,
  __meta,
  path,
}: DocumentTemplateProps) => {
  const {
    _site,
    name,
    meta,
    dm_directoryParents,
    dm_baseEntityCount,
    dm_directoryChildren,
  } = document;

  const templateData = { document: document, __meta: __meta };
  /**Breadcrumb Schema for City Template */
  const breadcrumbScheme = [];
  let slugcomb = "";
  for (let i = 0; i < dm_directoryParents?.length; i++) {
    if (dm_directoryParents[i]?.meta?.entityType.id == "ce_country") {
      dm_directoryParents[i].name;
      slugcomb = dm_directoryParents[i].slug;
      breadcrumbScheme.push({
        "@type": "ListItem",
        position: i,
        item: {
          "@id": baseurl + slugcomb,
          name: "All",
        },
      });
    } else if (dm_directoryParents[i]?.meta?.entityType.id == "ce_region") {
      dm_directoryParents[i].name;
      slugcomb = dm_directoryParents[i].slug;
      breadcrumbScheme.push({
        "@type": "ListItem",
        position: i,
        item: {
          "@id": baseurl + slugcomb,
          name: dm_directoryParents[i].c_addressRegionDisplayName,
        },
      });
    }
  }
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 3,
    item: {
      "@id": `${baseurl}${path}`,
      name: name,
    },
  });

  const directoryParent = document.dm_directoryParents.filter(
    (directoryParent: DirectoryParent) => {
      return directoryParent.meta.entityType.id == "ce_region";
    }
  );

  let region = "";
  if (directoryParent[0]?.c_addressRegionDisplayName) {
    region = directoryParent[0]?.c_addressRegionDisplayName;
  }

  return (
    <>
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbScheme,
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
        {" "}
        <AnalyticsScopeProvider name={"City"}>
      <PageLayout _site={_site}>
        <BreadCrumbs
          name={name}
          breadcrumbs={dm_directoryParents}
          meta={meta}
        />
        <Link href="#skip-nav" className="focusable" id="first-anchor">
          Return to Nav
        </Link>
        <div className="Nearby Nearby--ace cityPageWrap">
          <div className="dm-banner-details">
            <div className="container">
              <div className="Hero-container">
                <h1 className="Hero-title">
                  {dm_baseEntityCount} {StaticData.Herotitle}
                  <span className="Hero-subtitle">
                    in {name}
                    {region ? ", " + region : ""}
                  </span>
                </h1>
                <Wrapper
                  apiKey={googleMapsApiKey}
                  language={"en"}
                  libraries={["places", "geometry"]}
                >
                  <SearchBar/>
                </Wrapper>
              </div>
            </div>
          </div>
          <div className="dm-loc-list">
            <div className="container">
              <ul className="Nearby-locs Nearby-row Nearby-row--widen">
                {dm_directoryChildren && dm_directoryChildren.map(
                  (items: DirectoryChild, i: number) => {
                    return (
                      <React.Fragment key={i}>
                        <li className="Nearby-loc">
                          <TeaserLocationCard
                            teaserDetails={items}
                            basePath={relativePrefixToRoot}
                          />
                        </li>
                      </React.Fragment>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      </PageLayout>
      </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default City;
