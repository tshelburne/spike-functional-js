var t = require('../framework/smpl')
  , Either = require('../../monads/either');

t.describe('success', function(it) {
	var accountOrError = deposit(500, new Account(0))
								.bind( withdraw, 400 )
								.bind( deposit, 300 )
								.bind( withdraw, 200 )
								.bind( deposit, 100 );
	it.shouldBeEqual(300, Either.unwrap(accountOrError).amount);
});

t.describe('failure', function(it) {
	var accountOrError = deposit(500, new Account(0))
								.bind( withdraw, 400 )
								.bind( deposit, 300 )
								.bind( withdraw, 500 )
								.bind( deposit, 100 );
	it.shouldBeEqual('Your account does not have enough to withdraw.', Either.unwrap(accountOrError));
});

/* SUPPORT */

function Account(amount) {
	this.amount = amount;
}

function deposit(amount, account) {
	checkAccount(account);

	return Either.Left(new Account(account.amount + amount));
}

function withdraw(amount, account) {
	checkAccount(account);

	if (account.amount > amount) {
		return Either.Left(new Account(account.amount - amount));
	}
	else {
		return Either.Right('Your account does not have enough to withdraw.');
	}
}

function checkAccount(account) { 
	if (!(account instanceof Account))
		throw new TypeError('You must pass an account object.'); 
}