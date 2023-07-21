import { Hours } from "./locations";
import { AddressType, ImageProps, ImageType } from "@yext/pages/components";
import { nearByLocation } from "./nearByLocation";
import { Address } from "./Address";
import { DirectoryParent } from "./DirectoryParent";


export interface DocumentDataProps {
    _site: SiteDataProps;
    name: string;
    c_atmType:string;
    geomodifier: string;
    c_heroImage: Image;
    c_heroCTA1: CtaData;
    c_heroCTA2: CtaData;
    address: AddressType | undefined;
    fax: string;
    c_routingNumber: string;
    c_primaryHoursPagesHeading: string;
    c_secondaryHoursPagesHeading: string;
    hours: Hours;
    mainPhone: string;
    driveThroughHours: Hours;
    timezone: string;
    googlePlaceId: number;
    c_titleBelowHero: string;
    services: [];
    c_bankOfferingList: [];
    c_customerCare: string;
    c_phoneNumber: string;
    c_monFriHeading: string;
    c_monFriTime: string;
    c_satHeading: string;
    c_satTime: string;
    c_telephoneBankingHeading: string;
    c_bankingNumber: string;
    c_lostOrStolenCardHeading: string;
    c_debitHeading: string;
    c_debitNumber: string;
    c_creditHeading: string;
    c_creditNumber: string;
    c_linkedATMNew: linkedATMProps[];
    c_financialAdvisorList: Array<string>;
    c_promotionSection: PromotionData;
    c_pagesProductSectionTitle: string;
    c_featuredProductList: Array<string>;
    c_pagesServiceSectionTitle: string;
    c_mobileServicesList: Array<string>;
    c_downloadAppHeading: string;
    c_downloadAppDescription: string;
    c_appStore: StoreData;
    c_playStore: StoreData;
    c_downloadAppPhoto: Image;
    meta: MetaData;
    dm_directoryParents: DirectoryParent[];
    additionalHoursText: string;
}

export interface BannerProps {
    name?: string;
    address?: Address;
    geomodifier?: string;
    heroImage?: { url: string };
    heroCTA1?: { label: string; link: string };
    heroCTA2?: { label: string };
    mainPhone?: string;
    fax?: string;
    routingNumber?: string;
    primaryHours?: Hours;
    secondaryHours?: Hours;
    primaryHoursPagesHeading: string;
    secondaryHoursPagesHeading: string;
    timezone: string;
    googlePlaceId: number;
    additionalHoursText: string;
    mobilePrimaryHoursTitle: string;
    mobileSecondaryHoursTitle: string;
    moneyPassText: string;
  }

export interface TreaserDetailProps {
    meta: meta ;
    address: Address;
    geomodifier?: string;
    hours?: Hours;
    timezone?: string;
    mainPhone?: string;
    c_linkedATMNew?: EntityReference[];
    heroCTA2?: HeroCTAProps;
    googlePlaceId?: number;
}
interface  entityTypeProps{
    id?:string | undefined;
}
  
interface meta  {
    entityType : entityTypeProps;
}


export interface SiteDataProps {
    name?: string;
    c_headerLogo?: Image;
    c_topNavigationLinks?: NavigationData[];
    c_mainMenuNavigation?: NavigationData[];
    c_footerLogo?: Image;
    c_footerLinks?: FooterLinkData[];
    c_socialLinks?: LinkData[];
    c_footerDescription?: string;
    c_partnerLinks?: LinkData[];
    c_pCMInvestmentProductsTitle?: string;
    c_pCMInvestmentProductsList?: Array<string>;
}

export interface NavigationData {
    link: string;
    label: string;
    linkType: LinkType;
}
 
export enum LinkType {
	OTHER = "OTHER",
	URL = "URL",
	PHONE = "PHONE",
	EMAIL = "Email",
}

export interface FooterLinkData {
    links: string;
    title: string;
}
  
export interface LinkData {
    link: string;
    icon: string;
}

export interface linkedATMProps {
    name: string;
    address:Address;
}
  
export interface StoreData {
    icon: string;
    link: string;
}
  
export interface PromotionData {
    title : string;
    subtitle : string;
    description : string;
    image : Image;
    cTA : CtaData;
}

export interface CtaData {
    label: string;
    link: string;
    linkType?:string;
}
export interface FooterLinkItem {
    title: string;
    links: CtaData[];
  }

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface HeroImageProps {
    url : string;
}
  
export interface HeroCTAProps {
    label : string;
    link : string;
}
  
export interface HoursProps {
    title?: string;
    hours: Hours;
    children?: React.ReactNode;
    additionalHoursText?: string;
    timezone?: string;
    reopenDate?: Date;
}
  
export interface AboutProps {
    description?: string;
    subheading?: string;
    image?: ImageThumbnail;
    CTA?: CtaData;
    title: string
}

export interface ContactProps {
    address: AddressType;
    mainPhone?: string;
    fax?: string;
    routingNumber?:string
}

export interface DigitalBankingCardProps {
    heading : string;
    serviceDetails : ServiceListItemProps[];
}

export interface ServiceListItemProps {
    title : string;
    image : ImageType;
    description : string;
}

export interface DownloadAppCardProps {
    heading: string;
    description: string
    appStore: ImageData;
    playStore: ImageData;
    downloadAppPhoto: ImageProps;
}

export interface ImageData {
    link: string;
    icon: ImageType;
}

export interface FeaturedProductProps {
    heading : string;
    productList : ProductListProps[];
}

export interface ProductListProps {
    title: string;
    description: string;
    cTA: CtaData;
}

export interface FinancialProfessionalCardProps {
    peopleList : PeopleList[];
}

export interface PeopleList {
    c_pagesSpecialty : string;
    name : string;
    headshot : ImageType;
    c_title : string;
    mainPhone: string;
    emails: string;
    c_mortgageOfficerCTA: CtaData;
}

export interface servicesDetails {
    titleBelowHero: string;
    services: [];
    bankOfferingList: [];
    customerCareHeading: string;
    customerCareNumber: string;
    monFriHeading: string;
    monFriTime: string;
    satHeading: string;
    satTime: string;
    telephoneBankingHeading: string;
    telephoneBankingNumber: string;
    lostOrStolenCardHeading: string;
    debitHeading: string;
    debitNumber: string;
    creditHeading: string;
    creditNumber: string;
    linkedATM: linkedATMProps[];
}

export interface linkedATMProps {
    name: string;
}

export interface ListProps {
    list : CtaData[];
    listItemClassName ?: string;
    linkClassName ?: string;
}

export interface CtaProps {
    buttonText: string;
    url?: string;
    dataTrackText?:string;
    className?:string;
}

export interface OpenCloseProps {
    hours: Hours;
    timezone: string;
}

export interface LayoutProps {
    _site : SiteDataProps;
}

export interface HeaderProps {
    _site : SiteDataProps;
}

export interface FooterProps {
    _site : SiteDataProps;
}

export interface NearbyProps {
    externalApiData : nearByLocation;
    relativepath : string;
}

export interface nearbyitems {
    meta : MetaData;
    address : AddressType;
    geomodifier : string;
    hours : Hours;
    timezone : string;
    mainPhone : string;
    c_linkedATMNew : EntityReference[];
    heroCTA2 : HeroCTAProps;
    googlePlaceId : number;
} 

export interface MetaData {
    entityType : EntityType;
    locale : string;
    id: string,    
}
export interface MetaProps{
    meta:MetaData
}

export interface EntityType {
    id : string;
    uid : number;
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export interface LinkingProps {
    props : NavigationData;
}
