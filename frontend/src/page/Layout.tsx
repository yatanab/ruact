import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TimelineIcon from '@mui/icons-material/Timeline';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthStatus } from '../auth/AuthProvider';
import { URLs } from '../constant/Routers';
import { AppBar, styled, SvgIconTypeMap, SwipeableDrawer } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

type Icon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string;}

const drawerWidth = 240;
const appBarHeight = "64px";

const AppTitle = "Open Secret Organization"

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(open);
    };

    const DrawerItem = (props: {
      name: string,
      linkTo: string,
      icon: Icon
    }) => {
      return (
        <ListItem key={props.name} disablePadding>
        <ListItemButton onClick={() => navigate(props.linkTo)}>
          <ListItemIcon>
            <props.icon />
          </ListItemIcon>
          <ListItemText primary={props.name} />
        </ListItemButton>
      </ListItem>
      )}
  
    const contentList = () => (
      <Box
        component="div"
        sx={{ width: drawerWidth}}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <DrawerItem name={"Home"} linkTo={URLs.root} icon={HomeIcon}/>
          <DrawerItem name={"Private"} linkTo={URLs.private} icon={LockIcon}/>
          <DrawerItem name={"Notification"} linkTo={URLs.notification} icon={NotificationsIcon}/>
          <DrawerItem name={"Chart"} linkTo={URLs.chart} icon={TimelineIcon}/>
          <DrawerItem name={"API Test"} linkTo={URLs.apiTest} icon={CloudSyncIcon}/>
          <DrawerItem name={"Card List"} linkTo={URLs.cardList} icon={CloudSyncIcon}/>
        </List>
      </Box>
    );

  return (
    <Box component="div" sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" sx={{height: appBarHeight, display: 'flex', flexDirection: 'column'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{flex: 1, marginLeft: 2}} >
            {AppTitle}
          </Typography>
          <AuthStatus />
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
            open={open}
            anchor="left"
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
        {contentList()}
      </SwipeableDrawer>
      <Box component="main" sx={{marginTop: appBarHeight, flexGrow: 1, p: 3 }} >
        <Outlet />
      </Box>
    </Box>
  );
}