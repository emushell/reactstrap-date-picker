import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {InputGroup, Input, InputGroupAddon, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import {CalendarTable} from './CalendarTable.jsx';
import {CalendarHeader} from './CalendarHeader.jsx';

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default class DatePicker extends Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.onChangeMonth = this.onChangeMonth.bind(this);
		this.handleBadInput = this.handleBadInput.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.makeInputValueString = this.makeInputValueString.bind(this);
		this.clear = this.clear.bind(this);
		this.convertToDateValue = this.convertToDateValue.bind(this);

		let initialDateValues = this.convertToDateValue(this.props.defaultDate);

		this.state = {
			popoverOpen: false,
			placeholder: 'Placeholder',
			focused: false,
			separator: this.props.dateFormat.match(/[^A-Z]/)[0],
			displayDate: initialDateValues.displayDate,
			selectedDate: initialDateValues.selectedDate,
			inputValue: initialDateValues.inputValue,
			dayLabels: (this.props.weekStartsOn > 0) ? this.props.dayLabels.slice(this.props.weekStartsOn).concat(this.props.dayLabels.slice(0, this.props.weekStartsOn)) : this.props.dayLabels,
			calendarPlacement: this.props.calendarPlacement
		};
	}

	makeInputValueString(date) {
		const month = date.getMonth() + 1;
		const day = date.getDate();

		//this method is executed during intialState setup... handle a missing state properly
		const separator = (this.state ? this.state.separator : this.props.dateFormat.match(/[^A-Z]/)[0]);
		if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
			return (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`) + separator + date.getFullYear();
		}
		else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
			return (day > 9 ? day : `0${day}`) + separator + (month > 9 ? month : `0${month}`) + separator + date.getFullYear();
		}
		else {
			return date.getFullYear() + separator + (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`);
		}
	}

	convertToDateValue(isoString) {
		let displayDate;

		const selectedDate = isoString ? new Date(`${isoString.slice(0, 10)}T12:00:00.000Z`) : null;
		const inputValue = isoString ? this.makeInputValueString(selectedDate) : '';

		if (selectedDate) {
			displayDate = new Date(selectedDate);
		} else {
			displayDate = new Date(`${(new Date().toISOString().slice(0, 10))}T12:00:00.000Z`);
		}

		return {
			displayDate: displayDate,
			selectedDate: selectedDate,
			inputValue: inputValue
		};
	}

	toggle(event) {
		if (this.props.onFocus && !this.state.focused) {
			this.props.onFocus(event);
		}

		if (this.props.onBlur && this.state.focused) {
			this.props.onBlur();
		}

		this.setState({
			popoverOpen: !this.state.popoverOpen,
			focused: !this.state.focused
		});
	}

	clear() {
		if (this.props.onClear) {
			this.props.onClear();
		} else {
			this.setState({
				inputValue: '',
				selectedDate: null,
				displayDate: new Date()
			});
		}
		if (this.props.onChange) {
			this.props.onChange(null);
		}
	}

	onChangeMonth(newDisplayDate) {
		this.setState({
			displayDate: newDisplayDate,
		});
	}

	onDateChange(newSelectedDate) {

		const date = this.makeInputValueString(newSelectedDate);

		this.setState({
			selectedDate: newSelectedDate,
			inputValue: date
		});

		if (this.props.onChange) {
			this.props.onChange(newSelectedDate.toISOString(), date);
		}
	}

	handleBadInput(originalValue) {
		const parts = originalValue.replace(new RegExp(`[^0-9${this.state.separator}]`), '').split(this.state.separator);
		if (this.props.dateFormat.match(/MM.DD.YYYY/) || this.props.dateFormat.match(/DD.MM.YYYY/)) {
			if (parts[0] && parts[0].length > 2) {
				parts[1] = parts[0].slice(2) + (parts[1] || '');
				parts[0] = parts[0].slice(0, 2);
			}
			if (parts[1] && parts[1].length > 2) {
				parts[2] = parts[1].slice(2) + (parts[2] || '');
				parts[1] = parts[1].slice(0, 2);
			}
			if (parts[2]) {
				parts[2] = parts[2].slice(0, 4);
			}
		} else {
			if (parts[0] && parts[0].length > 4) {
				parts[1] = parts[0].slice(4) + (parts[1] || '');
				parts[0] = parts[0].slice(0, 4);
			}
			if (parts[1] && parts[1].length > 2) {
				parts[2] = parts[1].slice(2) + (parts[2] || '');
				parts[1] = parts[1].slice(0, 2);
			}
			if (parts[2]) {
				parts[2] = parts[2].slice(0, 2);
			}
		}
		this.setState({
			inputValue: parts.join(this.state.separator)
		});
	}

	handleInputChange(event) {

		let originalValue = event.target.value;
		const inputValue = event.target.value.replace(/(-|\/\/| |\.)/g, this.state.separator).slice(0, 10);

		if (!inputValue) {
			this.clear();
			return;
		}

		let day, month, year;
		if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
			if (!inputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
				return this.handleBadInput(originalValue);
			}

			month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
			day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
			year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
		} else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
			if (!inputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
				return this.handleBadInput(originalValue);
			}

			day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
			month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
			year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
		} else {
			if (!inputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
				return this.handleBadInput(originalValue);
			}

			year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
			month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
			day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
		}

		const monthInteger = parseInt(month, 10);
		const dayInteger = parseInt(day, 10);
		const yearInteger = parseInt(year, 10);

		if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
			const selectedDate = new Date(yearInteger, monthInteger - 1, dayInteger, 12, 0, 0, 0);
			this.setState({
				selectedDate: selectedDate,
				displayDate: selectedDate
				// value: selectedDate.toISOString()
			});

			if (this.props.onChange) {
				this.props.onChange(selectedDate.toISOString(), inputValue);
			}
		}

		this.setState({
			inputValue: inputValue
		});
	}

	render() {

		let inputProps = {
			id: 'datepicker-popover',
			placeholder: this.state.focused ? this.props.dateFormat : this.state.placeholder,
			onFocus: this.toggle,
			onChange: this.handleInputChange,
			value: this.state.inputValue,
			disabled: this.props.disabled,
			style: {cursor: this.props.disabled ? 'not-allowed' : null}
		};

		let clearButtonProps = {
			onClick: this.props.disabled ? null : this.clear,
			style: {
				cursor: ((this.state.inputValue && !this.props.disabled) ? 'pointer' : 'not-allowed'),
				opacity: (this.state.inputValue ? 1 : 0.5)
			}
		};

		let popoverProps = {
			placement: this.state.calendarPlacement,
			isOpen: this.state.popoverOpen,
			target: 'datepicker-popover',
			toggle: this.toggle

		};

		let calendarHeaderProps = {
			monthLabels: this.props.monthLabels,
			displayDate: this.state.displayDate,
			previousButtonElement: this.props.previousButtonElement,
			nextButtonElement: this.props.nextButtonElement,
			onChange: this.onChangeMonth
		};

		let calendarTableProps = {
			dayLabels: this.state.dayLabels,
			daysInMonth: DAYS_IN_MONTH,
			displayDate: this.state.displayDate,
			selectedDate: this.state.selectedDate,
			onChange: this.onDateChange,
			weekStartsOn: this.props.weekStartsOn,
			cellPadding: this.props.cellPadding
		};

		return (
			<div>
				<InputGroup size={this.props.size}>
					<Input {...inputProps}/>
					<InputGroupAddon className='input-group-append'>
						<span className='input-group-text' {...clearButtonProps}>{this.props.clearButtonElement}</span>
					</InputGroupAddon>
				</InputGroup>
				<Popover {...popoverProps}>
					<PopoverHeader className="text-center">
						<CalendarHeader {...calendarHeaderProps}/>
					</PopoverHeader>
					<PopoverBody>
						<CalendarTable {...calendarTableProps}/>
					</PopoverBody>
				</Popover>
			</div>
		);
	}
}

DatePicker.propTypes = {
	dayLabels: PropTypes.array,
	monthLabels: PropTypes.array,
	defaultDate: PropTypes.string, //PropTypes.instanceOf(Date),
	placeholder: PropTypes.string,
	dateFormat: PropTypes.string,
	disabled: PropTypes.bool,
	previousButtonElement: PropTypes.string,
	nextButtonElement: PropTypes.string,
	clearButtonElement: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onClear: PropTypes.func,
	weekStartsOn: PropTypes.number,
	calendarPlacement: PropTypes.string,
	size: PropTypes.string,
	cellPadding: PropTypes.string
};

DatePicker.defaultProps = {
	dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	disabled: false,
	previousButtonElement: '<',
	nextButtonElement: '>',
	clearButtonElement: '×',
	dateFormat: 'DD/MM/YYYY',
	calendarPlacement: 'bottom'
};