import React, {Component} from 'react';
import PropTypes from 'prop-types';


export class CalendarHeader extends Component {

	constructor(props) {
		super(props);
		this.handleClickPrevious = this.handleClickPrevious.bind(this);
		this.handleClickNext = this.handleClickNext.bind(this);
	}

	handleClickPrevious() {
		let newDisplayDate = new Date(this.props.displayDate);
		newDisplayDate.setDate(1);
		newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
		this.props.onChange(newDisplayDate);
	}

	handleClickNext() {
		let newDisplayDate = new Date(this.props.displayDate);
		newDisplayDate.setDate(1);
		newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
		this.props.onChange(newDisplayDate);
	}

	render() {

		let previousButtonProps = {
			className: 'text-muted float-left previous-wrapper',
			style: {cursor: 'pointer'},
			onClick: this.handleClickPrevious
		};

		let nextButtonProps = {
			className: 'text-muted float-right next-wrapper',
			style: {cursor: 'pointer'},
			onClick: this.handleClickNext
		};

		return (
			<div style={{fontSize: '0.87em'}}>
				<div {...previousButtonProps}>
					{this.props.previousButtonElement}
				</div>
				<span>{this.props.monthLabels[this.props.displayDate.getMonth()] + ' ' + this.props.displayDate.getFullYear()}</span>
				<div {...nextButtonProps}>
					{this.props.nextButtonElement}
				</div>
			</div>
		);
	}
}

CalendarHeader.propTypes = {
	monthLabels: PropTypes.array.isRequired,
	displayDate: PropTypes.instanceOf(Date),
	previousButtonElement: PropTypes.string.isRequired,
	nextButtonElement: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};