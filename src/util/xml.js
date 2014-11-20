var trim = /^\s*|\s*$/g,
_xml = function(N){
	var node = N.childNodes, r = {}, n, t0, t1, i, j;
	for( i = 0, j = node.length ; i < j ; i++ ){
		t0 = type ? node[i] : node.nextNode();
		if( t0.nodeType == 3 ) r.value = ( type ? t0.textContent : t0.text ).replace( trim, '' );
		else{
			n = t0.nodeName, t0 = _xml(t0);
			if( t1 = r[n] ){
				if( t1.length === undefined ) r[n] = {length:2,0:t1,1:t0};
				else r[n][t1.length++] = t0;
			}else r[n] = t0;
		}
	}
	if( t0 = N.attributes ) for( i = 0, j = t0.length ; i < j ; i++ ) r['$'+t0[i].name] = t0[i].value;
	return r;
},
xml0 = function( v, end ){
	var r = {}, t0 = v.childNodes, t1, nn, i = 0, j = t0.length;
	if( end )( nn = function(){
			var k, t1;
			for( var k = 0 ; i < j && k < 5000 ; i++, k++ ) t1 = type ? t0[i] : t0.nextNode(), r[t1.nodeName] = _xml(t1);
			i < j ? setTimeout( nn, 16 ) : end(r);
		} )();
	else{
		for( ; i < j ; i++ ) t1 = type ? t0[i] : t0.nextNode(), r[t1.nodeName] = _xml(t1);
		return r;
	}
},
filter = function(v){
	if( typeof v == 'string' ){
		if( v.substr( 0, 20 ).indexOf( '<![CDATA[' ) > -1 ) v = v.substring( 0, 20 ).replace( '<![CDATA[', '' ) + v.substr(20);
		if( v.substr( v.length - 5 ).indexOf( ']]>' ) > -1 ) v = v.substring( 0, v.length - 5 ) + v.substr( v.length - 5 ).replace( ']]>', '' );
		return v.replace(trim, '');
	}else return '';
},
type, parser, result;

if( this['DOMParser'] ){
	type = 1, 
	parser = new DOMParser, 
	result = function( end, v ){
		return xml0( parser.parseFromString( filter(v), "text/xml" ), end );
	};
}else{
	type = 0,
	parser = (function(){
		var t0 = 'MSXML2.DOMDocument', i, j;
		t0 = ['Microsoft.XMLDOM', 'MSXML.DOMDocument', t0, t0+'.3.0', t0+'.4.0', t0+'.5.0', t0+'.6.0'], i = t0.length;
		while( i-- ){
			try{new ActiveXObject( j = t0[i] );}catch(e){continue;}
			break;
		}
		return function(){return new ActiveXObject(j);};
	})();
	result = function( end, v ){
		var p = parser();
		return p.loadXML(filter(v)), xml0( p, end );
	};
}

module.exports = result;
