import React, { PropTypes } from 'react'

const Contact = ( { data, edit, deleteAction, deletedEmail } ) => (
	<div className={ (data.email == deletedEmail) ? "contact del" : "contact" }>
		<div className="delete" 
			title={"Delete "+data['fName']+" "+data['lName']} 
			onClick = { () => deleteAction(data.email, deletedEmail) }>
			<i className="fa fa-trash"></i>
		</div>
		<div className="edit" title={"Edit "+data['fName']+" "+data['lName']} onClick={ () => edit(data) }>
			<i className="fa fa-pencil"></i>
		</div>
		<div className="contact-row title">{data['fName'] + " " + data['lName']}</div>
		<div className="contact-row">
			<div className="key"><i className="fa fa-phone"></i></div>
			<div className="value">{data['phone']}</div>
		</div>
		<div className="contact-row">
			<div className="key"><i className="fa fa-map-marker"></i></div>
			<div className="value">{data['address']}</div>
		</div>
		<div className="contact-row">
			<div className="key"><i className="fa fa-envelope-o"></i></div>
			<div className="value">{data['email']}</div>
		</div>
	</div>
)

export default Contact