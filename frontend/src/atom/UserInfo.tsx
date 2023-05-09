import { Stack, Typography } from "@mui/material";
import LetterAvatars from "./UserAvator";

export type User = {
  userId: string,
  name: string,
}

export function UserInfo(props: {user: User}) {
  return (
    <Stack direction="row" spacing={1} alignItems={"center"} sx={{margin: 1}}>
      <LetterAvatars userName={props.user.name}/>
      <Typography variant="body2">{props.user.name}</Typography>
      <Typography variant="caption" color="text.secondary">@{props.user.userId}</Typography>
    </Stack>
  )
}