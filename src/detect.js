var W = this, navi = W['navigator'], agent = navi.userAgent.toLowerCase(), platform = navi.platform.toLowerCase(), app = navi.appVersion.toLowerCase(), 
os = (function(){
	var browser = {
		ie:function(){
			if( agent.indexOf('msie') < 0 && agent.indexOf('trident') < 0 ) return;
			if( agent.indexOf('iemobile') > -1 ) os = 'winMobile';
			result.browser = 'ie', 
			result.browserVer = agent.indexOf('msie 7') > -1 && agent.indexOf('trident') > -1 ? -1 : agent.indexOf('msie') < 0 ? 11 : parseFloat(/msie ([\d]+)/.exec(agent)[1]);
			return 1;
		},
		chrome:function(){
			if( agent.indexOf( i = 'chrome' ) < 0 && agent.indexOf( i = 'crios' ) < 0 ) return;
			result.browser = 'chrome', 
			result.browserVer = parseFloat( ( i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/ ).exec(agent)[1] );
			return 1;
		},
		firefox:function(){return agent.indexOf('firefox') < 0 ? 0 : ( browser = 'firefox', bv = parseFloat(/firefox\/([\d]+)/.exec(agent)[1]) );},
		safari:function(){return agent.indexOf('safari') < 0 ? 0 : ( browser = 'safari', bv = parseFloat(/safari\/([\d]+)/.exec(agent)[1]) );},
		opera:function(){var i; return (agent.indexOf( i = 'opera') < 0 && agent.indexOf( i = 'opr' ) < 0 ) ? 0 : ( browser = 'opera', bv = ( i == 'opera' ) ? parseFloat(/version\/([\d]+)/.exec(agent)[1]) : parseFloat(/opr\/([\d]+)/.exec(agent)[1]) );},
		naver:function(){return agent.indexOf('naver') < 0 ? 0 : browser = 'naver';}
	};
	return [
		function android(){
			var i;
			if( agent.indexOf( i = 'android' ) > -1 ){
				result.browser = result.os = i, 
				result.device = agent.indexOf('mobile') == -1 ? ( result.browser += 'Tablet', 'tablet' ) : 'mobile',
				result.osVer = ( i = /android ([\d.]+)/.exec(agent) ) ? ( i = i[1].split('.'), parseFloat( i[0] + '.' + i[1] ) ) : 0,
				browser.naver() || browser.opera() || browser.chrome() || browser.firefox() || ( result.browserVer = /safari\/([\d.]+)/.exec(agent) ? parseFloat(i[1]) : 0 );
				return 1;
			}
		},
		function iOS(){
			var i;
			if( agent.indexOf( i = 'ipad' ) > -1 || agent.indexOf( i = 'iphone' ) > -1 ){
				result.browser = result.os = i,
				result.device = i == 'ipad' ? 'tablet' : 'mobile',
				result.osVer = ( i = /os ([\d_]+)/.exec(agent) ) ? ( i = i[1].split('_'), parseFloat( i[0] + '.' + i[1] ) ) : 0,
				browser.naver() || browser.opera() || browser.chrome() || browser.firefox() || ( result.browserVer = ( i = /mobile\/([\S]+)/.exec(agent) ) ? parseFloat(i[1]) : 0 );
				return 1;
			}
		},
		function windows(){
			var t0, i;
			if( platform.indexOf('win') > -1 ){
				for( i in t0 = {'5.1':'xp','6.0':'vista','6.1':'7','6.2':'8','6.3':'8.1'} ){
					if( agent.indexOf( 'windows nt ' + i ) > -1 ){
						result.osVer = t0[i];
						break;
					}
				}
				result.os = 'win',
				browser.ie() || browser.opera() || browser.chrome() || browser.firefox() || browser.safari();
				return 1;
			}
		},
		function mac(){
			var i;
			if( platform.indexOf('mac') > -1 ){
				result.os = 'mac',
				i = /os x ([\d._]+)/.exec(agent)[1].replace( '_', '.' ).split('.'), 
				result.osVer = parseFloat( i[0] + '.' + i[1] ),
				browser.opera() || browser.chrome() || browser.firefox() || browser.safari();
				return 1;
			}
		},
		function linux(){
			result.os = app.indexOf('x11') > -1 ? 'unix' : app.indexOf('linux') > -1 ? 'linux' : 0,
			browser.chrome() || browser.firefox();
		}
	];
})(),
result = {
	device:'pc', os:0, osVer:0, 
	browser:0, browserVer:0, flash:0,
	sony:agent.indexOf('sony') > -1 ? 1 : 0,
	html5:{
		file:W['FileReader'] ? 1 : 0,
		message:W['postMessage'] ? 1 : 0,
		db:W['openDatabase'] ? 1 : 0,
		socket:W['WebSocket'] ? 1 : 0,
		xhr2:W['XMLHttpRequest'] && 'responseType' in new XMLHttpRequest ? 1 : 0,
		geo:( navigator['geolocation'] ) ? 1 : 0,
		history:( 'pushState' in history ) ? 1 : 0,
		offline:W['applicationCache'] ? 1 : 0,
		local:(function(){
			if( W['localStorage'] && 'setItem' in localStorage ){
				try{localStorage.setItem('@@bsDetectLocalTest', '1' ), localStorage.removeItem('@@bsDetectLocalTest');return 1;}catch(e){}
			}

			return 0;
		})()
	}
}, i, j;
for( i = 0, j = os.length ; i < j ; i++ ) if( os[i]() ) break;
result.flash = (function(){
	var plug = navi.plugins, t0;
	if( result.browser == 'ie' ){
		try{
			t0 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').substr(4).split(',');
			return parseFloat( t0[0] + '.' + t0[1] );
		}catch(e){}
	}else if( ( t0 = plug['Shockwave Flash 2.0'] ) || ( t0 = plug['Shockwave Flash'] ) ){
		t0 = t0.description.split(' ')[2].split('.');
		return parseFloat( t0[0] + '.' + t0[1] );
	}else if( agent.indexOf('webtv') > -1 ){
		return agent.indexOf('webtv/2.6') > -1 ? 4 : agent.indexOf("webtv/2.5") > -1 ? 3 : 2;
	}
	return 0;
})();
module.exports = result;