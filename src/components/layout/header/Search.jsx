import Container from "../../../styles/components/Search";
import SearchIcon from "../../../assets/icon/search-icon.svg?react";

const Search = ({
  width = "628",
  height = "48",
  text = "나에게 딱 맞는 제작사는 어디 있을까?",
  textSize = 16,
  textWeight = 500,
  textColor = "#4D4D4D",
  radius = "16",
  pad = 12
}) => {
  return (
    <Container
      width={width}
      height={height}
      radius={radius}
      textColor={textColor}
      pad={pad}
    >
      <div className="wrap">
        <input type="text" placeholder={text} style={{fontWeight : textWeight, fontSize : textSize+"px"}}/>
        <SearchIcon />
      </div>
    </Container>
  );
};
export default Search;
