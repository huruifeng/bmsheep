// TopBanner.jsx
import { AppBar, Toolbar, Button } from '@mui/material';

const TopBanner = () => (
  <div id="top_banner">
    <AppBar position="static" className="top-banner">
      <Toolbar className="top-banner-toolbar">
        <div className="logo-container">
          <img
            className="logo"
            src="/src/assets/images/logo.png"
            alt="Logo"
          />
        </div>
        <div className="nav-container">
          <Button color="inherit" href="/register">
            注册
          </Button>
          <Button color="inherit" href="/login">
            登录
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

export default TopBanner;
