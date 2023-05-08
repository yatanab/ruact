import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";


export default function NotificationSample() {

  const [open, setOpen] = useState(false);

  const clickOnCheckPermission = () => {
    setOpen(!open)
    console.log(Notification.permission);
  };

  const clickOnPermissionGranted = () => {
    Notification.requestPermission().then(function(result) {
      console.log(result);
    });
  }

  const clickNotification = () => {
    const notif = new Notification("hello notification", {
      body: 'this is first notification',
      tag: 'message'
      
    });

  }

  return (
  <Container sx={{display: 'flex', flexDirection: 'column'}}>
    <Stack>
      <Button onClick={clickOnCheckPermission}>Check Permission</Button>
      <Button onClick={clickOnPermissionGranted}>Permission granted</Button>
      <Button onClick={clickNotification} >!!Notification!!</Button>
    </Stack>
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        {"Permission status"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`permission: ${Notification.permission}`}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  </Container>);
}