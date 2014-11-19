bs.VALI.rule(
		'ip', /^((([0-9])|(1[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-9])|(1[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
		'url', /^^https?:[/][/][a-zA-Z0-9.-]+[.]+[A-Za-z]{2,4}([:][0-9]{2,4})?/, 'email', /^[0-9a-zA-Z-_.]+@[0-9a-zA-Z-]+[.]+[A-Za-z]{2,4}$/,
		'korean', /^[ㄱ-힣]+$/, 'japanese', /^[ぁ-んァ-ヶー一-龠！-ﾟ・～「」“”‘’｛｝〜−]+$/,
		'alpha', /^[a-z]+$/, 'ALPHA', /^[A-Z]+$/, 'num', /^[0-9]+$/, 'alphanum', /^[a-z0-9]+$/,
		'1alpha', /^[a-z]/, '1ALPHA', /^[A-Z]/,
		'float', function(v){return '' + parseFloat(v) === v;}, 'int', function(v){return '' + parseInt( v, 10 ) === v;},
		'length', function( v, a ){return ( v ? v.length : 0 ) === +a[0];},
		'in', function( v, a ){return a.indexOf(v) > -1;},
		'notin', function( v, a ){return a.indexOf(v) == -1;},
		'range', function( v, a ){return v = v ? v.length : 0, +a[0] <= v && v <= +a[1];},
		'indexOf', function( v, a ){
			var i, j;
			i = a.length;
			while( i-- ) if( v.indexOf(a[i]) == -1 ) j = 1;
			return j ? 0 : 1;
		},
		'ssn', (function(){
			var r = /\s|-/g, key = [2,3,4,5,6,7,8,9,2,3,4,5];
			return function(v){
				var t0 = v.replace( r, '' ), t1, i;
				if( t0.length != 13 ) return;
				for( t1 = i = 0 ; i < 12 ; i++ ) t1 += key[i] * t0.charAt(i);
				return parseInt( t0.charAt(12) ) == ( ( 11 - ( t1 % 11 ) ) % 10);
			};
		})(),
		'biz', (function(){
			var r = /\s|-/g, key = [1,3,7,1,3,7,1,3,5,1];
			return function(v){
				var t0, t1, t2 = v.replace( r, '' ), i;
				if( t2.length != 10 ) return;
				for( t0 = i = 0 ; i < 8 ; i++ ) t0 += key[i] * t2.charAt(i);
				t1 = "0" + ( key[8] * t2.charAt(8) ), t1 = t1.substr( t1.length - 2 ),
				t0 += parseInt( t1.charAt(0) ) + parseInt( t1.charAt(1) );
				return parseInt( t2.charAt(9) ) == ( 10 - ( t0 % 10)) % 10;
			};
		})()
	);