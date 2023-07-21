/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Pages system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  // GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../assets/css/index.css";
import Banner from "../components/locationDetail/Banner";
import PageLayout from "../components/layouts/PageLayout";
import ServiceList from "../components/locationDetail/Services";
import FinancialProfessionalCard from "../components/locationDetail/FinancialProfessionalCard";
import About from "../components/locationDetail/About";
import FeaturedProducts from "../components/locationDetail/FeaturedProducts";
import DigitalBankingCard from "../components/locationDetail/DigitalBankingSection";
import DownloadAppCard from "../components/locationDetail/DownloadAppCard";
import { nearByLocation } from "../types/nearByLocation";
import { AnswerExperienceConfig, baseurl, robotTagStatus, slugify, AnalyticsEnableDebugging, AnalyticsEnableTrackingCookie } from "../config/globalConfig";
import Nearby from "../components/locationDetail/Nearby";
import { StaticData } from "../../sites-global/staticData";
import BreadCrumbs from "../components/layouts/Breadcrumbs";
import logo from "../assets/images/logo.webp";
import { JsonLd } from "react-schemaorg";
import DocumentTemplateProps from "../types/locations";
import { AnalyticsProvider, AnalyticsScopeProvider, Link } from "@yext/pages/components";
import favicon from "../assets/images/favicon.png";



interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string; // The day of the week (e.g., "Monday", "Tuesday", etc.)
  opens?: string; // The opening time (e.g., "09:00")
  closes?: string; // The closing time (e.g., "18:00")
}

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "location",
    // Defines the scope of entities that qualify for this stream.
    // You can use entityTypes, savedFilterIds, and/or entityIds
    filter: {
      entityTypes: ["location", "atm"],
      savedFilterIds:["539408691"],
    },
    // Specifies the exact data that each generated document will contain.
    // This data is passed in directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "description",
      "slug",
      "logo",
      "geocodedCoordinate",
      "photoGallery",

      /* Banner fields */
      "name",
      "geomodifier",
      "c_heroImage",
      "c_heroCTA1",
      "c_heroCTA2",
      "address",
      "mainPhone",
      "fax",
      "c_routingNumber",
      "c_primaryHoursPagesHeading",
      "c_mobilePrimaryHoursTitle",
      "c_secondaryHoursPagesHeading",
      "c_mobileSecondaryHoursTitle",
      "hours",
      "driveThroughHours",
      "timezone",
      "displayCoordinate",
      "yextDisplayCoordinate",
      "googlePlaceId",
      "c_mONEYPASSText",

      /* Services section */
      "c_titleBelowHero",
      "services",
      "c_bankOfferingList",
      "c_customerCare",
      "c_phoneNumber",
      "c_monFriHeading",
      "c_monFriTime",
      "c_satHeading",
      "c_satTime",
      "c_telephoneBankingHeading",
      "c_bankingNumber",
      "c_lostOrStolenCardHeading",
      "c_debitHeading",
      "c_debitNumber",
      "c_creditHeading",
      "c_creditNumber",
      "c_linkedATMNew.name",
      "c_linkedATMNew.address",
      "c_atmType",
      "additionalHoursText",

      /*financial professional */
      "c_financialAdvisorList.name",
      "c_financialAdvisorList.mainPhone",
      "c_financialAdvisorList.emails",
      "c_financialAdvisorList.c_pagesSpecialty",
      "c_financialAdvisorList.c_title",
      "c_financialAdvisorList.headshot",
      "c_financialAdvisorList.c_mortgageOfficerCTA",

      /* about section */
      "c_promotionSection",

      /* featured products section */
      "c_pagesProductSectionTitle",
      "c_featuredProductList",

      /* digital banking section */
      "c_pagesServiceSectionTitle",
      "c_mobileServicesList",

      /* download App */
      "c_downloadAppHeading",
      "c_downloadAppDescription",
      "c_appStore",
      "c_playStore",
      "c_downloadAppPhoto",

      // directory parents
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
    ],
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
    // transform: {
    //   replaceOptionValuesWithDisplayNames: ["paymentOptions"],
    // },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: To preview production URLs locally, you must return document.slug from this function
 * and ensure that each entity has the slug field pouplated.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  const slugpath = `${slugify(document.address.region)}/${slugify(document.address.city)}/${slugify(document.address.line1)}`;
  if (document.meta.entityType.id === 'atm') {
    return `${slugpath}/atm`;
  }
  return slugpath;
};


/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document
}): HeadConfig => {

  // set canonicalPath
  const canonicalPath = (`${slugify(document.address.region)}/${slugify(document.address.city)}/${slugify(document.address.line1)}`);
  document.meta.entityType.id === 'atm' ? `${canonicalPath}/atm` : canonicalPath

  // get metaTitle
  const metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : `Independent Financial in ${document.address.city}, ${document.address.region} | ${document.address.line1}`;

  // get metaDescription
  const metaDescription = `${document.c_metaDescription
    ? document.c_metaDescription
    : `Independent Financial provides a wide range of relationship-driven banking products and services tailored to meet the needs of businesses, professional organizations, community groups and entrepreneurs, as well as busy families.`
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
          content: robotTagStatus
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
          property: "og:url",
          content: baseurl+canonicalPath,
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
          content: document.logo?document.logo.image.url:logo,
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

type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async ( data ) => {

  const location = `${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.latitude : data.document.displayCoordinate.latitude},${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.longitude : data.document.displayCoordinate.longitude}`;

  const url = `${AnswerExperienceConfig.endpoints.entitiesSearch}?radius=2500&api_key=${AnswerExperienceConfig.apiKey}&v=20220511&location=${location}&entityTypes=location,atm&limit=3&offset=1`

  const externalApiData = (await fetch(url).then(( res ) =>
    res.json()

  )) as nearByLocation;
  return { ...data, externalApiData };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */

const Location: Template<DocumentTemplateProps> = ({
  relativePrefixToRoot,
  document,
  __meta,
  path,
  externalApiData,
}:DocumentTemplateProps) => {
  const {
    _site,
    meta,
    name,
    geomodifier,
    c_heroImage,
    c_heroCTA1,
    c_heroCTA2,
    address,
    fax,
    c_routingNumber,
    c_primaryHoursPagesHeading,
    c_mobilePrimaryHoursTitle,
    c_secondaryHoursPagesHeading,
    c_mobileSecondaryHoursTitle,
    hours,
    c_mONEYPASSText,
    mainPhone,
    driveThroughHours,
    timezone,
    googlePlaceId,
    c_titleBelowHero,
    services,
    c_bankOfferingList,
    c_customerCare,
    c_phoneNumber,
    c_monFriHeading,
    c_monFriTime,
    c_satHeading,
    c_satTime,
    c_telephoneBankingHeading,
    c_bankingNumber,
    c_lostOrStolenCardHeading,
    c_debitHeading,
    c_debitNumber,
    c_creditHeading,
    c_creditNumber,
    c_linkedATMNew,
    c_financialAdvisorList,
    c_promotionSection,
    c_pagesProductSectionTitle,
    c_featuredProductList,
    c_pagesServiceSectionTitle,
    c_mobileServicesList,
    c_downloadAppHeading,
    c_downloadAppDescription,
    c_appStore,
    c_playStore,
    c_downloadAppPhoto,
    dm_directoryParents,
    additionalHoursText,
  } = document;

const templateData = { document: document, __meta: __meta };

/**Breadcrumb Schema for Location Template */
const breadcrumbScheme = [];

let slugcomb = "";
const branchPath = `${slugify(address.region)}/${slugify(address.city)}/${slugify(address.line1)}`;
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
  } else if (dm_directoryParents[i]?.meta?.entityType.id == "ce_city") {
    dm_directoryParents[i].name;
    slugcomb = dm_directoryParents[i].slug;
    breadcrumbScheme.push({
      "@type": "ListItem",
      position: i,
      item: {
        "@id": baseurl + slugcomb,
        name: dm_directoryParents[i].name,
      },
    });
  }
}
if(meta?.entityType.id=="location"){
breadcrumbScheme.push({
  "@type": "ListItem",
  position: 4,
  item: {
    "@id": `${baseurl}${path}`,
    name: address.line1,
  },
})
}
else if(meta?.entityType.id=="atm"){
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": `${baseurl}${branchPath}`,
      name: address.line1,
    },
  })
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 5,
    item: {
      "@id": `${baseurl}${path}`,
      name: "Smart ATM",
    },
  })
}


/** Hours Schema for Location Template */
  const hoursSchema = [];
  if (hours) {
    for (const key in hours) {
      if (Object.prototype.hasOwnProperty.call(hours, key)) {
        let openIntervalsSchema: OpeningHoursSpecification | null = null;
        if (key !== "holidayHours") {
          if (hours[key].isClosed) {
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: key,
            };
          } else {
            let end = "";
            let start = "";
            if (typeof hours[key].openIntervals != "undefined") {
              const openIntervals = hours[key].openIntervals;
              for (const o in openIntervals) {
                if (Object.prototype.hasOwnProperty.call(openIntervals, o)) {
                  end = openIntervals[o].end;
                  start = openIntervals[o].start;
                }
              }
            }
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              closes: end,
              dayOfWeek: key,
              opens: start,
            };
          }
        }
        hoursSchema.push(openIntervalsSchema);
      }
    }
  }
  
  return (
    <>
    <JsonLd<FinancialService>
        item={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: `${document?.name} ${document?.geomodifier}`,
          image: `${document.logo ? document.logo.image.url : logo}`,
          "@id": `${baseurl}${path}`,
          url: `${baseurl}${path}`,
          telephone: mainPhone,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: document?.yextDisplayCoordinate?.latitude,
            longitude: document?.yextDisplayCoordinate?.longitude,
          },
          openingHoursSpecification: hoursSchema,
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbScheme,
        }}
      />
      <Link href="#first-anchor" className="focusable" id="skip-nav">Skip to content</Link>
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={"Location"}>
      <PageLayout _site={_site}>
        <BreadCrumbs name={name} breadcrumbs={dm_directoryParents} baseUrl={relativePrefixToRoot} meta={meta} address={address} document={document} />
        <Link href="#skip-nav" className="focusable" id="first-anchor">Return to Nav</Link>
        <Banner
          name={name}
          address={address}
          geomodifier={geomodifier}
          heroImage={c_heroImage}
          heroCTA1={c_heroCTA1}
          heroCTA2={c_heroCTA2}
          mainPhone={mainPhone}
          fax={fax}
          routingNumber={c_routingNumber}
          primaryHoursPagesHeading={c_primaryHoursPagesHeading}
          mobilePrimaryHoursTitle={c_mobilePrimaryHoursTitle}
          secondaryHoursPagesHeading={c_secondaryHoursPagesHeading}
          mobileSecondaryHoursTitle={c_mobileSecondaryHoursTitle}
          primaryHours={hours}
          secondaryHours={driveThroughHours}
          timezone={timezone}
          googlePlaceId={googlePlaceId}
          additionalHoursText={additionalHoursText}
          moneyPassText={c_mONEYPASSText}
        />

        {c_titleBelowHero ?
          <ServiceList
            titleBelowHero={c_titleBelowHero}
            services={services}
            bankOfferingList={c_bankOfferingList}
            customerCareHeading={c_customerCare}
            customerCareNumber={c_phoneNumber}
            monFriHeading={c_monFriHeading}
            monFriTime={c_monFriTime}
            satHeading={c_satHeading}
            satTime={c_satTime}
            telephoneBankingHeading={c_telephoneBankingHeading}
            telephoneBankingNumber={c_bankingNumber}
            lostOrStolenCardHeading={c_lostOrStolenCardHeading}
            debitHeading={c_debitHeading}
            debitNumber={c_debitNumber}
            creditHeading={c_creditHeading}
            creditNumber={c_creditNumber}
            linkedATM={c_linkedATMNew}
            address={address}  
            relativepath={relativePrefixToRoot}
            entityType={meta.entityType.id}      
          /> :
          <></>
        }

        {c_financialAdvisorList ? <FinancialProfessionalCard peopleList={c_financialAdvisorList} />
          : <></>
        }

        {c_promotionSection.title ?
          <About
            title={c_promotionSection.title}
            subheading={c_promotionSection.subtitle}
            description={c_promotionSection.description}
            image={c_promotionSection.image}
            CTA={c_promotionSection.cTA}
          />
          : <></>
        }

        {c_pagesProductSectionTitle ?
          <FeaturedProducts
            heading={c_pagesProductSectionTitle}
            productList={c_featuredProductList}
          />
          : <></>
        }

        {c_pagesServiceSectionTitle ?
          <DigitalBankingCard
            heading={c_pagesServiceSectionTitle}
            serviceDetails={c_mobileServicesList} />
          : <></>
        }

        {c_downloadAppHeading ?
          <DownloadAppCard
            heading={c_downloadAppHeading}
            description={c_downloadAppDescription}
            appStore={c_appStore}
            playStore={c_playStore}
            downloadAppPhoto={c_downloadAppPhoto}
          /> : <></>
        }
        <Nearby
          externalApiData={externalApiData}
          relativepath={relativePrefixToRoot}
        />
      </PageLayout>
      </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Location;
