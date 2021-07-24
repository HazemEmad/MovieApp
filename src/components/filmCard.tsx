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
class FilmCard extends React.Component<FilmItem> {
  constructor(props: FilmItem) {
    super(props);
  }
  state = {genres: []};
  getGenres(): void {
    var myGenres: string[] = [];
    this.props.movieGenres.map(genre => {
      let i = this.props.allGenres.findIndex(obj => get(obj, 'id') == genre);
      myGenres.push(get(this.props.allGenres, [i, 'name'], 'no name!'));
    });
    this.setState({
      genres: myGenres,
    });
  }

  componentDidMount() {
    this.getGenres();
  }
  navigate(): void {
    this.props.navigation.navigate('Movie', {
      image: this.props.image,
      title: this.props.title,
      rate: this.props.rate,
      overview: this.props.overview,
      genres: this.state.genres,
      id: this.props.id,
    });
  }

  getFormatedDate(date: string): string {
    return new Date(date).toDateString();
  }
  render() {
    return (
      <ContainerCard onPress={this.navigate.bind(this)}>
        <ImageCard width={'90px'} height={'100px'} url={this.props.image} />
        <FilmAbout>
          <MovieTitle>{this.props.title}</MovieTitle>
          <MovieRelease>
            {this.getFormatedDate(this.props.releaseDate)}
          </MovieRelease>
          <GenresContainer>
            {this.state.genres.map((genre, index) => (
              <Genre key={index} title={genre} />
            ))}
          </GenresContainer>
        </FilmAbout>
        <MovieRate>{this.props.rate}%</MovieRate>
      </ContainerCard>
    );
  }
}
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
