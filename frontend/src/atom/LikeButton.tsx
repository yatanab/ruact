import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material-next/Button';
import { getRandomInt } from '../util/random';


function LikeCheckBox() {
  return <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} />
}

export default function LikeButton() {

  const random = getRandomInt(100).toString();

  return (
    <FormControlLabel control={<LikeCheckBox />} label={random} />
  )
}