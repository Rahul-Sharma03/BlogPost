"use client";
import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaRegEye } from "react-icons/fa6"; //hide
import { FaRegEyeSlash } from "react-icons/fa6"; //see
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { loginErrorType } from "@/types";

const Login = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<loginErrorType>({});
  const [toggle, setToggle] = useState(false);
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const googleLogin = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const githubLogin = async () => {
    await signIn("github", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/api/auth/login", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response?.status == 400) {
          setErrors(response?.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("somethinf went wrong", err);
      });
    console.log("authState is ",authState)
  };

  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="w-full border  max-w-md p-8 space-y-6  rounded-lg shadow-lg mt-[2vh]">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full shadow ">
              <Image
                src="/images/login.png"
                height={50}
                width={50}
                alt="logo"
              />
            </div>
          </div>
          {params.get("message") ? (
            <p className="text-green-500 text-sm font-normal text-center">
              {params.get("message")}
            </p>
          ) : (
            <></>
          )}
          <h2 className="text-2xl font-semibold text-center ">
            Sign in with email
          </h2>
          {/* <p className="text-sm text-center text-gray-500">Make a new doc to bring your words, data, and teams together. For free</p> */}

          <form className="space-y-4 " onSubmit={submitData}>
            <div className="email">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
                id="email"
                placeholder="Email"
                // autoComplete="on"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 border-gray-300"
                required
              />
            <span className="text-red-500 font-semibold">{errors?.email}</span>

            </div>

            <div className="relative password">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type={toggle? 'text' : 'password'}
                id="password"
                placeholder="Password"
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 border-gray-300"
                required
              />
              {toggle ? (
                <FaRegEye
                  className="absolute top-4 right-2"
                  onClick={() => setToggle(!toggle)}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute top-4 right-2"
                  onClick={() => setToggle(!toggle)}
                />
              )}
              <span className="text-red-500 font-semibold">
                {errors.password}
              </span>
            </div>

            {/* <span className="text-red-500 font-semibold">{errors?.password}</span> */}

            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-2 text-white  rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600
              }`}
            >
              {loading ? "processing" : "login"}
            </button>
          </form>

          <div className="flex items-center justify-center space-x-3 mt-6">
            <p className="text-sm text-gray-500">Or sign in with</p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              className="p-3  bg-white rounded-full shadow "
              onClick={googleLogin}
            >
              <Image
                src="/images/google.png"
                alt="Google"
                className="w-5 h-5"
                height={30}
                width={30}
              />
            </button>
            <button
              className="p-3 bg-white rounded-full shadow "
              onClick={githubLogin}
            >
              <Image
                src="/images/github.png"
                alt="github"
                className="w-5 h-5"
                height={30}
                width={30}
              />
            </button>
          </div>
          <p className="text-center text-sm">
            do not have account?
            <Link
              href="/register"
              className="text-sm text-blue-500 hover:underline"
            >
              register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
