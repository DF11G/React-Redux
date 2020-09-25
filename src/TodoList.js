import React, { Component, Fragment } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import store from './store'
import { CHANGE_INPUT_VALUE, CHANGE_LIST_VALUE, CHANGE_DELETE_VALUE } from './store/Actiontype'
const data = [
	'Faker',
	'Bang',
	'Bengi'
]
class TodoList extends Component {
	constructor(props) {
		super(props)
		//使用store的getState()方法从store提取数据
		this.state = store.getState()
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleStoreChange = this.handleStoreChange.bind(this)
		this.handleClickChange = this.handleClickChange.bind(this)
		store.subscribe(this.handleStoreChange)
		//store.subscribe(this.handleClickChange)
	}
	render() {
		return (
			<Fragment>
				<Input
					value={this.state.inputValue}
					placeholder='What to do?'
					style={{ width: '300px' }}
					onChange={this.handleInputChange}
				/>
				<Button
					type="primary"
					onClick={this.handleClickChange}
				>Primary Button</Button>
				<List
					//这里使用antd的模板
					bordered
					style={{ marginTop: '10px', width: '300px' }}
					dataSource={this.state.list}
					renderItem={
						(item, index) => {
							return <List.Item
								onClick={this.handleDeleteChange.bind(this, index)}
							>{item}</List.Item>
						}
					}
				/>
			</Fragment>
		)
	}
	handleInputChange(e) {
		const action = {
			type: CHANGE_INPUT_VALUE,
			value: e.target.value
		}
		//使用dispatch()方法将action传给store，然后store会自动转发给reducer
		store.dispatch(action)
	}
	handleStoreChange() {
		this.setState(store.getState())
	}
	handleClickChange() {
		const action = {
			type: CHANGE_LIST_VALUE,
		}
		store.dispatch(action)
	}
	handleDeleteChange(index) {
		const action = {
			type: CHANGE_DELETE_VALUE,
			value: index
		}
		console.log(index)
		store.dispatch(action)
	}
}
export default TodoList