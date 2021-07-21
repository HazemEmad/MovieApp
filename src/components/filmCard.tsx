import React, {FC} from 'react';
import styled from 'styled-components/native';
import colors from '../constants/colors';
import ImageCard from './imageCard';
import Genre from './genre';

const FilmCard: FC = () => {
  const genres: string[] = ['Action', 'Adventure', 'Comedy'];
  return (
    <ContainerCard>
      <ImageCard
        width={'85px'}
        height={'100px'}
        url={
          'https://i.pinimg.com/originals/bc/d5/c9/bcd5c9519581acc60bd60a429ab0c88f.jpg'
        }
      />
      <FilmAbout>
        <MovieTitle>intersteller</MovieTitle>
        <MovieRelease>November 5,2014</MovieRelease>
        <GenresContainer>
          {genres.map((genre, index) => (
            <Genre key={index} title={genre} />
          ))}
        </GenresContainer>
      </FilmAbout>
      <MovieRate>85%</MovieRate>
    </ContainerCard>
  );
};
const ContainerCard = styled.View`
  background-color: ${colors.white};
  elevation: 2;
  border-radius: 5px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
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
