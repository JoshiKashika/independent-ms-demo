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

export enum C_atmType {
	ATM = "ATM",
	SMART_ATM = "Smart ATM",
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

export enum Type_1 {
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

export interface FacebookCallToAction {
	type: Type_1,
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

export enum PriceRange {
	UNSPECIFIED = "Unspecified",
	ONE = "$",
	TWO = "$$",
	THREE = "$$$",
	FOUR = "$$$$",
}

export interface WebsiteUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export default interface Atm {
	accessHours?: Hours,
	appleActionLinks?: AppleActionLinks[],
	appleBusinessDescription?: string,
	appleBusinessId?: string,
	appleBusinessIdDqe?: string,
	appleCompanyId?: string,
	appleCompanyIdDqe?: string,
	appleCoverPhoto?: Image,
	bingWebsiteOverride?: string,
	questionsAndAnswers?: boolean,
	driveThroughHours?: Hours,
	facebookAbout?: string,
	facebookWebsiteOverride?: string,
	frequentlyAskedQuestions?: FrequentlyAskedQuestions[],
	geomodifier?: string,
	googleEntityRelationship?: GoogleEntityRelationship,
	googleMyBusinessLabels?: string[],
	googlePlaceId?: string,
	googleShortName?: string,
	holidayHoursConversationEnabled?: boolean,
	impressum?: string,
	landingPageUrl?: string,
	neighborhood?: string,
	nudgeEnabled?: boolean,
	phoneticName?: string,
	primaryConversationContact?: string,
	reviewResponseConversationEnabled?: boolean,
	slug?: string,
	what3WordsAddress?: string,
	yelpWebsiteOverride?: string,
	additionalHoursText?: string,
	address: Address,
	alternatePhone?: string,
	description?: string,
	hours?: Hours,
	logo?: ComplexImage,
	name: string,
	cityCoordinate?: Coordinate,
	closed?: boolean,
	c_activeOnPages?: boolean,
	c_additionalDriveThruHoursText?: string,
	c_appStore?: C_appStore,
	c_atmType?: C_atmType,
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
	c_mONEYPASSText?: string,
	c_notificationBanner?: string,
	c_pagesProductSectionTitle?: string,
	c_pagesServiceSectionTitle?: string,
	c_pagesURL?: string,
	c_phoneNumber?: string,
	c_playStore?: C_playStore,
	c_promotionSection?: C_promotionSection,
	c_satHeading?: string,
	c_satTime?: string,
	c_secondaryHoursPagesHeading?: string,
	c_telephoneBankingHeading?: string,
	c_titleBelowHero?: string,
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	facebookOverrideCity?: string,
	facebookCoverPhoto?: Image,
	facebookCallToAction?: FacebookCallToAction,
	facebookDescriptor?: string,
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
	isoRegionCode?: string,
	keywords?: string[],
	localPhone?: string,
	locatedIn?: EntityReference,
	locationType?: LocationType,
	mainPhone?: string,
	mobilePhone?: string,
	phones?: string,
	pickupCoordinate?: Coordinate,
	priceRange?: PriceRange,
	routableCoordinate?: Coordinate,
	id: string,
	timezone?: string,
	tollFreePhone?: string,
	ttyPhone?: string,
	walkableCoordinate?: Coordinate,
	websiteUrl?: WebsiteUrl,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
}
