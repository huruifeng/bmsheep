// Footer.jsx
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box className="footer">
    <Typography variant="body2" align="center" className="footer-text">
      Copyright &copy; 2012~2020
      <a
        href="http://www.croplab.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        National Key Laboratory of Crop Genetic Improvement
      </a>
      and
      <a
        href="http://www.croplab.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        Center for Bioinformatics
      </a>, Huazhong Agricultural University. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
