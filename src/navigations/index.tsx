import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieList from '../screens/moviesList';
import Movie from '../screens/movie';

const Stack = createStackNavigator();
const MainNavigation: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MoviesList"
          component={MovieList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Movie"
          component={Movie}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
/*
baseUrl= https://api.themoviedb.org/3
apikey=?query=&api_key=4f298a53e552283bee957836a529baec
movieOfThreeTypes=/movie/[upcoming-popular-top_rated]
images=https://image.tmdb.org/t/p/w500/
credits=/movie/{movie_id}/credits
genres=/genre/movie/list
 */
export default MainNavigation;
