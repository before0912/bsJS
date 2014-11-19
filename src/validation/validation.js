

VALI:
bs.obj( 'VALI', (function(trim){
	var set = {}, rules = {}, key = function(k){
		switch( typeof k ){
		case'function':return key(k());
		case'number':return k;
		case'string':return k.indexOf('|') > -1 ? ( k = k.split('|'), bs.Dom(k[0]).S(k[1]||'@value') ) : k;
		case'object':return  k.instanceOf == bs.Dom ? k.S('@value') : k.value;
		}
	}, parse = function(v){
		var t0, t1, t2, i;
		t0 = v.split('|'), t0.arg = t1 = {}, i = t0.length;
		while( i-- ){
			t2 = t0[i].split('['), t0[i] = rules[t2[0]];
			if( t2 = t2[1] ) t1[i] = t2.substr( 0, t2.length - 1 ).split(',');
		}
		return t0;
	}, rule = function(k, v){
		var t0 = typeof v == 'function' ? v :
			v instanceof RegExp ? function(data){return v.test(data);} :
			v.splice ? function(data){return v.indexOf(data) > -1;} :
			function(data){return data == v;};
		t0.id = k;
		return t0;
	}, vali = {
		error:0,
		run:function( t, v, arg ){
			var err = vali.error = {length:0}, type, r, rule, i, j, k;
			if( typeof v == 'function' ) r = v;
			else v = v.replace( trim, '' ), type = ( r = rules[v] ) ? 0 : ( r = set[v] ) ? 1 : ( r = parse(v), 2 );
			for( k in t )
				if( type ){
					for( rule = type == 2 ? r : r[k], i = 0, j = rule.length ; i < j ; i++ )
						if( !rule[i]( key(t[k]), rule.arg[i] ) ) err[k] = rule[i].id, err.length++;
				}else if( !r( key(t[k]), arg ) ) err[k] = v.id, err.length++;
			return err.length;
		},
		single:function( t, v, arg ){
			var err = vali.error = {length:0}, r, i, j;
			if( r = typeof v == 'function' ? v : rules[v] || 0 ){
				if( !r( key(t), arg ) ) err[t] = v.id, err.length++;
			}else for( r = parse(v), i = 0, j = r.length ; i < j ; i++ )
				if( !r[i]( key(t), r.arg[i] ) ) err[t] = r[i].id, err.length++;
			return err.length;
		},
		set:function(){
			var t0, t1, t2, i = 0, j = arguments.length, k, v, m, n, o, p;
			while( i < j ){
				k = arguments[i++], v = arguments[i++];
				if( v === null ) delete set[k];
				else for( m in v ){
					t0 = v[m].split('|'), t0.arg = t1 = {}, n = t0.length;
					while( n-- ){
						t2 = t0[n].split('['), t0[n] = rules[t2[0]];
						if( t2 = t2[1] ) t1[n] = t2.substr( 0, t2.length - 1 );
					}
					v[m] = t0, set[k] = v;
				}
			}
		},
		rule:function(){
			var i = 0, j = arguments.length, k, v;
			while( i < j ){
				k = arguments[i++], v = arguments[i++];
				if( v ) rules[k] = rule(k,v);
			}
			return rules[k];
		}
	};
	return vali;
})(trim) );