import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import { useRouter } from "next/router";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Image from "next/image";

export default function MenuAppBar() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{mt:0.1}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent:"center"}}
          >
            <Image
              src={`/Horus.png`}
              width={50}
              height={35}
              alt="logo horus"
              placeholder="blur"
              blurDataURL={"/Horus.png"}
            />
            {process.env.NEXT_PUBLIC_NAME_APP}
          </Typography>

          {status === "authenticated" && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={session.user.name} src="#" />
              </IconButton>
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
                <MenuItem onClick={() => router.push("/usuario/perfil")}>
                  <PersonIcon />
                  <Typography textAlign="center">Perfil</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <KeyIcon />
                  <Typography textAlign="center">Contraseña</Typography>
                </MenuItem>
                <MenuItem onClick={() => signOut()}>
                  <LogoutIcon />
                  <Typography textAlign="center">Salir</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem disablePadding onClick={() => router.push("/")}>
              <ListItemButton>
                <ListItemIcon>
                  <LeaderboardIcon
                    color={router.pathname == "/" ? "primary" : ""}
                  />
                </ListItemIcon>
                <ListItemText primary="Tablero" />
              </ListItemButton>
            </ListItem>

            <Divider />
            {session?.rol == "superadmin" ? (
              <>
                <ListItem
                  disablePadding
                  onClick={() => router.push("/combustible")}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <OilBarrelIcon
                        color={
                          router.pathname.split("/")[1] == "combustible"
                            ? "primary"
                            : ""
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Combustible" />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  onClick={() => router.push("/entidad")}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <BusinessIcon
                        color={
                          router.pathname.split("/")[1] == "entidad"
                            ? "primary"
                            : ""
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Entidad" />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  onClick={() => router.push("/usuario")}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <ManageAccountsIcon
                        color={
                          router.pathname.split("/")[1] == "usuario"
                            ? "primary"
                            : ""
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                  </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem
                  disablePadding
                  onClick={() => router.push("/despacho")}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <CalendarMonthIcon
                        color={
                          router.pathname.split("/")[1] == "despacho"
                            ? "primary"
                            : ""
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Despacho" />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  onClick={() => router.push("/autorizo")}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <LocalGasStationIcon
                        color={
                          router.pathname.split("/")[1] == "autorizo"
                            ? "primary"
                            : ""
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Autorizo" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  disablePadding
                  onClick={() => router.push("/distribucion")}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <LocalGasStationIcon
                        color={
                          (router.pathname.split("/")[1] == "distribucion" &&
                            !router.pathname.split("/")[2]) ||
                          (router.pathname.split("/")[1] == "distribucion" &&
                            router.pathname.split("/")[2] == "nuevo")
                            ? "primary"
                            : ""
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Distribución" />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  onClick={() => router.push("/distribucion/listar")}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <AssignmentIcon
                        color={
                          router.pathname.split("/")[1] == "distribucion" &&
                          router.pathname.split("/")[2] == "listar"
                            ? "primary"
                            : ""
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Listar" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
