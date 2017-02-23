import React, { PropTypes } from 'react'

const Menu = ( { filter, filterType, filterAction, filterTypeAction, 
				sort, sortType, sortAction, sortTypeAction } ) => (
	<div>
		<div className="menu-item filter">
			<input value={filter} placeholder="Filter contacts" 
				onChange= { (e) => filterAction(e, filterType) }/>
			<select value={filterType} onChange={(e) => filterTypeAction(e)}>
				<option value="fName">By First Name</option>
				<option value="lName">By Last Name</option>
				<option value="phone">By Phone</option>
				<option value="address">By Address</option>
				<option value="email">By Email</option>
			</select>
		</div>
		<div className="menu-item right sort">
			<button className={(sort == "off") ? "buttonA" : "buttonB" }
				onClick={ () => sortAction(sort, sortType) }>
				<i className={(sort == "off") ? "fa fa-sort" : "fa fa-sort-alpha-"+sort}></i> Sort
			</button>
			<select value={sortType} onChange={(e) => sortTypeAction(e)}>
				<option value="fName">By First Name</option>
				<option value="lName">By Last Name</option>
				<option value="phone">By Phone</option>
				<option value="address">By Address</option>
				<option value="email">By Email</option>
			</select>
		</div>
	</div>
)

export default Menu