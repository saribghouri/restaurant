import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import "./index.css";

let Settings = () => {
  let { state, dispatch } = useContext(GlobalContext);
  let [loading, setLoading] = useState(false);
  let [toggleReload, setToggleReload] = useState(false);
  const [ResName, setResName] = useState(state?.user.ResName);
  const [Tagline, setTagline] = useState(state?.user.Tagline);
  let [TimeZone, setTimeZone] = useState(state.user?.TimeZone);
  const [RestaurentContact, setRestaurentContact] = useState(
    state.user?.RestaurentContact
  );
  const [Restaurentaddress, setRestaurentaddress] = useState(
    state.user?.Restaurentaddress
  );

  useEffect(() => {
    const getrestaurent = async () => {
      console.log(
        "🚀 ~ file: index.jsx:26 ~ getrestaurent ~ state?.user",
        state?.user?.res_id
      );

      try {
        let response = await axios({
          url: `${state.baseUrl}/getreatuarentdetails/${state?.user?.res_id}`,
          method: "get",
          withCredentials: true,
        });
        setResName(response.data.ResName);
        setTagline(response.data.Tagline);
        setTimeZone(response.data.TimeZone);
        setRestaurentContact(response.data.RestaurentContact);
        setRestaurentaddress(response.data.RestaurentContact);
        console.log("response: ", response.data);
      } catch (e) {
        console.log("Error in api call: ", e);
      }
    };
    getrestaurent();
  }, []);

  let updateHandler = async (e) => {
    e.preventDefault();
    console.log(
      "🚀 ~ file: index.jsx ~ line 37 ~ updateHandler ~ updateHandler"
    );

    console.log("🚀 ~ file: index.jsx ~ line 28 ~ updateHandler ~ ", {
      ResName: ResName,
      Tagline: Tagline,
      TimeZone: TimeZone,
      RestaurentContact: RestaurentContact,
      Restaurentaddress: Restaurentaddress,
    });

    try {
      let updated = await axios.put(
        `${state.baseUrl}/settings/${state?.user?.res_id}`,
        {
          ResName: ResName,
          Tagline: Tagline,
          TimeZone: TimeZone,
          RestaurentContact: RestaurentContact,
          Restaurentaddress: Restaurentaddress,
        },

        {
          withCredentials: true,
        }
      );
      console.log("user=== ", updated.data);

      setToggleReload(!toggleReload);
    } catch (e) {
      console.log("Error in api call: ", e);
      setLoading(false);
    }
  };
  return (
    <div className="parent">
      <h1 className="add-product">settings</h1>
      <form onSubmit={updateHandler}>
        <div className="font"></div>
        <input
          id="ResName"
          name="ResName"
          value={ResName}
          placeholder="ResName"
          type="text"
          onChange={(e) => {
            setResName(e.target.value);
          }}
        />{" "}
        <br />
        <input
          id="Tagline"
          name="Tagline"
          value={Tagline}
          placeholder="Tagline"
          type="text"
          onChange={(e) => {
            setTagline(e.target.value);
          }}
        />{" "}
        <br />
        <input
          id="TimeZone"
          name="TimeZone"
          value={TimeZone}
          placeholder="TimeZone"
          type="text"
          onChange={(e) => {
            setTimeZone(e.target.value);
          }}
        />{" "}
        <br />
        <input
          id="RestaurentContact"
          name="RestaurentContact"
          value={RestaurentContact}
          placeholder="RestaurentContact"
          type="text"
          onChange={(e) => {
            setRestaurentContact(e.target.value);
          }}
        />{" "}
        <br />
        <input
          id="Restaurentaddress"
          name="Restaurentaddress"
          value={Restaurentaddress}
          placeholder="Restaurentaddress"
          type="text"
          onChange={(e) => {
            setRestaurentaddress(e.target.value);
          }}
        />{" "}
        <br />
        <button className="submitbtn" type="submit">
          Submit
        </button>
      </form>

      <hr />
    </div>
  );
};

export default Settings;
