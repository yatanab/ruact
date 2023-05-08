import { Card, CardContent, Typography } from "@mui/material";
import { digestMessage } from "../../util/digest";

export type content = {
  title: string,
  body: string,
  key?: string,
}

export default function BasicCard(v: content) {
  digestMessage(v.title).then((res => v.key = res))

  return (
    <Card key={v.key}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {v.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {v.key}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
          <br />
          {v.body}
          {v.key}
        </Typography>
      </CardContent>
    </Card>
  )
}