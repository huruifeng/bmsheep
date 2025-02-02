import { useEffect, useState } from 'react';
import {check_jobs_post, download_results} from "../api.js";
import {Spinner} from "react-bootstrap";
import useAuthStore from "../stores/authStore.js";

const Results = () => {
  const [jobs, setJobs] = useState([]);

  const user = useAuthStore((state) => state.user);

  const fetchJobs = async () => {
      try {
        const userData = { email: user.email };
        const data = await check_jobs_post(userData); // Replace with your backend endpoin
          // console.log(data);
            setJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

   // Fetch jobs when the component mounts
      useEffect(() => {
        fetchJobs();
      }, []);

    // Refresh jobs every 60 seconds。
    // Stop refreshing when no job is running
    useEffect(() => {
      const intervalId = setInterval(fetchJobs, 1000*60);
      return () => clearInterval(intervalId);
    }, [jobs]);

 const handleDownload = async (jobId) => {
  try {
    const responseData = await download_results(jobId); // Ensure `download_results` returns the API response

    // Create a URL for the file and trigger download
    const url = window.URL.createObjectURL(new Blob([responseData]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${jobId}_results.zip`); // Set the file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading the file:", error);
    alert("Failed to download the results file.");
  }
};

  return (
      <div className="results-container">
        <div className="row pt-3">
          <div className="col-md-12">当前位置 &gt;&gt; 任务列表</div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-12">
            <h4>Job Results</h4>
            <p>以下是您提交的任务，你可以下载已完成的任务结果。</p>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
          <tr>
              <th>#</th>
              <th>Job ID</th>
              <th>Job Type</th>
              <th>Submitted at</th>
              <th>Completed at</th>
              <th>Status</th>
              <th>View</th>
              <th>Download</th>
          </tr>
          </thead>
          <tbody>
          {jobs.map((job, index) => (
              <tr key={job.job_id}>
                  <td>{index + 1}</td>
                  {/* Add 1 to the index to start counting from 1 */}
                  <td>{job.job_id}</td>
                  <td>{job.job_type}</td>
                  <td>{job.start_time}</td>
                  <td>{job.end_time}</td>
                  <td>{job.status}</td>
                  <td>
                      {job.status === "Done" ? (
                          <a className="btn btn-outline-success btn-sm" href={`/view/${job.job_id}`}>View</a>
                      ) : job.status === "Error" ? (
                         // Error state
                            <p style={{color: '#9b0218'}}>Error</p>
                      ): (
                          <button className="btn btn-outline-secondary btn-sm" disabled>View</button>
                      )}
                  </td>
                  <td>
                      {job.status === "Done" ? (
                          <button className="btn btn-outline-primary btn-sm" onClick={() => handleDownload(job.job_id)}>Download</button>
                      ) : job.status === "Error" ? (
                          // Error state
                          <span style={{color: '#9b0218', fontSize: '1.5rem'}}><i className="bi bi-exclamation-triangle-fill"></i></span>
                      ) : (
                          <Spinner className="spinner-grow text-success" style={{width: '1.5rem', height: '1.5rem'}}
                                   role="status">
                          <span className="visually-hidden">Running...</span>
                          </Spinner>
                      )}
                  </td>


              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default Results;
