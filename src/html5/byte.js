	fn( 'byte2str', (function(){
		var fr;
		if( W['FileReader'] ){
			return fr = new FileReader(), fr.readAsBinaryString ? function( end, d ){
				fr.onloadend = function(ev){
					end(ev.target.result);
				}, fr.readAsBinaryString(d);
			} : function(end, d){
				fr.onloadend = function(ev){
					var bytes = new Uint8Array( ev.target.result ), binStr = '', i, j;
					for( i = 0, j = bytes.byteLength; i < j; i++ ) binStr += String.fromCharCode( bytes[i] );
					end(binStr);
				}, fr.readAsArrayBuffer(d);
			};
		}
		return function(){return none;};
	})() ),
	fn( 'str2byte', (function(blob){
		if( blob ){
			return function( str, t ){
				var ints, i;
				ints = new Uint8Array(str.length), i = ints.length;
				while(i--) ints[i] = parseInt( str.charCodeAt(i).toString(16), 16 );
				return body = [ints.buffer], type.type = t || '', blob();
			};
		}
		return function(){return none;};
	})(blob) );