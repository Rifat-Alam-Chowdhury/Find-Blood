import { Input, Typography, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import uselocationapi from "../Hooks/uselocationapi";
import { useContext, useState } from "react";
import axios from "axios";
import { AUthfirebase } from "../Auth/AuthApi";
import { MdBloodtype } from "react-icons/md";

function Register() {
  const [group, districtList] = uselocationapi();
  const { CreateUser } = useContext(AUthfirebase);
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status] = useState("active");
  const [role] = useState("Donor");

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      setLoading(true);
      await CreateUser(email, password);

      const formData = new FormData();
      formData.append("image", img);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API}`,
        formData
      );
      const imgUrl = imgRes.data.data.display_url;

      const userData = {
        name,
        email,
        district,
        bloodGroup,
        image: imgUrl,
        status,
        role,
      };
      const res = await axios.post(
        `http://localhost:3000/userRegistration`,
        userData
      );
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      alert("An error occurred during registration.");
    }
  };

  return (
    <section className="grid text-center items-center p-8 border-2">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign up
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign up
        </Typography>
        <form
          onSubmit={handleRegistration}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              required
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
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Re Chowdhury"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="img">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-[#6a0b37]"
              >
                Image
              </Typography>
            </label>
            <input
              id="img"
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              required
              className="file-input file-input-bordered border-none file-input-error w-full max-w-xs"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="district">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-[#6a0b37]"
              >
                District
              </Typography>
            </label>
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              className="select select-error w-full max-w-xs"
            >
              <option value="" disabled selected>
                District
              </option>
              {districtList?.map((d, index) => (
                <option key={index} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="bloodGroup">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-[#6a0b37]"
              >
                Blood Group
              </Typography>
            </label>
            <select
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
              className="select select-error w-full max-w-xs"
            >
              <option value="" disabled selected>
                Choose Blood Group
              </option>
              {group?.map((g, index) => (
                <option key={index} value={g.group}>
                  {g.group}
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
              id="password"
              size="lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-[#6a0b37]"
              >
                Confirm Password
              </Typography>
            </label>
            <Input
              id="confirmPassword"
              size="lg"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            color="gray"
            size="lg"
            fullWidth
            type="submit"
            className="flex items-center justify-center space-x-2"
          >
            {Loading ? <MdBloodtype size={20} className="animate-spin" /> : ""}
            <span>Sign Up</span>
          </Button>
        </form>
        <Typography
          variant="small"
          color="gray"
          className="!mt-4 text-center font-normal"
        >
          Already have an Account?{" "}
          <Link to="/Login" className="font-medium text-[#6a0b37]">
            Log in
          </Link>
        </Typography>
      </div>
    </section>
  );
}

export default Register;
