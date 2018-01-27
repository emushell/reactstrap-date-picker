import React from 'react';
import {CalendarHeader} from '../src/CalendarHeader';

const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

test('Render a calendar header', () => {

	const onChange = jest.fn();

	let props = {
		monthLabels: monthLabels,
		displayDate: new Date(2018, 0, 1),
		previousButtonElement: '<',
		nextButtonElement: '>',
		onChange: onChange
	};

	const wrapper = shallow(
		<CalendarHeader {...props}/>
	);
	expect(wrapper).toMatchSnapshot();
});


test('Render a calendar header - simulate previous click', () => {

	let newDate = new Date();

	let props = {
		monthLabels: monthLabels,
		displayDate: new Date(2018, 0, 1),
		previousButtonElement: '<',
		nextButtonElement: '>',
		onChange: (newDisplayDate) => {
			newDate = newDisplayDate;
		}
	};

	const wrapper = shallow(
		<CalendarHeader {...props}/>
	);
	expect(wrapper.find('.previous-wrapper').length).toEqual(1);
	wrapper.find('.previous-wrapper').simulate('click');

	props.displayDate.setMonth(props.displayDate.getMonth() - 1);

	expect(props.displayDate).toEqual(newDate);
});

test('Render a calendar header - simulate next click', () => {

	let newDate = new Date();

	let props = {
		monthLabels: monthLabels,
		displayDate: new Date(2018, 0, 1),
		previousButtonElement: '<',
		nextButtonElement: '>',
		onChange: (newDisplayDate) => {
			newDate = newDisplayDate;
		}
	};

	const wrapper = shallow(
		<CalendarHeader {...props}/>
	);
	expect(wrapper.find('.next-wrapper').length).toEqual(1);
	wrapper.find('.next-wrapper').simulate('click');

	props.displayDate.setMonth(props.displayDate.getMonth() + 1);

	expect(props.displayDate).toEqual(newDate);
});