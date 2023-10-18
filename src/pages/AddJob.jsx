import React from "react";
import { statusOptions, typeOptions } from "../constant";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    //Form içerisindeki verilerden object oluşturma || Bunun için input lara name değeri girilmeli ve hepsi birbirinden farklı olmalı
    const form = new FormData(e.target);
    const newJob = Object.fromEntries(form.entries());
    console.log(newJob);
    if (!newJob.type || !newJob.status) {
      toast.info("Please Select Status and Type!");
      return;
    }
    newJob.id = v4();
    newJob.date = new Date().toLocaleDateString();
    axios
      .post("http://localhost:4000/jobs", newJob)
      .then((res) => {
        navigate("/");
        toast.success("Success. New job has been added!");
      })
      .catch((err) => {
        toast.error("Error! The addition process failed.");
        console.log(err);
      });
  };
  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Position</label>
            <input name="position" type="text" required />
          </div>
          <div>
            <label>Company</label>
            <input name="company" type="text" required />
          </div>
          <div>
            <label>Location</label>
            <input name="location" type="text" required />
          </div>
          <div>
            <label>Status</label>
            <select name="status" defaultValue="Selected">
              <option disabled value="Selected">
                Select
              </option>
              {statusOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Type</label>
            <select name="type" defaultValue="Selected">
              <option disabled value="Selected">
                Select
              </option>
              {typeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <button className="btn">Add</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
