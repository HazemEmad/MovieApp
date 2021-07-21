import React, {FC, useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import FilmCard from '../components/filmCard';
import Tab from '../components/tab';
import colors from '../constants/colors';
import {get} from 'lodash';
import {BASE_URL, GET_MOVIES, API_KEY, GET_GENRE} from '../constants/urls';
import Icon from 'react-native-vector-icons/Feather';

const MovieList: FC = props => {
  const titleTabs: Object[] = [
    {key: 'upcoming', value: 'Upcoming'},
    {key: 'popular', value: 'Popular'},
    {key: 'top_rated', value: 'Top Rated'},
  ];
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [load, setLoad] = useState(true);
  const list = useRef(null);

  function getMovies(tap: string, p: number): void {
    setLoad(true);
    fetch(`${BASE_URL + GET_MOVIES + tap + API_KEY}&page=${p}`)
      .then(response => response.json())
      .then(json => {
        setMovies(get(json, 'results'));
        list.current.scrollToOffset({animated: true, offset: 0});
        setLastPage(get(json, 'total_pages'));
        setLoad(false);
      })
      .catch(e => console.log(e));
  }

  function getGenres(): void {
    fetch(`${BASE_URL + GET_GENRE + API_KEY}`)
      .then(response => response.json())
      .then(json => setGenres(get(json, 'genres')))
      .catch(e => console.log(e));
  }

  useEffect(() => {
    getGenres();
    getMovies('upcoming', 1);
  }, []);

  function changePage(addOrMinus: boolean): void {
    if (addOrMinus) {
      if (page < lastPage) setPage(page + 1);
    } else {
      if (page > 1) setPage(page - 1);
    }
  }
  const renderItems = ({item}) => (
    <FilmCard
      navigation={get(props, 'navigation')}
      title={get(item, 'title')}
      releaseDate={get(item, 'release_date')}
      image={get(item, 'backdrop_path')}
      rate={parseFloat(get(item, 'vote_average')) * 10}
      movieGenres={get(item, 'genre_ids')}
      overview={get(item, 'overview')}
      id={get(item, 'id')}
      allGenres={genres}
    />
  );
  function _onPressTap(tap: string): void {
    setSelectedTab(tap);
    setMovies(selectedTab == tap ? movies : []);
    setPage(1);
    getMovies(tap, 1);
  }
  function _onRefresh(): void {
    setPage(1);
    getMovies(selectedTab, 1);
  }
  function changeCurrPage(addOrMinus: boolean): void {
    changePage(addOrMinus);
    getMovies(selectedTab, addOrMinus ? page + 1 : page - 1);
  }

  return (
    <Container>
      <Title>Movies</Title>
      <TabsContainer>
        {titleTabs.map(titleTab => (
          <Tab
            key={get(titleTab, 'key')}
            title={get(titleTab, 'value')}
            onPress={() => _onPressTap(get(titleTab, 'key'))}
            selected={selectedTab == get(titleTab, 'key')}
          />
        ))}
      </TabsContainer>
      <FlatList
        ref={list}
        data={movies}
        style={{marginBottom: 40}}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={_onRefresh}
        refreshing={load}
        renderItem={renderItems}
      />
      <ChangePageLeftContainer
        disabled={page == 1}
        onPress={() => changeCurrPage(false)}>
        <Icon
          name={'chevron-left'}
          color={page == 1 ? colors.Obacityblack2 : colors.green}
          size={40}
        />
        <PageText last={page == 1}>back</PageText>
      </ChangePageLeftContainer>
      <Page>{page}</Page>
      <ChangePageRightContainer
        disabled={page == lastPage}
        onPress={() => changeCurrPage(true)}>
        <PageText last={page == lastPage}>next</PageText>
        <Icon
          name={'chevron-right'}
          color={page == lastPage ? colors.Obacityblack2 : colors.green}
          size={40}
        />
      </ChangePageRightContainer>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  padding: 25px;
  background-color: ${colors.white};
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
const ChangePageLeftContainer = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  bottom: 20px;
  z-index: 10;
  flex-direction: row;
  align-items: center;
`;
const ChangePageRightContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  bottom: 20px;
  z-index: 10;
  flex-direction: row;
  align-items: center;
`;
const PageText = styled.Text`
  color: ${props => (props.last ? colors.Obacityblack2 : colors.green)};
`;
const Page = styled.Text`
  color: ${colors.Obacityblack2};
  position: absolute;
  font-weight: bold;
  font-size: 17px;
  align-self: center;
  bottom: 25px;
`;
export default MovieList;
