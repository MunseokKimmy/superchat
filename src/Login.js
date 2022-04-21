import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
function Login() {
  const [user, loading, error] = useAuthState(auth);
  const navigate2 = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate2("/chatroom");
  }, [user, loading]);
  return (
    <div className="login">
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
    </div>
  );
}
export default Login;