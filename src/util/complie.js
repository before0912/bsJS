	compile:(function( r0, re0, r1, arg, param ){
		var r0 = /'@[^@]+@'/g, re0 = function(_0){return _0.substring( 1, _0.length - 1 );}, 
		r1 = /^[^{]*\{|\}$/g, arg = [], param = [];
		return function( f, tmpl, opt ){
			var i;
			param.length = arg.length = 0;
			if( tmpl ) for( i in tmpl ) if( typeof tmpl[i] == 'function' ) tmpl[i] = tmpl[i].toString().replace( r1, '' ).replace( trim, '' );
			if( opt ) for( i in opt ) if( opt.hasOwnProperty(i) ) param[param.length] = i, arg[arg.length] = opt[i];
			return ( new Function( param.length ? param.join(',') : '', 'return ' + template( f.toString().replace( r0, re0 ), tmpl ) ) ).apply( null, arg );
		};
	})(),