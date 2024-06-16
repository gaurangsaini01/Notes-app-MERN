import "./App.css";
import Footer from "./components/Footer";
import { SignupForm } from "./pages/SignupForm";
import { StickyNavbar } from "./components/StickyNavbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/LoginForm";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <div className="overflow-hidden h-[100vh]">
      <StickyNavbar loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignupForm />}></Route>
        <Route
          path="/login"
          element={
            <LoginForm
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />
          }
        ></Route>
        <Route path="/notes" element={<Notes />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />
          }
        ></Route>
      </Routes>
      {/* <div className="absolute bottom-0 w-full"> */}
        <Footer />
      {/* </div> */}
    </div>
  );
}

export default App;
