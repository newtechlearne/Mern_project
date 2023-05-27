import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Plants = () => {
  const [plant, setPlant] = useState([]);

  useEffect(() => {
    const fetchAllPlants = async () => {
      try {
        const res = await axios.get("http://localhost:8800/plants");
        setPlant(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPlants();
  }, []);

  console.log(plant);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/plants/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Recipe Reserve</h1>
      <div className="plants">
        {plant.map((plant) => (
          <div key={plant.id} className="plant">
            <img src={plant.cover} alt="" />
            <h2>{plant.title}</h2>
            <p>{plant.desc}</p>
            
            <button className="delete" onClick={() => handleDelete(plant.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${plant.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new recipe
        </Link>
      </button>
    </div>
  );
};

export default Plants;