import { Input, Typography, Button } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import uselocationapi from "../Hooks/uselocationapi";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [group, distric] = uselocationapi();
  const [Img, setImg] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Status, setStatus] = useState("active");
  const formData = new FormData();

  const HandleRegistration = async (e) => {
    e.preventDefault();
    const img = e.target.img.files[0];
    formData.append("image", img);
    const imgdbres = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API}`,
      formData
    );

    if (imgdbres.data.success) {
      setImg(imgdbres.data.data.url);
    }
    setEmail(e.target.email.value);
    setName(e.target.name.value);
    setDistrict(e.target.District.value);
    setBloodGroup(e.target.bloodGroup.value);
    setPassword(e.target.Password.value);
    setConfirmPassword(e.target.ConfirmPassword.value);
  };

  console.log(
    email,
    name,
    Img,
    district,
    bloodGroup,
    password,
    confirmPassword,
    Status
  );

  //   useEffect(() => {
  //     fetch(
  //       `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API}`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.success) {
  //           setimgDb(data.data.url);
  //         } else {
  //           console.log("Error uploading image:", data.message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error uploading image", error);
  //       });
  //   }, []);
  return (
    <>
      <>
        <section className="grid text-center  items-center p-8 border-2">
          <div>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Sign up
            </Typography>
            <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
              Enter your email and password to sign up
            </Typography>
            <form
              onSubmit={HandleRegistration}
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
                <label htmlFor="name">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-[#6a0b37]"
                  >
                    Your Name
                  </Typography>
                </label>
                <Input
                  id="name"
                  color="gray"
                  size="lg"
                  type="name"
                  name="name"
                  placeholder="Re Chowdhury"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="Image">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-[#6a0b37]"
                  >
                    Image
                  </Typography>
                </label>
                <input
                  type="file"
                  name="img"
                  className="file-input file-input-bordered border-none file-input-error w-full max-w-xs"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="Image">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-[#6a0b37]"
                  >
                    District
                  </Typography>
                </label>
                <select
                  name="District"
                  className="select select-error w-full max-w-xs"
                >
                  <option disabled selected>
                    District
                  </option>

                  {distric?.map((group, index) => (
                    <option key={index} value={group.group}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="Image">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-[#6a0b37]"
                  >
                    Blood Group
                  </Typography>
                </label>
                <select
                  name="bloodGroup"
                  className="select select-error w-full max-w-xs"
                >
                  <option disabled selected>
                    Chose Blood Group
                  </option>

                  {group?.map((group, index) => (
                    <option key={index} value={group.group}>
                      {group.group}
                    </option>
                  ))}
                </select>
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
                  placeholder="********"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  type={"password"}
                  name="Password"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-[#6a0b37]"
                  >
                    Confirm Password
                  </Typography>
                </label>
                <Input
                  size="lg"
                  placeholder="********"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  type={"password"}
                  name="ConfirmPassword"
                />
              </div>
              <Button
                color="gray"
                size="lg"
                className="mt-6 bg-[#6a0b37]"
                fullWidth
                type="submit"
              >
                sign up
              </Button>
            </form>
            <Typography
              variant="small"
              color="gray"
              className="!mt-4 text-center font-normal"
            >
              Already have an Account?{" "}
              <Link to={"/Login"} className="font-medium  text-[#6a0b37]">
                Log in
              </Link>
            </Typography>
          </div>
        </section>
      </>
    </>
  );
}

export default Register;
