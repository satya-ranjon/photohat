import React from "react";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { client } from "../client";
import { useNavigate } from "react-router-dom";

export default function Googlelogin() {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    // User info in the localbroser storage
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;

    // saving the user detiels in the sanity
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_APP_ID}
        render={(renderProps) => (
          <button
            type="button"
            className="bg-mainColor flex justify-center items-center p-2  rounded-lg cursor-pointer outline-none ml-5"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <FcGoogle className="mr-4" /> Sign with Google
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </>
  );
}
