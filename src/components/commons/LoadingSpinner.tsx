import * as React from "react";
import "../../assets/css/index.css";
import loader from "../../assets/images/loader.gif";

export default function LoadingSpinner() {
  return (
    <div className="spinner-main">
       <img className="SpinnerModal-image" src={loader}/>
    </div>
  );
}