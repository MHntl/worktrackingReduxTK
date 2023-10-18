import React, { useEffect } from "react";
import Card from "../component/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJob, setError } from "../redux/jobSlice";
import Loading from "../component/Loading";
import RefreshButton from "../component/RefreshButton";
import Filter from "../component/Filter";

const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  //!console.log(state);
  const fetchData = () => {
    axios
      .get("http://localhost:4000/jobs")
      .then((res) => dispatch(setJob(res.data)))
      .catch((err) => dispatch(setError(err)));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="list-page">
      <Filter />

      <h3 className="job-count">
        Displaying (<span className="yellow">{state.jobs.length}</span>) jobs
        within (<span className="yellow">{state.jobs.length}</span>)
      </h3>
      <section className="job-list">
        {!state.initialized && <Loading />}
        {state.initialized && !state.isError ? (
          state.jobs.map((job) => <Card key={job.id} job={job} />)
        ) : (
          <p className="error-msg">
            <span>Sorry!An error occurred!</span>
            <RefreshButton handleClick={() => fetchData()} />
          </p>
        )}
      </section>
    </div>
  );
};

export default JobList;
