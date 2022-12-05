import "./App.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useContext } from "react";
import SetUp from "./component/SetUp";
import Login from "./component/login";
import { GlobalContext } from "./component/context";
import Otp from "./component/Otp";
import Sidebar from "./component/Sidebar";
import Dashboard from "./component/Dashboard";
import Profile from "./component/AdminProfile";
import Settings from "./component/settings";
import Category from "./component/Category";

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/profile`,
          method: "get",
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("response: ", response.data);
          dispatch({
            type: "USER_LOGIN",
            payload: response.data,
          });
        } else {
          dispatch({ type: "USER_LOGOUT" });
        }
      } catch (e) {
        console.log("Error in api call: ", e);
        dispatch({ type: "USER_LOGOUT" });
      }
    };
    getProfile();
  }, []);

  return (
    <Router>
      {/* <NavBar /> */}

      {state.isLogin === true ? (
        <>
          <div className="screens-container">
            <Sidebar />
            <div className="screens-section-container">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/category" element={<Category />} />
                {/* <Route path="/settings" element={<C />} /> */}
              </Routes>
            </div>
          </div>
        </>
      ) : null}
      <Routes>
        {state.isLogin === false ? (
          <>
            <Route path="/SetUp" element={<SetUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/Otp" element={<Otp />} />
          </>
        ) : null}
        {state.isLogin === null ? (
          <>
            <Route
              path="*"
              element={
                <div className="loading">
                  <div> LOADING... </div>
                </div>
              }
            />
          </>
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
