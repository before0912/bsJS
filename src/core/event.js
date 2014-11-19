
EVENT:
fn( 'ev', (function(){
	var pool = {}, f, on = function(){this.a = [];}, ev = function(){}, fn = ev.prototype;
	on._l = 0,  fn.NEW = fn.END = none,
	fn['+'] = function( channel, type, group, context, method, arg, i ){
		var t0 = this.o[channel] || ( this.o[channel] = {_l:0} ), t1 = on._l ? on[--on._l] : new on, j;
		if( !t0[type] ) t0[type] = t0._l++;
		if( !t0[t0[type]] ) t0[t0[type]] = [];
		t0 = t0[t0[type]], t0[t0.length] = t1, t1.g = group, t1.c = context,
		t1.m = typeof method == 'function' ? method : context[method], t0 = t1.a;
		if( arg ){
			i = i || 2, j = arg.length;
			while( i < j ) t0[t0.length] = arguments[i++];
		}
		return t0[t0.length] = this, t1;
	}, fn['-'] = function( channel, type, group, listener ){
		var t0 = this.o[channel], t1, i;
		if( t0 && ( t0 = t0[t0[type]] ) ){
			i = t0.length;
			if( group ){
				while( i-- ) if( ( t1 = t0[i] ).g == group && ( !listener || t1 == listener ) ) on[on._l++] = ( t0.splice( i, 1 ), t1.c = t1.m = t1.g = null, t1.a.length = 0, t1 );
				return t0.length;
			}else{
				while( i-- ) if( !listener || t1 == listener ) on[on._l++] = ( ( t1 = t0[i] ).c = t1.m = t1.g = null, t1.a.length = 0, t1 );
				return t0.length = 0;
			}
		}else return -1;
	}, fn['~'] = function( channel, type, group ){
		var t0 = this.o[channel], i = 0, j, k;
		t0 = t0[t0[type]], j = t0.length;
		if( group ) while( i < j ){if( ( k = t0[i++] ).g == group && k.m.apply( k.c, k.a ) ) return;} else while( i < j ){if( ( k = t0[i++] ).m.apply( k.c, k.a ) ) return;}
	}, f = function( k, v ){
		var cls, fn, t0, t1, i;
		if( f[k] ) err( 0, k );
		pool[k] = {_l:0}, cls = function(){this.o = {_l:0};}, fn = cls.prototype = new ev,
		f[k] = function(v){
			var t0, t1, i, m, n;
			if( v instanceof ev ){
				for( i in v.o ){
					t0 = v.o[i], m = t0._l;
					while( m-- ){
						n = t0[m].length;
						while( n-- ) on[on._l++] = ( t1 = t0[m][n] ).c = t1.m = t1.g = null, t1.a.length = 0, t1;
						t0[m].length = 0;
					}
				}
				pool[k][pool[k]._l++] = ( v.END(), v );
			}else return t0 = pool[k], t0 = t0._l ? t0[--t0._l] : new cls, t0.NEW.apply( t0, arguments ), t0;
		},
		v( t0 = {}, t1 = {}, bs );
		for( i in t0 ) if( t0.hasOwnProperty(i) ) fn[i] = t0[i];
		for( i in t1 ) if( t1.hasOwnProperty(i) ) f[k][i] = t1[i];
	};
	return f;
})() );