import React, {FC} from 'react';
import styled from 'styled-components/native';
import colors from '../constants/colors';
interface ImageItems {
  width: string | number;
  height: string | number;
  url: string;
}
const ImageCard: FC<ImageItems> = ({width, height, url}) => {
  console.log(width, height, url);

  return (
    <ImageContainer width={width} height={height}>
      <ImgView source={{uri: url}} />
    </ImageContainer>
  );
};
const ImageContainer = styled.View`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${colors.white};
`;
const ImgView = styled.Image`
  flex: 1;
  border-radius: 20px;
  width: undefined;
  height: undefined;
  resize-mode: contain;
`;
export default ImageCard;
