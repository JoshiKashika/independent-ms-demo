import { Image, LinkType } from "./PropTypes";

export interface site{
    name:string,
    c_headerLogo:Image,
    c_topNavigationLinks:LinkType[],
    c_mainMenuNavigation:LinkType[],
    c_footerLogo:Image,
    c_footerLinks:LinkType[],
    c_socialLinks:LinkType,
    c_footerDescription:string|undefined,
    c_partnerLinks:LinkType[],
    c_pCMInvestmentProductsTitle:string,
    c_pCMInvestmentProductsList?: string[]
}