checkCondition = function(expression, msg) {
	if (!expression) { throw msg; }
}

succeed = function(name) {
	console.log(name + " succeeded.");
}

fail = function(name, error) {
	console.log(name + " failed: " + error + ".");
}

exports.describe = function(name, runnable) {

	this.shouldBeTrue = function(expression) {
		checkCondition(expression, "expression wasn't true");
	}

	this.shouldBeFalse = function(expression) {
		checkCondition(!expression, "expression wasn't false");
	}

	this.shouldBeEqual = function(expected, value) {
		checkCondition(expected == value, expected + " didn't equal " + value);
	}

	this.shouldBeNull = function(value) {
		checkCondition(value == null, value + " was not null")
	}

	try {
		runnable(this);
		succeed(name);
	}
	catch (e) {
		fail(name, e);
	}
}