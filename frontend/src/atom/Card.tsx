import { Card, CardContent, Typography } from "@mui/material";
import { Haiku } from "../page/API";
import { User, UserInfo } from "./UserInfo";
import LikeButton from "./LikeButton";
import { getRandomInt } from "../util/random";


export default function BasicCard(props: {v: Haiku, i: number}) {
  
  const user: User = {
    userId: getRandomInt(999999).toString(),
    name: getRandomInt(999999).toString(),
  }

  return (
    <Card key={props.i}>
      <CardContent>
        <UserInfo user={user}/>
        <Typography variant="h5" component="div">
          {props.v.kami_no_ku}
        </Typography>
        <Typography variant="h5" component="div">
          {props.v.naka_no_ku}
        </Typography>
        <Typography variant="h5" component="div">
          {props.v.shimo_no_ku}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.v.auther}
        </Typography>
        <Typography variant="body1">
          {props.v.description}
        </Typography>
        <LikeButton />
      </CardContent>
    </Card>
  )
}