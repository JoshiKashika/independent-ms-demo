import { TemplateProps } from "@yext/pages/*";
import { nearByLocation } from "./nearByLocation";
export interface Interval {
	start: Date,
	end: Date,
}

export interface DayHour {
	openIntervals?: Interval[],
	isClosed?: boolean,
}

export interface HolidayHours {
	date: string,
	openIntervals?: Interval[],
	isClosed?: boolean,
	isRegularHours?: boolean,
}

export interface Hours {
	monday?: DayHour,
	tuesday?: DayHour,
	wednesday?: DayHour,
	thursday?: DayHour,
	friday?: DayHour,
	saturday?: DayHour,
	sunday?: DayHour,
	holidayHours?: HolidayHours[],
	reopenDate?: string,
}

export enum Category {
	BOOK_TRAVEL = "Book Travel",
	CHECK_IN = "Check in",
	FEES_POLICIES = "Fees Policies",
	FLIGHT_STATUS = "Flight Status",
	TICKETS = "Tickets",
	TICKETING = "Ticketing",
	AMENITIES = "Amenities",
	RESERVE = "Reserve",
	FRONT_DESK = "Front Desk",
	PARKING = "Parking",
	GIFT_CARD = "Gift Card",
	WAITLIST = "Waitlist",
	DELIVERY = "Delivery (Restaurant)",
	ORDER = "Order (Restaurant)",
	TAKEOUT = "Takeout",
	PICKUP = "Pickup (Restaurant)",
	RESERVE = "Reserve (Restaurant)",
	MENU = "Menu",
	APPOINTMENT = "Appointment",
	PORTFOLIO = "Portfolio",
	QUOTE = "Quote",
	SERVICES = "Services (Retail)",
	STORE_ORDERS = "Store Orders",
	STORE_SHOP = "Store Shop",
	STORE_SUPPORT = "Store Support",
	SCHEDULE = "Schedule",
	SHOWTIMES = "Showtimes",
	AVAILABILITY = "Availability",
	PRICING = "Pricing",
	ACTIVITIES = "Activities",
	BOOK = "Book",
	BOOK__HOTEL_ = "Book (Hotel)",
	BOOK__RIDE_ = "Book Ride",
	BOOK__TOUR_ = "Book Tour",
	CAREERS = "Careers",
	CHARGE = "Charge",
	COUPONS = "Coupons",
	DELIVERY__RETAIL_ = "Delivery (Retail)",
	DONATE = "Donate",
	EVENTS = "Events",
	ORDER__RETAIL_ = "Order (Retail)",
	OTHER_MENU = "Other Menu",
	PICKUP__RETAIL_ = "Pickup (Retail)",
	RESERVE__PARKING_ = "Reserve (Parking)",
	SHOWS = "Shows",
	SPORTS = "Sports",
	SUPPORT = "Support",
	TEE_TIME = "Tee Time",
	GIFT_CARD__RESTAURANT_ = "Gift Card (Restaurant)",
}

export interface AppleActionLinks {
	category: Category,
	appStoreUrl: string,
	quickLinkUrl: string,
	appName: string,
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

export default interface DocumentTemplateProps extends TemplateProps {
	relativePrefixToRoot : string,
	path:string,
	externalApiData:nearByLocation,
	type:string,
}

export interface FrequentlyAskedQuestions {
	question: string,
	answer?: string,
}

export enum Type {
	DEPARTMENT_IN = "Department In",
	INDEPENDENT_ESTABLISHMENT_IN = "Independent Establishment In",
}

export interface GoogleEntityRelationship {
	type: Type,
	placeId: string,
}

export enum PickupAndDeliveryServices {
	IN_STORE_PICKUP = "In-Store Pickup",
	CURBSIDE_PICKUP = "Curbside Pickup",
	PICKUP_NOT_OFFERED = "Pickup Not Offered",
	DELIVERY = "Delivery",
	SAME_DAY_DELIVERY = "Same Day Delivery",
	NO_CONTACT_DELIVERY = "No-Contact Delivery",
	DELIVERY_NOT_OFFERED = "Delivery Not Offered",
}

export enum Type_1 {
	POSTAL_CODE = "Postal Code",
	REGION = "State/Region",
	COUNTY = "County",
	CITY = "City",
	SUBLOCALITY = "Sublocality",
}

export interface ServiceAreaPlaces {
	name?: string,
	type?: Type_1,
}

export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export interface C_appStore {
	icon?: Image,
	link?: string,
}

export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_bankOfferingList {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface CTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_featuredProductList {
	title?: string,
	description?: string,
	cTA?: CTA,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export interface C_heroCTA1 {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_heroCTA2 {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export enum C_locatorServiceFilters {
	DRIVE_THRU = "Safe Deposit",
	WIRE_INTERNATIONAL = "Night Drop",
	NOTARY = "Notary",
	NIGHT_DEPOSIT = "Drive-Thru",
}

export interface C_mobileServicesList {
	image?: Image,
	title?: string,
	description?: string,
}

export interface C_mortgageOfficerCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_playStore {
	icon?: Image,
	link?: string,
}

export interface C_promotionSection {
	title?: string,
	subtitle?: string,
	description?: string,
	cTA?: CTA,
	image?: Image,
}

export interface Bios {
	label?: string,
	ids?: string[],
}

export interface Calendars {
	label?: string,
	ids?: string[],
}

export interface ProductLists {
	label?: string,
	ids?: string[],
}

export enum Type_2 {
	NONE = "None",
	BOOK_NOW = "Book Now",
	CALL_NOW = "Call Now",
	CONTACT_US = "Contact Us",
	SEND_MESSAGE = "Send Message",
	USE_APP = "Use App",
	PLAY_GAME = "Play Game",
	SHOP_NOW = "Shop Now",
	SIGN_UP = "Sign Up",
	WATCH_VIDEO = "Watch Video",
	SEND_EMAIL = "Send Email",
	LEARN_MORE = "Learn More",
	PURCHASE_GIFT_CARDS = "Purchase Gift Cards",
	ORDER_NOW = "Order Now",
	FOLLOW_PAGE = "Follow Page",
}

export interface Logo {
	alternateText:string,
	url:string,
	height:number,
	width:number,
}

interface SiteImage extends Logo {
	clickthroughUrl : string,
	details : string
}
export interface SiteData {
	c_footerDescription : string,
	c_footerLinks : [],
	c_footerLogo : Logo,
	c_headerLogo : SiteImage
	c_mainMenuNavigation :[],
	c_pCMInvestmentProductsList : Array<string> | undefined,
	c_pCMInvestmentProductsTitle : string,
	c_partnerLinks : [],
	c_socialLinks : LinkType,
	c_topNavigationLinks : [],
	id : string,
	name:string
}
export interface SiteDataProps {
  handleEndPoimtCallBack: string;
	_site : SiteData;
} 
export interface FacebookCallToAction {
	type: Type_2,
	value?: string,
}

export interface FeaturedMessage {
	description?: string,
	url?: string,
}

export enum LocationType {
	LOCATION = "Location",
	HEALTHCARE_FACILITY = "Healthcare Facility",
	HEALTHCARE_PROFESSIONAL = "Healthcare Professional",
	ATM = "ATM",
	RESTAURANT = "Restaurant",
	HOTEL = "Hotel",
}

export interface MenuUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface OrderUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export enum PaymentOptions {
	AFTERPAY = "Afterpay",
	ALIPAY = "Alipay",
	AMERICANEXPRESS = "American Express",
	ANDROIDPAY = "Google Pay",
	APPLEPAY = "Apple Pay",
	ATM = "ATM",
	ATMQUICK = "ATM Quick",
	BACS = "BACS",
	BANCONTACT = "Bancontact",
	BANKDEPOSIT = "Bank Deposit",
	BANKPAY = "Bank Pay",
	BGO = "Bank/Giro Overschrijving",
	BITCOIN = "Bitcoin",
	Bar = "Bargeld",
	CARTASI = "CartaSi",
	CASH = "Cash",
	CCS = "CCS",
	CHECK = "Check",
	CONB = "Contactloos betalen",
	CONTACTLESSPAYME = "Contactless Payment",
	CVVV = "Cadeaubon/VVV bon",
	DEBITNOTE = "Debit Note",
	DINERSCLUB = "Diners Club",
	DIRECTDEBIT = "Direct Debit",
	DISCOVER = "Discover",
	ECKARTE = "Girokarte",
	ECOCHEQUE = "EcoCheque",
	EKENA = "E-kena",
	EMV = "Elektronische Maaltijdcheques",
	FINANCING = "Financing",
	GOPAY = "GoPay",
	HAYAKAKEN = "Hayakaken",
	HEBAG = "He-Bag",
	IBOD = "iBOD",
	ICCARDS = "IC Cards",
	ICOCA = "Icoca",
	ID = "iD",
	IDEAL = "iDeal",
	INCA = "Incasso",
	INVOICE = "Invoice",
	JCB = "JCB",
	JCoinPay = "J−Coin Pay",
	JKOPAY = "JKO Pay",
	KITACA = "Kitaca",
	KLA = "Klantenkaart",
	KLARNA = "Klarna",
	LINEPAY = "LINE Pay",
	MAESTRO = "Maestro",
	MANACA = "Manaca",
	MASTERCARD = "MasterCard",
	MIPAY = "Mi Pay",
	MONIZZE = "Monizze",
	MPAY = "MPay",
	Manuelle_Lastsch = "Manuelle Lastschrift",
	Merpay = "メルPay",
	NANACO = "nanaco",
	NEXI = "Nexi",
	NIMOCA = "Nimoca",
	OREM = "Onder Rembours",
	PASMO = "Pasmo",
	PAYBACKPAY = "Payback Pay",
	PAYBOX = "Paybox",
	PAYCONIQ = "Payconiq",
	PAYPAL = "PayPal",
	PAYPAY = "PayPay",
	PAYSEC = "PaySec",
	PIN = "PIN",
	POSTEPAY = "Postepay",
	QRCODE = "QR Code Payment",
	QUICPAY = "QUICPay",
	RAKUTENEDY = "Rakuten Edy",
	RAKUTENPAY = "楽天Pay",
	SAMSUNGPAY = "Samsung Pay",
	SODEXO = "Sodexo",
	SUGOCA = "Sugoca",
	SUICA = "Suica",
	SWISH = "Swish",
	TICKETRESTAURANT = "Ticket Restaurant",
	TOICA = "Toica",
	TRAVELERSCHECK = "Traveler's Check",
	TSCUBIC = "TS CUBIC",
	TWINT = "Twint",
	UNIONPAY = "China UnionPay",
	VEV = "Via een verzekering",
	VISA = "Visa",
	VISAELECTRON = "Visa Electron",
	VOB = "Vooruit betalen",
	VOUCHER = "Voucher",
	VPAY = "V PAY",
	WAON = "WAON",
	WECHATPAY = "WeChat Pay",
	WIRETRANSFER = "Wire Transfer",
	Yucho_Pay = "ゆうちょPay",
	ZELLE = "Zelle",
	AuPay = "auPay",
	DBarai = "d払い ",
	Überweisung = "Banküberweisung",
}

export enum PriceRange {
	UNSPECIFIED = "Unspecified",
	ONE = "$",
	TWO = "$$",
	THREE = "$$$",
	FOUR = "$$$$",
}

export interface ReservationUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface ServiceArea {
	places?: string[],
}

export enum Presentation {
	BUTTON = "Button",
	LINK = "Link",
}

export interface UberLink {
	text?: string,
	presentation: Presentation,
}

export interface UberTripBranding {
	text: string,
	url: string,
	description: string,
}

export interface WebsiteUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface ComplexVideo {
	url: string,
	video?: string,
	description?: string,
}

export default interface Location {
	accessHours?: Hours,
	appleActionLinks?: AppleActionLinks[],
	appleBusinessDescription?: string,
	appleBusinessId?: string,
	appleBusinessIdDqe?: string,
	appleCompanyId?: string,
	appleCompanyIdDqe?: string,
	appleCoverPhoto?: Image,
	bingWebsiteOverride?: string,
	blackOwnedBusiness?: boolean,
	brunchHours?: Hours,
	questionsAndAnswers?: boolean,
	covid19InformationUrl?: string,
	covidMessaging?: string,
	deliveryHours?: Hours,
	deliveryUrl?: string,
	dineInHours?: Hours,
	driveThroughHours?: Hours,
	facebookAbout?: string,
	facebookWebsiteOverride?: string,
	frequentlyAskedQuestions?: FrequentlyAskedQuestions[],
	fullyVaccinatedStaff?: boolean,
	geomodifier?: string,
	googleEntityRelationship?: GoogleEntityRelationship,
	googleMyBusinessLabels?: string[],
	googlePlaceId?: string,
	googleShortName?: string,
	happyHours?: Hours,
	holidayHoursConversationEnabled?: boolean,
	impressum?: string,
	kitchenHours?: Hours,
	landingPageUrl?: string,
	linkedInUrl?: string,
	neighborhood?: string,
	nudgeEnabled?: boolean,
	onlineServiceHours?: Hours,
	phoneticName?: string,
	pickupAndDeliveryServices?: PickupAndDeliveryServices[],
	pickupHours?: Hours,
	primaryConversationContact?: string,
	proofOfVaccinationRequired?: boolean,
	reviewResponseConversationEnabled?: boolean,
	seniorHours?: Hours,
	serviceAreaPlaces?: ServiceAreaPlaces[],
	slug?: string,
	takeoutHours?: Hours,
	what3WordsAddress?: string,
	yelpWebsiteOverride?: string,
	additionalHoursText?: string,
	address: Address,
	addressHidden?: boolean,
	alternatePhone?: string,
	androidAppUrl?: string,
	associations?: string[],
	brands?: string[],
	description?: string,
	hours?: Hours,
	logo?: ComplexImage,
	name: string,
	cityCoordinate?: Coordinate,
	closed?: boolean,
	c_activeOnPages?: boolean,
	c_additionalDriveThruHoursText?: string,
	c_appStore?: C_appStore,
	c_bankOfferingList?: C_bankOfferingList[],
	c_bankingNumber?: string,
	c_creditHeading?: string,
	c_creditNumber?: string,
	c_customerCare?: string,
	c_debitHeading?: string,
	c_debitNumber?: string,
	c_downloadAppDescription?: string,
	c_downloadAppHeading?: string,
	c_downloadAppPhoto?: ComplexImage,
	c_featuredProductList?: C_featuredProductList[],
	c_financialAdvisorList?: EntityReference[],
	c_heroCTA1?: C_heroCTA1,
	c_heroCTA2?: C_heroCTA2,
	c_heroImage?: Image,
	c_linkedATMNew?: EntityReference[],
	c_locatorServiceFilters?: C_locatorServiceFilters[],
	c_lostOrStolenCardHeading?: string,
	c_primaryHoursPagesHeading?: string,
	c_metaDescription?: string,
	c_metaTitle?: string,
	c_mobilePrimaryHoursTitle?: string,
	c_mobileSecondaryHoursTitle?: string,
	c_mobileServicesList?: C_mobileServicesList[],
	c_monFriHeading?: string,
	c_monFriTime?: string,
	c_mortgageOfficerCTA?: C_mortgageOfficerCTA,
	c_notificationBanner?: string,
	c_pagesProductSectionTitle?: string,
	c_pagesServiceSectionTitle?: string,
	c_pagesURL?: string,
	c_phoneNumber?: string,
	c_playStore?: C_playStore,
	c_promotionSection?: C_promotionSection,
	c_routingNumber?: string,
	c_satHeading?: string,
	c_satTime?: string,
	c_secondaryHoursPagesHeading?: string,
	c_telephoneBankingHeading?: string,
	c_titleBelowHero?: string,
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	bios?: Bios,
	calendars?: Calendars,
	productLists?: ProductLists,
	emails?: string[],
	facebookOverrideCity?: string,
	facebookCoverPhoto?: Image,
	facebookCallToAction?: FacebookCallToAction,
	facebookDescriptor?: string,
	facebookEmail?: string,
	facebookName?: string,
	facebookPageUrl?: string,
	facebookParentPageId?: string,
	facebookProfilePhoto?: Image,
	facebookStoreId?: string,
	facebookVanityUrl?: string,
	fax?: string,
	featuredMessage?: FeaturedMessage,
	photoGallery?: ComplexImage[],
	geocodedCoordinate?: Coordinate,
	googleAccountId?: string,
	googleCoverPhoto?: Image,
	googleProfilePhoto?: Image,
	googleWebsiteOverride?: string,
	instagramHandle?: string,
	iosAppUrl?: string,
	isoRegionCode?: string,
	keywords?: string[],
	languages?: string[],
	localPhone?: string,
	locationType?: LocationType,
	mainPhone?: string,
	menuUrl?: MenuUrl,
	mobilePhone?: string,
	orderUrl?: OrderUrl,
	paymentOptions?: PaymentOptions[],
	phones?: string,
	pickupCoordinate?: Coordinate,
	priceRange?: PriceRange,
	products?: string[],
	reservationUrl?: ReservationUrl,
	routableCoordinate?: Coordinate,
	serviceArea?: ServiceArea,
	services?: string[],
	shortName35?: string,
	shortName64?: string,
	specialities?: string[],
	id: string,
	timezone?: string,
	tollFreePhone?: string,
	ttyPhone?: string,
	twitterHandle?: string,
	uberClientId?: string,
	uberLink?: UberLink,
	uberTripBranding?: UberTripBranding,
	walkableCoordinate?: Coordinate,
	websiteUrl?: WebsiteUrl,
	yearEstablished?: number,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
	videos?: ComplexVideo[],
}
