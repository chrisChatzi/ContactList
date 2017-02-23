/*
	Popup for editing or creating new contact
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkContact, checkEmail, checkPhone } from '../general/logic.js'
import { add_contact, edit_contact, popup_status, edit_data } from '../actions.js'

function mapStateToProps(state) {
	return {
		edit : state.main.edit,
		editedContact : state.main.editedContact
	};
}

function mapDispatchToProps(dispatch) {
	return {
		//close popup
		closePopup: (e) => {
			if(e.target.classList.contains("popup")){
				dispatch(popup_status(false, false))
				dispatch(edit_data({}))
			}
		},
		//add new contact (with ENTER key)
		keyAction: (e, obj, emailOld) => {
			if(e.keyCode == 13) obj.props.done(obj, emailOld)
		},
		//add or edit contact action
		done: (obj, emailOld) => {
			//check if fields are empty
			let fName = (obj.refs.fName.value.length == 0)
			let lName = (obj.refs.lName.value.length == 0)
			let phone = (obj.refs.phone.value.length == 0)
			let address = (obj.refs.address.value.length == 0)
			let email = (obj.refs.email.value.length == 0)
			obj.showErrors(fName, lName, phone, address, email)

			if(!fName && !lName && !phone && !address && !email){
				//check email
				let checkMail = checkEmail(obj.refs.email.value)
				if(!checkMail){
					obj.showErrors(false, false, false, false, true)
					alert("Email is invalid")
					return
				}
				//check phone
				let checkPhoneNum = checkPhone(obj.refs.phone.value)
				if(!checkPhoneNum){
					obj.showErrors(false, false, true, false, false)
					alert("Phone is invalid\n[0-9 + - #] allowed")
					return
				}
				//
				let data = {
					fName : obj.refs.fName.value,
					lName : obj.refs.lName.value,
					phone : obj.refs.phone.value,
					address : obj.refs.address.value,
					email : obj.refs.email.value
				}
				//if editing a contact
				if(obj.props.edit){
					dispatch(edit_contact(obj.props.editedContact.email, data))
					dispatch(edit_data({}))
					dispatch(popup_status(false, false))
				//if creating new contact
				}else{
					//check if credentials of contact already exist
					checkContact(data, (res) => {
						if(res == "Name"){
							obj.showErrors(true, true, false, false, false);
							alert("Name already exists")
						}else if(res == "Phone"){
							obj.showErrors(false, false, true, false, false);
							alert("Phone already exists")
						}else if(res == "Email"){
							obj.showErrors(false, false, false, false, true);
							alert("Email already exists")
						}else{
							dispatch(add_contact(data))
							dispatch(edit_data({}))
							dispatch(popup_status(false, false))
						}
					})
				}
			}
		}
	};
}

class Popup extends Component {
	static get propTypes() {
		return {
			edit: PropTypes.bool.isRequired,
			editedContact: PropTypes.object.isRequired
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			fName: false,
			lName : false,
			phone : false,
			address : false,
			email : false
		}
	}

	showErrors(fName, lName, phone, address, email) {
		this.setState({showForm: true});
		this.setState({
			fName,
			lName,
			phone,
			address,
			email
		})
	}

	render() {
		const { edit, editedContact, changeInput, closePopup, keyAction } = this.props
		return (
			<div className="popup" onClick={ (e) => closePopup(e) } 
			onKeyUp={ (e) => keyAction(e, this, editedContact.email) }>
				<div className="contact">
					<div className="contact-row title">
						{(edit) ? "Edit contact" : "Create contact" }
					</div>
					<div className="contact-row">
						<div className="key"><i className="fa fa-user"></i></div>
						<div className="value">
							<input className={(this.state.fName) ? "valueError" : "" } ref="fName"
								defaultValue={(editedContact.fName) ? editedContact.fName : ""}
								placeholder="First name"/>
						</div>
					</div>
					<div className="contact-row">
						<div className="key"><i className="fa fa-user"></i></div>
						<div className="value">
							<input className={(this.state.lName) ? "valueError" : "" } ref="lName" 
								defaultValue={(editedContact.lName) ? editedContact.lName : ""}
								placeholder="Last name"/>
						</div>
					</div>
					<div className="contact-row">
						<div className="key"><i className="fa fa-phone"></i></div>
						<div className="value">
							<input className={(this.state.phone) ? "valueError" : "" } ref="phone" 
								defaultValue={(editedContact.phone) ? editedContact.phone : ""}
								placeholder="Phone"/>
						</div>
					</div>
					<div className="contact-row">
						<div className="key"><i className="fa fa-map-marker"></i></div>
						<div className="value">
							<input className={(this.state.address) ? "valueError" : "" } ref="address" 
								defaultValue={(editedContact.address) ? editedContact.address : ""}
								placeholder="Address"/>
						</div>
					</div>
					<div className="contact-row">
						<div className="key"><i className="fa fa-envelope-o"></i></div>
						<div className="value">
							<input className={(this.state.email) ? "valueError" : "" } ref="email" 
								defaultValue={(editedContact.email) ? editedContact.email : ""}
								placeholder="Email"/>
						</div>
					</div>
					<div className="contact-row">
						<button onClick={ () => this.props.done(this, editedContact.email) }>
							{(edit) ? "Update" : "Create" }
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);