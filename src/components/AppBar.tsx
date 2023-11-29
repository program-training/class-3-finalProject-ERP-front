import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function ResponsiveAppBar() {
  const authContext = React.useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const setAuthenticated = authContext?.setIsAuthenticated;
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleLogOut = () => {
    setAnchorElUser(null);
    setAuthenticated && setAuthenticated(null);
    localStorage.removeItem("admin");
    navigate("/erp");
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={isAuthenticated ? "/erp/products" : "/erp"}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              ERP
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href={isAuthenticated ? "/erp/products" : "/erp"}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ERP
            </Typography>
            {isAuthenticated && (
              <Box>
                <Tooltip
                  title="Admin is logged in"
                  onClick={handleOpenUserMenu}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography>{isAuthenticated.userName}</Typography>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogOut} key={"Log out"}>
                    <Typography textAlign="center">{"Log out"}</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </div>
  );
}
export default ResponsiveAppBar;
