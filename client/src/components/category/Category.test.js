import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Link from './Link';

import { HashLoader } from 'react-spinners'

describe('HashLoader', () => {
  it('should render correctly', () => {
    const output = shallow(
      <HashLoader color={ mockColor } loading={ mockLoading }/>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
