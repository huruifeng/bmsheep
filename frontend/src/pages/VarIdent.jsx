import '/src/assets/bootstrap/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation
import {upload_file_post, varident_post} from '../api';


const VarIdent = () => {
  const [jobIdPre, setJobIdPre] = useState('');
  const [jobIdTxt, setJobIdTxt] = useState('');
  // const [vcfFiles, setVcfFiles] = useState([]);
  const [file, setFile] = useState(null);

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

   // Handle form submission
  const handleSubmit = async (e) => {
   e.preventDefault();
    if (!file) {
      alert('Please select a VCF file.');
      return;
    }

    // Perform form submission logic here
    setIsSubmitting(true);

    setModalMessage("Uploading file...");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("job_id", jobIdPre+"_"+jobIdTxt);
    formData.append("input_vcf", file);
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

         varident_post(newFormData).catch((err) => {
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
          // navigate(`/results`);
          navigate(`/dashboard?tab=profile`);
        }, 5000);

    } catch (error) {
      alert('An error occurred while uploading the file.', error);
    }
  };

  // Handle reset
  const handleReset = () => {
     generateJobId();
    setFile(null);
    document.getElementById("input_vcf").value = ""; // Reset file input
  };

  const handleDownload = (filename) => {
        const fileUrl = `/example_data/${filename}.vcf`; // File path in public folder
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = filename + ".vcf"; // Ensures the file downloads
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
};

  return (
    <div className="varident-container">
      <div className="row pt-3">
        <div className="col-md-12">当前位置 &gt;&gt; 群体判别</div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <h4>群体判别</h4>
          <p>基于用户提交vcf文件用于品种所属群体判别分析。</p>
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
            <div className="row mb-3 form-group">
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
                      placeholder="Enter a descriptive title for your job"
                      onChange={(e) => setJobIdTxt(e.target.value)}
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
                    // multiple
                    onChange={handleFileChange}
                    required
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
                  <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => handleDownload("example_varident")}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;Example data&nbsp;&nbsp;&nbsp;&nbsp;
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

export default VarIdent;
