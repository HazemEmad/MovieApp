import React, {FC} from 'react';
import styled from 'styled-components/native';
import colors from '../constants/colors';
interface GenreItems {
  title: string;
}
const Genre: FC<GenreItems> = ({title}) => {
  return (
    <ContainerGenre>
      <Text>{title}</Text>
    </ContainerGenre>
  );
};
const ContainerGenre = styled.View`
  background-color: ${colors.gray};
  padding: 5px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-vertical: 3px;
`;
const Text = styled.Text`
  color: ${colors.black};
  font-weight:bold
  font-size: 11px;
`;
export default Genre;
