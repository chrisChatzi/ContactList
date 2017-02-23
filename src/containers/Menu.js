/*
	Top bar menu, contains filter and sort features	
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuComp from '../components/Menu.js'
import { filter_update, filterType_update, sort_action, sortType_update } from '../actions.js'

function mapStateToProps(state) {
	return {
		filter : state.main.filter,
		filterType : state.main.filterType,
		sort : state.main.sort,
		sortType : state.main.sortType
	};
}

function mapDispatchToProps(dispatch) {
	return {
		//filter
		filterAction: (e, filterType) => {
			dispatch(filter_update(e.target.value, filterType))
		},
		//filter type change
		filterTypeAction: (e) => {
			dispatch(filterType_update(e.target.value))
		},
		//sort
		sortAction: (val, by) => {
			dispatch(sort_action(val, by))
		},
		//sort type change
		sortTypeAction: (e) => {
			dispatch(sortType_update(e.target.value))
		}
	};
}

class Menu extends Component {
	static get propTypes() {
		return {
			filter: PropTypes.string.isRequired,
			filterType: PropTypes.string.isRequired,
			sort: PropTypes.string.isRequired
		}
	}

	constructor(props) {
		super(props);
	}

	render() {
		let {
			filter, filterType, filterAction, filterTypeAction, 
			sort, sortType, sortAction, sortTypeAction
		} = this.props;
		
		return (
			<div className="menu">
				<MenuComp filter={filter} filterType={filterType} 
						filterAction={filterAction} filterTypeAction={filterTypeAction}
						sort={sort} sortType={sortType}
						sortAction={sortAction} sortTypeAction={sortTypeAction} />
				
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);