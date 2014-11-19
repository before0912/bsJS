var detect = require(null, 'detect');
var W = this, doc = W['document'], cssPrefix, stylePrefix, docMode = 0, b = doc.body, bStyle = b.style, div = doc.createElement('div'), result, k;

switch( detect.browser ){
case'ie':
	cssPrefix = '-ms-', stylePrefix = 'ms', docMode = doc['documentMode'] || 0;
	if( detect.browserVer == 6 ) doc.execCommand( 'BackgroundImageCache', false, true ), bStyle.position = 'relative';
	else if( detect.browserVer == -1 ) detect.browserVer = !( t0 = doc.createElement('canvas') )['getContext'] ? 8 : !( 'msTransition' in bStyle ) && !( 'transition' in bStyle ) ? 9 : t0.getContext('webgl') ? 11 : 10;
	break;
case'firefox': cssPrefix = '-moz-', stylePrefix = 'Moz';break;
case'opera': cssPrefix = '-o-', stylePrefix = 'O';break;
default: cssPrefix = '-webkit-', stylePrefix = 'webkit';
}
result = {docMode:docMode, cssPrefix:cssPrefix, stylePrefix:stylePrefix};
(function(){
	var c = doc.createElement('canvas'), a = doc.createElement('audio'), v = doc.createElement('video'), r, re, gl, keys, t0, t1, i, j, k,
	c1 = c && c['getContext'] && c.getContext('2d') ? 1 : 0, a1 = a && a['canPlayType'] ? 1 : 0, v1 = v && v['canPlayType'] ? 1 : 0;
	for( k in t0 = {
		canvas:c1, audio:a1, video:v1, worker:W['Worker'] ? 1 : 0,
		canvasText:c1 && c.getContext('2d').fillText ? 1 : 0,
		videoCaption:'track' in doc.createElement('track') ? 1 : 0,
		videoPoster:v1 && 'poster' in v ? 1 : 0
	} ) if( t0.hasOwnProperty(k) ) result[k] = t0[k];	
	if( a1 ) for( k in t0 = {Mp3:'mpeg',Ogg:'ogg',Wav:'wav',Mp4:'mp4'} ) result['audio' + k] = a.canPlayType( 'audio/' + t0[k] + ';' ).indexOf('no') < 0 ? 1 : 0;
	if( v1 ) for( k in t0 = {Webm:'/webm; codecs="vp8,mp4a.40.2"',H264:'mp4; codecs="avc1.42E01E,m4a.40.2"',Teora:'ogg; codecs="theora,vorbis"'} ) result['video' + k] = a.canPlayType( 'video/' + t0[k] ).indexOf('no') < 0 ? 1 : 0;
	keys = {premultipliedAlpha:1,stencil:1,preserveDrawingBuffer:1}, c = doc.createElement('canvas');
	if( c1 && ( gl = c.getContext('webgl',keys) || c.getContext('experimental-webgl',keys) || c.getContext('webkit-3d',keys) || c.getContext('moz-webgl',keys) ) ){
		t0 = gl.getContextAttributes();
		result.glEnabled = 1;
		t1 = 'alpha,antialias,depth,premultipliedAlpha,preserveDrawingBuffer,stencil'.split(',');
		for( i = 0, j = t1.length ; i < j ; i++ ) k = t1[i], detect['gl' + k.charAt(0).toUpperCase() + k.substr(1)] = t0[k];
		t0 = ( 'VENDOR,VERSION,SHADING_LANGUAGE_VERSION,RENDERER,MAX_VERTEX_ATTRIBS,MAX_VARYING_VECTORS,MAX_VERTEX_UNIFORM_VECTORS,'+
			'MAX_VERTEX_TEXTURE_IMAGE_UNITS,MAX_FRAGMENT_UNIFORM_VECTORS,MAX_TEXTURE_SIZE,MAX_CUBE_MAP_TEXTURE_SIZE,'+
			'MAX_COMBINED_TEXTURE_IMAGE_UNITS,MAX_TEXTURE_IMAGE_UNITS,MAX_RENDERBUFFER_SIZE,MAX_VIEWPORT_DIMS,'+
			'RED_BITS,GREEN_BITS,BLUE_BITS,ALPHA_BITS,DEPTH_BITS,STENCIL_BITS' ).split(',');
		r = /[_]\S/g, re = function(_0){return _0.charAt(1).toUpperCase();};
		for( i = 0, j = t0.length ; i < j ; i++ ) k = t0[i], t1 = k.toLowerCase().replace( r, re ), result['gl' + t1.charAt(0).toUpperCase() + t1.substr(1)] = gl.getParameter(gl[k]);
	}else result.glEnabled = 0;
})();
module.exports = result;