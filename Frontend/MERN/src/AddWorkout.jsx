import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddWorkout = () => {
  const [formData, setFormData] = useState({
    title: "",
    reps: "",
    load: "",
  });
  const [addedData, setAddedData] = useState();

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const addedData = await res.json();
      setAddedData(addedData);
      setFormData({
        title: "",
        reps: "",
        load: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          name="title"
          placeholder="title"
          onChange={(e) => onChangeHandler(e)}
          value={formData.title}
        />
        <input
          name="reps"
          placeholder="reps"
          type="number"
          onChange={(e) => onChangeHandler(e)}
          value={formData.reps}
        />
        <input
          name="load"
          placeholder="load"
          type="number"
          onChange={(e) => onChangeHandler(e)}
          value={formData.load}
        />
        <button type="submit">Create</button>
      </form>
      <div className="submitted" style={{ color: "green" }}>
        <p>{addedData?.title}</p>
        <p>{addedData?.reps}</p>
        <p>{addedData?.load}</p>
      </div>
    </>
  );
};

export default AddWorkout;
