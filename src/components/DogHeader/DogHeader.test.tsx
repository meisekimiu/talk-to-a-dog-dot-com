import React from 'react';
import { shallow } from 'enzyme';
import DogHeader from './DogHeader';

describe('DogHeader', () => {
    it('renders properly', () => {
        const wrapper = shallow(<DogHeader />);
        expect(wrapper.exists()).toBe(true);
    });
});
