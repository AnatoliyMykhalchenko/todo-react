import React from 'react';
import './search-panel.css';

class SearchPanel extends React.Component {

	state = {
		searchText: ''
	};


	onSearchTask = (event) => {
		const searchText = event.target.value;

		this.setState({ searchText })
		this.props.onSearchTask(searchText);
	}
	render() {
		return <input placeholder="type to search" className="form-control search-input" onChange={this.onSearchTask} value={this.state.searchText} />
	}
}

export default SearchPanel;