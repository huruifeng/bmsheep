import '/src/assets/bootstrap/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const VarIdent = () => {
  const [jobIdPre, setJobIdPre] = useState('');
  const [jobIdTxt, setJobIdTxt] = useState('');
  const [vcfFiles, setVcfFiles] = useState([]);

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
    setVcfFiles(Array.from(e.target.files));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    const formData = new FormData();
    formData.append('job_id_pre', jobIdPre);
    formData.append('job_id_txt', jobIdTxt);
    vcfFiles.forEach((file, index) => formData.append(`input_vcf[${index}]`, file));

    console.log('Form submitted:', {
      jobIdPre,
      jobIdTxt,
      vcfFiles,
    });

    // Post formData to the backend (e.g., using fetch or axios)
  };

  // Handle reset
  const handleReset = () => {
    generateJobId();
    setVcfFiles([]);
  };

  return (
    <div className="varident-container">
      <div className="row pt-3">
        <div className="col-md-12">当前位置 &gt;&gt; 基因型填充</div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <h4>基因型填充</h4>
          <p>基于用户提交vcf文件用于基因型填充。</p>
        </div>
      </div>

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
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <label htmlFor="input_button" className="col-sm-2 col-form-label"></label>
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

export default VarIdent;
