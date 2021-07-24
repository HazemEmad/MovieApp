import React, {FC, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import colors from '../constants/colors';
import ImageCard from './imageCard';
import Genre from './genre';
import {get} from 'lodash';

interface Genres {
  name: string;
  id: number;
}
interface FilmItem {
  navigation: any;
  title: string;
  releaseDate: string;
  rate: number;
  image: string;
  overview: string;
  id: number;
  movieGenres: [];
  allGenres: Genres[];
}
const FilmCard: FC<FilmItem> = ({
  navigation,
  title,
  releaseDate,
  rate,
  image,
  overview,
  id,
  movieGenres,
  allGenres,
}) => {
  const [genres, setGenres] = useState<string[]>([]);
  function getGenres(): void {
    var myGenres: string[] = [];
    movieGenres.map(genre => {
      let i = allGenres.findIndex(obj => get(obj, 'id') == genre);
      myGenres.push(allGenres[i].name);
    });
    setGenres(myGenres);
  }
  useEffect(() => {
    getGenres();
  }, []);
  function navigate(): void {
    navigation.navigate('Movie', {
      image: image,
      title: title,
      rate: rate,
      overview: overview,
      genres: genres,
      id: id,
    });
  }
  const date = new Date(releaseDate);
  return (
    <ContainerCard onPress={navigate}>
      <ImageCard width={'90px'} height={'100px'} url={image} />
      <FilmAbout>
        <MovieTitle>{title}</MovieTitle>
        <MovieRelease>{date.toDateString()}</MovieRelease>
        <GenresContainer>
          {genres.map((genre, index) => (
            <Genre key={index} title={genre} />
          ))}
        </GenresContainer>
      </FilmAbout>
      <MovieRate>{rate}%</MovieRate>
    </ContainerCard>
  );
};
const ContainerCard = styled.TouchableOpacity`
  background-color: ${colors.white};
  elevation: 4;
  border-radius: 5px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-vertical: 5px;
`;
const FilmAbout = styled.View`
  flex: 1;
`;
const MovieTitle = styled.Text`
  color: ${colors.Obacityblack1};
  font-weight: bold;
  margin-bottom: 5px;
`;
const MovieRelease = styled.Text`
  color: ${colors.Obacityblack2};
  margin-bottom: 5px;
`;
const GenresContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 84%;
  flex-wrap: wrap;
`;
const MovieRate = styled.Text`
    color:${colors.green}
    font-weight:bold
    font-size:17px;
    position:absolute;
    bottom:10px;
    right:10px;
`;
export default FilmCard;
