import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
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
    <Typography variant="h3" sx={{marginBottom: 3}}>
      push通知機能を試す
    </Typography>
    <Stack>
      <Button onClick={clickOnCheckPermission} sx={{marginBottom: 3}}>permissino確認</Button>
      <Button onClick={clickOnPermissionGranted} sx={{marginBottom: 3}}>通知設定の許可</Button>
      <Button onClick={clickNotification} sx={{marginBottom: 3}}>通知送信</Button>
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