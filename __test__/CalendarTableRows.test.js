import React from 'react';
import {CalendarTableRows} from '../src/CalendarTableRows';

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const displayDate = new Date();
const selectedDate = new Date();

const weeksInMonth = (month, year) => {
	year = year || new Date().getFullYear();
	let day = new Date(year, month, 0);
	return Math.floor((day.getDate() - 1) / 7) + 1;
};


test('Render a calendar table rows - test week count in month', () => {
	const onChange = jest.fn();
	const wrapper = shallow(
		<CalendarTableRows daysInMonth={DAYS_IN_MONTH} displayDate={displayDate} selectedDate={selectedDate}
						   onChange={onChange}/>
	);
	expect(wrapper.find('tr').length).toEqual(weeksInMonth(displayDate.getMonth() + 1, displayDate.getFullYear()));
});

test('Render calendar table rows - test selected day - true', () => {

	selectedDate.setDate(selectedDate.getDate() - 1);

	const attributes = {
		onChange: jest.fn(),
		daysInMonth: DAYS_IN_MONTH,
		displayDate: displayDate,
		selectedDate: selectedDate
	};

	const wrapper = shallow(
		<CalendarTableRows {...attributes}/>
	);
	expect(wrapper.find('.bg-primary').text()).toEqual(selectedDate.getDate().toString());
});

test('Render calendar table rows - test selected day - false', () => {

	const attributes = {
		onChange: jest.fn(),
		daysInMonth: DAYS_IN_MONTH,
		displayDate: displayDate,
		selectedDate: null
	};

	const wrapper = shallow(
		<CalendarTableRows {...attributes}/>
	);
	expect(wrapper.hasClass('bg-primary')).toEqual(false);
});


test('Render calendar table rows - test current day', () => {

	const attributes = {
		onChange: jest.fn(),
		daysInMonth: DAYS_IN_MONTH,
		displayDate: displayDate,
		selectedDate: selectedDate
	};

	const wrapper = shallow(
		<CalendarTableRows {...attributes}/>
	);
	expect(wrapper.find('.text-primary').text()).toEqual(displayDate.getDate().toString());
});

test('Render calendar table rows - test on click', () => {

	let newDate = new Date();

	const attributes = {
		onChange: (newSelectedDate) => {
			newDate = newSelectedDate;
		},
		daysInMonth: DAYS_IN_MONTH,
		displayDate: displayDate,
		selectedDate: selectedDate
	};

	const wrapper = shallow(
		<CalendarTableRows {...attributes}/>
	);

	wrapper.find('.bg-primary').simulate('click', {target: {innerHTML: selectedDate.getDate()}});
	expect(selectedDate).toEqual(newDate);
});


test('Render calendar table rows - test leap year (Feb - 29 days)', () => {

	displayDate.setFullYear(2016, 1, 1);

	const attributes = {
		onChange: jest.fn(),
		daysInMonth: DAYS_IN_MONTH,
		displayDate: displayDate,
		selectedDate: selectedDate
	};

	const wrapper = shallow(
		<CalendarTableRows {...attributes}/>
	);

	let maxDay = 0;
	wrapper.find('td').forEach((node) => {
		maxDay = Math.max(parseInt(node.text()) || maxDay, maxDay);
	});
	expect(maxDay).toEqual(29);
});

