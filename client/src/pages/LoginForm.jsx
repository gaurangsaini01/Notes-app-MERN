import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export function LoginForm({ loginStatus, setLoginStatus }) {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:1358/api/v1/login", details)
      .then((e) => {
        localStorage.setItem("token", e.data.token);
        toast.success("LoggedIn");
        setLoginStatus(true);
        navigate("/notes");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  return (
    <Card color="transparent" shadow={false} className="flex items-center mt-4">
      <Typography variant="h4" color="blue-gray">
        Log In
      </Typography>
      <Typography color="gray" className="mt-1 text-sm font-normal">
        Welcome Back , Good to see you again !
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email
          </Typography>
          <Input
            autoComplete="off"
            onChange={handleChange}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            type="email"
            name="email"
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            name="password"
            onChange={handleChange}
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          log in
        </Button>
        <Typography className="text-gray-700 mt-4 text-center font-normal">
          Don't have an account?{" "}
          <Link to={"/signup"} className="font-medium text-gray-900">
            {" "}
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
