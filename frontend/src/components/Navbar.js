import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  Work as WorkIcon,
  Event as EventIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0} sx={{
      background: 'linear-gradient(90deg, #7C3AED 60%, #A78BFA 100%)',
      boxShadow: '0 4px 16px 0 rgba(124,58,237,0.10)',
      borderRadius: 0,
    }}>
      <Toolbar sx={{ minHeight: 72 }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            Job Tracker
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<DashboardIcon />}
            sx={{ color: '#fff', fontWeight: 600, borderRadius: 3, px: 2 }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/applications"
            startIcon={<WorkIcon />}
            sx={{ color: '#fff', fontWeight: 600, borderRadius: 3, px: 2 }}
          >
            Applications
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/interviews"
            startIcon={<EventIcon />}
            sx={{ color: '#fff', fontWeight: 600, borderRadius: 3, px: 2 }}
          >
            Interviews
          </Button>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ ml: 1 }}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main', fontWeight: 700, fontSize: 20 }}>
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>
              <Typography variant="body2">
                Welcome, {user?.username || 'User'}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'primary.main', fontWeight: 600 }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 