import React, {FC} from 'react';
import styled from 'styled-components/native';
import colors from '../constants/colors';
import {DEFAULT_MOVIE} from '../constants/images';
import {GET_IMAGE} from '../constants/urls';

interface ImageItems {
  width: string | number;
  height: string | number;
  url: string;
}
const ImageCard: FC<ImageItems> = ({width, height, url, ...props}) => {
  return (
    <ImageContainer width={width} height={height} {...props}>
      <ImgView source={url ? {uri: GET_IMAGE + url} : DEFAULT_MOVIE} />
    </ImageContainer>
  );
};
const ImageContainer = styled.View`
  width: ${(props: ImageItems) => props.width};
  height: ${(props: ImageItems) => props.height};
  background-color: ${colors.gray};
  margin-right: 8px;
`;
const ImgView = styled.Image`
  flex: 1;
  border-radius: 5px;
  width: undefined;
  height: undefined;
  resize-mode: stretch;
`;
export default ImageCard;
