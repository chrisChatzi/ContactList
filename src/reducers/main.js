import init from '../initialState'
import { load_contacts_str, popup_status_str, add_contact_str, 
	filter_update_str, filterType_update_str, sort_action_str, sortType_update_str,
	edit_data_str, edit_contact_str, delete_contact_str } from '../constants.js'
import { insertDB, updateContact, deleteContact, getContacts } from '../general/logic.js'

const state_update = (state = init.main, action) => {
	let newstate = Object.assign({}, state);
	switch (action.type) {
		//filter string
		case filter_update_str: {
			newstate.filter = action.val
			return newstate
		}
		//filter type
		case filterType_update_str: {
			newstate.filterType = action.val
			return newstate
		}
		//sort contacts
		case sort_action_str: {
			let sort = "";
			let arr = action.data
			switch(action.val){
				case "off":
					sort = "asc";
					arr = arr.sort(function(a,b) {
						return  a[action.by].toLowerCase() > b[action.by].toLowerCase()
					});
				break;
				case "asc":
					sort = "desc";
					arr = arr.sort(function(a,b) {
						return  a[action.by].toLowerCase() < b[action.by].toLowerCase()
					});
				break;
				case "desc":
					sort = "off";
				break;
			}
			newstate.sort = sort
			let newArray = []
			for(let i=0; i<arr.length; i++)
				newArray.push(arr[i])
			newstate.contacts = newArray
			return newstate
		}
		//sort type
		case sortType_update_str: {
			newstate.sortType = action.val
			return newstate
		}
		//load contacts
		case load_contacts_str: {
			let newArray = []
			for(let i=0; i<action.res.length; i++)
				newArray.push(action.res[i])
			newstate.contacts = newArray
			return newstate
		}
		//show/hide popup
		case popup_status_str: {
			newstate.popup = action.flag
			newstate.edit = action.edit
			return newstate
		}
		//add contact
		case add_contact_str: {
			let newArray = []
			for(let i=0; i<action.data.length; i++)
				newArray.push(action.data[i])
			newstate.contacts = newArray
			return newstate
		}
		//edit contact
		case edit_contact_str: {
			let newArray = []
			for(let i=0; i<action.data.length; i++)
				newArray.push(action.data[i])
			newstate.contacts = newArray
			return newstate
		}
		case edit_data_str: {
			newstate.editedContact = action.data
			return newstate
		}
		//delete contact
		case delete_contact_str: {
			if(newstate.deletedEmail == action.email){
				let newArray = []
				for(let i=0; i<action.data.length; i++)
					newArray.push(action.data[i])
				newstate.contacts = newArray
			}
			else newstate.deletedEmail = action.email
			return newstate
		}
		default:
			return state || init.main
	}
}

export default state_update