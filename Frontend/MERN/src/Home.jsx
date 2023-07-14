import React from "react";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [deletedData, setDeletedData] = useState();

  const deleteHandler = async (id) => {
    try {
      const data = await fetch(`http://localhost:8080/api/workouts/${id}`, {
        method: "DELETE",
      });
      const deletedData = await data.json();
      setDeletedData(deletedData);
      // console.log("Data deleted");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      // First install CORS Cross Origin Resource Sharing
      // Use proxy in package.json
      try {
        const response = await fetch("http://localhost:8080/api/workouts");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkout();
  }, [deletedData]);

  // Deleting data from the database

  return (
    <div className="home-container">
      {data?.map((item, index) => {
        return (
          <div className="workout" key={index}>
            <p style={{ color: "green" }}>{item?.title}</p>
            <p>Reps: {item?.reps}</p>
            <p>Load: {item?.load}</p>
            <button onClick={() => deleteHandler(item._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
