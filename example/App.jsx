import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col, Card, CardBody} from 'reactstrap';

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
						<Col className={'pt-4'}>
							<h2 className={'border-bottom'}>Examples</h2>
						</Col>
					</Row>
					<Row>
						<Col>
							<h4>Default</h4>
						</Col>
					</Row>
					<Row>
						<Col xs={'6'}>
							<Card>
								<CardBody>
									<pre style={{'margin-bottom': 0}}>
										<code>
											{'<DatePicker'}
											<br/>
											{'	defaultDate={'}<strong>{'this'}</strong>{'.state.defaultDate}'}
											<br/>
											{'	onChange={'}<strong>{'this'}</strong>{'.handleOnChange}'}
											<br/>
											{'/>'}
										</code>
									</pre>
								</CardBody>
							</Card>
						</Col>
						<Col xs={'6'}>
							<Row className={'justify-content-center'}>
								<Col xs="6">
									<DatePicker defaultDate={new Date().toISOString()}
										onChange={this.handleOnChange}
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