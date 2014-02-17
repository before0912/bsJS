/*
	bs selector 백승현
	http://css4-selectors.com/browser-selector-test/
	http://kimblim.dk/css-tests/selectors/
*/
var bssel = (function(){
'use strict';
var isQS;
isQS = ( typeof document.querySelector == 'function' ); // <= IE8

var trim = (function(){
	var dotrim = (function(){
		var r0 = /^\s*|\s*$/g;
		return function(str){
			return typeof String.prototype.trim == 'function' ? str.trim() : str.replace(r0, '');
		};
	})();
	return function(t){
		var i;
		if( t.splice ){
			for( i=t.length; i--; ) t[i] = dotrim( t[i] );
			return t;
		}
		return dotrim(t);
	}
})();
var uniqArray = function(arr) {
	var _ret = [], _len = arr.length, i, j;
	for (i = 0; i < _len; i++) {
		for (j = i + 1; j < _len; j++)
			if (arr[i] === arr[j]) j = ++i;
		_ret.push(arr[i]);
	}
	return _ret;
};
var echo = function(target, filter, parentName) {
	var k;
	if (parentName && (typeof parentName != "string" || typeof parentName == "string" && (parentName.split(".").length + parentName.split("]").length) > 3)) return;
	if (!filter) filter = "";
	if (target === null || target === undefined) {
		console.log(((parentName) ? parentName + "." : "") + target);
		return;
	}
	if (typeof target != "object") {
		if (typeof target == filter || filter === "")
			console.log(((parentName) ? parentName + "." : "") + target + "["+ typeof target +"]");
		return;
	}
	(target instanceof Array) ? console.log(((parentName) ? parentName + ":" : "") + "[Array["+ target.length + "]]") : console.log(((parentName) ? parentName + ":" : "") + "[Object]");
	for (k in target) {
		if (target instanceof Array) {
			if (typeof target[k] == "object")
				echo(target[k], filter, ((parentName) ? parentName + "[" : "[") + k + ((parentName) ? "]" : "]"));
			else if (typeof target[k] == filter || filter === "")
				console.log(((parentName) ? parentName + "[" : "[") + k + ((parentName) ? "]" : "]") + ":" + target[k] + " ("+ typeof target[k] +")");
		} else {
			if (typeof target[k] == "object")
				echo(target[k], filter, ((parentName) ? parentName + "." : "")+k);
			else if (typeof target[k] == filter || filter === "")
				console.log(((parentName) ? parentName + "." : "") + k + ":" + target[k] + " ("+ typeof target[k] +")");
		}
	}
};
var CSSSelectors = {
	'CSS1': {
		'Type': ['E'],
		'ID': ['E#ElementID'],
		'Class': ['E.classname'],
		'Descendant combination': ['E F'],
		'User action pseudo-class': ['E:active'],
		'Link history pseudo-class': ['E:link']
	},
	'CSS2': {
		'Universal': ['*'],
		'User action pseudo-class': ['E:hover', 'E:focus'],
		'Dir pseudo-class': ['E:dir(ltr)'],
		'Lang pseudo-class': ['E:lang(en)'],
		'Attribute': ['E[foobar]', 'E[foo=\'bar\']', 'E[foo~=\'bar\']', 'E[foo|=\'en\']'],
		'Structural pseudo-class': ['E:first-child'],
		'Child combination': ['E > F'],
		'Adjacent sibling combination': ['E + F']
	},
	'CSS3': {
		'Negation pseudo-class': ['E:not(s)'],
		'Target pseudo-class': ['E:target'],
		'Scope pseudo-class': ['E:scope'],
		'Enabled and Disabled pseudo-class': ['E:enabled', 'E:disabled'],
		'Selected-option pseudo-class': ['E:checked'],
		'Structural pseudo-class': ['E:root', 'E:empty', 'E:last-child', 'E:only-child', 'E:first-of-type', 'E:last-of-type', 'E:only-of-type', 'E:nth-child(n)', 'E:nth-last-child(n)', 'E:nth-of-type(n)', 'E:nth-last-of-type(n)'],
		'Attribute': ['E[foo^=\'bar\']', 'E[foo$=\'bar\']', 'E[foo*=\'bar\']'],
		'General sibling combinator': ['E ~ F']
	},
	'CSS4': {
		'Negation pseudo-class': ['E:not(s1, s2)'],
		'Matches-any pseudo-class': ['E:matches(s1, s2)'],
		'Local link pseudo-class': ['E:local-link'],
		'Time-dimensional pseudo-class': ['E:current'],
		'Indeterminate-value pseudo-class': ['E:indeterminate'],
		'Default option pseudo-class': ['E:default'],
		'Validity pseudo-class': ['E:in-range', 'E:out-of-range'],
		'Optionality pseudo-class': ['E:required', 'E:optional'],
		'Mutability pseudo-class': ['E:read-only', 'E:read-write'],
		'Structural pseudo-class': ['E:nth-match(n of selector)'],
		'Grid-Structural pseudo-class': ['E:column(selector)', 'E:nth-column(n)', 'E:nth-last-column(n)'],
		'Attribute case-sensitivity': ['E[foo=\'bar\' i]'],
		'Reference combination': ['E /foo/ F'],
		'Subject of a selector with Child combinator': ['E! > F'],
		'Hyperlink pseudo-class': ['E:any-link'],
		'Dir pseudo-class': ['E:dir(*)']
	}
};
//var CSSSelectors = {'CSS1': {'Type': ['E'],'ID': ['E#ElementID'],'Class': ['E.classname'],'Descendant combination': ['E F'],'User action pseudo-class': ['E:active'],'Link history pseudo-class': ['E:link']},'CSS2': {'Universal': ['*'],'User action pseudo-class': ['E:hover','E:focus'],'Dir pseudo-class': ['E:dir(ltr)'],'Lang pseudo-class': ['E:lang(en)'],'Attribute': ['E[foobar]','E[foo=\'bar\']','E[foo~=\'bar\']','E[foo|=\'en\']'],'Structural pseudo-class': ['E:first-child'],'Child combination': ['E > F'],'Adjacent sibling combination': ['E + F']},'CSS3': {'Negation pseudo-class': ['E:not(s)'],'Target pseudo-class': ['E:target'],'Scope pseudo-class': ['E:scope'],'Enabled and Disabled pseudo-class': ['E:enabled','E:disabled'],'Selected-option pseudo-class': ['E:checked'],'Structural pseudo-class': ['E:root','E:empty','E:last-child','E:only-child','E:first-of-type','E:last-of-type','E:only-of-type','E:nth-child(n)','E:nth-last-child(n)','E:nth-of-type(n)','E:nth-last-of-type(n)'],'Attribute': ['E[foo^=\'bar\']','E[foo$=\'bar\']','E[foo*=\'bar\']'],'General sibling combinator': ['E ~ F']},'CSS4': {'Negation pseudo-class': ['E:not(s1, s2)'],'Matches-any pseudo-class': ['E:matches(s1, s2)'],'Local link pseudo-class': ['E:local-link'],'Time-dimensional pseudo-class': ['E:current'],'Indeterminate-value pseudo-class': ['E:indeterminate'],'Default option pseudo-class': ['E:default'],'Validity pseudo-class': ['E:in-range','E:out-of-range'],'Optionality pseudo-class': ['E:required','E:optional'],'Mutability pseudo-class': ['E:read-only','E:read-write'],'Structural pseudo-class': ['E:nth-match(n of selector)'],'Grid-Structural pseudo-class': ['E:column(selector)','E:nth-column(n)','E:nth-last-column(n)'],'Attribute case-sensitivity': ['E[foo=\'bar\' i]'],'Reference combination': ['E /foo/ F'],'Subject of a selector with Child combinator': ['E! > F'],'Hyperlink pseudo-class': ['E:any-link'],'Dir pseudo-class': ['E:dir(*)']}};
var DETECT;
(function(){
	var k, kk, i;
	if( !isQS ) return;
	DETECT = {};
	for( k in CSSSelectors ){
		DETECT[k] = {};
		for( kk in CSSSelectors[k] ){
			DETECT[k][kk] = [];
			for( i=0; i < CSSSelectors[k][kk].length; i++ ){
				try{document.querySelector(CSSSelectors[k][kk][i]),DETECT[k][kk].push(1);}catch(e){DETECT[k][kk].push(0);}
			};
		}
	}
	//console.log(DETECT);
})();

var finder = (function(){
	var bsel, parseQuery, compareEl, r0;

	parseQuery = function(s){
		var tokens, token, key, i, t0, t1, f0, f1;
		tokens = [];
		token = '';
		i = s.length;
		while( i-- ){
			key = s.charAt(i);
			if( key == '[' || key == '(' ) f0 = 0;
			else if( key == ']' || key == ')' ){ f0 = 1;continue; }

			if( key != '*' && key != ' ' && key != ']' && key != '>' && key != '+' && key != '~' && key != '^' && key != '$' && key != '*' ){
				token = key + token;
			}
			if( ( key == '*' || key == ' ' || key == ']' || key == '>' || key == '+' || key == '~' || key == '^' || key == '$' || key == '*' ) && f0 ) token = key + token;
			else{
				if( key == ' ' ){
					if( tokens[tokens.length-1] == ' ' ) continue;
					if( token ) tokens.push(token), token = '';
					if( ( t0 = tokens[tokens.length-1] ) != '>' && t0 != '+' && t0 != '~' ) tokens.push(key);
				}else if( key == '*' || key == '>' || key == '+' || key == '~' ){
					if( trim(token) ) tokens.push(token), token = '';
					if( tokens[tokens.length-1] == ' ' ) tokens.pop();
					tokens.push(key);
				}else if( key == '.' || key == ':' || key == '[' || !i ){
					if( token ) tokens.push(token), token = '';
				}
			}
		}
		console.log(tokens);
		return tokens;
	},
	compareEl = (function(){
		var r0, _nthOfType, _lastNthOfType, _hasCls;
		r0 = /"|'/g, //"
		_nthOfType = function _nthOfType(el, nth){
			var pEl, typeIdx, i, j;
			if( el.nodeType != 1 ) return 0;
			pEl = el.parentNode && el.parentNode.childNodes;
			if( pEl && ( j = pEl.length ) ){
				i = 0, typeIdx = 0;
				while( i < j ){
					if( pEl[i].tagName != 'HTML' && el.tagName == pEl[i].tagName && ++typeIdx && ( nth == 'even' ? ( typeIdx%2 == 0 ) : nth == 'odd' ? ( typeIdx%2 == 1 ) : (typeIdx == nth) ) && el == pEl[i] ) return 1;
					i++;
				}
			}
			return 0;
		},
		_lastNthOfType = function _lastNthOfType(el, nth){
			var pEl, typeIdx, i;
			if( el.nodeType != 1 ) return 0;
			pEl = el.parentNode && el.parentNode.childNodes;
			if( pEl && ( i = pEl.length ) ){
				typeIdx = 0;
				while( i-- ){
					if( pEl[i].tagName != 'HTML' && el.tagName == pEl[i].tagName && ++typeIdx && ( nth == 'even' ? ( typeIdx%2 == 0 ) : nth == 'odd' ? ( typeIdx%2 == 1 ) : (typeIdx == nth) ) && el == pEl[i] ) return 1;
				}
			}
			return 0;
		},
		_hasCls = function _hasCls(key, clsNm){
			var i;
			if( !clsNm ) return 0;
			clsNm = trim( clsNm.split(' ') );
			for( i = clsNm.length; i--; )	if( key == clsNm[i] ) return 1;
			return 0;
		};
		return function(el, token){
			var key, val, opIdx, op, i, j;
			if( ( key = token.charAt(0) ) == '#' ){
				key = token.substr(1);
				if( key == el.id ) return 1;
			}else if( key == '.' ){
				key = token.substr(1);
				return _hasCls( key, el.className );
			}else if( key == '[' ){
				// TODO:IE7 에서 A, SCRIPT, UL, LI 등의 요소에 기본 type 속성이 생성되어있는 문제 처리(아마 outerHTML으로 해결될지도?)
				key = token.substr(1);
				opIdx = key.indexOf('=');
				op = opIdx > -1 ? key.charAt(opIdx-1) : null;
				val = key.split('=');
				key = opIdx > -1 ? (op == '~' || op == '|' || op == '^' || op == '$' || op == '*' ? val[0].substring(0, opIdx-1) : val[0]) : key;
				val = opIdx > -1 ? val[1].replace(r0, ''):null;
				if( opIdx < 0 ){
					if( el.getAttribute(key) !== null ) return 1;
				}else if( key = el.getAttribute(key) ){
					if( op == '~' ){ // list of space-separated values
						key = key.split(' ');
						for( i = key.length; i--; ) if( key[i] == val ) return 1;
					}else if( op == '|' ){ // list of hyphen-separated values
						key = key.split('-');
						for( i = key.length; i--; ) if( key[i] == val ) return 1;
					}else if( op == '^' ){ // begins exactly with
						if( !key.indexOf(val) ) return 1;
					}else if( op == '$' ){ // end exactly with
						if( key.lastIndexOf(val) == ( key.length - val.length ) ) return 1;
					}else if( op == '*' ){ // substring with
						if( key.indexOf(val) > -1 ) return 1;
					}else{
						if( key === val ) return 1;
					}
				}
			}else if( key == ':' ){
				// TODO:pseudo 처리
				key = token.substr(1);
				val = ( opIdx = key.indexOf('(') ) > -1 ? isNaN( val = key.substr( opIdx+1 ) ) ? trim(val) : Number( val ) : null;
				if( val ) key = key.substring( 0, opIdx );
				switch(key){
				case'link':
					if( el.tagName == 'A' && el.getAttribute('href') !== null ) return 1;
					break;
				case'active':
				case'visited':
				case'first-line':
				case'first-letter':
				case'hover':
				case'focus':
					break;
				case'root':
					if(el.tagName == 'HTML') return 1;
					break;
				case'first-of-type':
					return _nthOfType(el, 1);
					break;
				case'last-of-type':
					return _lastNthOfType(el, 1);
					break;
				case'nth-of-type':
					return _nthOfType(el, val);
					break;
				case'nth-last-of-type':
					return _lastNthOfType(el, val);
					break;
				case'only-of-type':
					if( el.nodeType != 1 ) return 0;
					op = el.parentNode && el.parentNode.childNodes;
					if( op && ( j = op.length ) ){
						i = 0, opIdx = 0;
						while( i < j ){
							if( op[i].tagName != 'HTML' && op[i].nodeType == 1 && el.tagName == op[i].tagName && ++opIdx && (val = op[i]) && opIdx > 1 ) return 0;
							i++;
						}
						if( opIdx == 1 && el == val ) return 1;
					}
					return 0;
					break;
				case'only-child':
					if( el.nodeType != 1 ) return 0;
					op = el.parentNode && el.parentNode.childNodes;
					if( op && ( i = op.length ) ){
						opIdx = 0;
						while( i-- ){
							if( op[i].tagName != 'HTML' && op[i].nodeType == 1 && ++opIdx && (val = op[i]) && opIdx > 1 ) return 0;
						}
						if( opIdx == 1 && el == val ) return 1;
					}
					return 0;
					break;
				case'first-child':
					if( el.nodeType != 1 ) return 0;
					op = el.parentNode && el.parentNode.childNodes;
					if( op && ( j = op.length ) ){
						i = 0, opIdx = 0;
						while( i < j ){
							if( op[i].tagName != 'HTML' && op[i].nodeType == 1 && ++opIdx && opIdx == 1 && el == op[i] ) return 1;
							i++;
						}
					}
					return 0;
					break;
				case'last-child':
					if( el.nodeType != 1 ) return 0;
					op = el.parentNode && el.parentNode.childNodes;
					if( op && ( i = op.length ) ){
						opIdx = 0;
						while( i-- ){
							if( op[i].tagName != 'HTML' && op[i].nodeType == 1 && ++opIdx && opIdx == 1 && el == op[i] ) return 1;
						}
					}
					return 0;
					break;
				case'nth-child':
					return _nthOfType(el, val);
					break;
				case'nth-last-child':
					return _lastNthOfType(el, val);
					break;
				case'empty':
					if( el.nodeType == 1 && !el.nodeValue && !el.childNodes.length ) return 1;
					return 0;
					break;
				case'checked':
					if(
						( el.tagName == 'INPUT' && (el.getAttribute('type') == 'radio' || el.getAttribute('type') == 'checkbox' ) && el.checked == true ) ||
						( el.tagName == 'OPTION' && el.selected == true )
					) return 1;
					return 0;
					break;
				case'enabled':
					if(
						(el.tagName == 'INPUT' || el.tagName == 'BUTTON' || el.tagName == 'SELECT' || el.tagName == 'OPTION' || el.tagName == 'TEXTAREA') &&
						el.getAttribute('disabled') == null
					) return 1;
					return 0;
					break;
				case'disabled':
					if(
						(el.tagName == 'INPUT' || el.tagName == 'BUTTON' || el.tagName == 'SELECT' || el.tagName == 'OPTION' || el.tagName == 'TEXTAREA') &&
						el.getAttribute('disabled') != null
					) return 1;
					return 0;
					break;
				}
			}else{ // TAG 처리
				if( token == '*' || token.toUpperCase() == el.tagName ) return 1;
			}
			return 0;
		};
	})();
	return function($s){
		var ret, el, els, pel, sel, sels, oSel, t0, i, j, k, m, n,
			key, hit, pIdx, aIdx, attrs, token, tokens, ntoken;
		console.log('############', $s);
		document.getElementById('selector').value = $s;
		oSel = [],
		//sels = trim( $s.replace( r0, ' ' ).split(',') );
		sels = trim( $s.split(',') );
		for( i = sels.length; i--; ){
			oSel.push( parseQuery( sels[i] ) );
		}
		//console.log(oSel);
		// TODO:native 처리
		ret = [];
		if( els = document.getElementsByTagName('*') ){
			for( i = 0, j = els.length; i < j; i++ ){
				els[i].className = els[i].className.replace('selected','');
				hit = 0;
				pel = null;
				for( k = oSel.length; k--; ){
					tokens = oSel[k];
					el = els[i];
					for( m = 0, n = tokens.length; m < n; m++ ){// 
						token = tokens[m];
						key = token.charAt(0);
						if( ( key = token.charAt(0) ) == ' ' ){ // loop parent
							m++;
							while( el = el.parentNode ){
								if( hit = compareEl(el, tokens[m]) ) break;
							}
						}else if( key == '>' ){ // immediate parent
							hit = compareEl(el = el.parentNode, tokens[++m]);
						}else if( key == '+' ){ // has immediate nextsibling
							while( el = el.previousSibling ) if( el.nodeType == 1 ) break;
							hit = el && compareEl( el, tokens[++m] );
						}else if( key == '~' ){ // has any nextsibling
							m++;
							while( el = el.previousSibling ){
								if( el.nodeType == 1 && compareEl( el, tokens[m] ) ){
									hit = 1; break;
								}
							}
						}else{
							hit = compareEl(el, token);
						}
						if( !hit ) break; // 여긴 AND 연산
						//console.log(key);
					}
					if( hit ) break; // 여긴 OR 연산
				}
				//console.log(hit.length, attrs.length)
				if( hit ) ret.push(els[i]);
			}
		}
		//echo(ret[0]);
		console.log('## bssel:',ret);
		if(isQS) console.log( '## native:', document.querySelectorAll($s) );
		for(var i=0; i<ret.length; i++){
			ret[i].className = ret[i].className ? ret[i].className + ' selected': 'selected';
		}
	}
})();
	return finder;
})();













//
//function querySelectorAll(element, selector) {
//    if(element.querySelectorAll) { // Morden Browser
//        return element.querySelectorAll(selector);
//    }
//    else { // low versioning IE only
//        var a=element.all, c=[], selector = selector.replace(/\[for\b/gi, '[htmlFor').split(','), i, j, s=document.createStyleSheet();
//        for (i=selector.length; i--;) {
//            s.addRule(selector[i], 'k:v');
//            for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
//            s.removeRule(0);
//        }
//        return c;
//    }
//}

