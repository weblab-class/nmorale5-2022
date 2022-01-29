import React, { useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "739546526580-biu102078t6rnjc630m92fg456933d62.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {

  return (
    <>
      <div className="Skeleton-title">Jigsaw Frenzy</div>
      {/* {userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
        />
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
        />
      )} */}
      <Link to="/game/" className="Skeleton-button">Start Game</Link>
    </>
  );
};

export default Skeleton;
