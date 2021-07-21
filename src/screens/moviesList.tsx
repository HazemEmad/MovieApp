import React, {FC, useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import FilmCard from '../components/filmCard';
import Tab from '../components/tab';
import colors from '../constants/colors';
import {get} from 'lodash';
import {BASE_URL, GET_MOVIES, API_KEY, GET_GENRE} from '../constants/urls';

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

  function getMovies(concat: boolean, tap: string, p: number): void {
    setLoad(true);
    fetch(`${BASE_URL + GET_MOVIES + tap + API_KEY}&page=${p}`)
      .then(response => response.json())
      .then(json => {
        if (concat) setMovies([...movies, ...get(json, 'results')]);
        else {
          setMovies(get(json, 'results'));
          list.current.scrollToOffset({animated: true, offset: 0});
        }
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
    getMovies(false, 'upcoming', 1);
  }, []);

  function changePage(): void {
    if (page < lastPage) setPage(page + 1);
  }
  const renderFooter = () => {
    return (
      <FooterContainer>
        {page == lastPage || movies.length == 0 ? null : (
          <LoadingText>Load More...</LoadingText>
        )}
      </FooterContainer>
    );
  };
  function _onPressTap(tap: string): void {
    setSelectedTab(tap);
    setMovies(selectedTab == tap ? movies : []);
    getMovies(false, tap, 1);
  }
  function _onRefresh(): void {
    setPage(1);
    getMovies(false, selectedTab, 1);
  }
  function _onEndReached(): void {
    changePage();
    getMovies(true, selectedTab, page + 1);
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
        keyExtractor={(item, index) => index.toString()}
        onRefresh={_onRefresh}
        refreshing={load}
        ListFooterComponent={renderFooter}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => {
          return (
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
        }}
      />
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
const FooterContainer = styled.View`
  padding-vertical: 5px;
  justify-content: center;
  align-items: center;
`;
const LoadingText = styled.Text`
  color: ${colors.green};
  font-weight: bold;
`;
export default MovieList;
