import React from "react";
import styles from "./LogoutPopover.module.css";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { LoginAtom } from "../../Atom/Login Atom/LoginAtom";

function LogoutPopover() {
  let matchedUserDetails = JSON.parse(localStorage.getItem("currentUser"));
  const setIsLogin = useSetRecoilState(LoginAtom);
  const navigate = useNavigate();

  function handleLogOut() {
    setIsLogin(false);
    navigate("/");
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <button className={styles.Button} {...bindTrigger(popupState)}>
            <img
              src={matchedUserDetails.image}
              alt=""
              className={styles.Photo}
            />{" "}
            <div
              className={styles.SpanCollectives}
              style={{ marginLeft: "0.3rem" }}
            >
              <span>Welcome,</span>
              <span style={{ fontWeight: "normal" }}>
                {matchedUserDetails.firstName}
                <span style={{ paddingLeft: "0.25rem" }}>
                  {matchedUserDetails.lastName}
                </span>
              </span>
            </div>{" "}
            <MoreHorizOutlinedIcon style={{ marginLeft: "1rem" }} />
          </button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Typography className={styles.PopoverOptions} sx={{ p: 2 }}>
              Add an existing account
            </Typography>
            <Typography
              className={styles.PopoverOptions}
              sx={{ p: 2 }}
              onClick={handleLogOut}
            >
              Log out{" "}
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default LogoutPopover;
