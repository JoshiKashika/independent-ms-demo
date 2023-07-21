import * as React from "react";
import { Image } from "@yext/pages/components";
import { Link } from "@yext/pages/components";
import { DownloadAppCardProps } from "../../types/PropTypes";

const DownloadAppCard = ({ heading, description, appStore, playStore, downloadAppPhoto }: DownloadAppCardProps) => {
    return (
        <div className="App">
            <div className="container">
                <div className="App-card">
                    <div className="App-infoContainer">
                        <img className="App-logo l-hidden-xs" src="//dynl.mktgcdn.com/p/lzP4XZS4KQIFRLvI2t9t6SEqLftlxaGodrK28dnFT7Q/216x216.png" alt="Independent Financial app logo"/>
                        <div className="App-infoWrapper">
                            <div className="App-titleRow">
                                <img className="App-logo l-visible-only-xs" alt="Independent Financial app logo" src="//dynl.mktgcdn.com/p/lzP4XZS4KQIFRLvI2t9t6SEqLftlxaGodrK28dnFT7Q/216x216.png" />
                                <div className="App-title">{heading}</div>
                            </div>
                            <div className="App-description">{description}</div>
                            <div className="App-linksContainer">
                                {appStore.icon && appStore.link ?
                                    <Link
                                        href={appStore.link}
                                        data-ya-track="apple_store"
                                        eventName={`Apple Store`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="App-appLink"
                                    >
                                        <Image
                                            image={appStore.icon}
                                            className="App-appLinkImage"
                                        />
                                        <span className="sr-only wcag-new-tab-hover">&nbsp;Link Opens in New Tab</span>
                                    </Link>
                                    :<></>                                
                                }
                                {playStore.icon && playStore.link ?
                                    <Link
                                        href={playStore.link}
                                        data-ya-track="google_play_store"
                                        eventName={`Google Play Store`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="App-appLink"
                                    >
                                        <Image
                                            image={playStore.icon}
                                            className="App-appLinkImage"
                                        />
                                        <span className="sr-only wcag-new-tab-hover">&nbsp;Link Opens in New Tab</span>
                                    </Link>
                                :<></>
                                }
                            </div>
                        </div>
                        {downloadAppPhoto!==undefined ? 
                            <div className="App-phoneImageWrapper">
                            <Image
                                image={downloadAppPhoto.image}
                                className="App-phoneImage"
                            />
                        </div>
                        :<></>}                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DownloadAppCard