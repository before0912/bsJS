bs.obj( 'WIN', (function(){
		var win, wdata = {}, ddata = {}, ev = {};
		win = {
			ev:function( k, v ){ev[k] ? err( 2401, k ) : ev[k] = v;},
			on:function( k, v, isDoc ){
				var data, t0, t1, k0, g, c, m, a, d;
				( isDoc || k.substr(0,3) == 'key' ) ? ( data = ddata, d = doc ) : ( data = wdata, d = W );
				if( 'on' + k in d || k.indexOf(':') > -1 ) attrs[k] = 2;
				else return err( 4001, k );
				if( !( t0 = data.BSdomE ) ) data.BSdomE = t0 = bs.ev.dom(d);
				k0 = k, g = ( t1 = k0.indexOf(':') ) > -1 ? ( k = k0.substring( 0, t1 ), k0.substr( t1 + 1 ) ) : '';
				if( v ) v.splice ? ( m = v[1], a = v, c = v[0] || d ) : v[k] ? ( m = v[k], c = v ) : ( m = v, c = d );
				if( t1 = ev[k] ){
					if( typeof t1 == 'function' ) return t1( t0, k, g, c, m, a );
					k = t1;
				}
				v ? t0.on( k, g, c, m, a ) : t0.off( k, g );
			},
			scroll:(function( W, root, docEl ){
				return function scroll(){
					switch( arguments[0] ){
					case'w':case'width':return Math.max( root.scrollWidth, root.clientWidth );
					case'h':case'height':return Math.max( root.scrollHeight, root.clientHeight );
					case'l':case'left':return docEl.scrollLeft || W.pageXOffset || 0;
					case't':case'top':return docEl.scrollTop || W.pageYOffset || 0;
					}
					W.scrollTo( arguments[0], arguments[1] );
				};
			})( W, 'scrollHeight' in doc.body ? doc.body : doc.documentElement, doc.documentElement ),
			domPoint:function( x, y ){return doc.elementFromPoint( x, y);}
		},
		win.sizer = (function( W, doc ){
			var t0 = {w:0, h:0}, t1, size, docEl, docBody;
			win.size = size = W['innerHeight'] === undefined ? (
				docEl = doc.documentElement, docBody = doc.body, t1 = {w:'clientWidth', h:'clientHeight'}, t1.width = t1.w, t1.height = t1.h,
				function(k){return k = t1[k] ? docEl[k] || docBody[k] : ( t0.w = docEl[t1.w] || docBody[t1.w], t0.h = docEl[t1.h] || docBody[t1.h], t0 );}
			) : ( t1 = {w:'innerWidth', h:'innerHeight'}, t1.width = t1.w, t1.height = t1.h,
				function(k){return k = t1[k] ? W[k] : ( t0.w = W[t1.w], t0.h = W[t1.h], t0 );}
			);
			return function(end){
				var f = function(){size(), end( t0.w, t0.h );}, id;
				win.on( 'resize', f );
				if( 'onorientationchange' in W ) win.on( 'orientationchange', f );
				size();
				if( t0.w && t0.h ) end( t0.w, t0.h );
				else id = setInterval( function(){
					size();
					if( t0.w && t0.h ) clearInterval(id), end( t0.w, t0.h );
				}, 1 );
			};
		})( W, doc );
		return win;
	})() ),