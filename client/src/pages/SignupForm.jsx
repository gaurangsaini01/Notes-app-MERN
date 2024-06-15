import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function SignupForm() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(details);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:1358/api/v1/signup", details)
      .then(() =>{
        toast.success('Signup Complete')
        navigate("/login")
      })
      .catch((e) => {
        toast.error(e.response.data.message)
      });
  }
  return (
    <div className="w-1/2 mx-auto">
      <Card
        color="transparent"
        shadow={false}
        className="flex items-center mt-4"
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 text-sm font-normal">
          Nice to meet you ! Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Username
            </Typography>
            <Input
              autoComplete="off"
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
              name="username"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              onChange={handleChange}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="email"
              autoComplete="off"
              name="email"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              autoComplete="off"
              onChange={handleChange}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <span className="font-medium transition-colors hover:text-gray-900">
                  &nbsp;Terms and Conditions
                </span>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6 w-full" type="submit">
            sign up
          </Button>

          <Typography className="text-gray-700 mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to={"/login"} className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
