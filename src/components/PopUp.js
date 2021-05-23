import React, { useEffect } from "react";
import Draggable from "react-draggable"; // To make the Pop-up draggable accross the screen
import { ModalContext } from "../contexts/NewModal";

import "./PopUp.css";

import Choose from "./Choose/Choose";

import { Router } from "react-chrome-extension-router";

const PopUp = () => {
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
            className="modal-window"
            style={{
              transform: windowPosition,
            }}
          >
            <div className="modal-window-inner-border">
              <>
                <div className="modal-body">
                  <div className="modalHeader">
                    <div className="modalCompanyName">
                      Chrome Chat Extension
                    </div>
                  </div>
                  {/* Routing to defferent pages inside the pop-up */}
                  <Router>
                    <Choose />
                  </Router>
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
