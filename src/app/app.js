fn( 'router', (function(){
	var M = (function(){
		var r0=/\\/g, r1=/["]|\n|\r\n|\r/g, r2=/at /g, r3=/["]|[<]|\t|[ ][ ]|\n|\r\n|\r/g, r4 = /\n|\r\n|\r/g, r5=/[<]|\t|[ ][ ]/g,
		e0 = '$$E[$$E.length]="<%', e1 = '%>";', e2 = 'OUT($$E[$$E.length]="', e3 = '"),$$L[0]+=', e4 = '}catch(e){return e;}',
		cache={}, begin = '<%', end = '%>',
		toC = {'"':'\\"','\n':'\\n','\r\n':'\\n','\r':'\\n'},
		toCode = function(v){return toC[v] || v;},
		toH = {'"':'\\"', '<':'&lt;', '\t':'&nbsp; &nbsp; ', '  ':'&nbsp; ', '\n':'<br>', '\r\n':'<br>', '\r':'<br>'},
		toHtml = function(v){return toH[v] || v;},
		param = 'bs,OUT,$$E,$$L'.split(','), err, line, out, arg = [bs, function(v){out += v;}, err = [], line = []];
		return {
		view:function( tmpl, cacheId ){
			var str, t0, t1, i, j, k, v, m;
			if( !( v = cache[cacheId] ) ){
				str = tmpl.split(begin), v = 'try{', i = 0, j = str.length;
				while( i < j ){
					t0 = str[i++];
					if( ( k = t0.indexOf(end) ) > -1 ) t1 = t0.substring( 0, k ), t0 = t0.substr( k + 2 ), v += e0 + 
							t1.replace( r0, '\\\\' ).replace( r3, toHtml ) + e1 +
							( t1.charAt(0) == '=' ? 'OUT(' + t1.substr(1) + ')' : t1 ) +
							';$$L[0]+=' + t1.split(r2).length + ';';
					v += e2 + t0.replace( r0, '\\\\' ).replace( r1, toCode ) + e3 + t0.split(r4).length + ';';
				}
				v += e4;
				if( cacheId ) cache[cacheId] = v;
			}
			out = '', line[0] = err.length = 0;
			try{if( !( ( i = ( new Function( param, v ) ).apply( null, arg ) ) instanceof Error ) ) i = 0;}catch(e){i = e;}
			if( i ){
				t0 = '<h1>Invalid template error: bs.view</h1><hr>';
				if( m = err.length ) t0 += '<b>code: </b>error occured line number - ' + line[0] + '<br>' + err[err.length - 1] + '<hr>';
				j = Object.getOwnPropertyNames(i), k = j.length;
				while( k-- ) t0 += '<b>' + j[k] +'</b>: ' + ( i[j[k]].replace ? i[j[k]].replace( r2, '<br>at ' ) : i[j[k]] ) + '<br>';
				t0 += '<hr><b>template:</b><br>';
				for( k = v.split(r4), i = 0, j = k.length ; i < j ; i++ ) t0 += '<div'+( m && ( i + 1 == line[0] )?' style="background:#faa"' : '' ) + '><b>' + ( i + 1 ) + ':</b> ' + k[i].replace( r5, toHtml ) + '</div>';
				return t0;
			}
			return out;
		},
		model:function(){
			var idx, i = 0, j = arguments.length, k, v;
			while( i < j ){
				k = arguments[i++];
				if( i == j ) return idx > -1 ? arg[idx] : undefined;
				idx = param.indexOf(k), v = arguments[i++];
				if( v === null ){
					if( idx > -1 ) param.splice( idx, 1 ), arg.splice( idx, 1 );
				}else if( idx > -1 ) arg[idx] = v;
				else param[idx = param.length] = k, arg[idx] = v;
			}
			return v;
		}};
	})(), defaultC = 'index', defaultM = 'index', ex = '.js', table = {}, path, isHash = 'onhashchange' in W, timer, prevHash, currHash, 
	file, arg, method,
	methodHash = {}, uuid = 1, methodId,
	methodReg = function( v, h ){
		if( !v.bsrouter_uuid ) v.bsrouter_uuid = uuid++;
		methodHash[methodId = v.bsrouter_uuid] = h;
		return v;
	},
	hashHead = '#!/', hashHeadLen = hashHead.length,
	hash = function(h){
		var t0 = h || location.hash, i = 0, j = 0;
		while( j < hashHeadLen ) i += t0.charAt(i) == hashHead.charAt(j++) ? 1 : 0;
		t0 = t0.substring( i, t0.length - ( t0.charAt( t0.length - 1 ) == '/' ? 1 : 0 ) );
		if( t0 == '/' ) t0 = '';
		if( !h ) currHash = t0; 
		return t0;
	},
	change = function(){
		if( prevHash != hash() ) route();
		prevHash = currHash;
	},
	route = function(){
		var runHash, uri, id, end, t0, t1, i, j, k;
		file = arg = method = null;
		runHash = currHash;
		if( t0 = table['*'] ) return methodReg( method = t0, runHash ).apply( M, arg = runHash.split('/') );
		if( !runHash ) return path ? bs.require( function(v){
				v && ( v = v.controller ) && ( v = v[defaultM] ) ? ( file = uri, method = defaultM, methodReg( v, runHash ).call(M) ) : err( 12003, '/' );
			}, uri = path.base + defaultC + ex ) : err( 12002, '/' );
		
		id = runHash.split('/'), j = id.length;
		for( t0 = [], i = 0 ; i < j ; i++ ){
			t0[t0.length] = id[i];
			if( t1 = table[t0.join('/') + '*'] ) return methodReg( method = t1, runHash ).apply( M, arg = id.slice( i + 1 ) );
		}
		if( typeof table[t0] == 'function' ) methodReg( method = table[t0], runHash ).call(M);
		else if( path ){
			for( t0 = path.base, k = path.folder, i = 0 ; i < j ; i++ ) if( k = k[id[i]] ) t0 += id[i] + '/'; else break;
			bs.require( end = function(v){
				var f, idx = i + 1, t1;
				v && ( v = v.controller ) ? ( f = v[t1 = v[id[i]] ? id[i] : (idx--, defaultM)] ) ? ( method = t1, file = uri, methodReg( f, runHash ).apply( M, arg = id.slice(idx) ) ) : err( 12004, runHash ) :
				uri.indexOf( defaultC + ex ) == -1 ? ( i--, bs.require( end, uri = t0 + defaultC + ex ) ) : err( 12003, runHash );
			}, uri = t0 + ( i < j ? id[i++] : defaultC ) + ex );
		}else err( 12002, runHash );
	},
	key = {}, t0 = 'start,stop,path,change,defaultController,defaultMethod,file,current,virtual,arguments,method'.split(','), i = t0.length,
	router = function(){
		var args = arguments, t0, t1, t2, i = 0, j = args.length, k, v, m, n;
		while( i < j ){
			k = args[i++], v = args[i++];
			if( key[k] ) switch(k){
			case'path':
				return bs.get( function( v, e ){
					if( v ) try{
						path = JSON.parse(v);
						if( path.base && path.folder ){
							if( path.base.charAt( path.base.length - 1 ) != '/' ) path.base += '/';
						}else v = 0, e = 'invalid path';
					}catch(ex){e = v + '::' + ex, v = 0;}
					!v ? err( 12001, v + '::' + e ) : i < j ? router.apply( null, Array.prototype.slice.call( args, i ) ) : 0;
				}, v );
			case'start':isHash ? bs.WIN.on( 'hashchange', change ) : timer || ( timer = setInterval( change, 1 ) ), v && v(); break;
			case'stop':isHash ? bs.WIN.on( 'hashchange', null ) : timer && ( clearInterval(timer), timer = 0 ); break;
			case'file':return file;
			case'current':return currHash;
			case'virtual':return methodHash[methodId];
			case'arguments':return arg;
			case'method':return method;
			case'change':return change();
			case'defaultController':v === undefined ? v = defaultC : defaultC = v; break;
			case'defaultMethod':v === undefined ? v = defaultM : defaultM = v; break;
			}else k = hash(k), typeof v == 'function' ? table[k] = v: v === undefined ? v = table[k] : v === null ? delete table[k] : err( 12004, k );
		}
		return v;
	};
	while(i--) key[t0[i]] = t0[i];
	return router;
})() );