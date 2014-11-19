var body, type, blob, builder, slice, url;
	blob = W['Blob'] ? function(){return new Blob( body, type );} :
		( builder = W['BlobBuilder'] || W['WebKitBlobBuilder'] || W['MozBlobBuilder'] ) ? function(){
			var blob = new BlobBuilder();
			return blob.append(body), blob.getBlob();
		} : 0, slice = [].slice, type = {type:''}, url = W['URL'] || W['webkitURL'];
	fn( 'worker', (function(blob, url){
		var worker, toURL;
		if( W['Worker'] && blob ){
			worker = {}, body = [], type.type = 'application/javascript',
			toURL = function(f){return body[0] = 'onmessage=function(e){postMessage((' + f.toString() + ').apply(null,e.data));}', url.createObjectURL(blob());};
			return function(){
				var i = arguments.length, j = arguments[0];
				if( i == 1 && ( i = worker[j] ) ) return i;
				if( i == 2 && typeof (i = arguments[1] ) == 'function' ){
					var u = toURL(i);
					return worker[j] = function(end){
						var worker = new Worker(u), isEnd = 0;
						worker.onmessage = function(e){
							if( isEnd++ ) return;
							end(e.data);
						},
						worker.onerror = function(e){
							if( isEnd++ ) return;
							end( null, e );
						},
						worker.postMessage(slice.call( arguments, 1 ));
					};
				}
				bs.err( 10001, arguments );
			};
		}
		return function(){return none;};
	})( blob, url ) ),
	fn( 'networker', (function(){
		var worker = {};
		return function(){
			var i = arguments.length, j = arguments[0];
			if( i == 1 && ( i = worker[j] ) ) return i;
			if( i == 2 && typeof (i = arguments[1] ) == 'function' ){
				return worker[j] = function(end){
					bs.post( function( v, e ){end( v ? JSON.parse(v) : null, e || 'server error' );},
						NETWORKER, 'BS', NETWORKERKEY, 'c', '(' + i.toString() + ').apply(null,' + JSON.stringify(slice.call( arguments, 1 )) + ')'
					);
				};
			}
			bs.err( 11001, arguments );
		};
	})() ),