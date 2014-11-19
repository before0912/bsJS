
(function(){

ANIMATE = function(){
	var start, end, ltype, loop, ease, ex, tweenS, tweenANI, isLive, isPause, tween, ANI, mk0, mk1, i, 
		ani = [], time = 0, timer = 'equestAnimationFrame', pool = {length:0}, fprev = 0;
	if( timer = W['r' + timer] || W[bs.DETECT.stylePrefix + 'R' + timer] )
		start = function(){if( !isLive ) isPause = 0, isLive = 1, loop();},
		end = function(){ani.length = isLive = 0;},
		ltype = 1;
	else
		start = function start(){if( !isLive ) isLive = setInterval( loop, 16 );},
		end = function end(){if( isLive ) clearInterval(isLive), ani.length = isLive = 0;};
	loop = function(T){
		var t, t0, i, j, k;
		if( isPause ) return;
		if( isLive ){
			t = ltype ? time ? T + time : ( time = Date.now() - T, time + T ) : +new Date, 
			i = parseInt( 1000 / ( ( t - fprev ) || 1 ) ), fprev = t;
			if( i > 30 ){
				j = ( k = i = ani.length ) % 8;
				while( j-- ) if( ani[--k].ANI(t) ) ani.splice( k, 1 );
				j = ( i * 0.125 ) ^ 0;
				while(j--){
					if( ani[--k].ANI(t) ) ani.splice( k, 1 ); if( ani[--k].ANI(t) ) ani.splice( k, 1 );
					if( ani[--k].ANI(t) ) ani.splice( k, 1 ); if( ani[--k].ANI(t) ) ani.splice( k, 1 );
					if( ani[--k].ANI(t) ) ani.splice( k, 1 ); if( ani[--k].ANI(t) ) ani.splice( k, 1 );
					if( ani[--k].ANI(t) ) ani.splice( k, 1 ); if( ani[--k].ANI(t) ) ani.splice( k, 1 );
				}
			}
			ani.length ? ltype ? timer(loop) : 0 : end();
		}
	},
	ease = {},
	ex = function( v, v0, t ){
		var t0;
		if( ( t0 = typeof v ) == 'number' ) return v;
		else if( t0 == 'string' ){
			if( v.charAt(0) == '{' ){
				v = ( t0 = v.charAt(1) ) == '=' ? v0 : (
					v = parseFloat(v.substring( 2, v.length - 1 )),
					t0 == '+' ? v0 + v : t0 == '-' ? v0 - v : t0 == '*' ? v0 * v : t0 == '/' ? v0 / v : 0
				);
			}else return parseFloat(v);
		}else if( t0 == 'function' ) return v( v0, t );
		return v;
	},
	tweenS = function( tw, arg ){
		var t0, t1, l, i, j, k, v, v0, v1;
		tw.t = t0 = '@target@',
		tw.bezier = tw.circle = tw.delay = tw.stop = tw.yoyo = tw.pause = 0, tw.group = tw.end = tw.update = null, tw.ease = ease.linear,
		tw.time = 1000, tw.timeR = .001, tw.loop = tw.loopC = 1, tw.length = l = t0.length || 1;
		while(l--) tw[l] ? tw[l].length = 0 : tw[l] = [], tw[l][0] = '@targetAni0@', tw[l][1] = '@targetAni1@';
		i = 1, j = arg.length;
		while( i < j ){
			k = arg[i++], v = arg[i++];
			if( tween[k] ){
				k == 'time' ? ( tw.time = parseInt( v * 1000 ), tw.timeR = 1 / tw.time ) :
				k == 'ease' ? tw.ease = ease[v] :
				k == 'id' || k == 'end' || k == 'update' ? tw[k] = v :
				k == 'loop' ? tw.loop = tw.loopC = v :
				k == 'delay' ? tw.delay = parseInt( v * 1000 ) :
				k == 'group' || k == 'yoyo' || k == 'bezier' || k == 'circle' ? tw[k] = v : 0
			}else{
				l = tw.length;
				while( l-- ){
					t0 = tw[l], t0[t0.length] = '@key@', v0 = '@from@';
					if( typeof v == 'string' && v.indexOf(',') > -1 ) v = v.split(','), t0[t0.length] = v1 = ex( v[0], v0 ), t0[t0.length] = ex( v[1], v0 ) - v1;
					else t0[t0.length] = v0, t0[t0.length] = ex( v, v0, tw.t[l] ) - v0;
					t0[t0.length] = '@option@';
				}
			}
		}
		tw.keyLen = tw[0].length, tw.etime = ( tw.stime = Date.now() + tw.delay ) + tw.time;
		if( t0 = tw.circle ){
			if( i = t0.center ) i = i.split(','), t0.centerX = parseFloat(i[0]), t0.centerY = parseFloat(i[1]);
			if( i = t0.offset ) i = i.split(','), t0.offsetX = parseFloat(i[0]), t0.offsetY = parseFloat(i[1]);
			if( i = t0.angle ) i = i.split(','), t0.angle0 = parseFloat(i[0]), t0.angle1 = parseFloat(i[1]);
			if( i = t0.radius ) i = i.split(','), t0.radius0 = parseFloat(i[0]), t0.radius1 = parseFloat(i[1]);
			t0.angle0 *= toRadian, t0.angle1 *= toRadian, t0.angle2 = t0.angle1 - t0.angle0, t0.radius2 = t0.radius1 - t0.radius0, '@circle@';
		}else if( t0 = tw.bezier ){
			t1 = tw.bezier0 || ( tw.bezier0 = [] ), t1.length = 0;
			for( i  in t0 ){//key, array, rate, val, isFunction
				if( ( l = t0[i].length ) != 3 ) bs.err(1);
				t1.push( '@bezierKey@', t0[i], 1 / t0[i].length, 0, '@bezierOption@' ); 
			}
		}
		return tw.ANI = '@setAni@', tw;
	},
	tweenANI = function( T, pause ){
		var t0, t1, term, time, rate, i, j, l, k, v, e, s, u, 
			circle, ckx, cky, cvx, cvy, 
			bezier, bv0, bv1, bv2, bt, bl, br;
		if( this.stop ) return 1;
		if( pause )
			if( pause == 1 && this.pause == 0 ) return this.pause = T, 0;
			else if( pause == 2 && this.pause ) t0 = T - this.pause, this.stime += t0, this.etime += t0, this.pause = 0;
		if( this.pause || ( term = T - this.stime ) < 0 ) return;
		l = this.length, j = this.keyLen, circle = this.circle, bezier = this.bezier, e = this.ease;
		if( term > ( time = this.time ) ){
			if( bezier ) bt = this.bezier0, bl = bt.length;
			if( --this.loopC ){
				if( this.yoyo ){
					while( l-- ){
						t0 = this[l], i = 2;
						while( i < j ) t0[i + 1] +=  t0[i + 2], t0[i + 2] *= -1, i += 4;
					}
					if( circle ) t0 = circle.angle1, circle.angle1 = circle.angle0, circle.angle0 = t0, circle.angle2 *= -1,
						t0 = circle.radius1, circle.radius1 = circle.radius0, circle.radius0 = t0, circle.radius2 *= -1;
					if( bezier ) for( i = 0 ; i < bl ; i += 5 ) j = bt[i + 2][2], bt[i + 2][2] = bt[i + 2][0], bt[i + 2][0] = j;
				}
				return this.stime = T + this.delay, this.etime = this.stime + this.time, 0;
			}else{
				if( circle ) cvx = circle.centerX + circle.offsetX + cos(circle.angle1) * circle.radius1, ckx = circle.x,
					cvy = circle.centerY + circle.offsetY + sin(circle.angle1) * circle.radius1, cky = circle.y
				while( l-- ){
					t0 = this[l], i = 2, t1 = t0[0], '@aniTarget@';
					while( i < j ) k = t0[i++], v = t0[i++] + ( e.roll ? 0 : t0[i] ), i++, '@ani@';
					if( circle ) '@aniCircle@';
					if( bezier ) for( i = 0 ; i < bl ; i += 5 ) k = bt[i], v = bt[i + 2][2], '@aniBezier@';
				}
				'@aniEnd@';
				if( this.end ) this.end( this.t, 1, T );
				pool[pool.length++] = this;
				return 1;
			}
		}
		rate = term * this.timeR;
		if( circle ) i = e( rate, circle.angle0, circle.angle2, term, time ), j = e( rate, circle.radius0, circle.radius2, term, time ),
			cvx = circle.centerX + circle.offsetX + cos(i) * j, ckx = circle.x, cvy = circle.centerY + circle.offsetY + sin(i) * j, cky = circle.y;
		if( bezier ) bv1 = 2 * ( rate - ( bv0 = rate * rate ) ), bv2 = 1 - 2 * rate + bv0, bt = this.bezier0, bl = bt.length;
		while( l-- ){
			t0 = this[l], i = 2, t1 = t0[0], '@aniTarget@';
			while( i < j ) k = t0[i++], v = e( rate, t0[i++], t0[i++], term, time ), '@ani@';
			if( circle ) '@aniCircle@';
			if( bezier ) for( i = 0 ; i < bl ; i += 5 ) k = bt[i], t1 = bt[i + 1], v = t1[2] * bv0 + t1[1] * bv1 + t1[0] * bv2, '@aniBezier@';
		}
		'@aniEnd@';
		if( this.update ) this.update( this.t, rate, T );
	},
	mk0 = function( p0, p1 ){
		return function(){
			var i = ani.length, t = Date.now();
			isPause = p0; while( i-- ) ani[i].ANI( t, p1 );
			if( p0 == 0 ) loop();
		};
	},
	mk1 = function(p){
		return function(){
			var t0, t, i, j, k;
			i = ani.length, j = arguments.length;
			while( i-- ){
				t0 = ani[i], k = j;
				while( k-- ) if( t0.id == arguments[k] || t0.t[0] == arguments[k] ) p ?
					( t = Date.now(), ( p == 1 ? t0.ANI( t, 1 ) : p == 2 ? ani[i].ANI( t, 2 ) : ani[i].ANI( t, ani[i].pause ? 2 : 1 ) ) ) :
					( pool[pool.length++] = t0, t0.stop = 1, ani.splice( i, 1 ) );
			}
		}
	},
	ANI = {
		ani:function(v){if(v.ANI) ani[ani.length] = v, start()},
		fn:(function(){
			var keys = 'target,targetAni0,targetAni1,key,from,option,circle,bezierKey,bezierOption,aniTarget,ani,aniCircle,aniBezier'.split(','), keyLen = keys.length, check = function(tmpl){
				var i = keyLen;
				while( i-- ) if( !( keys[i] in tmpl ) ) return 0;
				return 1;
			}, tween = function(){}, opt = {
				ease:ease, tween:tween, ex:ex, tweenANI:tweenANI,
				toRadian:Math.PI/180, cos:bs.cos, sin:bs.sin,
				style:bs.Style.keys, pool:pool
			}, t0 = 'id,time,ease,delay,loop,end,update,yoyo,path,circle,bezier'.split(','), i = t0.length;
			while( i-- ) tween[t0[i]] = 1;
			return function( type, tmpl ){
				if( !check(tmpl) ) return err(1);
				tmpl.setAni = 'tweenANI.' + type, tweenS[type] = comp( tweenS, tmpl, opt ), tweenANI[type] = comp( tweenANI, tmpl, opt ),
				ANI[type] = function(){
					var t0 = ani[ani.length] = pool.length ? pool[--pool.length] : new tween;
					return tweenS[type]( t0, arguments ), start(), t0;
				};
			};
		})(),
		pause:mk0( 1, 1 ), resume:mk0( 0, 2 ), tweenStop:mk1(0), tweenPause:mk1(1), tweenResume:mk1(2), tweenToggle:mk1(3),
		toggle:function(){return isPause ? ANI.resume() : ANI.pause(), isPause;},
		stop:function(){end();},
		ease:function( k, v, isRoll ){v ? ease[k] ? err( 2501, k ) : ease[k] = v : ease[k], v.roll = isRoll;}
	};
	return ANI;
},

bs.ANI.fn( 'style', {
		target:'arg[0].instanceOf == bs.Dom ? arg[0] : bs.Dom(arg[0])',
		targetAni0:'bs.Dom.data(t0[l]).BSdomS', targetAni1:'t0[l].style',
		key:'style[k]', from:'t0[0].g( t0[1], k )', option:'typeof style[k] == "function" ? 1 : 0',
		circle:'t0.x0 = typeof ( t0.x = style[t0.x] ) == "function" ? 1 : 0, t0.y0 = typeof ( t0.y = style[t0.y] ) == "function" ? 1 : 0',
		bezierKey:'style[i]', bezierOption:'typeof style[i] == "function" ? 1 : 0',
		aniTarget:'s = t0[1], u = t1.u', ani:'t0[i++] ? k( t1, s, v ) : s[k] = v + u[k], t1[k] = v',
		aniCircle:'t1[ckx] = cvx, circle.x0 ? ckx( t1, cvx ) : s[ckx] = cvx + u[ckx], t1[cky] = cvy, circle.y0 ? cky( t1, cvy ) : s[cky] = cvy + u[cky]',
		aniBezier:'bt[i + 4] ? k( t1, s, v ) : s[k] = v + u[k], t1[k] = v',
		aniEnd:'0'
	} ),
	bs.ANI.fn( 'scroll', {
		target:'bs.ANI.scroll.t ? ( bs.ANI.scroll.t.l = bs.ANI.scroll.t.t = 0, bs.ANI.scroll.t ) : ( bs.ANI.scroll.t = {l:0, t:0} )',
		targetAni0:'t0', targetAni1:'t0',
		key:'k', from:'bs.WIN.scroll(k)', option:'0',
		circle:'0',
		bezierKey:'i', bezierOption:'0',
		aniTarget:'0', ani:'t1[k]=v,i++',
		aniCircle:'t1[ckx]=cvx,t1[cky]=cvy',
		aniBezier:'t1[k] = v',
		aniEnd:'t1 = this[0][0],bs.WIN.scroll(t1.l,t1.t)'
	} );