// NavBar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Menu, MenuItem} from '@mui/material';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" className="nav-bar">
      <Toolbar className="nav-toolbar">
        <Typography variant="h4" className="logo">
          SheepDB
        </Typography>
        <div className="nav-links">
          <Button color="inherit" href="/">主页</Button>
          <Button color="inherit" href="/varquery">变异查询</Button>
          <Button color="inherit" href="/varident">群体判别</Button>
          <Button
            color="inherit"
            aria-controls="chipdesign"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            鉴定芯片设计
          </Button>
           <Menu
              id="chipdesign"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/chipdesignvcf">
                基于VCF文件
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/chipdesignpop">
                基于群体
              </MenuItem>
            </Menu>
          <Button color="inherit" href="/genimpute">基因型填充</Button>
          <Button color="inherit" href="/astryaly">血缘分析</Button>
          <Button color="inherit" href="/help">帮助与联系</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
