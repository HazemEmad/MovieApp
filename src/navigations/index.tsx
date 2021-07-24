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

export default MainNavigation;
