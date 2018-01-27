import React from 'react';
import {CalendarTableColumnHeader} from '../src/CalendarTableColumnHeader';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

test('test calendar table column headers', () => {
	const wrapper = shallow(
		<CalendarTableColumnHeader dayLabels={DAY_LABELS}/>
	);
	expect(wrapper).toMatchSnapshot();
});

test('test a calendar table column header padding', () => {
	const wrapper = shallow(
		<CalendarTableColumnHeader dayLabels={DAY_LABELS} cellPadding={'p-2'}/>
	);
	expect(wrapper).toMatchSnapshot();
});

test('test calendar table day titles', () => {
	const wrapper = shallow(
		<CalendarTableColumnHeader dayLabels={DAY_LABELS}/>
	);

	const days = wrapper.find('.calendar-header-day').map(node => node.text());
	expect(days).toEqual(DAY_LABELS);
});
