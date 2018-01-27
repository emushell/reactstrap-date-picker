import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'reactstrap';
//import '/bootstrap/dist/css/bootstrap.css';

import DatePicker from '../src/DatePicker.jsx';

class DatePickerApp extends Component {
	constructor(props) {
		super(props);
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	handleOnChange(selectedDate, inputValue) {
		console.log(selectedDate, inputValue);
	}

	render() {
		return (
			<Container>
				<Row>
					<Col xs="3">
						<DatePicker onChange={this.handleOnChange}
							defaultDate={new Date().toISOString()}
							disabled={false}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

ReactDOM.render(<DatePickerApp/>, document.getElementById('date-picker-app'));