// TopBanner.jsx
import {AppBar, Toolbar, Button, Menu, MenuItem} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import useAuthStore from "../../stores/authStore.js";
import {Link} from "react-router-dom";
import {useState} from "react";

const TopBanner = () => {
    const {isAuthenticated, logout} = useAuthStore();

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
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

                        {isAuthenticated() ? (
                            <>
                                <Button
                                    color="inherit"
                                    aria-controls="profile-menu"
                                    aria-haspopup="true"
                                    onClick={handleMenuOpen}
                                  >
                                    <PersonIcon className="person-icon" />
                                  </Button>
                                   <Menu
                                      id="profile-menu"
                                      anchorEl={anchorEl}
                                      open={Boolean(anchorEl)}
                                      onClose={handleMenuClose}
                                    >
                                      <MenuItem onClick={handleMenuClose} component={Link} to="/dashboard">
                                        个人中心
                                      </MenuItem>
                                      <MenuItem onClick={logout} component={Link} to="/">
                                        退出登录
                                      </MenuItem>
                                    </Menu>
                            </>
                        ): (
                            <>
                                 <Button color="inherit" href="/register">
                                    注册
                                </Button>
                                <Button color="inherit" href="/login">
                                    登录
                                </Button>
                            </>
                        )

                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )};

export default TopBanner;
