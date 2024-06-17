import "./App.css";
import Footer from "./components/Footer";
import { SignupForm } from "./pages/SignupForm";
import { StickyNavbar } from "./components/StickyNavbar";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/LoginForm";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoginStatus(true);
    }
  }, []);

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen">
      <StickyNavbar loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Notes loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}/>}></Route>
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
          <Route
            path="/notes"
            element={
              <Notes
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
              />
            }
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
