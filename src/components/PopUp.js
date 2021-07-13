import React, { useState } from "react";
import Draggable from "react-draggable"; // To make the Pop-up draggable accross the screen
import { ModalContext } from "../contexts/NewModal";

import "./PopUp.css";

import { Link } from "react-chrome-extension-router";

import Choose from "./Choose/Choose";

import closeIcon from "../icons/closeIcon.png";
import home from "../icons/home.png";

import { Router } from "react-chrome-extension-router";

const PopUp = () => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition }) => (
        <Draggable
          handle=".modalHeader"
          defaultPosition={{ x: windowPosition.x, y: windowPosition.y }}
          position={
            hasDraggedWindowPosition
              ? { x: windowPosition.x, y: windowPosition.y }
              : null
          }
        >
          <div
            id="modal"
            style={{
              transform: windowPosition,
            }}
          >
            <div className="modal-window-inner-border">
              <>
                <div className="modal-body">
                  <div className="modalHeader">
                    <div className={`${showPopup ? "maxHeader" : "stopExt"}`}>
                      <Link component={Choose}>
                        <img src={home} alt="home" />
                      </Link>
                      <div className="modalCompanyName">
                        Chrome Chat Extension{" "}
                        <div
                          onClick={() => setShowPopup(false)}
                          className="closeModalIcon"
                        >
                          <img src={closeIcon} alt="close icon" />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${showPopup ? "" : "bubble"}`}
                      onClick={() => setShowPopup(true)}
                    ></div>
                  </div>
                  {/* Routing to defferent pages inside the pop-up */}
                  <div className={`${showPopup ? "" : "stopExt"}`}>
                    <Router>
                      <Choose />
                    </Router>
                  </div>
                </div>
              </>
            </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default PopUp;
