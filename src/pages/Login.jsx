import { Input, Typography, Button } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AUthfirebase } from "../Auth/AuthApi";

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { LogIn } = useContext(AUthfirebase);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);

  const HandleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const Password = e.target.Password.value;
    await LogIn(email, Password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <>
      <section className="grid text-center h-screen items-center p-8 border-2">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Log In
          </Typography>
          <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
            Enter your email and password to sign in
          </Typography>
          <form
            onSubmit={HandleLogin}
            className="mx-auto max-w-[24rem] text-left"
          >
            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-[#6a0b37]"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                placeholder="name@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-[#6a0b37]"
                >
                  Password
                </Typography>
              </label>
              <Input
                size="lg"
                name="Password"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
              />
            </div>
            <Button
              color="gray"
              size="lg"
              type="submit"
              className="mt-6 bg-[#6a0b37]"
              fullWidth
            >
              Log in
            </Button>
            <div className="!mt-4 flex justify-end">
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                variant="small"
                className="font-medium text-[#6a0b37]"
              >
                Forgot password
              </Typography>
            </div>

            <Typography
              variant="small"
              color="gray"
              className="!mt-4 text-center font-normal"
            >
              Not registered?{" "}
              <Link
                to={"/registration"}
                className="font-medium  text-[#6a0b37]"
              >
                Create account
              </Link>
            </Typography>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
