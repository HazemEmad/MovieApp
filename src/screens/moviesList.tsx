import React, {FC, useState} from 'react';
import styled from 'styled-components/native';
import FilmCard from '../components/filmCard';
import Tab from '../components/tab';
import colors from '../constants/colors';

const MovieList: FC = () => {
  const titleTabs: string[] = ['Upcoming', 'Popular', 'Top Rated'];
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  return (
    <Container>
      <Title>Movies</Title>
      <TabsContainer>
        {titleTabs.map(titleTab => (
          <Tab
            key={titleTab}
            title={titleTab}
            onPress={() => setSelectedTab(titleTab)}
            selected={selectedTab == titleTab}
          />
        ))}
      </TabsContainer>
      <FilmCard />
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  padding: 25px;
`;
const Title = styled.Text`
  color: ${colors.black};
  font-weight: bold;
  font-size: 25px;
`;
const TabsContainer = styled.View`
  width: 100%;
  margin-vertical: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export default MovieList;
