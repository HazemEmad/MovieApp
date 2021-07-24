import * as React from 'react';
import renderer from 'react-test-renderer';
import FilmCard from '../src/components/filmCard';

describe('check movieGenres', () => {
  it('check if myGenres return with success', () => {
    const tree = renderer
      .create(
        <FilmCard
          navigation={null}
          title={'Battman'}
          releaseDate={'21-8-2018'}
          rate={'70'}
          image={'test'}
          overview={'test'}
          id={1}
          movieGenres={[4, 3]}
          allGenres={[
            {id: 3, name: 'Action'},
            {id: 4, name: 'Drama'},
            {id: 1, name: 'Romantic'},
          ]}
        />,
      )
      .getInstance();
    expect(tree.state.genres).toStrictEqual(['Drama', 'Action']);
  });
});
