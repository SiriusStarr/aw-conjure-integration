(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.by.d5 === region.b6.d5)
	{
		return 'on line ' + region.by.d5;
	}
	return 'on lines ' + region.by.d5 + ' through ' + region.b6.d5;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.d3,
		impl.ey,
		impl.eu,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.aJ.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.aJ.b, xhr)); });
		$elm$core$Maybe$isJust(request.dJ) && _Http_track(router, xhr, request.dJ.a);

		try {
			xhr.open(request.X, request.O, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.O));
		}

		_Http_configureRequest(xhr, request);

		request.V.a && xhr.setRequestHeader('Content-Type', request.V.a);
		xhr.send(request.V.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.y; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.C.a || 0;
	xhr.responseType = request.aJ.d;
	xhr.withCredentials = request.dP;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		O: xhr.responseURL,
		er: xhr.status,
		es: xhr.statusText,
		y: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			eq: event.loaded,
			dB: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			em: event.loaded,
			dB: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}

// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.ea) { flags += 'm'; }
	if (options.dR) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $author$project$Bin$Run$Exit = {$: 2};
var $author$project$Bin$Run$GotKnownMeasures = function (a) {
	return {$: 0, a: a};
};
var $author$project$Bin$Run$LoadingMeasures = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.o) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.s),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.s);
		} else {
			var treeLen = builder.o * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.u) : builder.u;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.o);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.s) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.s);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{u: nodeList, o: (len / $elm$core$Array$branchFactor) | 0, s: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$json$Json$Decode$oneOrMoreHelp = F2(
	function (toValue, xs) {
		if (!xs.b) {
			return $elm$json$Json$Decode$fail('a ARRAY with at least ONE element');
		} else {
			var y = xs.a;
			var ys = xs.b;
			return $elm$json$Json$Decode$succeed(
				A2(toValue, y, ys));
		}
	});
var $elm$json$Json$Decode$oneOrMore = F2(
	function (toValue, decoder) {
		return A2(
			$elm$json$Json$Decode$andThen,
			$elm$json$Json$Decode$oneOrMoreHelp(toValue),
			$elm$json$Json$Decode$list(decoder));
	});
var $langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$decodeArray = function (d) {
	return A2($elm$json$Json$Decode$oneOrMore, $mgold$elm_nonempty_list$List$Nonempty$Nonempty, d);
};
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $author$project$Category$Category = $elm$core$Basics$identity;
var $author$project$Category$CategoryName = $elm$core$Basics$identity;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$Basics$not = _Basics_not;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $langyu_app$elm_ancillary_json$Json$Decode$Ancillary$validate = F2(
	function (predicate, error) {
		return $elm$json$Json$Decode$andThen(
			function (a) {
				return predicate(a) ? $elm$json$Json$Decode$succeed(a) : $elm$json$Json$Decode$fail(error);
			});
	});
var $langyu_app$elm_ancillary_json$Json$Decode$Ancillary$nonemptyString = A3(
	$langyu_app$elm_ancillary_json$Json$Decode$Ancillary$validate,
	A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
	'Expected a nonempty string!',
	$elm$json$Json$Decode$string);
var $author$project$Category$None = {$: 0};
var $author$project$Category$RegularExpression = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm_community$json_extra$Json$Decode$Extra$optionalField = F2(
	function (fieldName, decoder) {
		var finishDecoding = function (json) {
			var _v0 = A2(
				$elm$json$Json$Decode$decodeValue,
				A2($elm$json$Json$Decode$field, fieldName, $elm$json$Json$Decode$value),
				json);
			if (!_v0.$) {
				var val = _v0.a;
				return A2(
					$elm$json$Json$Decode$map,
					$elm$core$Maybe$Just,
					A2($elm$json$Json$Decode$field, fieldName, decoder));
			} else {
				return $elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing);
			}
		};
		return A2($elm$json$Json$Decode$andThen, finishDecoding, $elm$json$Json$Decode$value);
	});
var $elm_community$json_extra$Json$Decode$Extra$when = F3(
	function (checkDecoder, check, passDecoder) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (checkVal) {
				return check(checkVal) ? passDecoder : $elm$json$Json$Decode$fail('Check failed with input');
			},
			checkDecoder);
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Category$ruleDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A3(
			$elm_community$json_extra$Json$Decode$Extra$when,
			A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string),
			$elm$core$Basics$eq('regex'),
			A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (pattern, ignoreCase) {
						return $author$project$Category$RegularExpression(
							{
								dc: A2($elm$core$Maybe$withDefault, false, ignoreCase),
								$7: pattern
							});
					}),
				A2($elm$json$Json$Decode$field, 'regex', $elm$json$Json$Decode$string),
				A2($elm_community$json_extra$Json$Decode$Extra$optionalField, 'ignore_case', $elm$json$Json$Decode$bool))),
			A2(
			$elm$json$Json$Decode$field,
			'type',
			$elm$json$Json$Decode$null($author$project$Category$None))
		]));
var $author$project$Category$decoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (name, rule) {
			return {cC: name, dx: rule};
		}),
	A2(
		$elm$json$Json$Decode$field,
		'name',
		$langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$decodeArray($langyu_app$elm_ancillary_json$Json$Decode$Ancillary$nonemptyString)),
	A2($elm$json$Json$Decode$field, 'rule', $author$project$Category$ruleDecoder));
var $author$project$Link$Link = $elm$core$Basics$identity;
var $author$project$CustomScalarCodecs$Id = $elm$core$Basics$identity;
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $rtfeldman$elm_iso8601_date_strings$DeadEnds$problemToString = function (p) {
	switch (p.$) {
		case 0:
			var s = p.a;
			return 'expecting \'' + (s + '\'');
		case 1:
			return 'expecting int';
		case 2:
			return 'expecting hex';
		case 3:
			return 'expecting octal';
		case 4:
			return 'expecting binary';
		case 5:
			return 'expecting float';
		case 6:
			return 'expecting number';
		case 7:
			return 'expecting variable';
		case 8:
			var s = p.a;
			return 'expecting symbol \'' + (s + '\'');
		case 9:
			var s = p.a;
			return 'expecting keyword \'' + (s + '\'');
		case 10:
			return 'expecting end';
		case 11:
			return 'unexpected char';
		case 12:
			var s = p.a;
			return 'problem ' + s;
		default:
			return 'bad repeat';
	}
};
var $rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndToString = function (deadend) {
	return $rtfeldman$elm_iso8601_date_strings$DeadEnds$problemToString(deadend.dq) + (' at row ' + ($elm$core$String$fromInt(deadend.dw) + (', col ' + $elm$core$String$fromInt(deadend.cV))));
};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndsToString = function (deadEnds) {
	return $elm$core$String$concat(
		A2(
			$elm$core$List$intersperse,
			'; ',
			A2($elm$core$List$map, $rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndToString, deadEnds)));
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {cV: col, dV: contextStack, dq: problem, dw: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.dw, s.cV, x, s.h));
	});
var $elm$core$String$length = _String_length;
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.c),
			s.d) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.c);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.d, offset) < 0,
					0,
					{cV: col, h: s0.h, i: s0.i, d: offset, dw: row, c: s0.c});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.d, s.dw, s.cV, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$String$slice = _String_slice;
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.d, s1.d, s0.c),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$core$Basics$round = _Basics_round;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$core$String$toFloat = _String_toFloat;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs = A2(
	$elm$parser$Parser$andThen,
	function (str) {
		if ($elm$core$String$length(str) <= 9) {
			var _v0 = $elm$core$String$toFloat('0.' + str);
			if (!_v0.$) {
				var floatVal = _v0.a;
				return $elm$parser$Parser$succeed(
					$elm$core$Basics$round(floatVal * 1000));
			} else {
				return $elm$parser$Parser$problem('Invalid float: \"' + (str + '\"'));
			}
		} else {
			return $elm$parser$Parser$problem(
				'Expected at most 9 digits, but got ' + $elm$core$String$fromInt(
					$elm$core$String$length(str)));
		}
	},
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompWhile($elm$core$Char$isDigit)));
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return $elm$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$core$String$append = _String_append;
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.d, s.c);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cV: 1, h: s.h, i: s.i, d: s.d + 1, dw: s.dw + 1, c: s.c}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cV: s.cV + 1, h: s.h, i: s.i, d: newOffset, dw: s.dw, c: s.c}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$core$String$toInt = _String_toInt;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt = function (quantity) {
	var helper = function (str) {
		if (_Utils_eq(
			$elm$core$String$length(str),
			quantity)) {
			var _v0 = $elm$core$String$toInt(str);
			if (!_v0.$) {
				var intVal = _v0.a;
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$Done,
					$elm$parser$Parser$succeed(intVal));
			} else {
				return $elm$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
			}
		} else {
			return A2(
				$elm$parser$Parser$map,
				function (nextChar) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$String$append, str, nextChar));
				},
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
		}
	};
	return A2($elm$parser$Parser$loop, '', helper);
};
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.d, s.dw, s.cV, s.c);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{cV: newCol, h: s.h, i: s.i, d: newOffset, dw: newRow, c: s.c});
	};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear = 1970;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay = function (day) {
	return $elm$parser$Parser$problem(
		'Invalid day: ' + $elm$core$String$fromInt(day));
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear = function (year) {
	return (!A2($elm$core$Basics$modBy, 4, year)) && ((!(!A2($elm$core$Basics$modBy, 100, year))) || (!A2($elm$core$Basics$modBy, 400, year)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore = function (y1) {
	var y = y1 - 1;
	return (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay = 86400000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear = 31536000000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay = function (_v0) {
	var year = _v0.a;
	var month = _v0.b;
	var dayInMonth = _v0.c;
	if (dayInMonth < 0) {
		return $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear * (year - $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear);
			var days = ((month < 3) || (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay * (days + ($rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(year) - $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore($rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear)));
			return $elm$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year)))) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return $elm$parser$Parser$problem(
					'Invalid month: \"' + ($elm$core$String$fromInt(month) + '\"'));
		}
	}
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs = A2(
	$elm$parser$Parser$andThen,
	$rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(4)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$core$Basics$identity),
							$elm$parser$Parser$symbol('-')),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
					]))),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$symbol('-')),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
				]))));
var $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes = function () {
	var utcOffsetMinutesFromParts = F3(
		function (multiplier, hours, minutes) {
			return (multiplier * (hours * 60)) + minutes;
		});
	return A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return 0;
					},
					$elm$parser$Parser$symbol('Z')),
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(utcOffsetMinutesFromParts),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$map,
										function (_v1) {
											return 1;
										},
										$elm$parser$Parser$symbol('+')),
										A2(
										$elm$parser$Parser$map,
										function (_v2) {
											return -1;
										},
										$elm$parser$Parser$symbol('-'))
									]))),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed($elm$core$Basics$identity),
									$elm$parser$Parser$symbol(':')),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
								$elm$parser$Parser$succeed(0)
							]))),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(0),
					$elm$parser$Parser$end)
				])));
}();
var $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601 = A2(
	$elm$parser$Parser$andThen,
	function (datePart) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed(
											$rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts(datePart)),
										$elm$parser$Parser$symbol('T')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed($elm$core$Basics$identity),
												$elm$parser$Parser$symbol(':')),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
										]))),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$keeper,
										A2(
											$elm$parser$Parser$ignorer,
											$elm$parser$Parser$succeed($elm$core$Basics$identity),
											$elm$parser$Parser$symbol(':')),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										$elm$parser$Parser$succeed(0)
									]))),
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed($elm$core$Basics$identity),
										$elm$parser$Parser$symbol('.')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs),
									$elm$parser$Parser$succeed(0)
								]))),
					A2($elm$parser$Parser$ignorer, $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes, $elm$parser$Parser$end)),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A6($rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts, datePart, 0, 0, 0, 0, 0)),
					$elm$parser$Parser$end)
				]));
	},
	$rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {cV: col, dq: problem, dw: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.dw, p.cV, p.dq);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{cV: 1, h: _List_Nil, i: 1, d: 0, dw: 1, c: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime = function (str) {
	return A2($elm$parser$Parser$run, $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601, str);
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$decoder = A2(
	$elm$json$Json$Decode$andThen,
	function (str) {
		var _v0 = $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime(str);
		if (_v0.$ === 1) {
			var deadEnds = _v0.a;
			return $elm$json$Json$Decode$fail(
				$rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndsToString(deadEnds));
		} else {
			var time = _v0.a;
			return $elm$json$Json$Decode$succeed(time);
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Conjure$Scalar$ISO8601Date = $elm$core$Basics$identity;
var $author$project$Conjure$Scalar$ISO8601DateTime = $elm$core$Basics$identity;
var $author$project$Conjure$Scalar$Id = $elm$core$Basics$identity;
var $author$project$Conjure$Scalar$Json = $elm$core$Basics$identity;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Graphql$Internal$Builder$Object$scalarDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			$elm$json$Json$Decode$string,
			A2($elm$json$Json$Decode$map, $elm$core$String$fromFloat, $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$map, $elm$core$String$fromInt, $elm$json$Json$Decode$int),
			A2(
			$elm$json$Json$Decode$map,
			function (bool) {
				return bool ? 'true' : 'false';
			},
			$elm$json$Json$Decode$bool)
		]));
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Conjure$Scalar$defaultCodecs = {
	dT: {
		cf: A2($elm$json$Json$Decode$map, $elm$core$Basics$identity, $author$project$Graphql$Internal$Builder$Object$scalarDecoder),
		b5: function (_v0) {
			var raw = _v0;
			return $elm$json$Json$Encode$string(raw);
		}
	},
	Z: {
		cf: A2($elm$json$Json$Decode$map, $elm$core$Basics$identity, $author$project$Graphql$Internal$Builder$Object$scalarDecoder),
		b5: function (_v1) {
			var raw = _v1;
			return $elm$json$Json$Encode$string(raw);
		}
	},
	b: {
		cf: A2($elm$json$Json$Decode$map, $elm$core$Basics$identity, $author$project$Graphql$Internal$Builder$Object$scalarDecoder),
		b5: function (_v2) {
			var raw = _v2;
			return $elm$json$Json$Encode$string(raw);
		}
	},
	_: {
		cf: A2($elm$json$Json$Decode$map, $elm$core$Basics$identity, $author$project$Graphql$Internal$Builder$Object$scalarDecoder),
		b5: function (_v3) {
			var raw = _v3;
			return $elm$json$Json$Encode$string(raw);
		}
	}
};
var $author$project$Conjure$Scalar$Codecs = $elm$core$Basics$identity;
var $author$project$Conjure$Scalar$defineCodecs = function (definitions) {
	return definitions;
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromMonth = function (month) {
	switch (month) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
	return millis;
};
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.by, posixMinutes) < 0) {
					return posixMinutes + era.d;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		cY: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		dk: month,
		dN: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).cY;
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$Apr = 3;
var $elm$time$Time$Aug = 7;
var $elm$time$Time$Dec = 11;
var $elm$time$Time$Feb = 1;
var $elm$time$Time$Jan = 0;
var $elm$time$Time$Jul = 6;
var $elm$time$Time$Jun = 5;
var $elm$time$Time$Mar = 2;
var $elm$time$Time$May = 4;
var $elm$time$Time$Nov = 10;
var $elm$time$Time$Oct = 9;
var $elm$time$Time$Sep = 8;
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).dk;
		switch (_v0) {
			case 1:
				return 0;
			case 2:
				return 1;
			case 3:
				return 2;
			case 4:
				return 3;
			case 5:
				return 4;
			case 6:
				return 5;
			case 7:
				return 6;
			case 8:
				return 7;
			case 9:
				return 8;
			case 10:
				return 9;
			case 11:
				return 10;
			default:
				return 11;
		}
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString = F2(
	function (digits, time) {
		return A3(
			$elm$core$String$padLeft,
			digits,
			'0',
			$elm$core$String$fromInt(time));
	});
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).dN;
	});
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime = function (time) {
	return A2(
		$rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		4,
		A2($elm$time$Time$toYear, $elm$time$Time$utc, time)) + ('-' + (A2(
		$rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		$rtfeldman$elm_iso8601_date_strings$Iso8601$fromMonth(
			A2($elm$time$Time$toMonth, $elm$time$Time$utc, time))) + ('-' + (A2(
		$rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		A2($elm$time$Time$toDay, $elm$time$Time$utc, time)) + ('T' + (A2(
		$rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		A2($elm$time$Time$toHour, $elm$time$Time$utc, time)) + (':' + (A2(
		$rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		A2($elm$time$Time$toMinute, $elm$time$Time$utc, time)) + (':' + (A2(
		$rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		A2($elm$time$Time$toSecond, $elm$time$Time$utc, time)) + ('.' + (A2(
		$rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		3,
		A2($elm$time$Time$toMillis, $elm$time$Time$utc, time)) + 'Z'))))))))))));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$encode = A2($elm$core$Basics$composeR, $rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime, $elm$json$Json$Encode$string);
var $author$project$CustomScalarCodecs$codecs = $author$project$Conjure$Scalar$defineCodecs(
	{
		dT: $author$project$Conjure$Scalar$defaultCodecs.dT,
		Z: {cf: $rtfeldman$elm_iso8601_date_strings$Iso8601$decoder, b5: $rtfeldman$elm_iso8601_date_strings$Iso8601$encode},
		b: {
			cf: A2($elm$json$Json$Decode$map, $elm$core$Basics$identity, $elm$json$Json$Decode$string),
			b5: function (_v0) {
				var s = _v0;
				return $elm$json$Json$Encode$string(s);
			}
		},
		_: {cf: $elm$json$Json$Decode$value, b5: $elm$core$Basics$identity}
	});
var $langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$find = F2(
	function (pred, _v0) {
		var first = _v0.a;
		var rest = _v0.b;
		var go = function (xs) {
			go:
			while (true) {
				if (!xs.b) {
					return $elm$core$Maybe$Nothing;
				} else {
					var x = xs.a;
					var xs_ = xs.b;
					if (pred(x)) {
						return $elm$core$Maybe$Just(x);
					} else {
						var $temp$xs = xs_;
						xs = $temp$xs;
						continue go;
					}
				}
			}
		};
		return go(
			A2($elm$core$List$cons, first, rest));
	});
var $author$project$Measure$getId = function (_v0) {
	var id = _v0.a;
	return id;
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $mgold$elm_nonempty_list$List$Nonempty$any = F2(
	function (f, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return f(x) || A2($elm$core$List$any, f, xs);
	});
var $mgold$elm_nonempty_list$List$Nonempty$toList = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2($elm$core$List$cons, x, xs);
};
var $author$project$Category$nameToString = function (_v0) {
	var n = _v0;
	return A2(
		$elm$core$String$join,
		'>',
		$mgold$elm_nonempty_list$List$Nonempty$toList(n));
};
var $author$project$Category$nameDecoder = function (cs) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (n) {
			return A2(
				$mgold$elm_nonempty_list$List$Nonempty$any,
				function (_v0) {
					var name = _v0.cC;
					return _Utils_eq(name, n);
				},
				cs) ? $elm$json$Json$Decode$succeed(n) : $elm$json$Json$Decode$fail(
				A2(
					$elm$core$String$join,
					'\n',
					_List_fromArray(
						[
							'Unknown category name:',
							$author$project$Category$nameToString(n),
							'Please add it to the list of categories in ActivityWatch (and re-export them).'
						])));
		},
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$Basics$identity,
			$langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$decodeArray($langyu_app$elm_ancillary_json$Json$Decode$Ancillary$nonemptyString)));
};
var $elm_community$maybe_extra$Maybe$Extra$unpack = F3(
	function (_default, f, m) {
		if (m.$ === 1) {
			return _default(0);
		} else {
			var a = m.a;
			return f(a);
		}
	});
var $author$project$Conjure$Scalar$unwrapCodecs = function (_v0) {
	var unwrappedCodecs = _v0;
	return unwrappedCodecs;
};
var $author$project$Link$decoder = F2(
	function (cs, ms) {
		return A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (from, toMeasure) {
					return {c6: from, dI: toMeasure};
				}),
			A2(
				$elm$json$Json$Decode$field,
				'from',
				$langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$decodeArray(
					$author$project$Category$nameDecoder(cs))),
			A2(
				$elm$json$Json$Decode$field,
				'to',
				function (c) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (id) {
							return A3(
								$elm_community$maybe_extra$Maybe$Extra$unpack,
								function (_v0) {
									return $elm$json$Json$Decode$fail(
										A2(
											$elm$core$String$join,
											'\n ',
											_List_fromArray(
												[
													'Unknown measure ID encountered:',
													A2(
													$elm$json$Json$Encode$encode,
													2,
													c.b5(id))
												])));
								},
								$elm$json$Json$Decode$succeed,
								A2(
									$langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$find,
									A2(
										$elm$core$Basics$composeL,
										$elm$core$Basics$eq(id),
										$author$project$Measure$getId),
									ms));
						},
						c.cf);
				}(
					$author$project$Conjure$Scalar$unwrapCodecs($author$project$CustomScalarCodecs$codecs).b)));
	});
var $author$project$Authorization$PAT = $elm$core$Basics$identity;
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $author$project$Authorization$decoder = A2(
	$elm$json$Json$Decode$andThen,
	function (s) {
		return ((A2($elm$core$String$left, 6, s) === 'cnjrp_') && ($elm$core$String$length(s) === 64)) ? $elm$json$Json$Decode$succeed(s) : $elm$json$Json$Decode$fail(
			A2(
				$elm$core$String$join,
				'\n',
				_List_fromArray(
					['Decoded a PAT value:', s, 'that doesn\'t look right.', 'A valid PAT should be 64 characters long and begin with \"cnjrp_\".', 'You can create one at: https://conjure.so/settings/api'])));
	},
	$elm$json$Json$Decode$string);
var $author$project$BinSize$BinSize = $elm$core$Basics$identity;
var $elm_community$basics_extra$Basics$Extra$safeRemainderBy = F2(
	function (divisor, x) {
		return (!divisor) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(x % divisor);
	});
var $author$project$BinSize$fromMinutes = function (i) {
	return ((i < 5) || ((i > 60) || (!_Utils_eq(
		A2($elm_community$basics_extra$Basics$Extra$safeRemainderBy, i, 60),
		$elm$core$Maybe$Just(0))))) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(i);
};
var $elm_community$json_extra$Json$Decode$Extra$fromMaybe = F2(
	function (error, val) {
		if (!val.$) {
			var v = val.a;
			return $elm$json$Json$Decode$succeed(v);
		} else {
			return $elm$json$Json$Decode$fail(error);
		}
	});
var $langyu_app$elm_ancillary_json$Json$Decode$Ancillary$mapMaybe = F2(
	function (toMaybe, error) {
		return A2(
			$elm$core$Basics$composeR,
			$elm$json$Json$Decode$map(toMaybe),
			$elm$json$Json$Decode$andThen(
				$elm_community$json_extra$Json$Decode$Extra$fromMaybe(error)));
	});
var $author$project$BinSize$decoder = A3($langyu_app$elm_ancillary_json$Json$Decode$Ancillary$mapMaybe, $author$project$BinSize$fromMinutes, 'A valid bin size must be between 5 and 60 minutes and evenly divide an hour!', $elm$json$Json$Decode$int);
var $author$project$Settings$AppAndTitle = 1;
var $author$project$Settings$Category = 0;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm_community$basics_extra$Basics$Extra$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $langyu_app$elm_ancillary_json$Json$Decode$Ancillary$lookup = function (assocs) {
	return A3(
		$langyu_app$elm_ancillary_json$Json$Decode$Ancillary$mapMaybe,
		A2($elm_community$basics_extra$Basics$Extra$flip, $elm$core$Dict$get, assocs),
		'No matching value found!',
		$elm$json$Json$Decode$string);
};
var $author$project$Settings$groupByDecoder = $langyu_app$elm_ancillary_json$Json$Decode$Ancillary$lookup(
	$elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2('Category', 0),
				_Utils_Tuple2('AppAndTitle', 1)
			])));
var $elm$json$Json$Decode$map4 = _Json_map4;
var $author$project$Settings$decoder = A5(
	$elm$json$Json$Decode$map4,
	F4(
		function (binSize, groupBy, pat, reportUnmatched) {
			return {cR: binSize, d1: groupBy, ek: pat, eo: reportUnmatched};
		}),
	A2($elm$json$Json$Decode$field, 'binSize', $author$project$BinSize$decoder),
	A2($elm$json$Json$Decode$field, 'groupBy', $author$project$Settings$groupByDecoder),
	A2($elm$json$Json$Decode$field, 'pat', $author$project$Authorization$decoder),
	A2($elm$json$Json$Decode$field, 'reportUnmatched', $elm$json$Json$Decode$bool));
var $author$project$Log$log = _Platform_outgoingPort('log', $elm$core$Basics$identity);
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $author$project$Log$error = function (s) {
	return $author$project$Log$log(
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'error',
					$elm$json$Json$Encode$string(s))
				])));
};
var $author$project$Graphql$SelectionSet$SelectionSet = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Graphql$SelectionSet$map = F2(
	function (mapFunction, _v0) {
		var selectionFields = _v0.a;
		var selectionDecoder = _v0.b;
		return A2(
			$author$project$Graphql$SelectionSet$SelectionSet,
			selectionFields,
			A2($elm$json$Json$Decode$map, mapFunction, selectionDecoder));
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $author$project$Graphql$OptionalArgument$Absent = {$: 1};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$Graphql$Internal$Builder$Argument$Argument = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Graphql$Internal$Encode$Json = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Graphql$Internal$Encode$null = $author$project$Graphql$Internal$Encode$Json($elm$json$Json$Encode$null);
var $author$project$Graphql$Internal$Builder$Argument$optional = F3(
	function (fieldName, maybeValue, toValue) {
		switch (maybeValue.$) {
			case 0:
				var value = maybeValue.a;
				return $elm$core$Maybe$Just(
					A2(
						$author$project$Graphql$Internal$Builder$Argument$Argument,
						fieldName,
						toValue(value)));
			case 1:
				return $elm$core$Maybe$Nothing;
			default:
				return $elm$core$Maybe$Just(
					A2($author$project$Graphql$Internal$Builder$Argument$Argument, fieldName, $author$project$Graphql$Internal$Encode$null));
		}
	});
var $author$project$Graphql$RawField$Composite = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$Graphql$Internal$Builder$Object$composite = F3(
	function (fieldName, args, fields) {
		return A3($author$project$Graphql$RawField$Composite, fieldName, args, fields);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $author$project$Graphql$Document$Hash$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {aw: charsProcessed, aW: hash, ae: seed, bv: shift};
	});
var $author$project$Graphql$Document$Hash$c1 = 3432918353;
var $author$project$Graphql$Document$Hash$c2 = 461845907;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $author$project$Graphql$Document$Hash$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $author$project$Graphql$Document$Hash$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $author$project$Graphql$Document$Hash$finalize = function (data) {
	var acc = (!(!data.aW)) ? (data.ae ^ A2(
		$author$project$Graphql$Document$Hash$multiplyBy,
		$author$project$Graphql$Document$Hash$c2,
		A2(
			$author$project$Graphql$Document$Hash$rotlBy,
			15,
			A2($author$project$Graphql$Document$Hash$multiplyBy, $author$project$Graphql$Document$Hash$c1, data.aW)))) : data.ae;
	var h0 = acc ^ data.aw;
	var h1 = A2($author$project$Graphql$Document$Hash$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($author$project$Graphql$Document$Hash$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $author$project$Graphql$Document$Hash$mix = F2(
	function (h1, k1) {
		return A2(
			$author$project$Graphql$Document$Hash$multiplyBy,
			5,
			A2(
				$author$project$Graphql$Document$Hash$rotlBy,
				13,
				h1 ^ A2(
					$author$project$Graphql$Document$Hash$multiplyBy,
					$author$project$Graphql$Document$Hash$c2,
					A2(
						$author$project$Graphql$Document$Hash$rotlBy,
						15,
						A2($author$project$Graphql$Document$Hash$multiplyBy, $author$project$Graphql$Document$Hash$c1, k1))))) + 3864292196;
	});
var $author$project$Graphql$Document$Hash$hashFold = F2(
	function (c, data) {
		var res = data.aW | ((255 & $elm$core$Char$toCode(c)) << data.bv);
		var _v0 = data.bv;
		if (_v0 === 24) {
			return {
				aw: data.aw + 1,
				aW: 0,
				ae: A2($author$project$Graphql$Document$Hash$mix, data.ae, res),
				bv: 0
			};
		} else {
			return {aw: data.aw + 1, aW: res, ae: data.ae, bv: data.bv + 8};
		}
	});
var $author$project$Graphql$Document$Hash$hashString = F2(
	function (seed, str) {
		return $author$project$Graphql$Document$Hash$finalize(
			A3(
				$elm$core$String$foldl,
				$author$project$Graphql$Document$Hash$hashFold,
				A4($author$project$Graphql$Document$Hash$HashData, 0, seed, 0, 0),
				str));
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Graphql$Internal$Encode$List = function (a) {
	return {$: 2, a: a};
};
var $author$project$Graphql$Internal$Encode$Object = function (a) {
	return {$: 3, a: a};
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$Graphql$Internal$Encode$serialize = function (value) {
	var serializeJson = function (json) {
		var decoder = $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$map,
					A2(
						$elm$core$Basics$composeL,
						$author$project$Graphql$Internal$Encode$List,
						$elm$core$List$map($author$project$Graphql$Internal$Encode$Json)),
					$elm$json$Json$Decode$list($elm$json$Json$Decode$value)),
					A2(
					$elm$json$Json$Decode$map,
					A2(
						$elm$core$Basics$composeL,
						$author$project$Graphql$Internal$Encode$Object,
						$elm$core$List$map(
							$elm$core$Tuple$mapSecond($author$project$Graphql$Internal$Encode$Json))),
					$elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$value))
				]));
		var _v2 = A2($elm$json$Json$Decode$decodeValue, decoder, json);
		if (!_v2.$) {
			var v = _v2.a;
			return $author$project$Graphql$Internal$Encode$serialize(v);
		} else {
			return A2($elm$json$Json$Encode$encode, 0, json);
		}
	};
	switch (value.$) {
		case 0:
			var enumValue = value.a;
			return enumValue;
		case 1:
			var json = value.a;
			return serializeJson(json);
		case 2:
			var values = value.a;
			return '[' + (A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $author$project$Graphql$Internal$Encode$serialize, values)) + ']');
		default:
			var keyValuePairs = value.a;
			return '{' + (A2(
				$elm$core$String$join,
				', ',
				A2(
					$elm$core$List$map,
					function (_v1) {
						var key = _v1.a;
						var objectValue = _v1.b;
						return key + (': ' + $author$project$Graphql$Internal$Encode$serialize(objectValue));
					},
					keyValuePairs)) + '}');
	}
};
var $author$project$Graphql$Document$Argument$argToString = function (_v0) {
	var name = _v0.a;
	var value = _v0.b;
	return name + (': ' + $author$project$Graphql$Internal$Encode$serialize(value));
};
var $author$project$Graphql$Document$Argument$serialize = function (args) {
	if (!args.b) {
		return '';
	} else {
		var nonemptyArgs = args;
		return '(' + (A2(
			$elm$core$String$join,
			', ',
			A2($elm$core$List$map, $author$project$Graphql$Document$Argument$argToString, nonemptyArgs)) + ')');
	}
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$Graphql$Document$Field$maybeAliasHash = function (field) {
	return A2(
		$elm$core$Maybe$map,
		$author$project$Graphql$Document$Hash$hashString(0),
		function () {
			if (!field.$) {
				var name = field.a;
				var _arguments = field.b;
				var children = field.c;
				return $elm$core$List$isEmpty(_arguments) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
					$author$project$Graphql$Document$Argument$serialize(_arguments));
			} else {
				var typeString = field.a.ex;
				var fieldName = field.a.c2;
				var _arguments = field.b;
				return (fieldName === '__typename') ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
					$elm$core$String$concat(
						A2(
							$elm$core$List$append,
							_List_fromArray(
								[typeString]),
							$elm$core$List$singleton(
								$author$project$Graphql$Document$Argument$serialize(_arguments)))));
			}
		}());
};
var $author$project$Graphql$RawField$name = function (field) {
	if (!field.$) {
		var fieldName = field.a;
		var argumentList = field.b;
		var fieldList = field.c;
		return fieldName;
	} else {
		var typeString = field.a.ex;
		var fieldName = field.a.c2;
		var argumentList = field.b;
		return fieldName;
	}
};
var $author$project$Graphql$Document$Field$alias = function (field) {
	return A2(
		$elm$core$Maybe$map,
		function (aliasHash) {
			return _Utils_ap(
				$author$project$Graphql$RawField$name(field),
				$elm$core$String$fromInt(aliasHash));
		},
		$author$project$Graphql$Document$Field$maybeAliasHash(field));
};
var $author$project$Graphql$Document$Field$hashedAliasName = function (field) {
	return A2(
		$elm$core$Maybe$withDefault,
		$author$project$Graphql$RawField$name(field),
		$author$project$Graphql$Document$Field$alias(field));
};
var $author$project$Graphql$Internal$Builder$Object$selectionForCompositeField = F4(
	function (fieldName, args, _v0, decoderTransform) {
		var fields = _v0.a;
		var decoder = _v0.b;
		return A2(
			$author$project$Graphql$SelectionSet$SelectionSet,
			_List_fromArray(
				[
					A3($author$project$Graphql$Internal$Builder$Object$composite, fieldName, args, fields)
				]),
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$json$Json$Decode$field,
						fieldName,
						decoderTransform(decoder)),
						A2(
						$elm$json$Json$Decode$field,
						$author$project$Graphql$Document$Field$hashedAliasName(
							A3($author$project$Graphql$Internal$Builder$Object$composite, fieldName, args, fields)),
						decoderTransform(decoder))
					])));
	});
var $author$project$Graphql$Internal$Encode$string = function (value) {
	return $author$project$Graphql$Internal$Encode$Json(
		$elm$json$Json$Encode$string(value));
};
var $author$project$Graphql$Internal$Encode$fromJson = function (jsonValue) {
	return $author$project$Graphql$Internal$Encode$Json(jsonValue);
};
var $author$project$Conjure$Scalar$unwrapEncoder = F2(
	function (getter, _v0) {
		var unwrappedCodecs = _v0;
		return A2(
			$elm$core$Basics$composeR,
			getter(unwrappedCodecs).b5,
			$author$project$Graphql$Internal$Encode$fromJson);
	});
var $author$project$Conjure$Query$measures = F2(
	function (fillInOptionals____, object____) {
		var filledInOptionals____ = fillInOptionals____(
			{a: $author$project$Graphql$OptionalArgument$Absent, I: $author$project$Graphql$OptionalArgument$Absent});
		var optionalArgs____ = A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					A3(
					$author$project$Graphql$Internal$Builder$Argument$optional,
					'id',
					filledInOptionals____.a,
					A2(
						$author$project$Conjure$Scalar$unwrapEncoder,
						function ($) {
							return $.b;
						},
						$author$project$CustomScalarCodecs$codecs)),
					A3($author$project$Graphql$Internal$Builder$Argument$optional, 'nameCont', filledInOptionals____.I, $author$project$Graphql$Internal$Encode$string)
				]));
		return A4(
			$author$project$Graphql$Internal$Builder$Object$selectionForCompositeField,
			'measures',
			optionalArgs____,
			object____,
			A2($elm$core$Basics$composeR, $elm$core$Basics$identity, $elm$json$Json$Decode$list));
	});
var $author$project$Measure$Measure = $elm$core$Basics$identity;
var $author$project$Graphql$RawField$Leaf = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Graphql$Internal$Builder$Object$leaf = F2(
	function (details, args) {
		return A2($author$project$Graphql$RawField$Leaf, details, args);
	});
var $author$project$Graphql$Internal$Builder$Object$selectionForField = F4(
	function (typeString, fieldName, args, decoder) {
		var newLeaf = A2(
			$author$project$Graphql$Internal$Builder$Object$leaf,
			{c2: fieldName, ex: typeString},
			args);
		return A2(
			$author$project$Graphql$SelectionSet$SelectionSet,
			_List_fromArray(
				[newLeaf]),
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2($elm$json$Json$Decode$field, fieldName, decoder),
						A2(
						$elm$json$Json$Decode$field,
						$author$project$Graphql$Document$Field$hashedAliasName(newLeaf),
						decoder)
					])));
	});
var $author$project$Conjure$Object$Measure$id = A4(
	$author$project$Graphql$Internal$Builder$Object$selectionForField,
	'CustomScalarCodecs.Id',
	'id',
	_List_Nil,
	$author$project$Conjure$Scalar$unwrapCodecs($author$project$CustomScalarCodecs$codecs).b.cf);
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $author$project$Graphql$SelectionSet$map4 = F5(
	function (combine, _v0, _v1, _v2, _v3) {
		var selectionFields1 = _v0.a;
		var selectionDecoder1 = _v0.b;
		var selectionFields2 = _v1.a;
		var selectionDecoder2 = _v1.b;
		var selectionFields3 = _v2.a;
		var selectionDecoder3 = _v2.b;
		var selectionFields4 = _v3.a;
		var selectionDecoder4 = _v3.b;
		return A2(
			$author$project$Graphql$SelectionSet$SelectionSet,
			$elm$core$List$concat(
				_List_fromArray(
					[selectionFields1, selectionFields2, selectionFields3, selectionFields4])),
			A5($elm$json$Json$Decode$map4, combine, selectionDecoder1, selectionDecoder2, selectionDecoder3, selectionDecoder4));
	});
var $author$project$Conjure$Enum$MeasureType$Number = 2;
var $author$project$Conjure$Enum$MeasureType$Time_entry = 1;
var $author$project$Conjure$Enum$MeasureType$Timestamp = 0;
var $author$project$Conjure$Enum$MeasureType$Workout_distance = 3;
var $author$project$Conjure$Enum$MeasureType$decoder = A2(
	$elm$json$Json$Decode$andThen,
	function (string) {
		switch (string) {
			case 'timestamp':
				return $elm$json$Json$Decode$succeed(0);
			case 'time_entry':
				return $elm$json$Json$Decode$succeed(1);
			case 'number':
				return $elm$json$Json$Decode$succeed(2);
			case 'workout_distance':
				return $elm$json$Json$Decode$succeed(3);
			default:
				return $elm$json$Json$Decode$fail('Invalid MeasureType type, ' + (string + ' try re-running the @dillonkearns/elm-graphql CLI '));
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Conjure$Object$Measure$measureType = A4($author$project$Graphql$Internal$Builder$Object$selectionForField, 'Enum.MeasureType.MeasureType', 'measureType', _List_Nil, $author$project$Conjure$Enum$MeasureType$decoder);
var $author$project$Conjure$Object$Measure$name = A4($author$project$Graphql$Internal$Builder$Object$selectionForField, 'String', 'name', _List_Nil, $elm$json$Json$Decode$string);
var $author$project$Conjure$Object$Measure$position = A4($author$project$Graphql$Internal$Builder$Object$selectionForField, 'Float', 'position', _List_Nil, $elm$json$Json$Decode$float);
var $author$project$Measure$selectionSet = A5(
	$author$project$Graphql$SelectionSet$map4,
	F4(
		function (id, name, position, measureType) {
			if (measureType === 1) {
				return $elm$core$Maybe$Just(
					{a: id, cC: name, e: position});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}),
	$author$project$Conjure$Object$Measure$id,
	$author$project$Conjure$Object$Measure$name,
	$author$project$Conjure$Object$Measure$position,
	$author$project$Conjure$Object$Measure$measureType);
var $author$project$Graphql$Http$Request = $elm$core$Basics$identity;
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $author$project$Graphql$Http$withHeader = F3(
	function (key, value, _v0) {
		var request = _v0;
		return _Utils_update(
			request,
			{
				y: A2(
					$elm$core$List$cons,
					A2($elm$http$Http$header, key, value),
					request.y)
			});
	});
var $author$project$Authorization$addHeaders = function (_v0) {
	var pat = _v0;
	return A2($author$project$Graphql$Http$withHeader, 'Authorization', 'Bearer ' + pat);
};
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2($elm$core$List$map, $elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $elm$url$Url$Builder$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters)));
	});
var $author$project$Graphql$Http$GraphqlError = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Graphql$Http$HttpError = function (a) {
	return {$: 1, a: a};
};
var $author$project$Graphql$Http$GraphqlError$UnparsedData = function (a) {
	return {$: 1, a: a};
};
var $author$project$Graphql$Http$discardParsedErrorData = function (result) {
	if (!result.$) {
		var data = result.a;
		return $elm$core$Result$Ok(data);
	} else {
		if (result.a.$ === 1) {
			var httpError = result.a.a;
			return $elm$core$Result$Err(
				$author$project$Graphql$Http$HttpError(httpError));
		} else {
			if (!result.a.a.$) {
				var _v1 = result.a;
				var parsed = _v1.a.a;
				var errorList = _v1.b;
				return $elm$core$Result$Err(
					A2(
						$author$project$Graphql$Http$GraphqlError,
						$author$project$Graphql$Http$GraphqlError$UnparsedData($elm$json$Json$Encode$null),
						errorList));
			} else {
				var _v2 = result.a;
				var value = _v2.a.a;
				var errorList = _v2.b;
				return $elm$core$Result$Err(
					A2(
						$author$project$Graphql$Http$GraphqlError,
						$author$project$Graphql$Http$GraphqlError$UnparsedData(value),
						errorList));
			}
		}
	}
};
var $author$project$Conjure$errorToString = function (e) {
	if (!e.$) {
		var es = e.b;
		return A2(
			$elm$core$String$join,
			'\n',
			A2(
				$elm$core$List$cons,
				'Received a Graphql error from the Conjure server!',
				_Utils_ap(
					A2(
						$elm$core$List$map,
						function ($) {
							return $.d8;
						},
						es),
					_List_fromArray(
						['Upgrade your aw-conjure-integration version if a new version is available.', 'If you\'re already on the latest version, please report this problem!']))));
	} else {
		switch (e.a.$) {
			case 0:
				var url = e.a.a;
				return A2(
					$elm$core$String$join,
					'\n',
					_List_fromArray(
						['Invalid URL: ', url, 'This should never happen, so please report it!']));
			case 1:
				var _v1 = e.a;
				return A2(
					$elm$core$String$join,
					'\n',
					_List_fromArray(
						['The Conjure server is taking too long to respond!', 'Something is probably wrong with the Conjure server, but if the problem persists, please report it.']));
			case 2:
				var _v2 = e.a;
				return 'Unable to contact the Conjure server!  Are you connected to the internet?';
			case 3:
				var _v3 = e.a;
				var statusCode = _v3.a.er;
				var statusText = _v3.a.es;
				return A2(
					$elm$core$String$join,
					'\n',
					_List_fromArray(
						[
							'Received a bad status code from the server: ',
							$elm$core$String$fromInt(statusCode) + (': ' + statusText),
							'Something is probably wrong with the Conjure server, but if the problem persists, please report it.'
						]));
			default:
				var jsonError = e.a.a;
				return A2(
					$elm$core$String$join,
					'\n',
					_List_fromArray(
						[
							'Received an unexpected response from the Conjure server!',
							$elm$json$Json$Decode$errorToString(jsonError),
							'If the problem persists, please report it!'
						]));
		}
	}
};
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $author$project$Graphql$Http$Query = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Graphql$Document$decoder = function (_v0) {
	var fields = _v0.a;
	var decoder_ = _v0.b;
	return A2($elm$json$Json$Decode$field, 'data', decoder_);
};
var $author$project$Graphql$Http$queryRequest = F2(
	function (baseUrl, query) {
		return {
			b1: baseUrl,
			cg: A2($author$project$Graphql$Http$Query, $elm$core$Maybe$Nothing, query),
			aJ: $author$project$Graphql$Document$decoder(query),
			y: _List_Nil,
			ab: $elm$core$Maybe$Nothing,
			ad: _List_Nil,
			C: $elm$core$Maybe$Nothing,
			ah: false
		};
	});
var $elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {du: reqs, dG: subs};
	});
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (!cmd.$) {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 1) {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.dJ;
							if (_v4.$ === 1) {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.du));
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.dG)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					dP: r.dP,
					V: r.V,
					aJ: A2(_Http_mapExpect, func, r.aJ),
					y: r.y,
					X: r.X,
					C: r.C,
					dJ: r.dJ,
					O: r.O
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{dP: false, V: r.V, aJ: r.aJ, y: r.y, X: r.X, C: r.C, dJ: r.dJ, O: r.O}));
};
var $elm$http$Http$riskyRequest = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{dP: true, V: r.V, aJ: r.aJ, y: r.y, X: r.X, C: r.C, dJ: r.dJ, O: r.O}));
};
var $author$project$Graphql$Http$convertResult = function (httpResult) {
	if (!httpResult.$) {
		var successOrError = httpResult.a;
		if (!successOrError.$) {
			var value = successOrError.a;
			return $elm$core$Result$Ok(value);
		} else {
			var _v2 = successOrError.a;
			var possiblyParsedData = _v2.a;
			var error = _v2.b;
			return $elm$core$Result$Err(
				A2($author$project$Graphql$Http$GraphqlError, possiblyParsedData, error));
		}
	} else {
		var httpError = httpResult.a;
		return $elm$core$Result$Err(
			$author$project$Graphql$Http$HttpError(httpError));
	}
};
var $author$project$Graphql$Http$BadPayload = function (a) {
	return {$: 4, a: a};
};
var $author$project$Graphql$Http$BadStatus = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $author$project$Graphql$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $author$project$Graphql$Http$NetworkError = {$: 2};
var $author$project$Graphql$Http$Timeout = {$: 1};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $author$project$Graphql$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			function (response) {
				switch (response.$) {
					case 0:
						var url = response.a;
						return $elm$core$Result$Err(
							$author$project$Graphql$Http$BadUrl(url));
					case 1:
						return $elm$core$Result$Err($author$project$Graphql$Http$Timeout);
					case 2:
						return $elm$core$Result$Err($author$project$Graphql$Http$NetworkError);
					case 3:
						var metadata = response.a;
						var body = response.b;
						return $elm$core$Result$Err(
							A2($author$project$Graphql$Http$BadStatus, metadata, body));
					default:
						var metadata = response.a;
						var body = response.b;
						var _v1 = A2($elm$json$Json$Decode$decodeString, decoder, body);
						if (!_v1.$) {
							var value = _v1.a;
							return $elm$core$Result$Ok(value);
						} else {
							var err = _v1.a;
							return $elm$core$Result$Err(
								$author$project$Graphql$Http$BadPayload(err));
						}
				}
			});
	});
var $author$project$Graphql$Http$QueryHelper$Get = 0;
var $author$project$Graphql$Http$QueryHelper$Post = 1;
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $author$project$Graphql$Http$QueryHelper$maxLength = 2000;
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $lukewestby$elm_string_interpolate$String$Interpolate$applyInterpolation = F2(
	function (replacements, _v0) {
		var match = _v0.d7;
		var ordinalString = A2(
			$elm$core$Basics$composeL,
			$elm$core$String$dropLeft(1),
			$elm$core$String$dropRight(1))(match);
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$andThen,
				function (value) {
					return A2($elm$core$Array$get, value, replacements);
				},
				$elm$core$String$toInt(ordinalString)));
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{u: nodeList, o: nodeListSize, s: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {d2: index, d7: match, ej: number, et: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{dR: false, ea: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $lukewestby$elm_string_interpolate$String$Interpolate$interpolationRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('\\{\\d+\\}'));
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $lukewestby$elm_string_interpolate$String$Interpolate$interpolate = F2(
	function (string, args) {
		var asArray = $elm$core$Array$fromList(args);
		return A3(
			$elm$regex$Regex$replace,
			$lukewestby$elm_string_interpolate$String$Interpolate$interpolationRegex,
			$lukewestby$elm_string_interpolate$String$Interpolate$applyInterpolation(asArray),
			string);
	});
var $j_maas$elm_ordered_containers$OrderedDict$OrderedDict = $elm$core$Basics$identity;
var $j_maas$elm_ordered_containers$OrderedDict$empty = {n: $elm$core$Dict$empty, v: _List_Nil};
var $j_maas$elm_ordered_containers$OrderedDict$get = F2(
	function (key, _v0) {
		var orderedDict = _v0;
		return A2($elm$core$Dict$get, key, orderedDict.n);
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $j_maas$elm_ordered_containers$OrderedDict$insert = F3(
	function (key, value, _v0) {
		var orderedDict = _v0;
		var filteredOrder = A2($elm$core$Dict$member, key, orderedDict.n) ? A2(
			$elm$core$List$filter,
			function (k) {
				return !_Utils_eq(k, key);
			},
			orderedDict.v) : orderedDict.v;
		var newOrder = _Utils_ap(
			filteredOrder,
			_List_fromArray(
				[key]));
		return {
			n: A3($elm$core$Dict$insert, key, value, orderedDict.n),
			v: newOrder
		};
	});
var $j_maas$elm_ordered_containers$OrderedDict$remove = F2(
	function (key, _v0) {
		var orderedDict = _v0;
		return {
			n: A2($elm$core$Dict$remove, key, orderedDict.n),
			v: A2($elm$core$Dict$member, key, orderedDict.n) ? A2(
				$elm$core$List$filter,
				function (k) {
					return !_Utils_eq(k, key);
				},
				orderedDict.v) : orderedDict.v
		};
	});
var $j_maas$elm_ordered_containers$OrderedDict$update = F3(
	function (key, alter, original) {
		var orderedDict = original;
		var _v0 = A2($elm$core$Dict$get, key, orderedDict.n);
		if (!_v0.$) {
			var oldItem = _v0.a;
			var _v1 = alter(
				$elm$core$Maybe$Just(oldItem));
			if (!_v1.$) {
				var newItem = _v1.a;
				return {
					n: A3(
						$elm$core$Dict$update,
						key,
						$elm$core$Basics$always(
							$elm$core$Maybe$Just(newItem)),
						orderedDict.n),
					v: orderedDict.v
				};
			} else {
				return A2($j_maas$elm_ordered_containers$OrderedDict$remove, key, original);
			}
		} else {
			var _v2 = alter($elm$core$Maybe$Nothing);
			if (!_v2.$) {
				var newItem = _v2.a;
				return A3($j_maas$elm_ordered_containers$OrderedDict$insert, key, newItem, original);
			} else {
				return original;
			}
		}
	});
var $author$project$Graphql$Document$Field$canAllowHashing = function (rawFields) {
	var fieldCounts = A3(
		$elm$core$List$foldl,
		F2(
			function (fld, acc) {
				return A3(
					$j_maas$elm_ordered_containers$OrderedDict$update,
					fld,
					function (val) {
						return $elm$core$Maybe$Just(
							function () {
								if (val.$ === 1) {
									return 0;
								} else {
									var count = val.a;
									return count + 1;
								}
							}());
					},
					acc);
			}),
		$j_maas$elm_ordered_containers$OrderedDict$empty,
		A2($elm$core$List$map, $author$project$Graphql$RawField$name, rawFields));
	return A2(
		$elm$core$List$map,
		function (field) {
			return _Utils_Tuple2(
				field,
				(!A2(
					$elm$core$Maybe$withDefault,
					0,
					A2(
						$j_maas$elm_ordered_containers$OrderedDict$get,
						$author$project$Graphql$RawField$name(field),
						fieldCounts))) ? $elm$core$Maybe$Nothing : $author$project$Graphql$Document$Field$alias(field));
		},
		rawFields);
};
var $author$project$Graphql$Document$Indent$generate = function (indentationLevel) {
	return A2($elm$core$String$repeat, indentationLevel, '  ');
};
var $author$project$Graphql$Document$Field$mergeFields = function (rawFields) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (field, mergedSoFar) {
				if (!field.$) {
					var newChildren = field.c;
					return A3(
						$j_maas$elm_ordered_containers$OrderedDict$update,
						$author$project$Graphql$Document$Field$hashedAliasName(field),
						function (maybeChildrenSoFar) {
							if (maybeChildrenSoFar.$ === 1) {
								return $elm$core$Maybe$Just(field);
							} else {
								if (!maybeChildrenSoFar.a.$) {
									var _v2 = maybeChildrenSoFar.a;
									var existingFieldName = _v2.a;
									var existingArgs = _v2.b;
									var existingChildren = _v2.c;
									return $elm$core$Maybe$Just(
										A3(
											$author$project$Graphql$RawField$Composite,
											existingFieldName,
											existingArgs,
											_Utils_ap(existingChildren, newChildren)));
								} else {
									return $elm$core$Maybe$Just(field);
								}
							}
						},
						mergedSoFar);
				} else {
					return A3(
						$j_maas$elm_ordered_containers$OrderedDict$update,
						$author$project$Graphql$Document$Field$hashedAliasName(field),
						function (maybeChildrenSoFar) {
							return $elm$core$Maybe$Just(
								A2($elm$core$Maybe$withDefault, field, maybeChildrenSoFar));
						},
						mergedSoFar);
				}
			}),
		$j_maas$elm_ordered_containers$OrderedDict$empty,
		rawFields);
};
var $j_maas$elm_ordered_containers$OrderedDict$values = function (_v0) {
	var orderedDict = _v0;
	return A2(
		$elm$core$List$filterMap,
		function (key) {
			return A2($elm$core$Dict$get, key, orderedDict.n);
		},
		orderedDict.v);
};
var $author$project$Graphql$Document$Field$mergedFields = function (children) {
	return $j_maas$elm_ordered_containers$OrderedDict$values(
		$author$project$Graphql$Document$Field$mergeFields(children));
};
var $author$project$Graphql$RawField$typename = A2(
	$author$project$Graphql$RawField$Leaf,
	{c2: '__typename', ex: ''},
	_List_Nil);
var $author$project$Graphql$Document$Field$nonemptyChildren = function (children) {
	return $elm$core$List$isEmpty(children) ? A2($elm$core$List$cons, $author$project$Graphql$RawField$typename, children) : children;
};
var $author$project$Graphql$Document$Field$serialize = F3(
	function (aliasName, mIndentationLevel, field) {
		var prefix = function () {
			if (!aliasName.$) {
				var aliasName_ = aliasName.a;
				return _Utils_ap(
					aliasName_,
					function () {
						if (!mIndentationLevel.$) {
							return ': ';
						} else {
							return ':';
						}
					}());
			} else {
				return '';
			}
		}();
		return A2(
			$elm$core$Maybe$map,
			function (string) {
				return _Utils_ap(
					$author$project$Graphql$Document$Indent$generate(
						A2($elm$core$Maybe$withDefault, 0, mIndentationLevel)),
					_Utils_ap(prefix, string));
			},
			function () {
				if (!field.$) {
					var fieldName = field.a;
					var args = field.b;
					var children = field.c;
					if (mIndentationLevel.$ === 1) {
						return $elm$core$Maybe$Just(
							(fieldName + ($author$project$Graphql$Document$Argument$serialize(args) + ('{' + A2($author$project$Graphql$Document$Field$serializeChildren, $elm$core$Maybe$Nothing, children)))) + '}');
					} else {
						var indentationLevel = mIndentationLevel.a;
						return $elm$core$Maybe$Just(
							(fieldName + ($author$project$Graphql$Document$Argument$serialize(args) + (' {\n' + A2(
								$author$project$Graphql$Document$Field$serializeChildren,
								$elm$core$Maybe$Just(indentationLevel),
								children)))) + ('\n' + ($author$project$Graphql$Document$Indent$generate(indentationLevel) + '}')));
					}
				} else {
					var fieldName = field.a.c2;
					var args = field.b;
					return $elm$core$Maybe$Just(
						_Utils_ap(
							fieldName,
							$author$project$Graphql$Document$Argument$serialize(args)));
				}
			}());
	});
var $author$project$Graphql$Document$Field$serializeChildren = F2(
	function (indentationLevel, children) {
		return A2(
			$elm$core$String$join,
			function () {
				if (!indentationLevel.$) {
					return '\n';
				} else {
					return ' ';
				}
			}(),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				A2(
					$elm$core$List$map,
					function (_v0) {
						var field = _v0.a;
						var maybeAlias = _v0.b;
						return A3(
							$author$project$Graphql$Document$Field$serialize,
							maybeAlias,
							A2(
								$elm$core$Maybe$map,
								$elm$core$Basics$add(1),
								indentationLevel),
							field);
					},
					$author$project$Graphql$Document$Field$canAllowHashing(
						$author$project$Graphql$Document$Field$nonemptyChildren(
							$author$project$Graphql$Document$Field$mergedFields(children))))));
	});
var $author$project$Graphql$Document$serialize = F2(
	function (operationType, queries) {
		return A2(
			$lukewestby$elm_string_interpolate$String$Interpolate$interpolate,
			'{0} {\n{1}\n}',
			_List_fromArray(
				[
					operationType,
					A2(
					$author$project$Graphql$Document$Field$serializeChildren,
					$elm$core$Maybe$Just(0),
					queries)
				]));
	});
var $author$project$Graphql$Document$serializeQuery = function (_v0) {
	var fields = _v0.a;
	var decoder_ = _v0.b;
	return A2($author$project$Graphql$Document$serialize, 'query', fields);
};
var $author$project$Graphql$Document$serializeQueryForUrl = function (_v0) {
	var fields = _v0.a;
	var decoder_ = _v0.b;
	return '{' + (A2($author$project$Graphql$Document$Field$serializeChildren, $elm$core$Maybe$Nothing, fields) + '}');
};
var $author$project$Graphql$Document$serializeQueryForUrlWithOperationName = F2(
	function (operationName, _v0) {
		var fields = _v0.a;
		var decoder_ = _v0.b;
		return 'query ' + (operationName + (' {' + (A2($author$project$Graphql$Document$Field$serializeChildren, $elm$core$Maybe$Nothing, fields) + '}')));
	});
var $author$project$Graphql$Document$serializeWithOperationName = F3(
	function (operationType, operationName, queries) {
		return A2(
			$lukewestby$elm_string_interpolate$String$Interpolate$interpolate,
			'{0} {1} {\n{2}\n}',
			_List_fromArray(
				[
					operationType,
					operationName,
					A2(
					$author$project$Graphql$Document$Field$serializeChildren,
					$elm$core$Maybe$Just(0),
					queries)
				]));
	});
var $author$project$Graphql$Document$serializeQueryWithOperationName = F2(
	function (operationName, _v0) {
		var fields = _v0.a;
		var decoder_ = _v0.b;
		return A3($author$project$Graphql$Document$serializeWithOperationName, 'query', operationName, fields);
	});
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $author$project$Graphql$Http$QueryParams$replace = F2(
	function (old, _new) {
		return A2(
			$elm$core$Basics$composeR,
			$elm$core$String$split(old),
			$elm$core$String$join(_new));
	});
var $author$project$Graphql$Http$QueryParams$queryEscape = A2(
	$elm$core$Basics$composeR,
	$elm$url$Url$percentEncode,
	A2($author$project$Graphql$Http$QueryParams$replace, '%20', '+'));
var $author$project$Graphql$Http$QueryParams$queryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return $author$project$Graphql$Http$QueryParams$queryEscape(key) + ('=' + $author$project$Graphql$Http$QueryParams$queryEscape(value));
};
var $author$project$Graphql$Http$QueryParams$joinUrlEncoded = function (args) {
	return A2(
		$elm$core$String$join,
		'&',
		A2($elm$core$List$map, $author$project$Graphql$Http$QueryParams$queryPair, args));
};
var $author$project$Graphql$Http$QueryParams$urlWithQueryParams = F2(
	function (queryParams, url) {
		return $elm$core$List$isEmpty(queryParams) ? url : (url + ('?' + $author$project$Graphql$Http$QueryParams$joinUrlEncoded(queryParams)));
	});
var $author$project$Graphql$Http$QueryHelper$build = F5(
	function (forceMethod, url, queryParams, maybeOperationName, queryDocument) {
		var _v0 = function () {
			if (!maybeOperationName.$) {
				var operationName = maybeOperationName.a;
				return _Utils_Tuple2(
					A2($author$project$Graphql$Document$serializeQueryForUrlWithOperationName, operationName, queryDocument),
					_List_fromArray(
						[
							_Utils_Tuple2('operationName', operationName)
						]));
			} else {
				return _Utils_Tuple2(
					$author$project$Graphql$Document$serializeQueryForUrl(queryDocument),
					_List_Nil);
			}
		}();
		var serializedQueryForGetRequest = _v0.a;
		var operationNameParamForGetRequest = _v0.b;
		var urlForGetRequest = A2(
			$author$project$Graphql$Http$QueryParams$urlWithQueryParams,
			_Utils_ap(
				queryParams,
				A2(
					$elm$core$List$cons,
					_Utils_Tuple2('query', serializedQueryForGetRequest),
					operationNameParamForGetRequest)),
			url);
		if (_Utils_eq(
			forceMethod,
			$elm$core$Maybe$Just(1)) || ((_Utils_cmp(
			$elm$core$String$length(urlForGetRequest),
			$author$project$Graphql$Http$QueryHelper$maxLength) > -1) && (!_Utils_eq(
			forceMethod,
			$elm$core$Maybe$Just(0))))) {
			var _v2 = function () {
				if (!maybeOperationName.$) {
					var operationName = maybeOperationName.a;
					return _Utils_Tuple2(
						A2($author$project$Graphql$Document$serializeQueryWithOperationName, operationName, queryDocument),
						_List_fromArray(
							[
								_Utils_Tuple2(
								'operationName',
								$elm$json$Json$Encode$string(operationName))
							]));
				} else {
					return _Utils_Tuple2(
						$author$project$Graphql$Document$serializeQuery(queryDocument),
						_List_Nil);
				}
			}();
			var serializedQuery = _v2.a;
			var operationNameParamForPostRequest = _v2.b;
			return {
				V: $elm$http$Http$jsonBody(
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								'query',
								$elm$json$Json$Encode$string(serializedQuery)),
							operationNameParamForPostRequest))),
				X: 1,
				O: A2($author$project$Graphql$Http$QueryParams$urlWithQueryParams, queryParams, url)
			};
		} else {
			return {V: $elm$http$Http$emptyBody, X: 0, O: urlForGetRequest};
		}
	});
var $author$project$Graphql$Http$GraphqlError$ParsedData = function (a) {
	return {$: 0, a: a};
};
var $author$project$Graphql$Http$GraphqlError$GraphqlError = F3(
	function (message, locations, details) {
		return {cg: details, d6: locations, d8: message};
	});
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $author$project$Graphql$Http$GraphqlError$Location = F2(
	function (line, column) {
		return {dU: column, d5: line};
	});
var $author$project$Graphql$Http$GraphqlError$locationDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Graphql$Http$GraphqlError$Location,
	A2($elm$json$Json$Decode$field, 'line', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'column', $elm$json$Json$Decode$int));
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $author$project$Graphql$Http$GraphqlError$decoder = A2(
	$elm$json$Json$Decode$field,
	'errors',
	$elm$json$Json$Decode$list(
		A4(
			$elm$json$Json$Decode$map3,
			$author$project$Graphql$Http$GraphqlError$GraphqlError,
			A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$maybe(
				A2(
					$elm$json$Json$Decode$field,
					'locations',
					$elm$json$Json$Decode$list($author$project$Graphql$Http$GraphqlError$locationDecoder))),
			A2(
				$elm$json$Json$Decode$map,
				$elm$core$Dict$remove('locations'),
				A2(
					$elm$json$Json$Decode$map,
					$elm$core$Dict$remove('message'),
					$elm$json$Json$Decode$dict($elm$json$Json$Decode$value))))));
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Graphql$Http$decodeErrorWithData = function (data) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Result$Err,
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$Tuple$pair(data),
			$author$project$Graphql$Http$GraphqlError$decoder));
};
var $author$project$Graphql$Http$nullJsonValue = function (a) {
	nullJsonValue:
	while (true) {
		var _v0 = A2($elm$json$Json$Decode$decodeString, $elm$json$Json$Decode$value, 'null');
		if (!_v0.$) {
			var value = _v0.a;
			return value;
		} else {
			var $temp$a = 0;
			a = $temp$a;
			continue nullJsonValue;
		}
	}
};
var $author$project$Graphql$Http$errorDecoder = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$andThen,
				$author$project$Graphql$Http$decodeErrorWithData,
				A2($elm$json$Json$Decode$map, $author$project$Graphql$Http$GraphqlError$ParsedData, decoder)),
				A2(
				$elm$json$Json$Decode$andThen,
				$author$project$Graphql$Http$decodeErrorWithData,
				A2(
					$elm$json$Json$Decode$map,
					$author$project$Graphql$Http$GraphqlError$UnparsedData,
					A2($elm$json$Json$Decode$field, 'data', $elm$json$Json$Decode$value))),
				A2(
				$elm$json$Json$Decode$andThen,
				$author$project$Graphql$Http$decodeErrorWithData,
				$elm$json$Json$Decode$succeed(
					$author$project$Graphql$Http$GraphqlError$UnparsedData(
						$author$project$Graphql$Http$nullJsonValue(0))))
			]));
};
var $author$project$Graphql$Http$decoderOrError = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$author$project$Graphql$Http$errorDecoder(decoder),
				A2($elm$json$Json$Decode$map, $elm$core$Result$Ok, decoder)
			]));
};
var $author$project$Graphql$Document$serializeMutation = function (_v0) {
	var fields = _v0.a;
	var decoder_ = _v0.b;
	return A2($author$project$Graphql$Document$serialize, 'mutation', fields);
};
var $author$project$Graphql$Document$serializeMutationWithOperationName = F2(
	function (operationName, _v0) {
		var fields = _v0.a;
		var decoder_ = _v0.b;
		return A3($author$project$Graphql$Document$serializeWithOperationName, 'mutation', operationName, fields);
	});
var $author$project$Graphql$Http$toReadyRequest = function (_v0) {
	var request = _v0;
	var _v1 = request.cg;
	if (!_v1.$) {
		var forcedRequestMethod = _v1.a;
		var querySelectionSet = _v1.b;
		var queryRequestDetails = A5(
			$author$project$Graphql$Http$QueryHelper$build,
			function () {
				if (!forcedRequestMethod.$) {
					if (!forcedRequestMethod.a) {
						var _v4 = forcedRequestMethod.a;
						return $elm$core$Maybe$Just(0);
					} else {
						var _v5 = forcedRequestMethod.a;
						return $elm$core$Maybe$Nothing;
					}
				} else {
					return $elm$core$Maybe$Just(1);
				}
			}(),
			request.b1,
			request.ad,
			request.ab,
			querySelectionSet);
		return {
			V: queryRequestDetails.V,
			cf: $author$project$Graphql$Http$decoderOrError(request.aJ),
			y: request.y,
			X: function () {
				var _v2 = queryRequestDetails.X;
				if (!_v2) {
					return 'GET';
				} else {
					return 'Post';
				}
			}(),
			C: request.C,
			O: queryRequestDetails.O
		};
	} else {
		var mutationSelectionSet = _v1.a;
		var serializedMutation = function () {
			var _v7 = request.ab;
			if (!_v7.$) {
				var operationName = _v7.a;
				return A2($author$project$Graphql$Document$serializeMutationWithOperationName, operationName, mutationSelectionSet);
			} else {
				return $author$project$Graphql$Document$serializeMutation(mutationSelectionSet);
			}
		}();
		return {
			V: $elm$http$Http$jsonBody(
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$append,
						_List_fromArray(
							[
								_Utils_Tuple2(
								'query',
								$elm$json$Json$Encode$string(serializedMutation))
							]),
						function () {
							var _v6 = request.ab;
							if (!_v6.$) {
								var operationName = _v6.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'operationName',
										$elm$json$Json$Encode$string(operationName))
									]);
							} else {
								return _List_Nil;
							}
						}()))),
			cf: $author$project$Graphql$Http$decoderOrError(request.aJ),
			y: request.y,
			X: 'POST',
			C: request.C,
			O: A2($author$project$Graphql$Http$QueryParams$urlWithQueryParams, request.ad, request.b1)
		};
	}
};
var $author$project$Graphql$Http$toHttpRequestRecord = F2(
	function (resultToMessage, fullRequest) {
		var request = fullRequest;
		return function (readyRequest) {
			return {
				V: readyRequest.V,
				aJ: A2(
					$author$project$Graphql$Http$expectJson,
					A2($elm$core$Basics$composeR, $author$project$Graphql$Http$convertResult, resultToMessage),
					readyRequest.cf),
				y: readyRequest.y,
				X: readyRequest.X,
				C: readyRequest.C,
				dJ: $elm$core$Maybe$Nothing,
				O: readyRequest.O
			};
		}(
			$author$project$Graphql$Http$toReadyRequest(fullRequest));
	});
var $author$project$Graphql$Http$send = F2(
	function (resultToMessage, fullRequest) {
		var request = fullRequest;
		return (request.ah ? $elm$http$Http$riskyRequest : $elm$http$Http$request)(
			A2($author$project$Graphql$Http$toHttpRequestRecord, resultToMessage, fullRequest));
	});
var $author$project$Conjure$sendQuery = function (pat) {
	return A2(
		$elm$core$Basics$composeR,
		$author$project$Graphql$Http$queryRequest(
			A3(
				$elm$url$Url$Builder$crossOrigin,
				'https://api.conjure.so',
				_List_fromArray(
					['graphql']),
				_List_Nil)),
		A2(
			$elm$core$Basics$composeR,
			$author$project$Authorization$addHeaders(pat),
			$author$project$Graphql$Http$send(
				A2(
					$elm$core$Basics$composeR,
					$author$project$Graphql$Http$discardParsedErrorData,
					$elm$core$Result$mapError($author$project$Conjure$errorToString)))));
};
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Measure$sort = $elm$core$List$sortBy(
	function (_v0) {
		var position = _v0.e;
		return position;
	});
var $elm_community$maybe_extra$Maybe$Extra$cons = F2(
	function (item, list) {
		if (!item.$) {
			var v = item.a;
			return A2($elm$core$List$cons, v, list);
		} else {
			return list;
		}
	});
var $elm_community$maybe_extra$Maybe$Extra$values = A2($elm$core$List$foldr, $elm_community$maybe_extra$Maybe$Extra$cons, _List_Nil);
var $author$project$Conjure$getMeasures = F2(
	function (pat, msg) {
		return A2(
			$elm$core$Platform$Cmd$map,
			A2(
				$elm$core$Basics$composeL,
				msg,
				$elm$core$Result$map($author$project$Measure$sort)),
			A2(
				$author$project$Conjure$sendQuery,
				pat,
				A2(
					$author$project$Graphql$SelectionSet$map,
					$elm_community$maybe_extra$Maybe$Extra$values,
					A2($author$project$Conjure$Query$measures, $elm$core$Basics$identity, $author$project$Measure$selectionSet))));
	});
var $author$project$Bin$Run$init = function (flags) {
	var flagsDecoder = A3(
		$elm$json$Json$Decode$map2,
		F2(
			function (categories, settings) {
				return {U: categories, A: settings};
			}),
		A2(
			$elm$json$Json$Decode$field,
			'categories',
			A2(
				$elm$json$Json$Decode$field,
				'categories',
				$langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$decodeArray($author$project$Category$decoder))),
		A2($elm$json$Json$Decode$field, 'settings', $author$project$Settings$decoder));
	var _v0 = A2($elm$json$Json$Decode$decodeValue, flagsDecoder, flags);
	if (!_v0.$) {
		var categories = _v0.a.U;
		var settings = _v0.a.A;
		var decodeLinks = function (ms) {
			return A2(
				$elm$core$Result$mapError,
				$elm$json$Json$Decode$errorToString,
				function (d) {
					return A2($elm$json$Json$Decode$decodeValue, d, flags);
				}(
					A2(
						$elm$json$Json$Decode$field,
						'links',
						$langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$decodeArray(
							A2($author$project$Link$decoder, categories, ms)))));
		};
		return _Utils_Tuple2(
			$author$project$Bin$Run$LoadingMeasures(
				{U: categories, cZ: decodeLinks, A: settings}),
			A2($author$project$Conjure$getMeasures, settings.ek, $author$project$Bin$Run$GotKnownMeasures));
	} else {
		var e = _v0.a;
		return _Utils_Tuple2(
			$author$project$Bin$Run$Exit,
			$author$project$Log$error(
				A2(
					$elm$core$String$join,
					'\n',
					_List_fromArray(
						[
							'Flags failed to parse with the following error:',
							$elm$json$Json$Decode$errorToString(e)
						]))));
	}
};
var $author$project$Bin$Run$GotQueryResults = function (a) {
	return {$: 3, a: a};
};
var $author$project$Bin$Run$Tick = function (a) {
	return {$: 5, a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {dr: processes, dH: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 1) {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.dr;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.dH);
		if (_v0.$ === 1) {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Event$Event = $elm$core$Basics$identity;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$map5 = _Json_map5;
var $author$project$Event$decoder = function (cs) {
	return A6(
		$elm$json$Json$Decode$map5,
		F5(
			function (category, app, title, duration, startTime) {
				return {cq: app, b2: category, aF: duration, cp: startTime, M: title};
			}),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['data', '$category']),
			$author$project$Category$nameDecoder(cs)),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['data', 'app']),
			$elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['data', 'title']),
			$elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'duration', $elm$json$Json$Decode$float),
		A2($elm$json$Json$Decode$field, 'timestamp', $rtfeldman$elm_iso8601_date_strings$Iso8601$decoder));
};
var $author$project$Period$Period = $elm$core$Basics$identity;
var $author$project$Period$decoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (s, e) {
			return {
				b6: $elm$time$Time$millisToPosix(e),
				by: $elm$time$Time$millisToPosix(s)
			};
		}),
	A2($elm$json$Json$Decode$field, 'start', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'end', $elm$json$Json$Decode$int));
var $author$project$Query$gotQuery = _Platform_incomingPort('gotQuery', $elm$json$Json$Decode$value);
var $author$project$Query$sub = F2(
	function (categories, msg) {
		var eventsDecoder = A3(
			$elm$json$Json$Decode$map2,
			$elm$core$Tuple$pair,
			A2($elm$json$Json$Decode$field, 'period', $author$project$Period$decoder),
			A2(
				$elm$json$Json$Decode$field,
				'events',
				$elm$json$Json$Decode$list(
					$author$project$Event$decoder(categories))));
		var decoder = A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (events, timeSubmitted) {
					return {dZ: events, cL: timeSubmitted};
				}),
			A2(
				$elm$json$Json$Decode$field,
				'eventsByPeriod',
				$langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$decodeArray(eventsDecoder)),
			A2(
				$elm$json$Json$Decode$field,
				'timeSubmitted',
				A2($elm$json$Json$Decode$map, $elm$time$Time$millisToPosix, $elm$json$Json$Decode$int)));
		return $author$project$Query$gotQuery(
			A2(
				$elm$core$Basics$composeR,
				$elm$json$Json$Decode$decodeValue(decoder),
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Result$mapError($elm$json$Json$Decode$errorToString),
					msg)));
	});
var $author$project$Bin$Run$subscriptions = function (m) {
	switch (m.$) {
		case 0:
			return $elm$core$Platform$Sub$none;
		case 1:
			var r = m.a;
			return $elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						A2($author$project$Query$sub, r.U, $author$project$Bin$Run$GotQueryResults),
						(!_Utils_eq(r.W, $elm$core$Maybe$Nothing)) ? A2($elm$time$Time$every, 60000, $author$project$Bin$Run$Tick) : $elm$core$Platform$Sub$none
					]));
		default:
			return $elm$core$Platform$Sub$none;
	}
};
var $author$project$Bin$Run$Running = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Bin$Run$GotMeasurementWriteResults = function (a) {
	return {$: 2, a: a};
};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $mgold$elm_nonempty_list$List$Nonempty$member = F2(
	function (y, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return _Utils_eq(x, y) || A2($elm$core$List$member, y, xs);
	});
var $author$project$Event$isInCategories = function (_v0) {
	var category = _v0.b2;
	return $mgold$elm_nonempty_list$List$Nonempty$member(category);
};
var $author$project$Link$assign = F2(
	function (ms, e) {
		return A2(
			$langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$find,
			function (_v0) {
				var from = _v0.c6;
				return A2($author$project$Event$isInCategories, e, from);
			},
			ms);
	});
var $author$project$Link$gatherByKey = function (list) {
	var go = F2(
		function (l, acc) {
			go:
			while (true) {
				if (!l.b) {
					return $elm$core$List$reverse(acc);
				} else {
					var _v1 = l.a;
					var k = _v1.a;
					var v = _v1.b;
					var xs = l.b;
					var step = F2(
						function (x, _v3) {
							var k_ = x.a;
							var v_ = x.b;
							var same = _v3.a;
							var diff = _v3.b;
							return _Utils_eq(k, k_) ? _Utils_Tuple2(
								A2($elm$core$List$cons, v_, same),
								diff) : _Utils_Tuple2(
								same,
								A2($elm$core$List$cons, x, diff));
						});
					var _v2 = A3(
						$elm$core$List$foldr,
						step,
						_Utils_Tuple2(_List_Nil, _List_Nil),
						xs);
					var gathered = _v2.a;
					var remaining = _v2.b;
					var $temp$l = remaining,
						$temp$acc = A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							k,
							A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, v, gathered)),
						acc);
					l = $temp$l;
					acc = $temp$acc;
					continue go;
				}
			}
		});
	return A2(go, list, _List_Nil);
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $author$project$Link$partitionMap = function (f) {
	var step = F2(
		function (x, _v1) {
			var succeeded = _v1.a;
			var failed = _v1.b;
			var _v0 = f(x);
			if (!_v0.$) {
				var fx = _v0.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, fx, succeeded),
					failed);
			} else {
				return _Utils_Tuple2(
					succeeded,
					A2($elm$core$List$cons, x, failed));
			}
		});
	return A2(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil));
};
var $author$project$Link$assignEvents = F2(
	function (ms, es) {
		return A2(
			$elm$core$Tuple$mapFirst,
			$author$project$Link$gatherByKey,
			A2(
				$author$project$Link$partitionMap,
				function (e) {
					return A2(
						$elm$core$Maybe$map,
						function (m) {
							return _Utils_Tuple2(m, e);
						},
						A2($author$project$Link$assign, ms, e));
				},
				$mgold$elm_nonempty_list$List$Nonempty$toList(es)));
	});
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $mgold$elm_nonempty_list$List$Nonempty$fromList = function (ys) {
	if (ys.b) {
		var x = ys.a;
		var xs = ys.b;
		return $elm$core$Maybe$Just(
			A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Log$info = function (s) {
	return $author$project$Log$log(
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'info',
					$elm$json$Json$Encode$string(s))
				])));
};
var $author$project$Event$isRelevant = function (_v0) {
	var duration = _v0.aF;
	return duration > 0;
};
var $mgold$elm_nonempty_list$List$Nonempty$map = F2(
	function (f, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			f(x),
			A2($elm$core$List$map, f, xs));
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$sortWith = _List_sortWith;
var $author$project$Event$sortByDuration = function () {
	var decreasingDuration = F2(
		function (_v0, _v1) {
			var e1 = _v0;
			var e2 = _v1;
			return A2($elm$core$Basics$compare, e2.aF, e1.aF);
		});
	return $elm$core$List$sortWith(decreasingDuration);
}();
var $author$project$Link$to = function (_v0) {
	var l = _v0;
	return l.dI;
};
var $author$project$Event$viewAppAndTitle = function (_v0) {
	var app = _v0.cq;
	var title = _v0.M;
	return app + (' -- ' + title);
};
var $author$project$Event$viewDetails = function (e) {
	var duration = e.aF;
	var category = e.b2;
	var durationInMinutes = function () {
		var intDuration = $elm$core$Basics$ceiling(duration);
		var sec = intDuration % 60;
		return $elm$core$String$concat(
			_List_fromArray(
				[
					$elm$core$String$fromInt((intDuration / 60) | 0),
					':',
					(sec >= 10) ? $elm$core$String$fromInt(sec) : ((sec > 0) ? ('0' + $elm$core$String$fromInt(sec)) : '00')
				]));
	}();
	return $elm$core$String$concat(
		_List_fromArray(
			[
				$author$project$Category$nameToString(category),
				' (',
				durationInMinutes,
				'): ',
				$author$project$Event$viewAppAndTitle(e)
			]));
};
var $author$project$Graphql$OptionalArgument$Present = function (a) {
	return {$: 0, a: a};
};
var $author$project$Conjure$InputObject$buildMeasurementBatchOperationCreateOrUpdateItemMatchItemV2Attributes = F2(
	function (required____, fillOptionals____) {
		var optionals____ = fillOptionals____(
			{cy: $author$project$Graphql$OptionalArgument$Absent});
		return {cO: required____.cO, cy: optionals____.cy, eA: required____.eA};
	});
var $author$project$Conjure$InputObject$buildMeasurementBatchOperationCreateOrUpdateItemV2Attributes = function (required____) {
	return {cQ: required____.cQ, d7: required____.d7, dj: required____.dj};
};
var $author$project$Conjure$InputObject$buildMeasurementBatchOperationsV2MutationInput = function (fillOptionals____) {
	var optionals____ = fillOptionals____(
		{cU: $author$project$Graphql$OptionalArgument$Absent, dW: $author$project$Graphql$OptionalArgument$Absent, dX: $author$project$Graphql$OptionalArgument$Absent});
	return {cU: optionals____.cU, dW: optionals____.dW, dX: optionals____.dX};
};
var $author$project$Conjure$clientMutationId = 'aw-conjure-integration';
var $mgold$elm_nonempty_list$List$Nonempty$head = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return x;
};
var $mgold$elm_nonempty_list$List$Nonempty$tail = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return xs;
};
var $mgold$elm_nonempty_list$List$Nonempty$concat = function (_v0) {
	var xs = _v0.a;
	var xss = _v0.b;
	var tl = _Utils_ap(
		$mgold$elm_nonempty_list$List$Nonempty$tail(xs),
		$elm$core$List$concat(
			A2($elm$core$List$map, $mgold$elm_nonempty_list$List$Nonempty$toList, xss)));
	var hd = $mgold$elm_nonempty_list$List$Nonempty$head(xs);
	return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, hd, tl);
};
var $mgold$elm_nonempty_list$List$Nonempty$concatMap = F2(
	function (f, xs) {
		return $mgold$elm_nonempty_list$List$Nonempty$concat(
			A2($mgold$elm_nonempty_list$List$Nonempty$map, f, xs));
	});
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $author$project$Conjure$Object$MeasurementBatchOperationsV2MutationPayload$errorMessage = A4(
	$author$project$Graphql$Internal$Builder$Object$selectionForField,
	'(Maybe String)',
	'errorMessage',
	_List_Nil,
	$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string));
var $author$project$Graphql$SelectionSet$map2 = F3(
	function (combine, _v0, _v1) {
		var selectionFields1 = _v0.a;
		var selectionDecoder1 = _v0.b;
		var selectionFields2 = _v1.a;
		var selectionDecoder2 = _v1.b;
		return A2(
			$author$project$Graphql$SelectionSet$SelectionSet,
			_Utils_ap(selectionFields1, selectionFields2),
			A3($elm$json$Json$Decode$map2, combine, selectionDecoder1, selectionDecoder2));
	});
var $author$project$Graphql$Internal$Encode$maybeObject = function (maybeValues) {
	return $author$project$Graphql$Internal$Encode$Object(
		A2(
			$elm$core$List$filterMap,
			function (_v0) {
				var key = _v0.a;
				var value = _v0.b;
				return A2(
					$elm$core$Maybe$andThen,
					function (actualValue) {
						return $elm$core$Maybe$Just(
							_Utils_Tuple2(key, actualValue));
					},
					value);
			},
			maybeValues));
};
var $author$project$Graphql$Internal$Encode$optional = F2(
	function (optionalValue, toValue) {
		switch (optionalValue.$) {
			case 0:
				var value = optionalValue.a;
				return $elm$core$Maybe$Just(
					toValue(value));
			case 1:
				return $elm$core$Maybe$Nothing;
			default:
				return $elm$core$Maybe$Just($author$project$Graphql$Internal$Encode$null);
		}
	});
var $author$project$Conjure$InputObject$encodeMeasurementableMetaItemAttributes = function (input____) {
	return $author$project$Graphql$Internal$Encode$maybeObject(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'key',
				A2($author$project$Graphql$Internal$Encode$optional, input____.cy, $author$project$Graphql$Internal$Encode$string)),
				_Utils_Tuple2(
				'value',
				A2($author$project$Graphql$Internal$Encode$optional, input____.eA, $author$project$Graphql$Internal$Encode$string))
			]));
};
var $author$project$Graphql$Internal$Encode$list = F2(
	function (toValue, value) {
		return $author$project$Graphql$Internal$Encode$List(
			A2($elm$core$List$map, toValue, value));
	});
var $author$project$Conjure$InputObject$encodeMeasurementAttributes = function (input____) {
	return $author$project$Graphql$Internal$Encode$maybeObject(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'comment',
				A2($author$project$Graphql$Internal$Encode$optional, input____.az, $author$project$Graphql$Internal$Encode$string)),
				_Utils_Tuple2(
				'timestamp',
				A2(
					$author$project$Graphql$Internal$Encode$optional,
					input____.bB,
					A2(
						$author$project$Conjure$Scalar$unwrapEncoder,
						function ($) {
							return $.Z;
						},
						$author$project$CustomScalarCodecs$codecs))),
				_Utils_Tuple2(
				'values',
				A2(
					$author$project$Graphql$Internal$Encode$optional,
					input____.eB,
					A2(
						$author$project$Conjure$Scalar$unwrapEncoder,
						function ($) {
							return $._;
						},
						$author$project$CustomScalarCodecs$codecs))),
				_Utils_Tuple2(
				'meta',
				A2(
					$author$project$Graphql$Internal$Encode$optional,
					input____.a5,
					$author$project$Graphql$Internal$Encode$list($author$project$Conjure$InputObject$encodeMeasurementableMetaItemAttributes)))
			]));
};
var $author$project$Conjure$InputObject$encodeMeasurementBatchOperationCreateOrUpdateItemMatchItemV2Attributes = function (input____) {
	return $author$project$Graphql$Internal$Encode$maybeObject(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'attribute',
				$elm$core$Maybe$Just(
					$author$project$Graphql$Internal$Encode$string(input____.cO))),
				_Utils_Tuple2(
				'key',
				A2($author$project$Graphql$Internal$Encode$optional, input____.cy, $author$project$Graphql$Internal$Encode$string)),
				_Utils_Tuple2(
				'value',
				$elm$core$Maybe$Just(
					$author$project$Graphql$Internal$Encode$string(input____.eA)))
			]));
};
var $author$project$Conjure$InputObject$encodeMeasurementBatchOperationCreateOrUpdateItemV2Attributes = function (input____) {
	return $author$project$Graphql$Internal$Encode$maybeObject(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'measureId',
				$elm$core$Maybe$Just(
					A2(
						$author$project$Conjure$Scalar$unwrapEncoder,
						function ($) {
							return $.b;
						},
						$author$project$CustomScalarCodecs$codecs)(input____.dj))),
				_Utils_Tuple2(
				'match',
				$elm$core$Maybe$Just(
					$author$project$Graphql$Internal$Encode$list($author$project$Conjure$InputObject$encodeMeasurementBatchOperationCreateOrUpdateItemMatchItemV2Attributes)(input____.d7))),
				_Utils_Tuple2(
				'attributes',
				$elm$core$Maybe$Just(
					$author$project$Conjure$InputObject$encodeMeasurementAttributes(input____.cQ)))
			]));
};
var $author$project$Conjure$InputObject$encodeMeasurementBatchOperationDestroyItemV2Attributes = function (input____) {
	return $author$project$Graphql$Internal$Encode$maybeObject(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'measureId',
				$elm$core$Maybe$Just(
					A2(
						$author$project$Conjure$Scalar$unwrapEncoder,
						function ($) {
							return $.b;
						},
						$author$project$CustomScalarCodecs$codecs)(input____.dj))),
				_Utils_Tuple2(
				'attribute',
				$elm$core$Maybe$Just(
					$author$project$Graphql$Internal$Encode$string(input____.cO))),
				_Utils_Tuple2(
				'key',
				A2($author$project$Graphql$Internal$Encode$optional, input____.cy, $author$project$Graphql$Internal$Encode$string)),
				_Utils_Tuple2(
				'values',
				$elm$core$Maybe$Just(
					$author$project$Graphql$Internal$Encode$list($author$project$Graphql$Internal$Encode$string)(input____.eB)))
			]));
};
var $author$project$Conjure$InputObject$encodeMeasurementBatchOperationsV2MutationInput = function (input____) {
	return $author$project$Graphql$Internal$Encode$maybeObject(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'createOrUpdate',
				A2(
					$author$project$Graphql$Internal$Encode$optional,
					input____.dW,
					$author$project$Graphql$Internal$Encode$list($author$project$Conjure$InputObject$encodeMeasurementBatchOperationCreateOrUpdateItemV2Attributes))),
				_Utils_Tuple2(
				'destroy',
				A2(
					$author$project$Graphql$Internal$Encode$optional,
					input____.dX,
					$author$project$Graphql$Internal$Encode$list($author$project$Conjure$InputObject$encodeMeasurementBatchOperationDestroyItemV2Attributes))),
				_Utils_Tuple2(
				'clientMutationId',
				A2($author$project$Graphql$Internal$Encode$optional, input____.cU, $author$project$Graphql$Internal$Encode$string))
			]));
};
var $author$project$Graphql$Internal$Builder$Argument$required = F3(
	function (fieldName, raw, encode) {
		return A2(
			$author$project$Graphql$Internal$Builder$Argument$Argument,
			fieldName,
			encode(raw));
	});
var $author$project$Conjure$Mutation$measurementBatchOperationsV2 = F2(
	function (requiredArgs____, object____) {
		return A4(
			$author$project$Graphql$Internal$Builder$Object$selectionForCompositeField,
			'measurementBatchOperationsV2',
			_List_fromArray(
				[
					A3($author$project$Graphql$Internal$Builder$Argument$required, 'input', requiredArgs____.de, $author$project$Conjure$InputObject$encodeMeasurementBatchOperationsV2MutationInput)
				]),
			object____,
			A2($elm$core$Basics$composeR, $elm$core$Basics$identity, $elm$json$Json$Decode$nullable));
	});
var $author$project$Conjure$Object$MeasurementBatchOperationsV2MutationPayload$success = A4($author$project$Graphql$Internal$Builder$Object$selectionForField, 'Bool', 'success', _List_Nil, $elm$json$Json$Decode$bool);
var $author$project$Event$binKey = 'aw-conjure-integration-era';
var $author$project$Period$Era = $elm$core$Basics$identity;
var $justinmimbs$time_extra$Time$Extra$Hour = 12;
var $justinmimbs$date$Date$Day = 11;
var $justinmimbs$date$Date$Friday = 8;
var $justinmimbs$date$Date$Monday = 4;
var $justinmimbs$date$Date$Month = 2;
var $justinmimbs$date$Date$Quarter = 1;
var $justinmimbs$date$Date$Saturday = 9;
var $justinmimbs$date$Date$Sunday = 10;
var $justinmimbs$date$Date$Thursday = 7;
var $justinmimbs$date$Date$Tuesday = 5;
var $justinmimbs$date$Date$Wednesday = 6;
var $justinmimbs$date$Date$Week = 3;
var $justinmimbs$date$Date$Year = 0;
var $elm$time$Time$Fri = 4;
var $elm$time$Time$Mon = 0;
var $justinmimbs$date$Date$RD = $elm$core$Basics$identity;
var $elm$time$Time$Sat = 5;
var $elm$time$Time$Sun = 6;
var $elm$time$Time$Thu = 3;
var $elm$time$Time$Tue = 1;
var $elm$time$Time$Wed = 2;
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$weekdayToNumber = function (wd) {
	switch (wd) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		default:
			return 7;
	}
};
var $justinmimbs$date$Date$daysSincePreviousWeekday = F2(
	function (wd, date) {
		return A2(
			$elm$core$Basics$modBy,
			7,
			($justinmimbs$date$Date$weekdayNumber(date) + 7) - $justinmimbs$date$Date$weekdayToNumber(wd));
	});
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m) {
			case 0:
				return 0;
			case 1:
				return 31;
			case 2:
				return 59 + leapDays;
			case 3:
				return 90 + leapDays;
			case 4:
				return 120 + leapDays;
			case 5:
				return 151 + leapDays;
			case 6:
				return 181 + leapDays;
			case 7:
				return 212 + leapDays;
			case 8:
				return 243 + leapDays;
			case 9:
				return 273 + leapDays;
			case 10:
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$firstOfMonth = F2(
	function (y, m) {
		return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + 1;
	});
var $justinmimbs$date$Date$firstOfYear = function (y) {
	return $justinmimbs$date$Date$daysBeforeYear(y) + 1;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m) {
			case 0:
				return 31;
			case 1:
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		case 7:
			return 6;
		case 8:
			return 7;
		case 9:
			return 8;
		case 10:
			return 9;
		case 11:
			return 10;
		default:
			return 11;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {cY: d, dk: m, dN: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0;
	var y = $justinmimbs$date$Date$year(rd);
	return {
		cE: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		dN: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0;
	var date = $justinmimbs$date$Date$toOrdinalDate(rd);
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.dN, 0, date.cE);
};
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.dk;
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $justinmimbs$date$Date$quarterToMonth = function (q) {
	return $justinmimbs$date$Date$numberToMonth((q * 3) - 2);
};
var $justinmimbs$date$Date$floor = F2(
	function (interval, date) {
		var rd = date;
		switch (interval) {
			case 0:
				return $justinmimbs$date$Date$firstOfYear(
					$justinmimbs$date$Date$year(date));
			case 1:
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$quarterToMonth(
						$justinmimbs$date$Date$quarter(date)));
			case 2:
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$month(date));
			case 3:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 0, date);
			case 4:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 0, date);
			case 5:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 1, date);
			case 6:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 2, date);
			case 7:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 3, date);
			case 8:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 4, date);
			case 9:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 5, date);
			case 10:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 6, date);
			default:
				return date;
		}
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
			$elm$core$Basics$clamp,
			1,
			A2($justinmimbs$date$Date$daysInMonth, y, m),
			d);
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0;
	return rd;
};
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $justinmimbs$time_extra$Time$Extra$posixFromDateTime = F3(
	function (zone, date, time) {
		var millis = $justinmimbs$time_extra$Time$Extra$dateToMillis(date) + time;
		var offset0 = A2(
			$justinmimbs$time_extra$Time$Extra$toOffset,
			zone,
			$elm$time$Time$millisToPosix(millis));
		var posix1 = $elm$time$Time$millisToPosix(millis - (offset0 * 60000));
		var offset1 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix1);
		if (_Utils_eq(offset0, offset1)) {
			return posix1;
		} else {
			var posix2 = $elm$time$Time$millisToPosix(millis - (offset1 * 60000));
			var offset2 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix2);
			return _Utils_eq(offset1, offset2) ? posix2 : posix1;
		}
	});
var $justinmimbs$time_extra$Time$Extra$floorDate = F3(
	function (dateInterval, zone, posix) {
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A2(
				$justinmimbs$date$Date$floor,
				dateInterval,
				A2($justinmimbs$date$Date$fromPosix, zone, posix)),
			0);
	});
var $justinmimbs$time_extra$Time$Extra$floor = F3(
	function (interval, zone, posix) {
		switch (interval) {
			case 15:
				return posix;
			case 14:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						A2($elm$time$Time$toSecond, zone, posix),
						0));
			case 13:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						0,
						0));
			case 12:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						0,
						0,
						0));
			case 11:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 11, zone, posix);
			case 2:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 2, zone, posix);
			case 0:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 0, zone, posix);
			case 1:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 1, zone, posix);
			case 3:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 3, zone, posix);
			case 4:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 4, zone, posix);
			case 5:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 5, zone, posix);
			case 6:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 6, zone, posix);
			case 7:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 7, zone, posix);
			case 8:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 8, zone, posix);
			case 9:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 9, zone, posix);
			default:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 10, zone, posix);
		}
	});
var $author$project$Period$era = function (t) {
	return A3($justinmimbs$time_extra$Time$Extra$floor, 12, $elm$time$Time$utc, t);
};
var $author$project$Period$eraToString = function (_v0) {
	var t = _v0;
	return $rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(t);
};
var $author$project$Event$binVal = function (_v0) {
	var startTime = _v0.cp;
	return $author$project$Period$eraToString(
		$author$project$Period$era(startTime));
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $author$project$Conjure$InputObject$buildMeasurementAttributes = function (fillOptionals____) {
	var optionals____ = fillOptionals____(
		{az: $author$project$Graphql$OptionalArgument$Absent, a5: $author$project$Graphql$OptionalArgument$Absent, bB: $author$project$Graphql$OptionalArgument$Absent, eB: $author$project$Graphql$OptionalArgument$Absent});
	return {az: optionals____.az, a5: optionals____.a5, bB: optionals____.bB, eB: optionals____.eB};
};
var $author$project$Conjure$InputObject$buildMeasurementableMetaItemAttributes = function (fillOptionals____) {
	var optionals____ = fillOptionals____(
		{cy: $author$project$Graphql$OptionalArgument$Absent, eA: $author$project$Graphql$OptionalArgument$Absent});
	return {cy: optionals____.cy, eA: optionals____.eA};
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Event$uniqueKey = 'aw-conjure-integration-event-id';
var $robinheghan$fnv1a$FNV1a$hasher = F2(
	function (_byte, hashValue) {
		var mixed = _byte ^ hashValue;
		return ((((mixed + (mixed << 1)) + (mixed << 4)) + (mixed << 7)) + (mixed << 8)) + (mixed << 24);
	});
var $robinheghan$fnv1a$FNV1a$utf32ToUtf8 = F2(
	function (_char, acc) {
		var _byte = $elm$core$Char$toCode(_char);
		return (_byte < 128) ? A2($robinheghan$fnv1a$FNV1a$hasher, _byte, acc) : ((_byte < 2048) ? A2(
			$robinheghan$fnv1a$FNV1a$hasher,
			128 | (63 & _byte),
			A2($robinheghan$fnv1a$FNV1a$hasher, 192 | (_byte >>> 6), acc)) : ((_byte < 65536) ? A2(
			$robinheghan$fnv1a$FNV1a$hasher,
			128 | (63 & _byte),
			A2(
				$robinheghan$fnv1a$FNV1a$hasher,
				128 | (63 & (_byte >>> 6)),
				A2($robinheghan$fnv1a$FNV1a$hasher, 224 | (_byte >>> 12), acc))) : A2(
			$robinheghan$fnv1a$FNV1a$hasher,
			128 | (63 & _byte),
			A2(
				$robinheghan$fnv1a$FNV1a$hasher,
				128 | (63 & (_byte >>> 6)),
				A2(
					$robinheghan$fnv1a$FNV1a$hasher,
					128 | (63 & (_byte >>> 12)),
					A2($robinheghan$fnv1a$FNV1a$hasher, 240 | (_byte >>> 18), acc))))));
	});
var $robinheghan$fnv1a$FNV1a$hashWithSeed = F2(
	function (str, seed) {
		return A3($elm$core$String$foldl, $robinheghan$fnv1a$FNV1a$utf32ToUtf8, seed, str) >>> 0;
	});
var $author$project$Event$uniqueVal = F2(
	function (groupBy, _v0) {
		var app = _v0.cq;
		var title = _v0.M;
		var startTime = _v0.cp;
		var category = _v0.b2;
		var magicNumberDonutSteal = 24117;
		return $elm$core$String$concat(
			_List_fromArray(
				[
					function () {
					if (!groupBy) {
						return $elm$core$String$fromInt(
							A2(
								$robinheghan$fnv1a$FNV1a$hashWithSeed,
								$author$project$Category$nameToString(category),
								magicNumberDonutSteal));
					} else {
						return $elm$core$String$fromInt(
							A2(
								$robinheghan$fnv1a$FNV1a$hashWithSeed,
								title,
								A2($robinheghan$fnv1a$FNV1a$hashWithSeed, app, magicNumberDonutSteal)));
					}
				}(),
					' - ',
					$rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(startTime)
				]));
	});
var $author$project$Event$toMeasurement = F2(
	function (groupBy, e) {
		var startTime = e.cp;
		var duration = e.aF;
		var category = e.b2;
		var uniqueKeyVal = {
			cy: $author$project$Event$uniqueKey,
			ez: A2($author$project$Event$uniqueVal, groupBy, e)
		};
		return {
			cQ: $author$project$Conjure$InputObject$buildMeasurementAttributes(
				function (r) {
					return _Utils_update(
						r,
						{
							az: $author$project$Graphql$OptionalArgument$Present(
								function () {
									if (!groupBy) {
										return $author$project$Category$nameToString(category);
									} else {
										return $author$project$Event$viewAppAndTitle(e);
									}
								}()),
							a5: $author$project$Graphql$OptionalArgument$Present(
								_List_fromArray(
									[
										$author$project$Conjure$InputObject$buildMeasurementableMetaItemAttributes(
										function (r_) {
											return _Utils_update(
												r_,
												{
													cy: $author$project$Graphql$OptionalArgument$Present(uniqueKeyVal.cy),
													eA: $author$project$Graphql$OptionalArgument$Present(uniqueKeyVal.ez)
												});
										}),
										$author$project$Conjure$InputObject$buildMeasurementableMetaItemAttributes(
										function (r_) {
											return _Utils_update(
												r_,
												{
													cy: $author$project$Graphql$OptionalArgument$Present($author$project$Event$binKey),
													eA: $author$project$Graphql$OptionalArgument$Present(
														$author$project$Event$binVal(e))
												});
										})
									])),
							bB: $author$project$Graphql$OptionalArgument$Present(startTime),
							eB: $author$project$Graphql$OptionalArgument$Present(
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'duration',
											$elm$json$Json$Encode$int(
												$elm$core$Basics$ceiling(duration))),
											_Utils_Tuple2(
											'active',
											$elm$json$Json$Encode$bool(false))
										])))
						});
				}),
			cy: uniqueKeyVal.cy,
			ez: uniqueKeyVal.ez
		};
	});
var $author$project$Conjure$measurementWrite = F2(
	function (groupBy, allEvents) {
		var allUpdates = $mgold$elm_nonempty_list$List$Nonempty$toList(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$concatMap,
				function (_v0) {
					var m = _v0.a;
					var es = _v0.b;
					var measureId = $author$project$Measure$getId(m);
					return A2(
						$mgold$elm_nonempty_list$List$Nonempty$map,
						function (e) {
							var _v1 = A2($author$project$Event$toMeasurement, groupBy, e);
							var attributes = _v1.cQ;
							var key = _v1.cy;
							var val = _v1.ez;
							return $author$project$Conjure$InputObject$buildMeasurementBatchOperationCreateOrUpdateItemV2Attributes(
								{
									cQ: attributes,
									d7: _List_fromArray(
										[
											A2(
											$author$project$Conjure$InputObject$buildMeasurementBatchOperationCreateOrUpdateItemMatchItemV2Attributes,
											{cO: 'meta', eA: val},
											function (r) {
												return _Utils_update(
													r,
													{
														cy: $author$project$Graphql$OptionalArgument$Present(key)
													});
											})
										]),
									dj: measureId
								});
						},
						es);
				},
				allEvents));
		return A2(
			$author$project$Conjure$Mutation$measurementBatchOperationsV2,
			{
				de: $author$project$Conjure$InputObject$buildMeasurementBatchOperationsV2MutationInput(
					function (r) {
						return _Utils_update(
							r,
							{
								cU: $author$project$Graphql$OptionalArgument$Present($author$project$Conjure$clientMutationId),
								dW: $author$project$Graphql$OptionalArgument$Present(allUpdates)
							});
					})
			},
			A3(
				$author$project$Graphql$SelectionSet$map2,
				F2(
					function (error, success) {
						return {cu: error, cJ: success};
					}),
				$author$project$Conjure$Object$MeasurementBatchOperationsV2MutationPayload$errorMessage,
				$author$project$Conjure$Object$MeasurementBatchOperationsV2MutationPayload$success));
	});
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $author$project$Graphql$Http$Mutation = function (a) {
	return {$: 1, a: a};
};
var $author$project$Graphql$Http$mutationRequest = F2(
	function (baseUrl, mutationSelectionSet) {
		return {
			b1: baseUrl,
			cg: $author$project$Graphql$Http$Mutation(mutationSelectionSet),
			aJ: $author$project$Graphql$Document$decoder(mutationSelectionSet),
			y: _List_Nil,
			ab: $elm$core$Maybe$Nothing,
			ad: _List_Nil,
			C: $elm$core$Maybe$Nothing,
			ah: false
		};
	});
var $author$project$Conjure$sendMutation = function (pat) {
	return A2(
		$elm$core$Basics$composeR,
		$author$project$Graphql$Http$mutationRequest(
			A3(
				$elm$url$Url$Builder$crossOrigin,
				'https://api.conjure.so',
				_List_fromArray(
					['graphql']),
				_List_Nil)),
		A2(
			$elm$core$Basics$composeR,
			$author$project$Authorization$addHeaders(pat),
			$author$project$Graphql$Http$send(
				A2(
					$elm$core$Basics$composeR,
					$author$project$Graphql$Http$discardParsedErrorData,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Result$mapError($author$project$Conjure$errorToString),
						$elm$core$Result$andThen(
							function (r) {
								if (!r.$) {
									var error = r.a.cu;
									var success = r.a.cJ;
									var _v1 = _Utils_Tuple2(success, error);
									if (_v1.a) {
										if (!_v1.b.$) {
											var e = _v1.b.a;
											return $elm$core$Result$Err(
												A2(
													$elm$core$String$join,
													'\n',
													_List_fromArray(
														['The mutation was reported as successful, but the following error message was returned:', e])));
										} else {
											var _v2 = _v1.b;
											return $elm$core$Result$Ok(0);
										}
									} else {
										if (!_v1.b.$) {
											var e = _v1.b.a;
											return $elm$core$Result$Err(
												A2(
													$elm$core$String$join,
													'\n',
													_List_fromArray(
														['Mutation failed with the following error:', e])));
										} else {
											var _v3 = _v1.b;
											return $elm$core$Result$Err('Mutation was unsuccessful with no error message!  If the problem persists, please report this!');
										}
									}
								} else {
									return $elm$core$Result$Err('No return payload for mutation!  If the problem persists, please report this!');
								}
							}))))));
};
var $author$project$Conjure$writeMeasurements = F2(
	function (_v0, msg) {
		var groupBy = _v0.d1;
		var pat = _v0.ek;
		return A2(
			$elm$core$Basics$composeR,
			$author$project$Conjure$measurementWrite(groupBy),
			A2(
				$elm$core$Basics$composeR,
				$author$project$Conjure$sendMutation(pat),
				$elm$core$Platform$Cmd$map(msg)));
	});
var $author$project$Bin$Run$handleQueryResults = F2(
	function (r, res) {
		if (!res.$) {
			var events = res.a.dZ;
			var timeSubmitted = res.a.cL;
			var _v1 = A2(
				$elm$core$Tuple$mapFirst,
				$mgold$elm_nonempty_list$List$Nonempty$fromList,
				A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(_List_Nil, _List_Nil),
					A2(
						$elm$core$Maybe$map,
						$author$project$Link$assignEvents(r.cj),
						$mgold$elm_nonempty_list$List$Nonempty$fromList(
							A2(
								$elm$core$List$concatMap,
								A2(
									$elm$core$Basics$composeL,
									$elm$core$List$filter($author$project$Event$isRelevant),
									$elm$core$Tuple$second),
								$mgold$elm_nonempty_list$List$Nonempty$toList(events))))));
			var matched = _v1.a;
			var unmatched = _v1.b;
			return _Utils_Tuple2(
				_Utils_eq(matched, $elm$core$Maybe$Nothing) ? $author$project$Bin$Run$Running(
					_Utils_update(
						r,
						{
							W: $elm$core$Maybe$Just(timeSubmitted)
						})) : $author$project$Bin$Run$Running(r),
				$elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							((!r.A.eo) || $elm$core$List$isEmpty(unmatched)) ? $elm$core$Platform$Cmd$none : $author$project$Log$info(
							A2(
								$elm$core$String$join,
								'\n',
								A2(
									$elm$core$List$cons,
									'The following events were unlinked:',
									A2(
										$elm$core$List$map,
										$author$project$Event$viewDetails,
										$author$project$Event$sortByDuration(unmatched))))),
							function () {
							if (!matched.$) {
								var es = matched.a;
								return A3(
									$author$project$Conjure$writeMeasurements,
									r.A,
									A2(
										$elm$core$Basics$composeL,
										$author$project$Bin$Run$GotMeasurementWriteResults,
										$elm$core$Result$map(
											function (_v3) {
												return timeSubmitted;
											})),
									A2(
										$mgold$elm_nonempty_list$List$Nonempty$map,
										$elm$core$Tuple$mapFirst($author$project$Link$to),
										es));
							} else {
								return $author$project$Log$info('No events in the queried period; nothing to do.');
							}
						}()
						])));
		} else {
			var e = res.a;
			return _Utils_Tuple2(
				$author$project$Bin$Run$Exit,
				$author$project$Log$error(
					A2(
						$elm$core$String$join,
						'\n',
						_List_fromArray(
							['ActivityWatch query results failed to parse!', e, 'If this persists, please report it!']))));
		}
	});
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$encodeArray = function (e) {
	return A2(
		$elm$core$Basics$composeL,
		$elm$json$Json$Encode$list(e),
		$mgold$elm_nonempty_list$List$Nonempty$toList);
};
var $author$project$Category$toQueryFormat = function (_v0) {
	var name = _v0.cC;
	var rule = _v0.dx;
	var encodeRule = function (r) {
		if (!r.$) {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('none'))
					]));
		} else {
			var ignoreCase = r.a.dc;
			var pattern = r.a.$7;
			return $elm$json$Json$Encode$object(
				_Utils_ap(
					ignoreCase ? _List_fromArray(
						[
							_Utils_Tuple2(
							'ignore_case',
							$elm$json$Json$Encode$bool(true))
						]) : _List_Nil,
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$string('regex')),
							_Utils_Tuple2(
							'regex',
							$elm$json$Json$Encode$string(pattern))
						])));
		}
	};
	var encodeName = function (_v1) {
		var n = _v1;
		return A2($langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$encodeArray, $elm$json$Json$Encode$string, n);
	};
	return A2(
		$elm$json$Json$Encode$list,
		$elm$core$Basics$identity,
		_List_fromArray(
			[
				encodeName(name),
				encodeRule(rule)
			]));
};
var $author$project$Query$buildQuery = F2(
	function (_v0, cs) {
		var groupBy = _v0.d1;
		var categoryString = A2(
			$elm$json$Json$Encode$encode,
			0,
			A2($langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$encodeArray, $author$project$Category$toQueryFormat, cs));
		return A2(
			$elm$json$Json$Encode$list,
			$elm$json$Json$Encode$string,
			_List_fromArray(
				[
					'afk_events = query_bucket(find_bucket(\"aw-watcher-afk_\"));',
					'window_events = query_bucket(find_bucket(\"aw-watcher-window_\"));',
					'window_events = filter_period_intersect(window_events, filter_keyvals(afk_events, \"status\", [\"not-afk\"]));',
					'categorized_events = categorize(window_events, ' + (categoryString + ');'),
					'sorted_events = sort_by_timestamp(categorized_events);',
					function () {
					if (!groupBy) {
						return 'merged_events = merge_events_by_keys(sorted_events, [\"$category\"]);';
					} else {
						return 'merged_events = merge_events_by_keys(sorted_events, [\"app\", \"title\"]);';
					}
				}(),
					'RETURN = merged_events;'
				]));
	});
var $author$project$Period$encode = function (_v0) {
	var p = _v0;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'start',
				$elm$json$Json$Encode$int(
					$elm$time$Time$posixToMillis(p.by))),
				_Utils_Tuple2(
				'end',
				$elm$json$Json$Encode$int(
					$elm$time$Time$posixToMillis(p.b6)))
			]));
};
var $author$project$Period$encodeAsIso8601 = function (_v0) {
	var p = _v0;
	return $elm$json$Json$Encode$string(
		$elm$core$String$concat(
			_List_fromArray(
				[
					$rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(p.by),
					'/',
					$rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(p.b6)
				])));
};
var $author$project$Query$encode = F4(
	function (settings, categories, timeSubmitted, timePeriods) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'queryPeriods',
					A2($langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$encodeArray, $author$project$Period$encodeAsIso8601, timePeriods)),
					_Utils_Tuple2(
					'query',
					A2($author$project$Query$buildQuery, settings, categories)),
					_Utils_Tuple2(
					'periods',
					A2($langyu_app$elm_ancillary_nonempty_list$List$Nonempty$Ancillary$encodeArray, $author$project$Period$encode, timePeriods)),
					_Utils_Tuple2(
					'timeSubmitted',
					$elm$json$Json$Encode$int(
						$elm$time$Time$posixToMillis(timeSubmitted)))
				]));
	});
var $author$project$Query$putQuery = _Platform_outgoingPort('putQuery', $elm$core$Basics$identity);
var $author$project$Query$put = F3(
	function (settings, categories, now) {
		return A2(
			$elm$core$Basics$composeL,
			$author$project$Query$putQuery,
			A3($author$project$Query$encode, settings, categories, now));
	});
var $author$project$Bin$Run$GotMeasurementDeletionResults = function (a) {
	return {$: 1, a: a};
};
var $author$project$Conjure$InputObject$buildMeasurementBatchOperationDestroyItemV2Attributes = F2(
	function (required____, fillOptionals____) {
		var optionals____ = fillOptionals____(
			{cy: $author$project$Graphql$OptionalArgument$Absent});
		return {cO: required____.cO, cy: optionals____.cy, dj: required____.dj, eB: required____.eB};
	});
var $author$project$Conjure$makeMeasurementDeletion = F2(
	function (measures, deleteEras) {
		var allEras = $mgold$elm_nonempty_list$List$Nonempty$toList(
			A2($mgold$elm_nonempty_list$List$Nonempty$map, $author$project$Period$eraToString, deleteEras));
		var allDeletions = $mgold$elm_nonempty_list$List$Nonempty$toList(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$map,
				function (m) {
					return A2(
						$author$project$Conjure$InputObject$buildMeasurementBatchOperationDestroyItemV2Attributes,
						{
							cO: 'meta',
							dj: $author$project$Measure$getId(m),
							eB: allEras
						},
						function (r) {
							return _Utils_update(
								r,
								{
									cy: $author$project$Graphql$OptionalArgument$Present($author$project$Event$binKey)
								});
						});
				},
				measures));
		return A2(
			$author$project$Conjure$Mutation$measurementBatchOperationsV2,
			{
				de: $author$project$Conjure$InputObject$buildMeasurementBatchOperationsV2MutationInput(
					function (r) {
						return _Utils_update(
							r,
							{
								cU: $author$project$Graphql$OptionalArgument$Present($author$project$Conjure$clientMutationId),
								dX: $author$project$Graphql$OptionalArgument$Present(allDeletions)
							});
					})
			},
			A3(
				$author$project$Graphql$SelectionSet$map2,
				F2(
					function (error, success) {
						return {cu: error, cJ: success};
					}),
				$author$project$Conjure$Object$MeasurementBatchOperationsV2MutationPayload$errorMessage,
				$author$project$Conjure$Object$MeasurementBatchOperationsV2MutationPayload$success));
	});
var $author$project$Conjure$deleteByEra = F3(
	function (_v0, msg, forIds) {
		var pat = _v0.ek;
		return A2(
			$elm$core$Basics$composeR,
			$author$project$Conjure$makeMeasurementDeletion(forIds),
			A2(
				$elm$core$Basics$composeR,
				$author$project$Conjure$sendMutation(pat),
				$elm$core$Platform$Cmd$map(msg)));
	});
var $justinmimbs$time_extra$Time$Extra$Day = 11;
var $justinmimbs$date$Date$Days = 3;
var $justinmimbs$time_extra$Time$Extra$Millisecond = 15;
var $justinmimbs$time_extra$Time$Extra$Month = 2;
var $justinmimbs$date$Date$Months = 1;
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $justinmimbs$date$Date$add = F3(
	function (unit, n, _v0) {
		var rd = _v0;
		switch (unit) {
			case 0:
				return A3($justinmimbs$date$Date$add, 1, 12 * n, rd);
			case 1:
				var date = $justinmimbs$date$Date$toCalendarDate(rd);
				var wholeMonths = ((12 * (date.dN - 1)) + ($justinmimbs$date$Date$monthToNumber(date.dk) - 1)) + n;
				var m = $justinmimbs$date$Date$numberToMonth(
					A2($elm$core$Basics$modBy, 12, wholeMonths) + 1);
				var y = A2($justinmimbs$date$Date$floorDiv, wholeMonths, 12) + 1;
				return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A2(
					$elm$core$Basics$min,
					date.cY,
					A2($justinmimbs$date$Date$daysInMonth, y, m));
			case 2:
				return rd + (7 * n);
			default:
				return rd + n;
		}
	});
var $justinmimbs$time_extra$Time$Extra$add = F4(
	function (interval, n, zone, posix) {
		add:
		while (true) {
			switch (interval) {
				case 15:
					return $elm$time$Time$millisToPosix(
						$elm$time$Time$posixToMillis(posix) + n);
				case 14:
					var $temp$interval = 15,
						$temp$n = n * 1000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 13:
					var $temp$interval = 15,
						$temp$n = n * 60000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 12:
					var $temp$interval = 15,
						$temp$n = n * 3600000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 11:
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							3,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 2:
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							1,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 0:
					var $temp$interval = 2,
						$temp$n = n * 12,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 1:
					var $temp$interval = 2,
						$temp$n = n * 3,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 3:
					var $temp$interval = 11,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				default:
					var weekday = interval;
					var $temp$interval = 11,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
			}
		}
	});
var $justinmimbs$time_extra$Time$Extra$ceiling = F3(
	function (interval, zone, posix) {
		var floored = A3($justinmimbs$time_extra$Time$Extra$floor, interval, zone, posix);
		return _Utils_eq(floored, posix) ? posix : A4($justinmimbs$time_extra$Time$Extra$add, interval, 1, zone, floored);
	});
var $justinmimbs$time_extra$Time$Extra$Week = 3;
var $justinmimbs$time_extra$Time$Extra$toFractionalDay = F2(
	function (zone, posix) {
		return A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix) / 86400000;
	});
var $justinmimbs$time_extra$Time$Extra$toMonths = F2(
	function (zone, posix) {
		var wholeMonths = (12 * (A2($elm$time$Time$toYear, zone, posix) - 1)) + ($justinmimbs$date$Date$monthToNumber(
			A2($elm$time$Time$toMonth, zone, posix)) - 1);
		var fractionalMonth = (A2($elm$time$Time$toDay, zone, posix) + A2($justinmimbs$time_extra$Time$Extra$toFractionalDay, zone, posix)) / 100;
		return wholeMonths + fractionalMonth;
	});
var $justinmimbs$time_extra$Time$Extra$toRataDieMoment = F2(
	function (zone, posix) {
		return $justinmimbs$date$Date$toRataDie(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$toFractionalDay, zone, posix);
	});
var $elm$core$Basics$truncate = _Basics_truncate;
var $justinmimbs$time_extra$Time$Extra$diff = F4(
	function (interval, zone, posix1, posix2) {
		diff:
		while (true) {
			switch (interval) {
				case 15:
					return $elm$time$Time$posixToMillis(posix2) - $elm$time$Time$posixToMillis(posix1);
				case 14:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 15, zone, posix1, posix2) / 1000) | 0;
				case 13:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 15, zone, posix1, posix2) / 60000) | 0;
				case 12:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 15, zone, posix1, posix2) / 3600000) | 0;
				case 11:
					return (A2($justinmimbs$time_extra$Time$Extra$toRataDieMoment, zone, posix2) - A2($justinmimbs$time_extra$Time$Extra$toRataDieMoment, zone, posix1)) | 0;
				case 2:
					return (A2($justinmimbs$time_extra$Time$Extra$toMonths, zone, posix2) - A2($justinmimbs$time_extra$Time$Extra$toMonths, zone, posix1)) | 0;
				case 0:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 2, zone, posix1, posix2) / 12) | 0;
				case 1:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 2, zone, posix1, posix2) / 3) | 0;
				case 3:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 11, zone, posix1, posix2) / 7) | 0;
				default:
					var weekday = interval;
					var $temp$interval = 3,
						$temp$zone = zone,
						$temp$posix1 = A3($justinmimbs$time_extra$Time$Extra$floor, weekday, zone, posix1),
						$temp$posix2 = A3($justinmimbs$time_extra$Time$Extra$floor, weekday, zone, posix2);
					interval = $temp$interval;
					zone = $temp$zone;
					posix1 = $temp$posix1;
					posix2 = $temp$posix2;
					continue diff;
			}
		}
	});
var $justinmimbs$time_extra$Time$Extra$Minute = 13;
var $author$project$BinSize$inMinutes = function (_v0) {
	var i = _v0;
	return i;
};
var $author$project$Period$beginning = F2(
	function (binSize, startAt) {
		return {
			b6: A4(
				$justinmimbs$time_extra$Time$Extra$add,
				13,
				$author$project$BinSize$inMinutes(binSize),
				$elm$time$Time$utc,
				startAt),
			by: startAt
		};
	});
var $jjant$unwrap$Unwrap$boom1 = function (_v1) {
	return $jjant$unwrap$Unwrap$boom2(0);
};
var $jjant$unwrap$Unwrap$boom2 = function (_v0) {
	return $jjant$unwrap$Unwrap$boom1(0);
};
var $jjant$unwrap$Unwrap$maybe = function (ma) {
	if (!ma.$) {
		var a = ma.a;
		return a;
	} else {
		return $jjant$unwrap$Unwrap$boom1(0);
	}
};
var $elm_community$basics_extra$Basics$Extra$safeIntegerDivide = F2(
	function (x, y) {
		return (!y) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just((x / y) | 0);
	});
var $author$project$Period$lastComplete = F2(
	function (binSize, now) {
		var latestPossibleEnd = A4($justinmimbs$time_extra$Time$Extra$add, 13, -1, $elm$time$Time$utc, now);
		var mostRecentHour = A3($justinmimbs$time_extra$Time$Extra$floor, 12, $elm$time$Time$utc, latestPossibleEnd);
		var minutesPastHour = A4($justinmimbs$time_extra$Time$Extra$diff, 13, $elm$time$Time$utc, mostRecentHour, latestPossibleEnd);
		var binSizeInMinutes = $author$project$BinSize$inMinutes(binSize);
		var periodsSinceHour = $jjant$unwrap$Unwrap$maybe(
			A2($elm_community$basics_extra$Basics$Extra$safeIntegerDivide, minutesPastHour, binSizeInMinutes));
		return (periodsSinceHour < 1) ? A2(
			$author$project$Period$beginning,
			binSize,
			A4($justinmimbs$time_extra$Time$Extra$add, 13, -binSizeInMinutes, $elm$time$Time$utc, mostRecentHour)) : A2(
			$author$project$Period$beginning,
			binSize,
			A4($justinmimbs$time_extra$Time$Extra$add, 13, (periodsSinceHour - 1) * binSizeInMinutes, $elm$time$Time$utc, mostRecentHour));
	});
var $author$project$Period$sinceEndOfPeriod = F3(
	function (binSize, endOfPeriod, now) {
		var binSizeInMinutes = $author$project$BinSize$inMinutes(binSize);
		var _v0 = A2($author$project$Period$lastComplete, binSize, now);
		var latestPeriod = _v0;
		var periodsSinceLast = $jjant$unwrap$Unwrap$maybe(
			function (minuteDiff) {
				return A2($elm_community$basics_extra$Basics$Extra$safeIntegerDivide, minuteDiff, binSizeInMinutes);
			}(
				A4($justinmimbs$time_extra$Time$Extra$diff, 13, $elm$time$Time$utc, endOfPeriod, latestPeriod.by)));
		return (periodsSinceLast < 0) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$map,
				function (p) {
					return A2(
						$author$project$Period$beginning,
						binSize,
						A4($justinmimbs$time_extra$Time$Extra$add, 13, binSizeInMinutes * p, $elm$time$Time$utc, endOfPeriod));
				},
				A2(
					$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
					0,
					A2($elm$core$List$range, 1, periodsSinceLast))));
	});
var $author$project$Period$sinceStartOfDay = F3(
	function (binSize, zone, now) {
		var firstEraOfLocalDay = A3(
			$justinmimbs$time_extra$Time$Extra$ceiling,
			12,
			$elm$time$Time$utc,
			A3($justinmimbs$time_extra$Time$Extra$floor, 11, zone, now));
		return A2(
			$elm$core$Maybe$map,
			function (ps) {
				return {
					dY: A2(
						$mgold$elm_nonempty_list$List$Nonempty$map,
						function (e) {
							return A4($justinmimbs$time_extra$Time$Extra$add, 12, e, $elm$time$Time$utc, firstEraOfLocalDay);
						},
						A2(
							$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
							0,
							A2(
								$elm$core$List$range,
								1,
								A4($justinmimbs$time_extra$Time$Extra$diff, 12, $elm$time$Time$utc, firstEraOfLocalDay, now)))),
					el: ps
				};
			},
			A3($author$project$Period$sinceEndOfPeriod, binSize, firstEraOfLocalDay, now));
	});
var $author$project$Bin$Run$rewriteEventsSinceStartOfDay = F3(
	function (r, zone, now) {
		var _v0 = A3($author$project$Period$sinceStartOfDay, r.A.cR, zone, now);
		if (!_v0.$) {
			var eras = _v0.a.dY;
			var periods = _v0.a.el;
			return _Utils_Tuple2(
				$author$project$Bin$Run$Running(r),
				$elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							$author$project$Log$info('Rewriting events since start of day...'),
							A4(
							$author$project$Conjure$deleteByEra,
							r.A,
							A2(
								$elm$core$Basics$composeL,
								$author$project$Bin$Run$GotMeasurementDeletionResults,
								$elm$core$Result$map(
									function (_v1) {
										return {c4: periods, cL: now};
									})),
							A2($mgold$elm_nonempty_list$List$Nonempty$map, $author$project$Link$to, r.cj),
							eras)
						])));
		} else {
			return _Utils_Tuple2(
				$author$project$Bin$Run$Running(
					_Utils_update(
						r,
						{
							W: $elm$core$Maybe$Just(now)
						})),
				$author$project$Log$info('No periods since the start of day, so not rewriting anything.\nWatching for new events...'));
		}
	});
var $author$project$Period$end = function (_v0) {
	var p = _v0;
	return p.b6;
};
var $author$project$Period$sinceLastCompleteAt = F2(
	function (binSize, lastTime) {
		return A2(
			$author$project$Period$sinceEndOfPeriod,
			binSize,
			$author$project$Period$end(
				A2($author$project$Period$lastComplete, binSize, lastTime)));
	});
var $author$project$Bin$Run$GotLocalTime = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$time$Time$here = _Time_here(0);
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $author$project$Bin$Run$startProgram = F2(
	function (_v0, res) {
		var categories = _v0.U;
		var decodeLinks = _v0.cZ;
		var settings = _v0.A;
		if (!res.$) {
			if (!res.a.b) {
				return _Utils_Tuple2(
					$author$project$Bin$Run$Exit,
					$author$project$Log$error('You don\'t have any Time Entry measures on Conjure!  Make one or more \"Time Entry\" measures here: https://conjure.so/measures/new'));
			} else {
				var _v2 = res.a;
				var m = _v2.a;
				var ms = _v2.b;
				var _v3 = decodeLinks(
					A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, m, ms));
				if (!_v3.$) {
					var links = _v3.a;
					return _Utils_Tuple2(
						$author$project$Bin$Run$Running(
							{U: categories, W: $elm$core$Maybe$Nothing, cj: links, A: settings}),
						A2(
							$elm$core$Task$perform,
							$elm$core$Basics$identity,
							A3($elm$core$Task$map2, $author$project$Bin$Run$GotLocalTime, $elm$time$Time$here, $elm$time$Time$now)));
				} else {
					var e = _v3.a;
					return _Utils_Tuple2(
						$author$project$Bin$Run$Exit,
						$author$project$Log$error(
							A2(
								$elm$core$String$join,
								'\n',
								_List_fromArray(
									['Decoding links failed with the following error:', e]))));
				}
			}
		} else {
			var e = res.a;
			return _Utils_Tuple2(
				$author$project$Bin$Run$Exit,
				$author$project$Log$error(
					A2(
						$elm$core$String$join,
						'\n',
						_List_fromArray(
							['Fetching known measures from Conjure failed with the following error:', e]))));
		}
	});
var $elm_community$maybe_extra$Maybe$Extra$unwrap = F3(
	function (_default, f, m) {
		if (m.$ === 1) {
			return _default;
		} else {
			var a = m.a;
			return f(a);
		}
	});
var $author$project$Log$warn = function (s) {
	return $author$project$Log$log(
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'warn',
					$elm$json$Json$Encode$string(s))
				])));
};
var $author$project$Bin$Run$update = F2(
	function (msg, model) {
		switch (model.$) {
			case 0:
				var r = model.a;
				if (!msg.$) {
					var res = msg.a;
					return A2($author$project$Bin$Run$startProgram, r, res);
				} else {
					return _Utils_Tuple2(
						model,
						$author$project$Log$warn('Received an unexpected message while loading measures...'));
				}
			case 1:
				var r = model.a;
				switch (msg.$) {
					case 0:
						return _Utils_Tuple2(
							model,
							$author$project$Log$warn('Received measures from Conjure while already running...'));
					case 1:
						var res = msg.a;
						if (!res.$) {
							var forPeriods = res.a.c4;
							var timeSubmitted = res.a.cL;
							return _Utils_Tuple2(
								model,
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											$author$project$Log$info('Deleted events since start of local day; now reuploading them...'),
											A4($author$project$Query$put, r.A, r.U, timeSubmitted, forPeriods)
										])));
						} else {
							var e = res.a;
							return _Utils_Tuple2(
								$author$project$Bin$Run$Exit,
								$author$project$Log$error(
									A2(
										$elm$core$String$join,
										'\n',
										_List_fromArray(
											['Measurement deletion failed with the following error:', e]))));
						}
					case 2:
						var res = msg.a;
						if (!res.$) {
							var timeSubmitted = res.a;
							return _Utils_Tuple2(
								$author$project$Bin$Run$Running(
									_Utils_update(
										r,
										{
											W: $elm$core$Maybe$Just(timeSubmitted)
										})),
								$author$project$Log$info(
									$elm$core$String$concat(
										_List_fromArray(
											[
												'Successfully wrote events as of ',
												$rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(timeSubmitted),
												_Utils_eq(r.W, $elm$core$Maybe$Nothing) ? '\nWatching for new events...' : ''
											]))));
						} else {
							var e = res.a;
							return _Utils_Tuple2(
								model,
								$author$project$Log$warn(
									A2(
										$elm$core$String$join,
										'\n',
										_List_fromArray(
											['Measurement write failed with the following error:', e, 'Continuing to run in case this fleeting (e.g. due to a lost internet connection)']))));
						}
					case 3:
						var res = msg.a;
						return A2($author$project$Bin$Run$handleQueryResults, r, res);
					case 4:
						var zone = msg.a;
						var now = msg.b;
						return A3($author$project$Bin$Run$rewriteEventsSinceStartOfDay, r, zone, now);
					default:
						var now = msg.a;
						return _Utils_Tuple2(
							model,
							A3(
								$elm_community$maybe_extra$Maybe$Extra$unwrap,
								$elm$core$Platform$Cmd$none,
								A3($author$project$Query$put, r.A, r.U, now),
								A2(
									$elm$core$Maybe$andThen,
									function (lastWrite) {
										return A3($author$project$Period$sinceLastCompleteAt, r.A.cR, lastWrite, now);
									},
									r.W)));
				}
			default:
				return _Utils_Tuple2(
					model,
					$author$project$Log$warn('Received a message while exiting...'));
		}
	});
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$Bin$Run$main = $elm$core$Platform$worker(
	{d3: $author$project$Bin$Run$init, eu: $author$project$Bin$Run$subscriptions, ey: $author$project$Bin$Run$update});
_Platform_export({'Bin':{'Run':{'init':$author$project$Bin$Run$main($elm$json$Json$Decode$value)(0)}}});}(this));