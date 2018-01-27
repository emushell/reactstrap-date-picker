import React from 'react';
import {CalendarTable} from '../src/CalendarTable.jsx';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

test('test calendar table', () => {
	const wrapper = shallow(
		<CalendarTable dayLabels={DAY_LABELS}
					   daysInMonth={DAYS_IN_MONTH}
					   onChange={jest.fn()}/>
	);
	expect(wrapper).toMatchSnapshot();
});