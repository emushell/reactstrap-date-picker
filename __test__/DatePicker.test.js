import React from 'react';
import DatePicker from '../src/DatePicker.jsx';

test('test DatePicker', () => {
	const wrapper = shallow(
		<DatePicker />
	);
	expect(wrapper).toMatchSnapshot();
});