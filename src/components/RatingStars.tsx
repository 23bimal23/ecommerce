import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";


const RatingStars = ({rate, count}) => {
    const filledStar = Math.floor(rate)
    const hasHalfStar = rate % 1 !== 0
    const emptyStar = 5- filledStar -(hasHalfStar?1:0)
  return (
    <div>
        {[...Array(filledStar)].map((_,index) =>(
            <StarIcon key={index} color="secondary"/>
        ))}
        {hasHalfStar && <StarBorderIcon key="half" color="secondary" />}
      {[...Array(emptyStar)].map((_, index) => (
        <StarBorderIcon key={index} color="secondary" />
      ))}
      <span>({count} reviews)</span>
    </div>
  )
};

export default RatingStars;
