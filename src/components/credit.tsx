import React, {FC} from 'react';
import styled from 'styled-components/native';
import colors from '../constants/colors';

interface GenreItems {
  url: string;
  name: string;
}
const Credit: FC<GenreItems> = ({url, name}) => {
  return (
    <ContainerCredit>
      <CircleImage source={{uri: url}} />
      <CreditName>{name}</CreditName>
    </ContainerCredit>
  );
};
const ContainerCredit = styled.View`
  padding: 7px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;
const CircleImage = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 35px;
  resize-mode: cover;
  background-color: red;
`;
const CreditName = styled.Text`
  color: ${colors.black};
`;
export default Credit;
