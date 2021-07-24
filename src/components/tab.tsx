import React, {FC} from 'react';
import styled from 'styled-components/native';
import colors from '../constants/colors';
interface TabsItem {
  selected: boolean;
  title: string;
  onPress: Function;
}
const Tab: FC<TabsItem> = ({selected, title, onPress}) => {
  return (
    <Touchable onPress={onPress} selected={selected}>
      <Text selected={selected}>{title}</Text>
    </Touchable>
  );
};
const Touchable = styled.TouchableOpacity`
  background-color: ${(props: TabsItem) =>
    props.selected ? colors.green : colors.gray};
  elevation:${(props: TabsItem) => (props.selected ? 5 : 0)}
  width: 32%;
  height: 30px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
`;
const Text = styled.Text`
  color: ${(props: TabsItem) => (props.selected ? colors.white : colors.black)};
  font-weight: bold;
`;
export default Tab;
