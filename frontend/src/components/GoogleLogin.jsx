import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);  // You get email, name, photo
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login / Signup with Google</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleLogin;
