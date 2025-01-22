import { useEffect, useState } from 'react';
import {check_jobs_post} from "../api.js";

const Results = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userData = { username: 'all' };
        const data = await check_jobs_post(userData); // Replace with your backend endpoint
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="results-container">
      <h4>Job Results</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Type</th>
            <th>Submitted at</th>
            <th>Completed at</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>{job.job_type}</td>
              <td>{job.submitted_at}</td>
              <td>{job.completed_at}</td>
              <td>{job.status}</td>
              <td>
                <button className="btn btn-primary">View</button>
                <button className="btn btn-danger">Download</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
