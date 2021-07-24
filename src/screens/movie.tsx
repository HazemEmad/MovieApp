import React, {FC, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Credit from '../components/credit';
import Genre from '../components/genre';
import ImageCard from '../components/imageCard';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Feather';
import {get} from 'lodash';
import {BASE_URL, GET_CREDITS, API_KEY} from '../constants/urls';

interface MovieItem {
  navigation: object;
  route: object;
}

const Movie: FC<MovieItem> = props => {
  const {navigation, route} = props;
  const {title, genres, image, overview, rate, id} = get(route, 'params');

  const [credits, setCredits] = useState<object[]>([]);
  function getCredits(): void {
    fetch(`${BASE_URL + GET_CREDITS.replace('id', id) + API_KEY}`)
      .then(response => response.json())
      .then(json => setCredits([...get(json, 'cast'), ...get(json, 'crew')]))
      .catch(e => console.log(e));
  }
  useEffect(() => {
    let isSubscribed: boolean = true;
    if (isSubscribed) getCredits();
    return () => (isSubscribed = false);
  }, []);
  return (
    <Container>
      <IconContainer onPress={() => navigation.pop()}>
        <Icon name={'chevron-left'} color={colors.black} size={25} />
      </IconContainer>
      <ScrollView>
        <ImageCard
          width={'100%'}
          height={'270px'}
          url={image}
          style={{marginTop: 30}}
        />
        <MovieTitle>{title}</MovieTitle>
        <MovieRate>{rate}%</MovieRate>
        <SubContainer>
          <Header>Overview</Header>
          <OverviewDescreption>{overview}</OverviewDescreption>
        </SubContainer>
        <SubContainer>
          <Header>Genres</Header>
          <GenresContainer>
            {genres.length != 0 ? (
              genres.map((genre, index) => <Genre key={index} title={genre} />)
            ) : (
              <NotFoundText>Not Found Genres!</NotFoundText>
            )}
          </GenresContainer>
        </SubContainer>
        <SubContainer>
          <Header>Credits</Header>
          <ScrollView horizontal>
            {credits.length != 0 ? (
              credits.map((credit, index) => (
                <Credit
                  key={index}
                  url={get(credit, 'profile_path')}
                  name={get(credit, 'name')}
                />
              ))
            ) : (
              <NotFoundText>Not Found Credits!</NotFoundText>
            )}
          </ScrollView>
        </SubContainer>
      </ScrollView>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  padding: 25px;
  background-color: ${colors.white};
`;
const IconContainer = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  z-index: 10;
`;
const MovieTitle = styled.Text`
  color: ${colors.black};
  margin-vertical: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 22px;
`;
const MovieRate = styled.Text`
  color: ${colors.green};
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;
const Header = styled.Text`
  color: ${colors.black};
  font-weight: bold;
  font-size: 16px;
`;
const OverviewDescreption = styled.Text`
  color: ${colors.Obacityblack1};
`;
const SubContainer = styled.View`
  margin-vertical: 10px;
`;
const GenresContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
const NotFoundText = styled.Text`
  color: ${colors.Obacityblack1};
  font-weight: bold;
`;

export default Movie;
