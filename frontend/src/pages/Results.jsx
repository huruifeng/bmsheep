import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Results = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/jobs'); // Replace with your backend endpoint
        setJobs(response.data.jobs);
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
