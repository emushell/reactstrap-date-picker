import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class CalendarTableColumnHeader extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		let className = 'calendar-header-day ' + (this.props.cellPadding ? this.props.cellPadding : 'p-1');

		let dayLabels = this.props.dayLabels.map((label, index) => {
			return <td key={index} className={className}>
				<small>{label}</small>
			</td>;
		});
		return (
			<tr className="text-muted">
				{dayLabels}
			</tr>
		);
	}
}

CalendarTableColumnHeader.propTypes = {
	dayLabels: PropTypes.array.isRequired,
	cellPadding: PropTypes.string
};