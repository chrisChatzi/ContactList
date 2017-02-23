let main = {
	contacts : [],				//list of contacts
	editedContact : {},			//contact on edit
	deletedContact : "",		//contact to be deleted
	deletedEmail : "",			//contact to be deleted email
	filter : "",				
	filterType : "fName",
	sort : "off",				//off - asc - desc
	sortType : "fName",
	popup : false,				//show popup
	edit : false				//popup type is edit or new
}

export default { main }