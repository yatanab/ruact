import { Card, CardContent, Container, Typography, makeStyles } from "@mui/material";
import { Haiku } from "../page/API";
import { User, UserInfo } from "./UserInfo";
import LikeButton from "./LikeButton";
import { getRandomInt } from "../util/random";
import './style.css'
import { Season } from "../constant/Season";


export default function BasicCard(props: {v: Haiku, i: number}) {
  
  const user: User = {
    userId: getRandomInt(999999).toString(),
    name: getRandomInt(999999).toString(),
  }

  return (
    <Card key={props.i}>
      <CardContent className={Season[getRandomInt(4)]} >
        <Container disableGutters className='VerticalTypography'>
          <UserInfo user={user}/>
          <Container sx={{margin: 4}} disableGutters className='VerticalTypography'>
            <Typography className='VerticalTypography' variant="h5" component="div">
              {props.v.kami_no_ku}
            </Typography>
            <Typography className='VerticalTypography' variant="h5" component="div" sx={{marginTop: 3}}>
              {props.v.naka_no_ku}
            </Typography>
            <Typography className='VerticalTypography' variant="h5" component="div" sx={{marginTop: 9}}>
              {props.v.shimo_no_ku}
            </Typography>
            </Container >
        </Container >
        <LikeButton />
      </CardContent>
    </Card>
  )
}