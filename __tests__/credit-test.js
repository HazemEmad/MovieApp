/**
 * @format
 */

 import React from 'react';
 import renderer from 'react-test-renderer';
 import Credit from '../src/components/credit';
 
 test('renders correctly', () => {
   const tree = renderer.create(<Credit />).toJSON();
   expect(tree).toMatchSnapshot();
 });