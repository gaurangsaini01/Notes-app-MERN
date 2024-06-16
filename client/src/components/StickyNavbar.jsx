import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function StickyNavbar({ loginStatus, setLoginStatus }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  function handleLogout() {
    setLoginStatus(false);
    toast.success("Logged Out Successfully");
    navigate("/login");
  }

  const navList = (
    <ul className="mt-2 pt-6 mb-4 flex flex-col gap-2 lg:mb-5 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Home
        </Typography>
      </Link>

      <Link to={"/notes"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Notes
        </Typography>
      </Link>
      <Link to={"/profile"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Profile
        </Typography>
      </Link>
      <Link to={"/contact"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Contact Us
        </Typography>
      </Link>
    </ul>
  );

  return (
    <div className="max-h-[768px] w-[100vw]">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-8 py-1">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to={"/"}>
            <Typography className="mr-4 cursor-pointer py-1.5 text-xl font-bold tracking-wider">
              Cloudify Notes
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            {/* //Bahar wale hai  */}

            {!loginStatus && (
              <div className="flex items-center gap-x-1">
                <Link to={"/login"}>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Log In</span>
                  </Button>
                </Link>

                <Link to={"/signup"}>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
            {loginStatus && (
              <div className="flex items-center gap-x-1">
                <Link to={"/notes"}>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Dashboard</span>
                  </Button>
                </Link>

                <Link to={"/login"}>
                  <Button
                    onClick={handleLogout}
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Logout</span>
                  </Button>
                </Link>
              </div>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}

          {!loginStatus && (
            <div className="flex items-center gap-x-1">
              <Button fullWidth variant="text" size="sm" className="">
                <Link to={"/login"}>
                  <span>Log In</span>
                </Link>
              </Button>

              <Button fullWidth variant="gradient" size="sm" className="">
                <Link to={"/signup"}>
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
          {loginStatus && (
            <div className="flex items-center gap-x-1">
              <Button fullWidth variant="text" size="sm" className="">
                <Link to={"/notes"}>
                  <span>Dashboard</span>
                </Link>
              </Button>

              <Button onClick={handleLogout} fullWidth variant="gradient" size="sm" className="">
                <Link to={"/login"}>
                  <span>Logout</span>
                </Link>
              </Button>
            </div>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
