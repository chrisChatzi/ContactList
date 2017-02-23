import { insertDB, updateContact, deleteContact, getContacts } from './general/logic.js'
import { load_contacts_str, popup_status_str, filter_update_str, filterType_update_str, 
    sort_action_str, sortType_update_str,
    add_contact_str, edit_data_str, edit_contact_str, delete_contact_str } from './constants.js'

//LOAD CONTACTS
    export const load_contacts = (res) => {
        return {
            type: load_contacts_str,
            res
        };
    };
// FILTER
    //filter contacts
    export const filter_update = (val) => {
        return {
            type: filter_update_str,
            val
        }
    };
    //filter - change type
    export const filterType_update = (val) => {
        return {
            type: filterType_update_str,
            val
        }
    };
//SORT
    //sort contacts
    export const sort_action = (val, by) => {
        return function (dispatch) {
            getContacts((res) => {
                let newArray = []
                for(let i=0; i<res.length; i++)
                    newArray.push(res[i])
                dispatch(sort_action_reducer(val, by, newArray))
            })
        };
    }
    export const sort_action_reducer = (val, by, data) => {
        return {
            type: sort_action_str,
            val,
            by,
            data
        }
    };
    //sort - change type
    export const sortType_update = (val) => {
        return {
            type: sortType_update_str,
            val
        }
    };
//SHOW/HIDE POPUP (WITH EDIT OR NOT MODE)
    export const popup_status = (flag, edit) => {
        return {
            type: popup_status_str,
            flag,
            edit
        };
    };
//ADD NEW CONTACT
    export const add_contact = (data) => {
        return function (dispatch) {
            insertDB(data, () => {
                getContacts((res) => {
                    let newArray = []
                    for(let i=0; i<res.length; i++)
                        newArray.push(res[i])
                    dispatch(add_contact_reducer(newArray))
                })
            })
        };
    }
    export const add_contact_reducer = (data) => {
        return {
            type: add_contact_str,
            data
        };
    };

//DELETE CONTACT
    export const delete_contact = (email) => {
        return function (dispatch) {
            deleteContact(email, () => {
                getContacts((res) => {
                    let newArray = []
                    for(let i=0; i<res.length; i++)
                        newArray.push(res[i])
                    dispatch(delete_contact_reducer(email, newArray))
                });
            })
        };
    }
    export const delete_contact_reducer = (email, data) => {
        return {
            type: delete_contact_str,
            email,
            data
        };
    };
//EDIT CONTACT
    export const edit_contact = (email, data) => {
        return function (dispatch) {
            updateContact(email, data, () => {
                getContacts((res) => {
                    let newArray = []
                    for(let i=0; i<res.length; i++)
                        newArray.push(res[i])
                    dispatch(edit_contact_reducer(email, newArray))
                });
            })
        };
    }
    export const edit_contact_reducer = (email, data) => {
        return {
            type: edit_contact_str,
            email,
            data
        };
    };
//contact data to edit
export const edit_data = (data) => {
    return {
        type: edit_data_str,
        data
    };
};