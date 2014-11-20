var trim = /^\s*|\s*$/g,
_xml = function(N){
	var result = {}, nodes = N.childNodes, node, nodeName, attr, t1, i, j;
	for(i = 0, j = nodes.length ; i < j ; i++){
		node = type ? nodes[i] : nodes.nextNode();
		if(node.nodeType == 3) result.value = (type ? node.textContent : node.text).replace(trim, '');
		else{
			nodeName = node.nodeName,
			node = _xml(node);
			if(nodes = result[nodeName]){
				if(nodes.length === undefined) result[n] = {length:2, 0:nodes, 1:node};
				else result[nodeName][nodes.length++] = node;
			}else result[n] = node;
		}
	}
	if(attr = N.attributes) for(i = 0, j = attr.length ; i < j ; i++) result['@' + attr[i].name] = attr[i].value;
	return result;
},
xml0 = function(N, end){
	var r = {}, t0 = N.childNodes, t1, nn, i = 0, j = t0.length;
	if(end)(nn = function(){
			var k, t1;
			for( var k = 0 ; i < j && k < 5000 ; i++, k++ ) t1 = type ? t0[i] : t0.nextNode(), r[t1.nodeName] = _xml(t1);
			i < j ? setTimeout( nn, 16 ) : end(r);
		})();
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
	parser = new DOMParser(),
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
