tmpl:template = (function(){
		var r, re, arg;
		r = /@[^@]+@/g,
		re = function(_0){
			var t0, t1, t2, i, j, k, l, cnt;
			_0 = _0.substring( 1, _0.length - 1 ), t0 = _0.split('.'), i = 1, j = arg.length, l = t0.length, cnt = 0;
			while( i < j ){
				t1 = arg[i++], k = 0;
				while( k < l && t1 !== undefined ) t1 = t1[t0[k++]];
				if( t1 !== undefined ) cnt++, t2 = t1;
			}
			if( cnt == 0 ) return _0;
			if( cnt > 1 ) return '@ERROR matchs '+cnt+'times@';
			if( t2 ){
				if( typeof t2 == 'function' ) return t2(_0);
				if( t2.splice ) return t2.join('');
			}
			return t2;
		}
		return function(v){return arg = arguments, v.replace( r, re ).replace( trim, '' );};
	})(),