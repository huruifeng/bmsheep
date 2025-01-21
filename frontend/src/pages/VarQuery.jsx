import { useState } from 'react';
import '/src/assets/bootstrap/css/bootstrap.min.css';

const VarQuery = () => {
  const [formData, setFormData] = useState({
    variationId: '',
    geneName: '',
    dbSnp: '',
    chr: 'chr1',
    chrFrom: 3000,
    chrTo: 4000,
    varType: 'snp',
    technologies: {
      wgs: false,
      '600k': false,
      '50k': false,
    },
    conseqTypes: {
      high: false,
      moderate: false,
      low: false,
      modifier: false,
      intergenic: false,
    },
    mfa: 'ge',
    mfaCutoff: '',
  });

  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        technologies: {
          ...prevState.technologies,
          [name]: checked,
        },
      }));
    } else if (name.startsWith('conseq')) {
      setFormData((prevState) => ({
        ...prevState,
        conseqTypes: {
          ...prevState.conseqTypes,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your backend API here and set results
    // Assuming results are in an array
    setResults([
      { id: 1, variationId: 'oas5220', geneName: 'PTEN', chr: 'chr1', position: '3000-4000', type: 'SNP', consequence: 'High', ref: 'A', alt: 'G' },
      // More mock data here
    ]);
  };

  const handleReset = () => {
    setFormData({
      variationId: '',
      geneName: '',
      dbSnp: '',
      chr: 'chr1',
      chrFrom: 3000,
      chrTo: 4000,
      varType: 'snp',
      technologies: { wgs: false, '600k': false, '50k': false },
      conseqTypes: { high: false, moderate: false, low: false, modifier: false, intergenic: false },
      mfa: 'ge',
      mfaCutoff: '',
    });
    setResults([]);
  };

  return (
    <div className="varquery-container">
      <div className="row pt-3">
        <div className="col-md-12">当前位置 &gt;&gt; 变异查询</div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <h4>变异查询</h4>
          <p>变异查询功能可以根据用户的输入查询变异情况，并展示查询结果。</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-12">
            <h5>参数输入:</h5>
            <div className="row mb-3">
              <label htmlFor="input_name" className="col-sm-2 col-form-label">Name:</label>
              <div className="col-sm-10">
                <div className="row gy-2 gx-3 align-items-center" id="input_name">
                  <div className="col-auto">
                    <label className="visually-hidden" htmlFor="variation_id">Variation ID</label>
                    <div className="input-group">
                      <div className="input-group-text">Variation ID</div>
                      <input
                          type="text"
                          id="variation_id"
                          name="variationId"
                          value={formData.variationId}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="oas5220"
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <label className="visually-hidden" htmlFor="gene_name">Gene Name</label>
                    <div className="input-group">
                      <div className="input-group-text">Gene Name</div>
                      <input
                          type="text"
                          id="gene_name"
                          name="geneName"
                          value={formData.geneName}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="PTEN"
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <label className="visually-hidden" htmlFor="dbsnp">db SNP</label>
                    <div className="input-group">
                      <div className="input-group-text">db SNP</div>
                      <input
                          type="text"
                          id="dbsnp"
                          name="dbSnp"
                          value={formData.dbSnp}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="rs123456"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="input_position" className="col-sm-2 col-form-label">Position:</label>
              <div className="col-sm-10">
                <div className="row gy-2 gx-3 align-items-center" id="input_position">
                  <div className="col-auto">
                    <label className="visually-hidden" htmlFor="chr_n">Chr</label>
                    <div className="input-group">
                      <div className="input-group-text">Chr</div>
                      <select
                          className="form-select"
                          id="chr_n"
                          name="chr"
                          value={formData.chr}
                          onChange={handleInputChange}
                      >
                        <option value="chr1">chr1</option>
                        <option value="chr2">chr2</option>
                        <option value="chr3">chr3</option>
                        <option value="chr4">chr4</option>
                        <option value="chr5">chr5</option>
                        <option value="chr6">chr6</option>
                        <option value="chr7">chr7</option>
                        <option value="chr8">chr8</option>
                        <option value="chr9">chr9</option>
                        <option value="chr10">chr10</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-auto">
                    <label className="visually-hidden" htmlFor="chr_from">From</label>
                    <div className="input-group">
                      <div className="input-group-text">From</div>
                      <input
                          type="text"
                          id="chr_from"
                          name="chrFrom"
                          value={formData.chrFrom}
                          onChange={handleInputChange}
                          className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <label className="visually-hidden" htmlFor="chr_to">To</label>
                    <div className="input-group">
                      <div className="input-group-text">To</div>
                      <input
                          type="text"
                          id="chr_to"
                          name="chrTo"
                          value={formData.chrTo}
                          onChange={handleInputChange}
                          className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="input_var" className="col-sm-2 col-form-label">Variation Type:</label>
              <div className="col-sm-10">
                <div className="row gy-2 gx-3 align-items-center" id="input_var">
                  <div className="col-auto">
                    <label className="visually-hidden" htmlFor="var_type">Variation Type</label>
                    <div className="input-group">
                      <select
                          className="form-select"
                          id="var_type"
                          name="varType"
                          value={formData.varType}
                          onChange={handleInputChange}
                      >
                        <option value="snp">SNP</option>
                        <option value="cnv">CNV</option>
                        <option value="del">Deletion</option>
                        <option value="ins">Insertion</option>
                        <option value="dup">Duplication</option>
                        <option value="inv">Inversion</option>
                        <option value="tra">Translocation</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="input-group ps-5" id="technology">
                      <label className="pe-3">Technology</label>
                      <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="tech_WGS"
                            name="wgs"
                            checked={formData.technologies.wgs}
                            onChange={handleInputChange}
                        />
                        <span className="form-check-label" htmlFor="tech_WGS">WGS</span>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="tech_600k"
                            name="600k"
                            checked={formData.technologies['600k']}
                            onChange={handleInputChange}
                        />
                        <span className="form-check-label" htmlFor="tech_600k">600k</span>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="tech_50k"
                            name="50k"
                            checked={formData.technologies['50k']}
                            onChange={handleInputChange}
                        />
                        <span className="form-check-label" htmlFor="tech_50k">50k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="input_mfa" className="col-sm-2 col-form-label">Minor Allele Frequency:</label>
              <div className="col-sm-10">
                <div className="row gy-2 gx-3 align-items-center" id="input_mfa">
                  <div className="col-auto">
                    <label className="visually-hidden" htmlFor="mfa">MFA</label>
                    <div className="input-group">
                      <div className="input-group-text">MFA</div>
                      <select
                          className="form-select"
                          id="mfa"
                          name="mfa"
                          value={formData.mfa}
                          onChange={handleInputChange}
                      >
                        <option value="ge"> &ge; </option>
                        <option value="le"> &le; </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-auto">
                    <label className="visually-hidden" htmlFor="mfa_cutoff">MFA cutoff</label>
                    <div className="input-group">
                      <input
                          type="text"
                          id="mfa_cutoff"
                          name="mfaCutoff"
                          value={formData.mfaCutoff}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="0.0 ~ 1.0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="mb-3 row">
              <div className="col-sm-10 offset-sm-2">
                <button type="submit" className="btn btn-primary">Filter</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleReset}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Results Table */}
      {results.length === 0 ? (
          <div className="row mt-3">
            <div className="col-md-12">
              <hr />
              <h5>查询结果: 请在上方输入查询条件并点击Filter按钮进行查询 </h5>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th><th scope="col">Variation ID</th> <th scope="col">Gene Name</th><th scope="col">db SNP</th>
                    <th scope="col">Chr</th><th scope="col">Position</th><th scope="col">Type</th><th scope="col">Consequence</th><th scope="col">MFA</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>

              </div>
          </div>
      ) : (
          <div className="row mt-3">
            <div className="col-md-12">
              <h5>查询完成: 查询到 {results.length} 条记录 </h5>
              <table className="table">
                <thead>
                <tr>
                  <th scope="col">Variation ID</th>
                  <th scope="col">Gene Name</th>
                  <th scope="col">Chromosome</th>
                  <th scope="col">Position</th>
                  <th scope="col">Type</th>
                  <th scope="col">Consequence</th>
                  <th scope="col">Reference</th>
                  <th scope="col">Alternative</th>
                </tr>
                </thead>
                <tbody>
                {results.map((result) => (
                    <tr key={result.id}>
                      <td>{result.variationId}</td>
                      <td>{result.geneName}</td>
                      <td>{result.chr}</td>
                      <td>{result.position}</td>
                      <td>{result.type}</td>
                      <td>{result.consequence}</td>
                      <td>{result.ref}</td>
                      <td>{result.alt}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
      )}
    </div>
  );
};

export default VarQuery;
