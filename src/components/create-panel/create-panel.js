import React, { Component } from 'react';

import './create-panel.css';

class CreatePanel extends Component {
	state = {
		label: ''
	}
	onLabelChange = (event) => {
		this.setState({
			label: event.target.value
		})
	};

	onSubmit = (event) => {
		event.preventDefault();
		this.props.onItemAdded(this.state.label);
		this.setState({
			label: ''
		});

	}
	render() {

		const { label } = this.state;

		return (
			<form className="input-group mb-3"
				onSubmit={this.onSubmit}
				>
				<input type="text"
					className="form-control"
					placeholder="add a new task"
					onChange={this.onLabelChange} 
					value={label} />
				<div className="input-group-append">
					<button className="btn btn-outline-secondary">
						Add Task
					</button>
				</div>
			</form>
		);
	};
};

export default CreatePanel;