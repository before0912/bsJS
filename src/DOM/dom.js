var DOM = function(){
	var attrs = {};
	
	
	
	
	
	bs.cls( 'Dom', function( fn, clsfn, bs ){
		var ev = bs.ev, del, dom, domData, first = {}, childS;
		
		clsfn.fn = function( type, k, v ){
			if( type == 'key' ) attrs[k] = attrs[k] ? err( 2300, k ) : v;
			else if( type == 'first' ) first[k] = first[k] ? err( 2301, k ) : v;
		},
		clsfn.del = del = (function( domData, ev ){
			var m = {'object':1, 'function':1};
			return function(target){
				var data, t0, t1, i = target.length, j, k;
				while( i-- ){
					t0 = target[i], t0.parentNode.removeChild(t0);
					if( t0.nodeType == 3 ) continue;
					if( data = t0.getAttribute('data-bs') ){
						if( t1 = data.BSdomE ) data.BSdomE = null, ev(t1);
						domData( t0, null );
					}
					j = t0.attributes.length;
					while( j-- ) m[typeof t0.getAttribute( k = t0.attributes[j].nodeName )] ? t0.removeAttribute(k) : 0;
				}
				if( target.END ) target.END();
			};
		})( domData, ev ),
		
		
		clsfn.dom = dom = (function( query, html ){
			var n = {length:0}, dom = function( sel ){
				return typeof sel == 'string' ? sel.charAt(0) == '<' ? html(sel) : query(sel) : 
					sel['nodeType'] == 1 ? ( n[0] = sel, n.length = 1, n ) : 
					sel['instanceOf'] == bs.Dom || sel.length ? sel : null;
			};
			return dom;
		})( clsfn.query, clsfn.html ),
		clsfn.tagNodes = (function(){
			var nodes = [];
			return function(n){
				var i, j;
				for( nodes.length = i = 0, j = n.length ; i < j ; i++ ) if( n[i].nodeType == 1 ) nodes[nodes.length] = n[i];
				return nodes;
			}
		})(),
		fn.NEW = function(key){
			var t0 = dom(key), i = this.length = t0.length;
			if( t0['instanceOf'] == bs.Dom ) return t0;
			while( i-- ) this[i] = t0[i];
		},
		clsfn.pool = (function(){
			var pool = {}, node = function( t0, v ){
				var i, j;
				if( v.nodeType ) t0[t0.length + 'data'] = 0, t0[t0.length++] = v;
				else if( typeof v == 'string' ){
					for( v = clsfn.dom(v), i = 0, j = v.length ; i < j ; i++ ) t0[t0.length + 'data'] = 0, t0[t0.length++] = v[i];
				}else if( typeof v == 'object' && ( j = v.length ) ){
					for( i = 0 ; i < j ; i++ ) node( t0, v[i] );
				}
			};
			return function(k){
				var t0 = pool[k] || ( pool[k] = bs.Dom(doc.body) ), i, j;
				t0.length = t0.filter_ = t0.child_ = 0;
				if( ( j = arguments.length ) > 1 ) for( i = 1 ; i < j ; i++ ) node( t0, arguments[i] );
				return t0;
			};
		})(),
		fn.filter = function( v, noCache ){
			var V, d, t, t0, i, j, k;
			if( !this.filter_ ) this.filter_ = {};
			if( !( d = this.filter_[V = v] ) || noCache ){
				if( typeof v == 'number' ) d = {length:1, 0:this[v]};
				else{
					for( d = {}, k = i = 0, j = this.length, t = v.charAt(0) == '.' ? ( v = v.substr(1), 0 ) : v.indexOf('=') > -1 ? ( v = v.split('='), 1 ) : ( v = v.toLowerCase(), 2 ) ; i < j ; i++ )
						if(
							( t == 0 && ( t0 = this[i].className ) && ( t0 = t0.split(' '), t0.indexOf(v) > -1 ) ) ||
							( t == 1 && bs.Dom.pool( '@DomFilter', this[i] ).S(v[0]) == v[1] ) || ( t == 2 && this[i].tagName.toLowerCase() == v )
						) d[k++] = this[i];
					d.length = k, this.filter_[V] = d;
				}
			}
			return bs.Dom.pool( '@DomFilter', d );
		},
		fn.child = function( v, noCache ){
			var V, d, s, t, t0, t1, i, j, k, m, n;
			if( !this.child_ ) this.child_ = {};
			if( !( d = this.child_[V = v] ) || noCache ){
				for( d = {}, k = i = 0, j = this.length, t = typeof v == 'number' ? 0 : v == '$' ? 1 : v.charAt(0) == '.' ? ( v = v.substr(1), 2 ) : v.indexOf('=') > -1 ? ( v = v.split('='), 3 ) : ( v = v.toLowerCase(), 4 ) ; i < j ; i++ ){
					t0 = clsfn.tagNodes(this[i].childNodes);
					if( t == 0 ) d[k++] = t0[v];
					else if( t == 1 ) d[k++] = t0[t0.length - 1];
					else for( m = 0, n = t0.length ; m < n ; m++ ){
						if(
							( t == 2 && ( t1 = t0[m].className ) && ( t1 = t1.split(' '), t1.indexOf(v) > -1 )  ) ||
							( t == 3 && bs.Dom.pool( '@DomChild', t0[m] ).S(v[0]) == v[1] ) ||
							( t == 4 && t0[m].tagName.toLowerCase() == v ) 
						) d[k++] = t0[m];
					}
				}
				d.length = k, this.child_[V] = d;
			}
			return bs.Dom.pool( '@DomChild', d );
		},
		fn.S = comp( function(){
			var ktype = ktypes._l ? ktypes[--ktypes._l] : [], d, data, target, type, t0, t1, t2, l, i0, i, j, k, v, k0, v0, m, a, g;
			if( ( i = arguments[0] ) === null ) return del(this);
			l = this.length, i0 = 0;
			j = arguments.length, ktype.length = 0;
			while( l-- ){
				d = this[l], data = this[l + 'data'] || ( this[l + 'data'] = domData(d) ), i = i0, arg.length = 0;
				while( i < j ){
					k = arguments[i];
					if( !( type = ktype[i] ) ) type = ktype[i] = attrs[k] || first[k.charAt(0)] || ( 'on' + k in d ? attrs[k] = 2 : k.indexOf(':') > -1 ? 2 : 1 );
					if( ++i == j ) return '@pool@', arg.length ? '@sSet@' : 0, type == 1 ? '@sGet@' : type == 2 ? 0 : type == 3 ? this : '@tGet@';
					v = arguments[i++];
					if( type == 2 ){
						if( !( t0 = data.BSdomE ) ) data.BSdomE = t0 = ev(d);
						if( k == 'event' ) for( i in v ) t0.on( k, '', v, v[i] );
						else g = ( t1 = k.indexOf(':') ) > -1 ? ( k = k.substring( 0, t1 ), k.substr( t1 + 1 ) ) : '',
							v ? t0.on( k, g, v.splice ? ( m = v[1], a = v, v[0] || d ) : v[k] ? ( m = v[k], v ) : ( m = v, d ), m, a ) : t0.off( k, g );
					}else{
						if( ( t0 = typeof v ) == 'function' ) v = v( type == 1 ? '@sGet@' : '@tGet@', d );
						else if( t0 == 'string' && v.charAt(0) == '{' && exop[v.charAt(1)] && v.charAt( t1 = v.length - 1 ) == '}' ){
							v0 = type == 1 ? '@sGet@' : '@tGet@',
							v = ( k0 = v.charAt(1) ) == '=' ? v0 : (
								v0 = parseFloat(v0), v = parseFloat(v.substring( 2, t1 )),
								k0 == '+' ? v0 + v : k0 == '-' ? v0 - v : k0 == '*' ? v0 * v : k0 == '/' ? v0 / v : 0
							);
						}
						v =  type == 1 ? ( arg[arg.length++] = k, arg[arg.length++] = v ) : type( d, k, v );
					}
				}
				'@sSet@';
			}
			return '@pool@', v;
		}, {
			sGet:'( data.BSdomS || ( data.BSdomS = bs.Style() ) ).g( d.style, k )', tGet:'type( d, k )',
			sSet:'arg.length ? ( data.BSdomS || ( data.BSdomS = bs.Style() ) ).S( d.style, arg, 0 ) : 0',
			pool:'ktypes[ktypes._l++] = ktype'
		}, {childS:childS, ev:bs.ev.dom, domData:domData, style:bs.Style.keys, attrs:attrs, first:first, ktypes:{_l:0}, arg:{length:0}, del:del, exop:{'+':1,'-':1,'*':1,'/':1,'=':1} } );
	} ),
	
},

fn = bs.Dom.fn;
	(function(trim){
		var k, x, y, t = detect.text, ds0 = {}, del = bs.Dom.del, html = bs.Dom.html, dom = bs.Dom.dom, tagNodes = bs.Dom.tagNodes, ev = bs.ev.dom, t0, t1, t2;
		for( k in t0 = {
			'event':2, 'this':3,
			isCapture:function(d){
				var t0 = bs.Dom.data(d), t1 = t0.BSdomE;
				return arguments.length == 1 ? t1 ? t1.isCapture : 0 : ( t1 || ( t0.BSdomE = ev(d) ) ).isCapture = arguments[1];
			},
			x:x = function(d){var i = 0; do i += d.offsetLeft; while( d = d.offsetParent ) return i;},
			y:y = function(d){var i = 0; do i += d.offsetTop; while( d = d.offsetParent ) return i;},
			lx:function(d){return x(d) - x(d.parentNode);},
			ly:function(d){return y(d) - y(d.parentNode);},
			w:function(d){return d.offsetWidth;}, 
			h:function(d){return d.offsetHeight;},
			s:function(d){d.submit();},
			f:function(d){d.focus();},
			b:function(d){d.blur();},
			html:function( d, k, v ){return v === undefined ? d.innerHTML : html( v, d, 'html' );},
			'html+':function( d, k, v ){return html( v, d, 'html+' );},
			'+html':function( d, k, v ){return html( v, d, '+html' );},
			'class':function( d, k, v ){return v === undefined ? d.className : ( d.className = v );},
			'class+':function( d, k, v ){
				var t0;
				return !( t0 = d.className.replace( trim, '' ) ) ? ( d.className = v ) : t0.split(' ').indexOf(v) == -1 ? ( d.className = v + ' ' + t0 ) : t0;
			},
			'class-':function( d, k, v ){
				var t0, i;
				if( !( t0 = bs.trim(d.className) ) ) return t0;
				t0 = t0.split(' '); 
				if( ( i = t0.indexOf(v) ) > -1 ) t0.splice( i, 1 );
				return d.className = t0.join(' ');
			},
			dispatch:(function(){
				var mk = doc.createEvent ? function(v){
					var e = doc.createEvent('HTMLEvents');
					return e.initEvent(v,true,true), e;
				} : doc.createEventObject ? function(v){
					var e = doc.createEventObject();
					return e.eventType = v, e;
				} : function(){},
				fire = doc.dispatchEvent ? function( d, e ){d.dispatchEvent(e);} : doc.fireEvent ? function( d, e ){d.fireEvent( 'on' + e.eventType, e );} : 0;
				return function( d, k, v ){if( k = mk(v) ) k.eventName = v, fire( d, k );};
			})()
		} )if( t0.hasOwnProperty(k) ) fn( 'key', k, t0[k] );
		fn( 'key', 'before', comp( t0 = function( d, k, v ){
			var p, t0, i, j;
			if( v === undefined ) return '@a@';
			if( v === null ) return d.parentNode.removeChild('@a@');
			if( ( p = d.parentNode ) && ( t0 = dom(v) ) && ( j = t0.length ) ) for( '@b@', i = 0 ; i < j ; i++ ) p.insertBefore( t0[i], d );
		}, t1 = {a:'d.previousSibling', b:0}, t2 = {dom:dom} ) ),
		fn( 'key', 'after', comp( t0, ( t1.a = 'd.nextSibling', t1.b = 'd = d.nextSibling', t1 ), t2 ) );
		for( k in t0 = {
			'@':(function(){
				var key = {'value':1, 'checked':1, 'selected':1};
				return function( d, k, v ){
					k = k.substr(1);
					if( v === undefined ) v = d[k] || d.getAttribute(k);
					else if( v === null ){
						d.removeAttribute(k);
						try{delete d[k];}catch(e){};
					}else d[k] = v, key[k] || d.setAttribute( k, v );
					return v;
				};
			})(),
			'*':(function(){
				return comp( function( d, k, v ){
					var t0, i;
					k = '@k@',
					t0 = bs.Dom.data(d).BSdataset || ( bs.Dom.data(d).BSdataset = {} );
					if( v === undefined ) v = '@get@' || t0[k];
					else if( v === null ) '@del@', delete t0[k];
					else type[typeof v] ? ( t0[k] = v ) : ( '@set@' );
					return v;
				}, detect.customData ? {
					k:'k.substr(1).toLowerCase().replace( r, re )', 
					get:'d.dataset[k]', del:'d.dataset[k]', set:'d.dataset[k] = v'
				} : {
					k:"'data-' + k.substr(1).toLowerCase()", 
					get:'d.getAttribute(k)', del:'d.removeAttribute(k)', set:'d.setAttribute( k, v )'
				}, {
					r:/-[a-zA-Z]/g,
					re:function(_0){return _0.charAt(1).toUpperCase();},
					type:{'function':1, 'object':1}
				} );
			})(),
			'_':( function( view, key ){
				return doc.defaultView && doc.defaultView.getComputedStyle ? function( d, k ){return view.getComputedStyle( d, '' ).getPropertyValue(k.substr(1));} :

					function( d, k ){return d.currentStyle[key(k.substr(1))];};
			} )( doc.defaultView, bs.Style.key ),
			'<':function( d, k, v ){
				var t0;
				if( v ){
					if( d.parentNode ) d.parentNode.removeChild(d);
					return t0 = dom(v), t0[0].appendChild(d), t0;
				}else return d.parentNode;
			},
			'>':(function(){
				var nodes = [];
				return function( d, k, v ){
					var data, r, i, j, m, n;
					k = k.substr(1), i = tagNodes(d.childNodes);
					if( k == '$' ) k = i.length - 1;
					if( v ){
						if( k ) return bs.Dom(i[k]).S(v);
						else if( d.nodeName.toLowerCase() == 'table' && typeof v == 'string' ) return html( v, d, '>' );
						else{
							for( t0 = dom(v), i = 0, j = t0.length ; i < j ; i++ ) d.appendChild(t0[i]);
							return t0;
						}
					}else if( v === null ){
						if( k ) nodes[0] = i[k], nodes.length = 1, del(nodes);
						else if( d.childNodes && i.length ) del(i);
					}else return k ? ( nodes[0] = i[k], nodes.length = 1, nodes ) : i;
				}
			})()
		} )if( t0.hasOwnProperty(k) ) fn( 'first', k, t0[k] );
	})(trim);