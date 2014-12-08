var t = require('../framework/smpl.js');

t.describe('success', function(it) {
	var account = deposit(
		withdraw(
			deposit(
				withdraw(
					deposit(
						new Account(0)
						, 500)
					, 400)
				, 300)
			, 200)
		, 100);
	it.shouldBeEqual(300, account.amount);
});

t.describe('failure', function(it) {
	it.shouldThrowError(function() {
		deposit(
			withdraw(
				deposit(
					withdraw(
						deposit(
							new Account(0)
							, 500)
						, 400)
					, 300)
				, 500)
			, 100);
	}, 'Your account does not have enough to withdraw.');
});

/* SUPPORT */

function Account(amount) {
	this.amount = amount;
}

function deposit(account, amount) {
	return new Account(account.amount + amount);
}

function withdraw(account, amount) {
	if (account.amount > amount) {
		return new Account(account.amount - amount);
	}
	else {
		throw new Error('Your account does not have enough to withdraw.');
	}
}