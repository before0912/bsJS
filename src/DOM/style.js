bs.cls( 'Style', function( fn, clsfn, bs ){
		var r = /-[a-z]/g, re = function(_0){return _0.charAt(1).toUpperCase();}, ss = doc.createElement('div').style,
		rn = /^([-]?[.0-9]+)([^-.0-9]*)$/g, rno = [], rne = function( $0, $1, $2){rno[0] = $1, rno[1] = $2;},
		b = doc.body.style, pf = detect.stylePrefix, key, conf = {key:{}, val:{}}, nopx = {}, keys = conf.key, vals = conf.val, t0, t1;
		clsfn.keys = keys,
		clsfn.fn = function( type, key, val ){
			conf[type][key] = val;
			if( type == 'key' ) attrs[key] = 1;
		},
		clsfn.key = key = function(k){
			var t0 = k.replace( r, re );
			return t0 in b || ( t0 = pf + t0.charAt(0).toUpperCase() + t0.substr(1) ) in b ? ( attrs[k] = 1, keys[k] = t0 ) : 0;
		},
		fn.NEW = function(){this.u = {};},
		fn.S = function( s, arg, i ){
			var t0, t1, u = this.u, k, v, j = arg.length;
			while( i < j ){
				k = arg[i++], v = arg[i++];
				if( t0 = keys[k] ){
					if( typeof t0 == 'function' ){
						t0( this, s, v );
						continue;
					}else k = t0;
				}else if( !( k = key(k) ) ) continue;
				if( v === null ) delete this[k], delete u[k], s[k] = '';
				else if( v === undefined ) v = this[k] === undefined ? rn.test( t0 = s[k] ) ? ( t0.replace( rn, rne ), u[k] = rno[1], this[k] = parseFloat(rno[0]) ) : ( u[k] = '', this[k] = t0 ) : this[k];
				else{
					if( t0 = typeof v == 'string' )
						if( t1 = vals[v.substr(0,4)] ) v = t1(v);
						else if( ( t1 = v.indexOf(':') ) > -1 ) u[k] = v.substr( t1 + 1 ), v = parseFloat(v.substr( 0, t1 ));
					if( u[k] === undefined ) u[k] = t0 ? '' : nopx[k] || ( ss[k] = '11px', ss[k] == '11px' ? 0 : ( nopx[k] = 1 ) ) ? '' : 'px';
					s[k] = ( this[k] = v ) + u[k];
				}
			}
			return v;
		},
		mk = function( s, k, v ){
			var t0 = k;
			if( k = keys[t0] ){if( typeof k == 'function' ) return k( this, s, v );}else if( !( k = key(t0) ) ) return 0;
			return '@r@';
		},
		t0 = {keys:keys, key:key, rn:rn, rno:rno, rne:rne, nopx:nopx, trim:trim, ss:ss},
		fn.g = comp( mk, {r:( t1 = ( function(){
			this[k] === undefined ? 
				( v = s[k] ) ? 
					rn.test(v) ? 
						( v.replace( rn, rne ), this.u[k] = rno[1], this[k] = parseFloat(rno[0]) ) : 
						( this.u[k] = '', this[k] = v ) : 
					( nopx[k] || ( ss[k] = '11px', ss[k] == '11px' ? 0 : ( nopx[k] = 1 ) ) ? ( this.u[k] = '', this[k] = '' ) : ( this.u[k] = 'px', this[k] = 0 ) ) : 
				this[k]
		}).toString() ).substring( t1.indexOf('this'), t1.lastIndexOf('}') )}, t0 ), 
		fn.s = comp( mk, {r:'s[k] = ( this[k] = v ) + u[k], v'}, t0 );
	} ),
	
	fn = bs.Style.fn;
	(function(trim){
		var r = /^[0-9.-]+$/, arg = {length:0};
		fn( 'key', 'style', function( self, style, v ){
			var t0, t1, i, j, k, v, v0;
			if( v ){
				if( typeof v == 'string' ){
					for( v = v.split(';'), i = 0, j = v.length, arg.length = 0 ; i < j ; i++ )
						arg[arg.length++] = ( t0 = v[i] ).substring( 0, t1 = t0.indexOf(':') ).replace( trim, '' ),
						arg[arg.length++] = r.test( t0 = t0.substr( t1 + 1 ).replace( trim, '') ) ? parseFloat(t0) : t0;
				}else if( v.splice ) arg = v;
				else{
					arg.length = 0;
					for( i in v ) arg[arg.length++] = i, arg[arg.length++] = v[i];
				}
				self.S( style, arg, 0 );
			}
		} ),
		fn( 'key', 'float', 'styleFloat' in doc.body.style ? 'styleFloat' : 'cssFloat' in doc.body.style ? 'cssFloat' : 'float' );
		if( !( 'opacity' in doc.body.style ) ){
			fn( 'key', 'opacity', function( self, style, v ){
				if( v === undefined ) return self.opacity;
				else if( v === null ) return delete self.opacity, style.filter = '', v;
				else return style.filter = 'alpha(opacity=' + parseInt( v * 100 ) + ')', self.opacity = v;
			} ),
			fn( 'val', 'rgba', function(v){
				var t0 = v.substring( v.indexOf('(') + 1, v.indexOf(')') ).split(',');
				t0[3] = parseFloat(t0[3]);
				return 'rgb('+parseInt((255+t0[0]*t0[3])*.5)+','+parseInt((255+t0[1]*t0[3])*.5)+','+parseInt((255+t0[2]*t0[3])*.5)+')';
			} );
		}
	})(trim);