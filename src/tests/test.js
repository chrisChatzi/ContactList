import { test, createDB, insertDB, getContacts, getContactsFilter } from '../general/logic.js'

describe('Check DB logic', () => {
	it('should insert and find query', () => {
		createDB(function(){
			insertDB(function(){
				getContacts(function (res){
					console.log(3)
					expect(res[0]['fName']).toBe("C");
				});
			})
		});
	});
});

describe('Check names logic', () => {
	it('should get name and find query', () => {
		getContactsFilter("fName", "xxx", function (res){
			expect(res[0]['fName']).toBe("C");
		});
	});
});

describe('Check names logic', () => {
	it('should test', () => {
		expect(test(5)).toBe(7);
	});
});