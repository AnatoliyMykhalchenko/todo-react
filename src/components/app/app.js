import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ToDolist from '../todo-list/todo-list';
import CreatePanel from '../create-panel/create-panel';

import './app.css';

export default  class App extends Component {
	maxId = 100;



	state = {
		todoData: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Create Awesome App'),
			this.createTodoItem('Have a Lunch')
		],
		searchText: '',
		filter: 'all' //active, all, done
	};

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);

			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

			return {
				todoData: newArray
			}
		})
	};

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id);
		const oldTask = arr[idx];
		const newTask = { ...oldTask, [propName]: !oldTask[propName] };

		return [...arr.slice(0, idx),
			newTask,
		...arr.slice(idx + 1)];
	}

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		})

	};

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		});
	};

	addItem = (text) => {

		if(!text) return;
		const task = this.createTodoItem(text);

		this.setState(({ todoData }) => {
			const newArray = [...todoData, task]
			return {
				todoData: newArray
			}
		})

	};

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	};

	search(items, searchText) {
		if(searchText.length === 0) return items;
		 return items.filter(item =>item.label.toLowerCase().includes(searchText.toLowerCase()));
	};

	onSearchTask = (searchText) => {
		this.setState({ searchText });
	};

	onFilterTask = (filter) => {
		this.setState({ filter });
	};

	filter(items, filter) {
		switch(filter) {
			case 'all':
				return items;
			case 'active':
				return items.filter(item => !item.done);
			case 'done': 
				return items.filter(item => item.done);
			default:
				return items;
		}
	}

	render() {

		const { todoData, searchText, filter } = this.state;
		const visibleItems = this.filter(this.search(todoData, searchText), filter);
		const doneCount = todoData.filter(item => item.done).length;
		const toDoCount = todoData.length - doneCount;
		return (
			<div className="todo-app">
				<AppHeader toDo={toDoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearchTask={this.onSearchTask}/>
					<ItemStatusFilter 
					onFilterTask={this.onFilterTask}
					filter={filter} />
				</div>
				<ToDolist todos={visibleItems}
					onDeleted={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone} />
				<CreatePanel onItemAdded={this.addItem} />
			</div>
		);
	};
};