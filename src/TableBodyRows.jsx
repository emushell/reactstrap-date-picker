import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class TableBodyRows extends Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.setTimeToNoon = this.setTimeToNoon.bind(this);
		this.calculateStartingDay = this.calculateStartingDay.bind(this);
	}

	setTimeToNoon(date) {
		date.setHours(12);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date;
	}

	calculateStartingDay(firstDay) {
		if (this.props.weekStartsOn > 1) {
			return firstDay - this.props.weekStartsOn + 7;
		} else {
			if (this.props.weekStartsOn === 1) {
				return firstDay - 1;
			} else {
				return firstDay;
			}
		}
	}

	handleClick(event) {
		let day = event.target.innerHTML;
		let newSelectedDate = this.setTimeToNoon(this.props.displayDate);
		newSelectedDate.setDate(day);
		this.props.onChange(newSelectedDate);
	}

	render() {

		let currentDate = this.setTimeToNoon(new Date());
		let year = this.props.displayDate.getFullYear();
		let month = this.props.displayDate.getMonth();
		let selectedDate = this.props.selectedDate ? this.setTimeToNoon(this.props.selectedDate) : null;

		// get first day of month
		let firstDay = new Date(year, month, 1);
		let startingDay = this.calculateStartingDay(firstDay.getDay());

		// find number of days in month
		let monthLength = this.props.daysInMonth[month];
		// compensate for leap year
		if (month === 1) { // February only!
			if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
				monthLength = 29;
			}
		}

		const weeks = [];
		// fill in the days
		let day = 1;
		// this loop is for is weeks (rows)
		for (let i = 0; i < 9; i++) {
			// this loop is for weekdays (cells)
			const week = [];
			for (let j = 0; j <= 6; j++) {
				if (day <= monthLength && (i > 0 || j >= startingDay)) {

					let dayAttributes = {
						onClick: this.handleClick,
						style: {cursor: 'pointer'},
						className: this.props.cellPadding
					};

					const date = new Date(year, month, day, 12, 0, 0, 0).toISOString();

					if (Date.parse(date) === Date.parse(selectedDate)) {
						dayAttributes.className = 'bg-primary';
					} else if (Date.parse(date) === Date.parse(currentDate)) {
						dayAttributes.className = 'text-primary';
					}

					week.push(<td key={j} {...dayAttributes}>{day}</td>);
					day++;
				}
				else {
					week.push(<td key={j}/>);
				}
			}

			weeks.push(<tr key={i}>{week}</tr>);
			// stop making rows if we've run out of days
			if (day > monthLength) {
				break;
			}
		}

		return (
			<React.Fragment>
				{weeks}
			</React.Fragment>
		);
	}
}

TableBodyRows.propTypes = {
	daysInMonth: PropTypes.array.isRequired,
	displayDate: PropTypes.instanceOf(Date),
	selectedDate: PropTypes.instanceOf(Date),
	onChange: PropTypes.func.isRequired,
	weekStartsOn: PropTypes.number,
	cellPadding: PropTypes.string
};