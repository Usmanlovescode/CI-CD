import React from "react";

export default function Loader() {
    return (
        <div id="preloader-active">
            <div className="preloader d-flex align-items-center justify-content-center">
                <div className="preloader-inner position-relative">
                    <div className="text-center">
                        <img className="jump mb-50" src="/assets/imgs/loading.svg" alt />
                        <h6>Loading....</h6>
                        <div className="loader">
                            <div className="bar bar1" />
                            <div className="bar bar2" />
                            <div className="bar bar3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
