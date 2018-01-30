import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TableBodyRows} from './TableBodyRows.jsx';

const TableHeader = (props) => {
	return (
		<thead>{props.children}</thead>
	);
};

TableHeader.propTypes = {
	children: PropTypes.object
};

const TableHeaderRow = (props) => {
	return (
		<tr className="text-muted">
			{props.children}
		</tr>
	);
};

TableHeaderRow.propTypes = {
	children: PropTypes.object
};

const HeaderCells = (props) => {

	let className = 'week-day ' + (props.cellPadding ? props.cellPadding : 'p-1');

	return (
		props.dayLabels.map((label, index) => {
			return <td key={index} className={className}>
				<small>{label}</small>
			</td>;
		}
		)
	);
};

HeaderCells.propTypes = {
	dayLabels: PropTypes.array
};

const TableBody = (props) => {
	return (
		<tbody>
			{props.children}
		</tbody>
	);
};

TableBody.propTypes = {
	children: PropTypes.object
};

export class CalendarTable extends Component {

	constructor(props) {
		super(props);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleDateChange(newSelectedDate) {
		this.props.onChange(newSelectedDate);
	}

	render() {

		let headerCellProps = {
			dayLabels: this.props.dayLabels,
			cellPadding: this.props.cellPadding
		};

		let tableBodyProps = {
			daysInMonth: this.props.daysInMonth,
			displayDate: this.props.displayDate,
			selectedDate: this.props.selectedDate,
			onChange: this.handleDateChange,
			weekStartsOn: this.props.weekStartsOn,
			cellPadding: this.props.cellPadding
		};

		return (
			<table className="text-center">
				<TableHeader>
					<TableHeaderRow>
						<HeaderCells {...headerCellProps}/>
					</TableHeaderRow>
				</TableHeader>
				<TableBody>
					<TableBodyRows {...tableBodyProps}/>
				</TableBody>
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