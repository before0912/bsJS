fn( 'css', (function(trim){
		var r = /^[-]?[0-9.]+$/, c = bs.Css('.BSCSS000').style,
		css = function(v){return c.cssText = '', bs.Style().S( c, v, 0 ), c.cssText;},
		arg = [], parser = function(v){
			var w = '', s, b, t0, t1, i, j, k, l, m;
			for( v = v.split('}'), i = 0, j = v.length ; i < j ; i++ )
				if( t0 = v[i].replace( trim, '' ) ){
					s = t0.substring( 0, k = t0.indexOf('{') ).replace( trim, '' ), b = t0.substr( k + 1 );
					if( s.indexOf('@') == -1 ){
						for( t0 = b.split(';'), arg.length = k = 0, l = t0.length ; k < l ; k++ )
							t1 = t0[k], arg[arg.length] = t1.substring( 0, m = t1.indexOf(':') ).replace( trim, '' ), arg[arg.length] = r.test( t1 = t1.substr( m + 1 ).replace( trim, '') ) ? parseFloat(t1) : t1;
						w += s + '{' + css(arg) + '}\n';
					}else if( s.substr( 0, 9 ) == 'font-face' ) bs.Css( s + ' ' + b.replace( trim, '' ) );
					else w += t0 + '}\n';
				}
			doc.getElementsByTagName('head')[0].appendChild( t0 = doc.createElement('style') ), t0['styleSheet'] ? ( t0['styleSheet'].cssText = w ) : ( t0.innerHTML = w );
		};
		return function(v){v.substr( v.length - 4 ) == '.css' ? bs.get( parser, v ) : parser(v);};
	})(trim) ),