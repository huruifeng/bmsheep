import '/src/assets/bootstrap/css/bootstrap.min.css';

import { useState, useEffect } from 'react';

const ChipDesignVCF = () => {
  const [jobIdPre, setJobIdPre] = useState('');
  const [jobIdTxt, setJobIdTxt] = useState('');
  const [vcfFiles, setVcfFiles] = useState([]);
  const [nSnp, setNSnp] = useState('');

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

  // Handle SNP filter input (only allow integers)
  const handleNSnpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setNSnp(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('job_id_pre', jobIdPre);
    formData.append('job_id_txt', jobIdTxt);
    formData.append('n_snp', nSnp);
    vcfFiles.forEach((file, index) => formData.append(`input_vcf[${index}]`, file));

    console.log('Form submitted:', {
      jobIdPre,
      jobIdTxt,
      nSnp,
      vcfFiles,
    });

    // Implement form submission logic (e.g., send to backend using fetch or axios)
  };

  // Handle form reset
  const handleReset = () => {
    generateJobId();
    setVcfFiles([]);
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

export default ChipDesignVCF;
