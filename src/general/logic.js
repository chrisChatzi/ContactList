// WEBSQL
	//create websql DB
	function createDB(callback){
		var db = openDatabase('contacts', '1.0', 'contacts descr', 2 * 1024 * 1024);
		db.transaction(function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS list (fName, lName, phone, address, email)');
			callback()
		});
	}
	//insert to DB
	function insertDB(data, callback){
		var db = openDatabase('contacts', '1.0', 'contacts descr', 2 * 1024 * 1024);
		db.transaction(function (tx) {
			tx.executeSql('INSERT INTO list (fName, lName, phone, address, email) VALUES (?,?,?,?,?)', [data.fName, data.lName, data.phone, data.address, data.email], function(tx, results){
				callback()
			});
		});
	}
	//get contacts from DB
	function getContacts(callback){
		var db = openDatabase('contacts', '1.0', 'contacts descr', 2 * 1024 * 1024);
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM list', [], function (tx, results) {
				callback(results.rows)
			});
		});
	}
	//get contacts with WHERE clause
	function getContactsFilter(key, value, callback){
		var db = openDatabase('contacts', '1.0', 'contacts descr', 2 * 1024 * 1024);
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM list WHERE '+key+'="'+value+'"', [], function (tx, results) {
				callback(results.rows)
			});
		});
	}
	//get contacts with WHERE AND clause
	function getContactsFilterName(fName, lName, callback){
		var db = openDatabase('contacts', '1.0', 'contacts descr', 2 * 1024 * 1024);
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM list WHERE fName="'+fName+'" AND lName="'+lName+'"', [], function (tx, results) {
				callback(results.rows)
			});
		});
	}
	//update
	function updateContact(email, data, callback){
		var db = openDatabase('contacts', '1.0', 'contacts descr', 2 * 1024 * 1024);
		db.transaction(function (tx) {
			tx.executeSql('UPDATE list SET fName=?, lName=?, phone=?, address=?, email=? WHERE email="'+email+'"', [data.fName, data.lName, data.phone, data.address, data.email], function (tx, results) {
				callback()
			});
		});
	}
	//delete
	function deleteContact(email, callback){
		var db = openDatabase('contacts', '1.0', 'contacts descr', 2 * 1024 * 1024);
		db.transaction(function (tx) {
			tx.executeSql('DELETE FROM list WHERE email="'+email+'"', [], function (tx, results) {
				callback()
			});
		});
	}

// CHECKS
	//check email
	function checkEmail(email){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	//check phone
	function checkPhone(phone){
		var re = /^([0-9]|[\-+#])+$/;
		return re.test(phone);
	}
	//check if contact's name, phone or email already exists
	function checkContact(data, callback){
		let result = [false, false, false];
		let p1 = new Promise(function(resolve, reject) {
			getContactsFilterName(data.fName, data.lName, (res) => {
				if(res.length != 0) reject("Name");
				else resolve(1)
			})
		});
		let p2 = new Promise(function(resolve, reject) {
			getContactsFilter('phone', data.phone, (res) => {
				if(res.length != 0) reject("Phone");
				else resolve(1)
			})
		});
		let p3 = new Promise(function(resolve, reject) {
			getContactsFilter('email', data.email, (res) => {
				if(res.length != 0) reject("Email");
				else resolve(1)
			})
		});
		Promise.all([p1,p2,p3])
		.then(() => {
			callback()
		})
		.catch( (error) => {
			callback(error)
		});
	}

export { createDB, insertDB, updateContact, getContacts, 
		checkContact, checkEmail, checkPhone, 
		deleteContact, getContactsFilter }