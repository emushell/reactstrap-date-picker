import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CalendarTableRows} from './CalendarTableRows.jsx';
import {CalendarTableColumnHeader} from './CalendarTableColumnHeader.jsx';

export class CalendarTable extends Component {

	constructor(props) {
		super(props);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleDateChange(newSelectedDate) {
		this.props.onChange(newSelectedDate);
	}

	render() {

		let calendarTableColumnHeaderProps = {
			dayLabels: this.props.dayLabels,
			cellPadding: this.props.cellPadding
		};

		let calendarTableRowAttributes = {
			daysInMonth: this.props.daysInMonth,
			displayDate: this.props.displayDate,
			selectedDate: this.props.selectedDate,
			onChange: this.handleDateChange,
			weekStartsOn: this.props.weekStartsOn,
			cellPadding: this.props.cellPadding
		};

		return (
			<table className="text-center">
				<thead>
					<CalendarTableColumnHeader {...calendarTableColumnHeaderProps}/>
				</thead>
				<CalendarTableRows {...calendarTableRowAttributes}/>
			</table>
		);
	}
}

CalendarTable.propTypes = {
	daysInMonth: PropTypes.array.isRequired,
	displayDate: PropTypes.instanceOf(Date),
	dayLabels: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	selectedDate: PropTypes.instanceOf(Date),
	weekStartsOn: PropTypes.number,
	cellPadding: PropTypes.string
};