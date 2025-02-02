import '/src/assets/bootstrap/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {Modal, Spinner} from "react-bootstrap";
import {chipdesignpop_post} from "../api.js";

const ChipDesignPop = () => {
  const [jobIdPre, setJobIdPre] = useState('');
  const [jobIdTxt, setJobIdTxt] = useState('');
  const [population, setPopulation] = useState('');
  const [nSnp, setNSnp] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seconds, setSeconds] = useState(5); // Countdown starts at 5 seconds
  const [modalMessage, setModalMessage] = useState(false);

  const navigate = useNavigate();

  // Function to generate random integers
  const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  // Function to generate job IDs
  const generateJobId = () => {
    const randomNum = getRndInteger(1000, 10000);
    const timestamp = new Date().getTime().toString().slice(3);
    setJobIdPre(`JOB${randomNum}`);
    setJobIdTxt(timestamp);
  };

  // Generate job ID when component mounts
  useEffect(() => {
    generateJobId();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', { jobIdPre, jobIdTxt, population, nSnp });

    // You can handle form submission logic here, e.g., sending data to the server
    setIsSubmitting(true);
    setModalMessage("Starting job...");

    const formData = new FormData();
    formData.append("job_id", jobIdPre+"_"+jobIdTxt);
    formData.append("population", population);
    formData.append("n_snp", nSnp);

    try {
      // Call your API function here
      chipdesignpop_post(formData).catch((error) => console.error(error));

      const countdownInterval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
          }
          return prev - 1
        });
      }, 1000);

        // 3. Navigate to the results page
        setTimeout(() => {
          // navigate(`/results`);
          navigate(`/dashboard?tab=job-results`);
        }, 5000);

    } catch (error) {
      console.error('Error uploading file:', error);
      setIsSubmitting(false);
    }

    // You can also reset the form after successful submission
    handleReset();
  };

  // Handle form reset
  const handleReset = () => {
    generateJobId();
    setPopulation('');
    setNSnp('');
  };

  return (
    <div className="chipdesign-container">
      <div className="row pt-3">
        <div className="col-md-12">当前位置 &gt;&gt; 基于群体的鉴定芯片设计</div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <h4>鉴定芯片设计</h4>
          <p>用户选择背景群体里的其中一个群体，以及位点数量，设计一块鉴定芯片。</p>
        </div>
      </div>
      {/* Modal */}
      <Modal show={isSubmitting} centered>
          <Modal.Header closeButton onClick={() => setIsSubmitting(false)}>
            <Modal.Title>Submitting...</Modal.Title>
          </Modal.Header>
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Submitting...</span>
          </Spinner>
          <p className="mt-3">{modalMessage}.<br /> Please wait... { isSubmitting ? seconds + "s" : ""} </p>
        </Modal.Body>
      </Modal>

      {/* Form */}
      <div className="row mt-3">
        <div className="col-md-12">
          <h5>参数输入:</h5>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="job_name" className="col-sm-2 col-form-label">
                Job name:
              </label>
              <div className="col-sm-10">
                <div className="row gy-2 gx-3 align-items-center" id="job_name">
                  <div className="col-sm-2" style={{ paddingRight: '0px' }}>
                    <input
                      className="form-control"
                      required
                      readOnly
                      type="text"
                      id="job_id_pre"
                      value={jobIdPre}
                      onChange={(e) => setJobIdPre(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4" style={{ paddingLeft: '5px' }}>
                    <input
                      className="form-control"
                      required
                      type="text"
                      id="job_id_txt"
                      value={jobIdTxt}
                      onChange={(e) => setJobIdTxt(e.target.value)}
                      placeholder="Enter a descriptive title for your job"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="population" className="col-sm-2 col-form-label">
                Population:
              </label>
              <div className="col-sm-3">
                <select
                  className="form-select"
                  id="population"
                  value={population}
                  onChange={(e) => setPopulation(e.target.value)}
                  required
                >
                  <option value="">Select a population</option>
                  <option value="Aomei">Aomei (澳美羊)</option>
                  <option value="Bamei">Bamei (巴美羊)</option>
                  <option value="Bayinbuluke">Bayinbuluke (巴音布鲁克羊)</option>
                  <option value="Caoyuanxingzangyang">Caoyuanxingzangyang (草原型藏羊)</option>
                  <option value="Celeheiyang">Celeheiyang (策勒黑羊)</option>
                  <option value="Heguxingzangyang">Heguxingzangyang (河谷型藏羊)</option>
                  <option value="Huyang">Huyang (滹沱羊)</option>
                  <option value="Oulayang">Oulayang (欧拉羊)</option>
                  <option value="Tanyang">Tanyang (滩羊)</option>
                  <option value="Wuzhumuqing">Wuzhumuqing (乌珠穆沁羊)</option>
                  <option value="Xiaoweihanyang">Xiaoweihanyang (小尾寒羊)</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="n_snp" className="col-sm-2 col-form-label">
                Number of SNP Filter:
              </label>
              <div className="col-sm-2">
                <input
                  className="form-control"
                  required
                  type="number"
                  id="n_snp"
                  value={nSnp}
                  onChange={(e) => setNSnp(e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-4">
              <label htmlFor="input_button" className="col-sm-2 col-form-label" />
              <div className="col-sm-10">
                <div className="row gy-2 gx-3 align-items-center" id="input_button">
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary">
                      &nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleReset}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;Reset&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChipDesignPop;
