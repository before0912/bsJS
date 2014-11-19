	fn( 'ck', function ck( key/*, val, expire, path*/ ){
		var t0, t1, t2, i, j, v;
		t0 = document.cookie.split(';'), i = t0.length;
		if( arguments.length == 1 ){
			while( i-- ) if( t0[i].substring( 0, j = t0[i].indexOf('=') ).replace( trim, '' ) == key ) return decodeURIComponent(t0[i].substr( j + 1 ).replace( trim, '' ));
			return null;
		}else{
			v = arguments[1], t1 = key + '=' + encodeURIComponent(v) + ';domain='+document.domain+';path='+ (arguments[3] || '/');
			if( v === null ) t0 = new Date, t0.setTime( t0.getTime() - 86400000 ), t1 += ';expires=' + t0.toUTCString();
			else if( arguments[2] ) t0 = new Date, t0.setTime( t0.getTime() + arguments[2] * 86400000 ), t1 += ';expires=' + t0.toUTCString();
			return document.cookie = t1, v;
		}
	} ),