/*
	Main component
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu.js'
import Popup from './Popup.js'
import Contact from '../components/Contact.js'
import { createDB, getContacts } from '../general/logic.js'
import { load_contacts, edit_data, delete_contact, delete_contact_reducer, popup_status } from '../actions.js'

function mapStateToProps(state) {
	return {
		contacts : state.main.contacts,
		filter : state.main.filter,
		filterType : state.main.filterType,
		popup : state.main.popup,
		deletedEmail : state.main.deletedEmail
	};
}

function mapDispatchToProps(dispatch) {
	return {
		//load contacts
		loadContacts: (res) => {
			dispatch(load_contacts(res))
		},
		//click on contact to edit
		editContact: (data) => {
			//edit data (contact on edit flag)
			dispatch(edit_data(data))
			//open popup
			dispatch(popup_status(true, true))
		},
		//delete contact
		deleteAction: (email, oldEmail) => {
			//delete contact
			if(email == oldEmail) dispatch(delete_contact(email))
			//delete mode from contact (contact on delete flag)
			else dispatch(delete_contact_reducer(email, ""))
		},
		//add new contact
		addContact: () => {
			dispatch(popup_status(true, false))
		}
	};
}

class Main extends Component {
	static get propTypes() {
		return {
			contacts: PropTypes.array.isRequired,
			filter: PropTypes.string.isRequired,
			filterType: PropTypes.string.isRequired,
			popup: PropTypes.bool.isRequired,
			deletedEmail: PropTypes.string.isRequired
		}
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//load data from DB, if no DB table exist create one
		let promise = new Promise(function(resolve, reject) {
			resolve(1);
		});
		promise.then(() => {
			createDB(() => {})
		}).then(() => {
			getContacts((res) => {
				this.props.loadContacts(res)
			});
		})
	}

	render() {
		let {
			contacts, filter, filterType, popup, editContact, deleteAction, deletedEmail
		} = this.props;
		
		return (
			<div className={(popup) ? "showPopup" : "" } >
				{(popup) ? <Popup /> : "" }
				<Menu />
				<div className="contacts">
					{ (contacts.length > 0) ?
						contacts.map( (v, i) => 
						(v[filterType].toLowerCase().indexOf(filter.toLowerCase()) >= 0) ? 
						<Contact key={i} data={v} edit={editContact} filter={filter}
							deleteAction={deleteAction} deletedEmail={deletedEmail} />
							: ""
					) : <div className="no">No contacts</div>}
				</div>
				<div className="add" title="Add new contact" onClick={ () => this.props.addContact() }>
					<i className="fa fa-plus"></i>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);