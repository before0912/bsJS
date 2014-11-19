bs.ev( 'dom', function( fn, clsfn, bs ){
		var r = {length:0}, keyName = bs.KEY.code2name, keycode = bs.KEY.name2code, eName = {}, tInfo = {},
		evCat = {'touchstart':2,'touchend':1,'touchmove':1,'mousedown':4,'mouseup':3,'mousemove':3,'click':3,'mouseover':3,'mouseout':3},
		isChild = function( p, c ){
			if( c ) do if( c == p ) return 1; while( c = c.parentNode )
			return 0;
		}, docel=document.documentElement, page, layerX, layerY;
		detect.browser == 'ie' && detect.browserVer < 9  ? ( layerX = 'offsetX', layerY = 'offsetY' ) : ( page = 1, layerX = 'layerX', layerY = 'layerY' ),
		clsfn.fn = function( k, v ){attrs[k] = 2, eName[k] = v;},
		fn.key = function(k){return this.keyCode == keycode[k];},
		fn.eventKey = function(k){return k == 'ctrl' ? this.event.metaKey || this.event.ctrlKey : k == 'shift' ? this.event.shiftKey : k == 'button' ? this.event.button : 0;},
		fn.preventDefault = bs.DETECT.event ? function(){this.event.preventDefault();} : function(){this.event.returnValue = false;};
		fn.stop = bs.DETECT.event ? function(){this.event.stopPropagation();} : function(){this.event.cancelBubble = true;};
		fn.prevent = function(){this.preventDefault(), this.stop();},
		fn.domPoint = function(){return bs.WIN.domPoint( this.x - bs.WIN.scroll('l'), this.y - bs.WIN.scroll('t') );},
		fn.isRollover = function(){return !isChild( this, this.event.fromElement || this.event.relatedTarget );},
		fn.isRollout = function(){return !isChild( this, this.event.toElement || this.event.explicitOriginalTarget );},
		fn.on = function( type, group, context, method, arg ){
			type = eName[type] || ( eName[type] = type );
			this['+']( false, type, group, context, method, arg, 2 ), this._on(type);},
		fn.off = function( type, group ){
			type = eName[type] || ( eName[type] = type );
			if( !this['-']( false, type, group ) ) this._off(type);
		},
		fn._on = W['addEventListener'] ? function(k){this.dom.addEventListener( k, this.handleEvent, this.isCapture );} :
			W['attachEvent'] ? function(k){this.dom.attachEvent( 'on'+k, this.handleEvent );} : function(k){this.dom['on'+k] = this.handleEvent;},
		fn._off = W['addEventListener'] ? function(k){this.dom.removeEventListener( k, this.handleEvent, this.isCapture );} :
			W['attachEvent'] ? function(k){this.dom.detachEvent( 'on'+k, this.handleEvent );} : function(k){this.dom['on'+k] = null;},
		fn.END = function(){this.dom = this.handleEvent = null;},
		fn.NEW = function(d){
			var sf = this, t = trim;
			this.touches = tInfo, this.dom = d, this.isCapture = false, this.handleEvent = function(e){
				var e = sf.event = e || event, type = sf.type = e.type, typeCat = evCat[type], X, Y, x, y, t0, t1, t2, i, j = 2;
				if( typeCat ){ 
					if( typeCat < 3 ){
						while( j-- ){
							j ? ( t0 = e.changedTouches, t1 = sf ) : ( t0 = e.touches, t1 = tInfo ), t1.length = i = t0.length;
							while( i-- ) t1[i] = t2 = t0[i], t1['id'+i] = t2.identifier, x = 'x' + i, y = 'y' + i,
								t1[x] = X = t2.pageX, t1[y] = Y = t2.pageY, t1['c'+x] = t2.clientX, t1['c'+y] = t2.clientY, t1['l'+x] = t2.layerX, t1['l'+y] = t2.layerY,
								typeCat == 2 ? ( t1['_'+x] = X, t1['_'+y] = Y ) : ( t1['d'+x] = X - t1['_'+x], t1['d'+y] = Y - t1['_'+y], t1['m'+x] = X - t1['$'+x], t1['m'+y] = Y - t1['$'+y] ),
								t1['$'+x] = X, t1['$'+y] = Y;
							t1.id = t1.id0, t1.x = t1.x0, t1.y = t1.y0, t1.lx = t1.lx0, t1.ly = t1.ly0,
							t1.dx = t1.dx0, t1.dy = t1.dy0, t1.cx = t1.cx0, t1.cy = t1.cy0, t1.mx = t1.mx0, t1.my = t1.my0;
						}
					}else
						sf.length = 0, sf.cx = e.clientX, sf.cy = e.clientY, sf.length = 1,
						sf.x = X = page ? e.pageX : sf.cx + docel.scrollLeft, sf.y = Y = page ? e.pageY : sf.cy + docel.scrollTop,
						sf.lx = e[layerX], sf.ly = e[layerY],
						typeCat == 4 ? ( sf._x = X, sf._y = Y ) : ( sf.dx = X - sf._x, sf.dy = Y - sf._y, sf.mx = X - sf.$x, sf.my = Y - sf.$y ),
						sf.$x = X, sf.$y = Y;
				}
				if( d.value ) sf.value = d.value.replace( t, '' );	
				sf.keyName = keyName[sf.keyCode = e.keyCode], sf['~']( false, type );
			};
		};

	} ),
	
	fn = bs.ev.dom.fn;
	detect.device =='tablet' || detect.device=='mobile' ?
		( fn( 'down', 'touchstart' ), fn( 'up', 'touchend' ), fn( 'move', 'touchmove' ) ) :
		( fn( 'down', 'mousedown' ), fn( 'up', 'mouseup' ), fn( 'move', 'mousemove' ) );
	fn = bs.WIN.ev;	
	if( !'onorientationchange' in W ) fn( 'orientationchange', 'resize' );
	if( !'onhashchange' in W ) fn( 'hashchange', (function(){
		var id = -1, old;
		return function( e, k, g, c, m, a ){
			var t0, old;
			if( v ){
				e['+']( false, 'hashchange', g, c, m, a, 2 );
				old = location.hash;
				if( id == -1 ) id = setInterval( function(){
					if( old != location.hash ) e.type = 'hashchange', old = location.hash, e['~']( false, 'hashchange' );
				}, 1 );
			}else if( e['-']( false, 'hashchange', g ) == 0 ) clearInterval(id), id = -1;
		};
	})() );
	if( !'onscroll' in W ) fn( 'scroll', (function(){
		var id = -1;
		return function( e, k, g, c, m, a ){
			var t0, oldX = bs.WIN.scroll('l'), oldY = bs.WIN.scroll('t');
			if( v ){
				e['+']( false, 'scroll', g, c, m, a, 2 );
				if( id == -1 ) id = setInterval( function(){
					var x = bs.WIN.scroll('l'), y = bs.WIN.scroll('t');
					if( oldX != x || oldY != y ) oldX = x, oldY = y, e['~']( false, 'scroll' );
				}, 1 );
			}else if( e['-']( false, 'scroll', g ) == 0 ) clearInterval(id), id = -1;
		};
	})() );