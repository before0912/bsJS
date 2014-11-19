	trim = /^\s*|\s*$/g,
	trim:(function(trim){
		var f = function(v){
			var t0, i;
			if( !v ) return v;
			t0 = typeof v;
			if( t0 == 'string' ) return v.replace( trim, '' );
			if( t0 == 'object' ){
				if( v.splice ){t0 = [], i = v.length; while( i-- ) t0[i] = f(v[i]);}
				else{t0 = {}; for( i in v ) if( v.hasOwnProperty(i) ) t0[i] = f(v[i]);}
				return t0;
			}
			return v;
		};
		return f;
	})(trim),