var EMPTY_LIST = exports.EMPTY_LIST = null;

/**
 * create a list from the value and the next value
 */
var add = exports.add = function(value, next) {
	if (next == undefined) next = EMPTY_LIST;
	return { 
		value: value, 
		next: next 
	};
}

/**
 * return a list with the value on the end of the list
 */
var append = exports.append = function(list, value) {
	return reduce(reverse(list), function(acc, current) {
		return add(current, acc);
	}, add(value));
}

/**
 * returns true if the two lists are equal
 * note: we must accommodate both that the lists are the same length and that they contain no differing values
 */
var areEqual = exports.areEqual = function(list1, list2) {
	return length(list1) == length(list2) && isEmpty(difference(list1, list2));
}

/**
 * return a list with falsy values removed
 */
var compact = exports.compact = function(list) {
	return reduce(reverse(list), function(acc, current) {
		return current ? add(current, acc) : acc;
	}, EMPTY_LIST);
}

/**
 * return true if the list contains the needle
 */
var contains = exports.contains = function(list, needle) {
	return reduce(list, function(acc, current) {
		return acc || current == needle;
	}, false);
}

/**
 * return the number of occurrences of needle in the list
 */
var count = exports.count = function(list, needle) {
	return reduce(list, function(acc, current) {
		return current == needle ? acc + 1 : acc;
	}, 0);
}

/**
 * return a list of values the exist in list1 but not list2
 */
var difference = exports.difference = function(list1, list2) {
	return reduce(reverse(list1), function(acc, current) {
		return contains(list2, current) ? acc : add(current, acc);
	}, EMPTY_LIST);
}

/**
 * return true if all values in the list pass the predicate
 */
var every = exports.every = function(list, predicate) {
	return reduce(list, function(acc, current) {
		return acc && predicate(current);
	}, true);
}

/**
 * return a list of all values for which the filterer returns true
 */
var filter = exports.filter = function(list, filterer) {
	if (isEmpty(list)) return EMPTY_LIST;
	if (filterer(head(list))) {
		return add(head(list), filter(tail(list), filterer));
	}
	else {
		return filter(tail(list), filterer);
	}
}

/**
 * return the first value for which finder returns true
 */
var find = exports.find = function(list, finder) {
	return head(filter(list, finder));
}

/**
 * return the first value in the list
 */
var head = exports.head = function(list) {
	return isEmpty(list) ? null : list.value;
}

/**
 * return all but the last value in the list
 */
var init = exports.init = function(list) {
	return take(list, length(list)-1);
}

/**
 * return the intersection of the two lists
 */
var intersection = exports.intersection = function(list1, list2) {
	diff = difference(list1, list2);
	return reduce(reverse(list1), function(acc, current) {
		return contains(diff, current) ? acc : add(current, acc);
	}, EMPTY_LIST);
}

/**
 * return true if the list is empty
 */
var isEmpty = exports.isEmpty = function(list) {
	return list == EMPTY_LIST;
}

/**
 * return a list of list2 values appended to list1
 */
var join = exports.join = function(list1, list2) {
	return reduce(reverse(list1), function(acc, current) {
		return add(current, acc);
	}, list2);
}

/**
 * return the last value of the list
 */
var last = exports.last = function(list) {
	return head(reverse(list));
}

/**
 * return the length of the list
 */
var length = exports.length = function(list) {
	if (isEmpty(list)) return 0;
	return 1 + length(tail(list));
}

/**
 * return a map over the list
 */
var map = exports.map = function(list, mapper) {
	if (isEmpty(list)) return EMPTY_LIST;
	return add(mapper(head(list)), map(tail(list), mapper));
}

/**
 * return the max from the list
 */
var max = exports.max = function(list) {
	return reduce(list, function(acc, current) {
		return current > acc ? current : acc;
	}, head(list));
}

/**
 * return the min from the list
 */
var min = exports.min = function(list) {
	return reduce(list, function(acc, current) {
		return current < acc ? current : acc;
	}, head(list));
}

/**
 * return the nth value in the list
 */
var nth = exports.nth = function(list, index) {
	if (index == 1) return head(list);
	return nth(tail(list), index-1);
}

/**
 * return a list with the value added at the beginning of the list
 */
var prepend = exports.prepend = function(list, value) {
	return add(value, list);
}

/**
 * return the product of all values in the list
 */
var product = exports.product = function(list) {
	return reduce(list, function(acc, current) {
		return acc * current;
	}, 1);
}

/**
 * reduce the list to a single value by the reducer
 */
var reduce = exports.reduce = function(list, reducer, acc) {
	if (isEmpty(list)) return acc;
	return reduce(tail(list), reducer, reducer(acc, head(list)));
}

/**
 * return a list of all values for which rejector is false
 */
var reject = exports.reject = function(list, rejector) {
	return filter(list, function(value) { return !rejector(value); });
}

/**
 * return the list in reverse
 */
var reverse = exports.reverse = function(list) {
	return reduce(list, function(acc, current) {
		return add(current, acc);
	}, EMPTY_LIST);
}

/**
 * return true if any member of the list passes the predicate
 */
var some = exports.some = function(list, predicate) {
	return reduce(list, function(acc, current) {
		return acc || predicate(current);
	}, false);
}

/**
 * return the sum of all values in the list
 */
var sum = exports.sum = function(list) {
	return reduce(list, function(acc, current) {
		return acc + current;
	}, 0);
}

/**
 * return all values except the head from the list
 */
var tail = exports.tail = function(list) {
	return list.next;
}

/**
 * return a list of the first {number} values from the list
 */
var take = exports.take = function(list, number) {
	if (number == 0) return EMPTY_LIST;
	if (number > length(list)) return list;
	return reverse(
		reduce(list, function(acc, current) {
			return length(acc) < number ? add(current, acc) : acc;
		}, EMPTY_LIST)
		);
}

/**
 * return the union of list1 and list2
 */
var union = exports.union = function(list1, list2) {
	return unique(join(list1, list2));
}

/**
 * return a list of all unique values from the list
 */
var unique = exports.unique = function(list) {
	return reduce(reverse(list), function(acc, current) {
		return contains(acc, current) ? acc : add(current, acc)
	}, EMPTY_LIST);
}

/**
 * return a list with all instances of value removed from the list
 */
var without = exports.without = function(list, value) {
	return reduce(reverse(list), function(acc, current) {
		return current == value ? acc : add(current, acc);
	}, EMPTY_LIST);
}