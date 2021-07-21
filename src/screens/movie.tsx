import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Credit from '../components/credit';
import Genre from '../components/genre';
import ImageCard from '../components/imageCard';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Feather';
interface MovieItem {
  navigation: any;
}
const Movie: FC<MovieItem> = ({navigation}) => {
  const genres: string[] = ['Action', 'Adventure', 'Comedy'];
  return (
    <Container>
      <ScrollView>
        <Icon
          name={'chevron-left'}
          color={colors.black}
          size={25}
          onPress={() => navigation.goBack()}
        />
        <ImageCard
          width={'100%'}
          height={'270px'}
          url={
            'https://i.pinimg.com/originals/bc/d5/c9/bcd5c9519581acc60bd60a429ab0c88f.jpg'
          }
        />
        <MovieTitle>Wonder Women 1984</MovieTitle>
        <MovieRate>85%</MovieRate>
        <SubContainer>
          <Header>Overview</Header>
          <OverviewDescreption>
            Wonder Women 1984Wonder Women 1984Wonder Women 1984Wonder Women
            1984Wonder Women 1984Wonder Women 1984Wonder Women 1984 Wonder Women
            1984Wonder Women 1984Wonder Women 1984Wonder Women 1984 Wonder Women
            1984
          </OverviewDescreption>
        </SubContainer>
        <SubContainer>
          <Header>Genres</Header>
          <GenresContainer>
            {genres.map((genre, index) => (
              <Genre key={index} title={genre} />
            ))}
          </GenresContainer>
        </SubContainer>
        <SubContainer>
          <Header>Credits</Header>
          <ScrollView horizontal>
            {genres.map((genre, index) => (
              <Credit
                key={index}
                url={
                  'https://i.pinimg.com/originals/bc/d5/c9/bcd5c9519581acc60bd60a429ab0c88f.jpg'
                }
                name={'hazem'}
              />
            ))}
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
  width: 84%;
  flex-wrap: wrap;
`;
export default Movie;
