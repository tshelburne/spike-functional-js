var t = require('../framework/smpl')
  , Maybe = require('../../monads/maybe');

t.describe('just', function(it) {
	var accountOrNothing = deposit(500, new Account(0))
									.bind( withdraw, 400 )
									.bind( deposit, 300 )
									.bind( withdraw, 200 )
									.bind( deposit, 100 );
	it.shouldBeEqual(300, Maybe.unwrap(accountOrNothing).amount);
});

t.describe('nothing', function(it) {
	var accountOrNothing = deposit(500, new Account(0))
									.bind( withdraw, 400 )
									.bind( deposit, 300 )
									.bind( withdraw, 500 )
									.bind( deposit, 100 );
	it.shouldBeNull(Maybe.unwrap(accountOrNothing));
});

/* SUPPORT */

function Account(amount) {
	this.amount = amount;
}

function deposit(amount, account) {
	checkAccount(account);

	return Maybe.Just(new Account(account.amount + amount));
}

function withdraw(amount, account) {
	checkAccount(account);

	if (account.amount > amount) {
		return Maybe.Just(new Account(account.amount - amount));
	}
	else {
		return Maybe.Nothing();
	}
}

function checkAccount(account) { 
	if (!(account instanceof Account))
		throw new TypeError('You must pass an account object.'); 
}