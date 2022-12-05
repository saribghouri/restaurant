import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import "./index.css";
let Profile = () => {
  let { state, dispatch } = useContext(GlobalContext);
  let [loading, setLoading] = useState(false);
  let [toggleReload, setToggleReload] = useState(false);
  const [name, setName] = useState(state?.user.name);
  const [contact, setContact] = useState(state?.user.contact);
  let [email, setEmail] = useState(state.user?.email);
  const [password, setPassword] = useState(state.user?.password);

  let updateHandler = async (e) => {
    e.preventDefault();
    console.log(
      "🚀 ~ file: index.jsx ~ line 37 ~ updateHandler ~ updateHandler"
    );

    console.log("🚀 ~ file: index.jsx ~ line 28 ~ updateHandler ~ ", {
      name: name,
      contact: contact,
      password: password,
    });

    try {
      let updated = await axios.put(
        `${state.baseUrl}/profile/${state?.user?._id}`,
        {
          name: name,
          contact: contact,
          password: password,
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
      <h1 className="add-product">EDIT PROFILE</h1>
      <form onSubmit={updateHandler}>
        <div className="font"></div>
        <input
          id="name"
          name="name"
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />{" "}
        <br />
        <input
          id="contact"
          name="contact"
          value={contact}
          placeholder="Contact"
          type="number"
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />{" "}
        <br />
        <input
          id="email"
          name="email"
          value={email}
          placeholder="email"
          type="email"
          disabled
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{" "}
        <br />
        <input
          id="password"
          name="password"
          value={password}
          placeholder="password"
          type="password"
          disabled
          onChange={(e) => {
            setPassword(e.target.value);
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

export default Profile;
