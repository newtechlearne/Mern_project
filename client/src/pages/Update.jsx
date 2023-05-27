import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [plant, setPlant] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const plantId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setPlant((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/plants/${plantId}`,plant);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the recipe</h1>
      <input
        type="text"
        placeholder="Recipe name"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Recipe description"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Recipe ingredients"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Recipe image"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all my reciples</Link>
    </div>
  );
};

export default Update;