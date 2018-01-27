import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'reactstrap';

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
			<React.Fragment>
				<Container fluid className={'bg-light'}>
					<Row>
						<Col className={'text-center pt-4 pb-4'}>
							<h1>Reactsrap Datepicker</h1>
						</Col>
					</Row>
				</Container>
				<Container className={'pt-2'}>
					<Row>
						<Col>
							<h2 className={'border-bottom'}>Examples</h2>
						</Col>
					</Row>
					<Row>
						<Col xs={'6'}>
							<Row/>
						</Col>
						<Col xs={'6'}>
							<Row className={'justify-content-center'}>
								<Col xs="6">
									<DatePicker onChange={this.handleOnChange}
										defaultDate={new Date().toISOString()}
										disabled={false}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<DatePickerApp/>, document.getElementById('date-picker-app'));