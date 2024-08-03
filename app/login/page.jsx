"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import AnnotaterLogo from "@/components/svg/AnnotaterLogo";
import Image from "next/image";
import Logo from "@/components/svg/Logo";
import LogoS from "@/components/svg/LogoS";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, signup, currentUser, loginWithGoogle, logout } = useAuth();

  useEffect(() => {
    if (currentUser) {
      sendToHomePage();
    }
  }, [currentUser]);

  function sendToHomePage() {
    window.location.replace("/sources/my sources");
  }

  async function submitHandler() {
    if (!email || !password) {
      setError("please enter email and password");
      return;
    }
    if (isLoggingIn) {
      await login(email, password).catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage.split("auth/")[1].split(")")[0]);
      });
      return;
    }
    // if (password !== confirmPassword) {
    //   setError("passwords do not match");
    //   return;
    // }
    // await signup(email, password).catch((error) => {
    //   const errorMessage = error.message;
    //   setError(errorMessage.split("auth/")[1].split(")")[0]);
    // });

    // return;
  }
  async function loginWithGoogleHandler() {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="bg-white h-full">
      <div className="fixed inset-0 -z-50 bg-white"></div>
      <header className="flex justify-between font-bold p-3 px-6 text-base items-center">
        <div className="flex items-center gap-12">
          <Link href={"/"}>
            <LogoS />
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <Link
            href={"/signup"}
            className=" mt-1 p-3 px-4 text-white bg-accent rounded-xl"
          >
            Sign up
          </Link>
        </div>
      </header>
      <div className="flex justify-center mt-6 md:mt-3">
        <div className="bg-gradient-to-r mt-3 sm:mt-24 font-black text-3xl bg-clip-text from-purple to-blue text-accent text-center justify-self-center w-auto sm:text-4xl">
          Log in
        </div>
      </div>
      <div className="flex justify-center mt-3 sm:mt-8">
        <div className="flex flex-col align-middle w-full mx-6 sm:mx-0 sm:w-2/3 md:w-1/2">
          <div
            className={`${
              !error && "hidden"
            } bg-red-300 mx-3 p-2 px-6 text-base font-medium rounded-full text-center text-slate-800 sm:m-3 sm:p-4`}
          >
            {error}
          </div>
          <input
            className="bg-gray-100 mx-3 m-1 mt-2 sm:m-3 p-4 px-6 text-base font-medium rounded-2xl focus:outline-accent"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="bg-gray-100 mx-3 m-1 sm:m-3 p-4 px-6 text-base font-medium rounded-2xl focus:outline-accent"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {/* {!isLoggingIn && (
            <input
              className="bg-grey mx-3 m-1 sm:m-3 p-4 px-6 text-base font-medium rounded-2xl focus:outline-accent"
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          )} */}
          <div
            className={`${
              (email != "" || password != "") && "hidden"
            } text-center font-black text-lg my-3 sm:6`}
          >
            OR
          </div>
          <div
            className="cursor-pointer flex justify-around bg-grey w-80 mx-auto p-4 px-6 rounded-2xl my-3 font-bold text-xl text-gray-700"
            onClick={
              email != "" || password != ""
                ? submitHandler
                : loginWithGoogleHandler
            }
          >
            {email != "" || password != "" ? (
              <div>Log in</div>
            ) : (
              <div className="bg-gray-100 rounded-2xl p-4 px-6 flex items-center gap-3">
                <Image
                  src={"/google.png"}
                  width={100}
                  height={100}
                  className="h-8 w-8"
                />
                <div className="w-56">Log in with Google</div>
              </div>
            )}
          </div>
          <div className="text-center mt-3">
            By logging in you are agreeing to these{" "}
            <Link href={"./terms"} className="text-cyan-600 font-medium">
              terms and conditions
            </Link>
          </div>
        </div>
      </div>
      <div className="flex align-middle left-6 fixed bottom-3 justify-center w-full font-bold text-lg flex-row bg-white">
        <div>Don't have an account? </div>
        <Link className="text-accent cursor-pointer mx-3" href={"/signup"}>
          sign up!
        </Link>
      </div>
    </main>
  );
};

export default Login;
