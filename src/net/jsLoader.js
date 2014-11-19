js = function( data, load, end ){
		var t0 = doc.createElement('script'), i;
		t0.type = 'text/javascript', t0.charset = 'utf-8', head.appendChild(t0);
		if( load ){
			if(e) t0.onload = function(){t0.onload = null, load();};
			else t0.onreadystatechange = function(){if( t0.readyState == 'loaded' || t0.readyState == 'complete' ) t0.onreadystatechange=null, load();};
			if( data.charAt( data.length - 1 ) == '=' ) data += 'bs.__callback.' + ( i = 'c' + (id++) ), c[i] = function(){delete c[i], end.apply( null, arguments );};
			t0.src = data;
		}else t0.text = data;
	},
	fn( 'js', function(end){
		var arg = arguments, load, i = 1, j = arg.length;
		if( end ) ( load = function(){i < j ? js( arg[i++], load, end ) : end();} )();
		else while( i < j ) js( bs.get( null, arg[i++] ) );
	} );