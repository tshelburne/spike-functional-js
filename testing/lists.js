t = require('./framework/smpl.js')
l = require('../lists.js');

list1 = l.add(1, l.add(1, l.add(2, l.add(3))));
list2 = l.add(2, l.add(4, l.add(5, l.add(6, l.add(6)))));

t.describe('append', function(it) {
	appendable = l.add(1, l.add(2));
	it.shouldBeTrue(l.areEqual(
		l.add(1, l.add(2, l.add(3))),
		l.append(appendable, 3)
		));
});

t.describe('areEqual', function(it) {
	it.shouldBeTrue(l.areEqual(list1, list1));
	it.shouldBeTrue(l.areEqual(l.add(1, l.add(1, l.add(2, l.add(3)))), list1));
	it.shouldBeFalse(l.areEqual(list1, list2));
});

t.describe('compact', function(it) {
	compactable = l.add(0, l.add(1, l.add(false, l.add(''))));
	it.shouldBeTrue(l.areEqual(l.add(1), l.compact(compactable)));
	it.shouldBeTrue(l.areEqual(list1, l.compact(list1)));
});

t.describe('contains', function(it) {
	it.shouldBeTrue(l.contains(list1, 1));
	it.shouldBeFalse(l.contains(list1, 10));
});

t.describe('count', function(they) {
	they.shouldBeEqual(2, l.count(list1, 1));
	they.shouldBeEqual(1, l.count(list2, 5));
	they.shouldBeEqual(0, l.count(list2, 12));
});

t.describe('difference', function(they) {
	console.log(l.difference(list1, l.add(5)));
	they.shouldBeEqual(l.add(1, l.add(1, l.add(3))), l.difference(list1, list2));
	they.shouldBeEqual(l.add(4, l.add(5, l.add(6, l.add(6)))), l.difference(list2, list1));
	they.shouldBeEqual(list1, l.difference(list1, l.add(5)));
});

t.describe('every', function(it) {
	it.shouldBeTrue(l.every(list1, function(value) { return value > 0; }));
	it.shouldBeFalse(l.every(list1, function(value) { return value != 2; }));
});

t.describe('find', function(they) {
	they.shouldBeEqual(2, l.find(list1, function(value) { return value > 1; }));
	they.shouldBeNull(l.find(list1, function(value) { return value > 5; }));
});

t.describe('head', function(they) {
	they.shouldBeEqual(1, l.head(list1));
	they.shouldBeEqual(2, l.head(list2));
	they.shouldBeNull(l.EMPTY_LIST);
});

t.describe('isEmpty', function(it) {
	it.shouldBeTrue(l.isEmpty(l.EMPTY_LIST));
	it.shouldBeFalse(l.isEmpty(list1));
});

t.describe('length', function(they) {
	they.shouldBeEqual(4, l.length(list1));
	they.shouldBeEqual(5, l.length(list2));
});

t.describe('reverse', function(it) {
	it.shouldBeTrue(l.areEqual(l.add(3, l.add(2, l.add(1, l.add(1)))), l.reverse(list1)));
});

t.describe('some', function(it) {
	it.shouldBeTrue(l.some(list1, function(value) { return value == 3; }));
	it.shouldBeFalse(l.some(list1, function(value) { return value < 0; }));
});

