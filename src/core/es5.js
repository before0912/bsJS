if(!Array.prototype.indexOf) Array.prototype.indexOf = function(v, I){
	var i, j, k, l;
	if(j = this.length) for(I = I || 0, i = I, k = parseInt((j - i) * .5) + i + 1, j-- ; i < k ; i++) if(this[l = i] === v || this[l = j - i + I] === v) return l; 
	return -1;
};
if( !Date.now ) Date.now = function(){return +new Date;};
bs.JSON = {
	parse:function(v){return ( new Function( '', 'return ' + v ) )();},
	stringify:(function(){
		var r = /["]/g, f;
		return f = function(o){
			var t0, i, j;
			switch( t0 = typeof o ){
			case'string':return '"' + o.replace( r, '\\"' ) + '"';
			case'number':case'boolean':return o.toString();
			case'undefined':return t0;
			case'object':
				if( !o ) return 'null';
				t0 = '';
				if( o.splice ){
					for( i = 0, j = o.length ; i < j ; i++ ) t0 += ',' + f(o[i]);
					return '[' + t0.substr(1) + ']';
				}else{
					for( i in o ) if( o.hasOwnProperty(i) && o[i] !== undefined && typeof o[i] != 'function' ) t0 += ',"'+i+'":' + f(o[i]);
					return '{' + t0.substr(1) + '}';
				}
			}
		};
	})()
};
if( !W['JSON'] ) W['JSON'] = bs.JSON;
fn( 'log', log = (function(){
	var t0 = [], mode = 1, base, prev, mobile = detect.device == 'mobile' ? 1 : 0, r = /[<]/g;
	return function(){
		var i, j, k, l;
		if( !doc.getElementById('BSCSE') ){
			prev = base = Date.now();
			bs.css( '.BSCSE0{border-bottom:1px solid #ddd;padding:10px 0}.BSCSE1{font-size:8;color:#777;margin-left:10}.BSCSE2{float:left;margin:5;border:1px dashed #aaa;padding:2}'+
				'#BSCSE{position:fixed;z-index:999999;width:100%;background:#fdfdfd;bottom:0;left:0}'+
				'#BSCCctab,#BSCCetab{font-size:11;cursor:pointer;margin:2;padding:0 10px;border-radius:30;float:left;border:1px solid #666}' );
			bs.Css('#BSCC').S( 'font-size', mobile ? 10 : 11, 'font-family', 'DotumChe,Courier', 'overflow-y', 'scroll', 'height', mobile ? 180 : 280 ),
			bs.Dom('<div id="BSCSE"></div>').S(
				'height', mobile ? 200 : 300, '<','body',
				'>', bs.Dom('<div style="width:100%;background:#ccc;cursor:pointer;height:20px"></div>').S( 
					'>', bs.Dom('<div id="BSCCctab">Console</div>').S( 'background', '#fff', 'down', function(e){
						bs.Dom('#BSCCctab').S( 'background', '#fff' ), bs.Dom('#BSCCetab').S( 'background', '#bbb' ),
						bs.Dom('#BSCcon').S( 'display', 'block' ), bs.Dom('#BSCele').S( 'display', 'none' ),
						e.prevent();
					}, 'this' ),
					'>', bs.Dom('<div id="BSCCetab">Elements</div>').S( 'background', '#bbb', 'down', function(e){
						bs.Dom('#BSCCctab').S( 'background', '#bbb' ), bs.Dom('#BSCCetab').S( 'background', '#fff' ),
						bs.Dom('#BSCcon').S( 'display', 'none' ), bs.Dom('#BSCele').S( 'display', 'block' ),
						bs.Dom('#BSCele').S( 'html', '' ), bs.Dom('#BSCele').S( 'html', '<pre>' + ( '<html>\n' + bs.Dom('html').S('html') + '\n</html>' ).replace( r, '&lt;' ) + '</pre>' );
						e.prevent();
					}, 'this' ),
					'down', function(e){
						mode ? ( mode = 0, bs.ANI.style( bs.Dom('#BSCSE'), 'height', 20, 'time', .4 ) ) :
						( mode = 1, bs.ANI.style( bs.Dom('#BSCSE'),'height', mobile ? 200 : 300, 'time', .4 ) );
					}, 'this' ),
				'>', '<div id="BSCC"><div id="BSCcon"></div><div id="BSCele" style="display:none"></div></div>'
			);
		}
		for( i = 0, j = arguments.length, t0.length = 0, t0[0] = '<div class="BSCSE1">' + ( l = ( k = Date.now() ) - base ) + ' : ' + ( k - prev ) + '</div>', prev = k ; i < j ; i++ )
			k = arguments[i], t0[t0.length] = '<div class="BSCSE2">' + (typeof k == 'object' ? JSON.stringify(k) : k + '' ) + '</div>';
		bs.Dom('#BSCcon').S( '>', '<div class="BSCSE0">' + t0.join('') + '<br clear="both"></div>' );
		return l;
	};
})() );
if( !W['console'] ) W['console'] = {log:log};