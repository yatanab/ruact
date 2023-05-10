import { Stack, Typography } from "@mui/material";
import LetterAvatars from "./UserAvator";

export type User = {
  userId: string,
  name: string,
}

export function UserInfo(props: {user: User}) {

  return (
    <Stack direction='row' alignItems={"center"} sx={{margin: 1}} className='VerticalTypography'>
      <LetterAvatars userName={props.user.name}/>
      <Typography variant="body2" sx={{marginTop: 2}}>{props.user.name}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{marginTop: 2}}>@{props.user.userId}</Typography>
    </Stack>
  )
}