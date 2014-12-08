var t = require('./smpl');

t.describe('test methods', function(it) {

	it.shouldBeTrue(true);
	it.shouldBeFalse(false);
	it.shouldBeA(Function, function(){});
	it.shouldBeEqual(1, 1);
	it.shouldBeNull(null);
	it.shouldThrowError(function() { throw new Error; });

	it.shouldThrowError(function() {
		it.shouldBeTrue(false);
	});

	it.shouldThrowError(function() {
		it.shouldBeFalse(true);
	});

	it.shouldThrowError(function() {
		it.shouldBeA(Function, "string");
	});

	it.shouldThrowError(function() {
		it.shouldBeEqual(1,2);
	});

	it.shouldThrowError(function() {
		it.shouldBeNull(1);
	});

});