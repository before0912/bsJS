bs.obj( 'MVC', (function(){
	var trigger = {}, view = {}, C = {}, M = {}, _all = {}, _alla = [_all], a = [], 
	m = function(){
		var t0, i = 0, j = arguments.length, k, v, m, n;
		while( i < j ){
			k = arguments[i++];
			if( i == j ) return M[k];
			M[k] = v = arguments[i++];
			if( t0 = trigger[k] )
				if( t0[0] == _all || t0[0] === v ){
					m = 1, n = t0.length, a.length = 0, a[0] = v;
					while( m < n ) a[a.length] = M[t0[m++]];
					view[k].apply( null, a );
				}
		}
		return v;
	};
	return {
		all:function(){return _all},
		router:function( k, arg ){
			var t0;
			if( this.nodeType ) k.prevent(), t0 = bs.Dom.pool('@BSMVC', this ), k = t0.S('*bsMVC:route'), arg = t0.S('*bsMVC:param');
			C[k]( m, arg );
		},
		routerPoint:function(e){
			var t0 = bs.Dom.pool( '@BSMVC', e.domPoint() ), k;
			if( k = t0.S('*bsMVC:route') ) bs.MVC.router( k, t0.S('*bsMVC:param') );
		},
		toggle:function(k){return ( M[k] = M[k] ? 0 : 1 ) ? 0 : 1;},
		c:function(){
			var i = 0, j = arguments.length;
			while( i < j ) C[arguments[i++]] = arguments[i++];
		},
		v:function( k, v ){
			var t0, i, j = arguments.length;
			view[k] = arguments[1];
			if( j > 2 ){
				t0 = [], i = 2;
				while( i < j ) t0[t0.length] = arguments[i++];
				trigger[k] = t0;
			}else trigger[k] = _alla;
		}
	};
})() );