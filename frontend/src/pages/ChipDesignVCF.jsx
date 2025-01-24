import '/src/assets/bootstrap/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import {chipdesignvcf_post, upload_file_post} from "../api.js";
import {Modal, Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const ChipDesignVCF = () => {
  const [jobIdPre, setJobIdPre] = useState('');
  const [jobIdTxt, setJobIdTxt] = useState('');
  // const [vcfFiles, setVcfFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [nSnp, setNSnp] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [seconds, setSeconds] = useState(5); // Countdown starts at 5 seconds
  const navigate = useNavigate();

  // Generate a random job ID
  const generateJobId = () => {
    const randomId = `JOB${Math.floor(Math.random() * (10000 - 1000) + 1000)}`;
    const timestamp = Date.now().toString().slice(3);
    setJobIdPre(randomId);
    setJobIdTxt(timestamp);
  };

  useEffect(() => {
    generateJobId();
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    // setVcfFiles(Array.from(e.target.files));
    const selectedFile = e.target.files[0];
     if (selectedFile && !/\.(vcf|vcf\.gz)$/i.test(selectedFile.name)) {
        alert("Invalid file type. Please upload a .vcf or .vcf.gz file.");
        setFile(null);
      } else {
        setFile(selectedFile);
      }
  };

  // Handle SNP filter input (only allow integers)
  const handleNSnpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setNSnp(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a VCF file.');
      return;
    }

    // Implement form submission logic (e.g., send to backend using fetch or axios)
    setIsSubmitting(true);

    setModalMessage("Uploading file...");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("job_id", jobIdPre+"_"+jobIdTxt);
    formData.append("input_vcf", file);
    // vcfFiles.forEach((file, index) => formData.append(`input_vcf[${index}]`, file));

    try {
         // 1. Upload the file
         const uploadResponse = await upload_file_post(formData);
         if (!uploadResponse.success) {
            setModalMessage("An error occurred while uploading the file.");
            setIsUploading(false)
            setIsSubmitting(false)
            return ;
         }

         setIsUploading(false)

        // 2. Start the job
        setModalMessage("File uploaded successfully! \n Starting job...");
        // Start the job (fire-and-forget approach)
         const newFormData = new FormData();
         newFormData.append("job_id", jobIdPre+"_"+jobIdTxt);
         newFormData.append("input_vcf", file.name);
         newFormData.append("n_snp", nSnp);

         chipdesignvcf_post(newFormData).catch((err) => {
          console.error("Error starting the job:", err); // Handle errors without blocking navigation
         });

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
          navigate(`/results`);
        }, 5000);

    } catch (error) {
      alert('An error occurred while uploading the file.', error);
    }


  };

  // Handle form reset
  const handleReset = () => {
    generateJobId();
    // setVcfFiles([]);
    setFile(null);
    setNSnp('');
  };

  return (
    <div className="chipdesign-container">
      <div className="row pt-3">
        <div className="col-md-12">当前位置 &gt;&gt; 基于VCF文件的鉴定芯片设计</div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <h4>鉴定芯片设计</h4>
          <p>用户提交vcf文件用于品种鉴定芯片位点设计。</p>
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
          <p className="mt-3">{modalMessage}.<br /> Please wait... { ((isSubmitting) && (!isUploading)) ? seconds + "s" : ""} </p>
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
                  <div className="col-sm-2" style={{ paddingRight: 0 }}>
                    <input
                      className="form-control"
                      required
                      readOnly
                      type="text"
                      id="job_id_pre"
                      name="job_id_pre"
                      value={jobIdPre}
                    />
                  </div>
                  <div className="col-sm-4" style={{ paddingLeft: 5 }}>
                    <input
                      className="form-control"
                      required
                      type="text"
                      id="job_id_txt"
                      name="job_id_txt"
                      value={jobIdTxt}
                      onChange={(e) => setJobIdTxt(e.target.value)}
                      placeholder="Enter a descriptive title for your job"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="input_vcf" className="col-sm-2 col-form-label">
                Upload vcf files:
              </label>
              <div className="col-sm-6">
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="input_vcf"
                    name="input_vcf"
                    accept=".vcf,.vcf.gz"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="n_snp" className="col-sm-2 col-form-label">
                Number of SNP Filter:
              </label>
              <div className="col-sm-2">
                <div className="input-group">
                  <input
                    className="form-control"
                    required
                    type="text"
                    id="n_snp"
                    name="n_snp"
                    value={nSnp}
                    onChange={handleNSnpChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <label htmlFor="input_button" className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <div className="row gy-2 gx-3 align-items-center" id="input_button">
                  <div className="col-auto">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                  <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleReset}
                        disabled={isSubmitting}
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

export default ChipDesignVCF;
