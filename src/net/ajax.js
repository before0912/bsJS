var bs_net_ajax = (function(){
	var trim = /^\s*|\s*$/g,
	isXHR2 = "XMLHttpRequest" in this && "responseType" in new XMLHttpRequest,
	
	xhrType, xhr, 
	cross, crossCK, httpCross, 
	head, paramHeader, paramBody, param, urlID, url, 
	httpMethod, baseHeader, ignoreHeader, boundary, async, http,
	mk, result;
	
	if("ActiveXObject" in this && !"CanvasRenderingContext2D" in this){
		xhrType = 1,
		xhr = (function(){
			var t0, i, ver;
			xhrType = 1;
			t0 = "MSXML2.XMLHTTP",
			t0 = ["Microsoft.XMLHTTP", t0, t0 + '.3.0', t0 + '.4.0', t0 + '.5.0'],
			i = t0.length;
			while(i--){
				try{
					new ActiveXObject( ver = t0[i] );
				}catch(e){
					continue;
				}
				break;
			}
			return function(){
				return new ActiveXObject(ver);
			};
		})();
	}else{
		xhrType = 0,
		xhr = function(){
			return new XMLHttpRequest;
		};
	}
	if("XDomainRequest" in this)
		cross = (function(){
			var mk = function( x, err, end ){
				return function(){
					x.ontimeout = x.onload = x.onerror = null,
					err ? (x.abort(), end(null, err)) : end(x.responseText);
				};
			};
			return function(data, end){
				var x = new XDomainRequest();
				x.timeout = 5000,
				x.ontimeout = mk(x, "timeout", end),
				x.onerror = mk(x, "XDR error", end),
				x.onload = mk(x, 0, end),
				x.open("POST", CROSSPROXY),
				x.send(data);
			};
		})();
	else if("XMLHttpRequest" in this) 
		cross = function(data, end){
			var x = xhr();
			async(x, end),
			x.open("POST", CROSSPROXY, true),
			x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
			x.withCredentials = false,
			x.send(data);
		};
	else console.log(5000);
	
	urlID = 0,
	url = function(U, arg){
		var p = param(arg, 2);
		U = U.replace(trim, "").split("#");
		return U[0] + (U[0].indexOf("?") > -1 ? "&" : "?") + "bsNC=" + (+new Date()) + (urlID++) + (p ? "&" + p : "") + (U[1] ? "#" + U[1] : "");
	},
	
	head = [],
	paramBody = [],
	paramHeader = function(v){
		return typeof v == 'function' ? v(httpMethod) : v;
	},
	param = function(arg, i){
		var t0, j, k, v, fullBody;
		if(!arg || (j = arg.length) < i + 1) return "";
		head.crossKey = head.length = paramBody.length = 0;
		while(i < j){
			if(!(k = arg[i++].replace(trim, "")).length) console.log(5005);
			v = arg[i++];
			if(k.charAt(0) === "@") head.push(k.substr(1), paramHeader(v));
			else switch(k){
			case"crossAccessKey":head.crossKey = v; break;
			case"crossCookie":crossCK = encodeURIComponent(v); break;
			case"fullBody":fullBody = encodeURIComponent(v);break;
			default:
				paramBody[paramBody.length] = encodeURIComponent(k) + "=" + 
					encodeURIComponent((v && typeof v == "object" ? JSON.stringify(v) : v + "").replace(trim, ""));
			}
		}
		return fullBody || paramBody.join("&");
	},
	httpMethod,
	baseHeader = [],
	httpCross = [],
	boundary = '------------bsboundry-----',
	async = function( x, end ){
		if( "ontimeout" in x ){
		}else{
		
		}
		
		var timeId = setTimeout(function(){
			if(timeId == -1) return;
			if(x.readyState !== 4) x.abort();
			timeId = -1,
			x.onreadystatechange = null,
			end(null, 'timeout');
		}, 5000);
		x.onreadystatechange = function(){
			var text, status;
			if(x.readyState !== 4 || timeId == -1) return;
			clearTimeout(timeId), timeId = -1;
			text = x.responseText,
			status = x.status;
			if(status == 0) status = 200;
			xhrType ? delete x.onreadystatechange : x.onreadystatechange = null;
			end.call( x, text, status );
		};
	},
	http = function(method, end, U, arg){
		var x, key, i, j, k, v, postBody;
		httpMethod = method;
		if( method === 'GET' ){
			U = url(U, arg);
			if(U.length > 512) console.log(5004, U);
			arg = "";
		}else{
			if(isXHR2){
				i = arg.length;
				while(i--) if(arg[i] instanceof File || arg[i] instanceof Blob){
					postBody = [];
					i = 2, j = arg.length;
					while(i < j){
						k = 'Content-Disposition: form-data; name="' + arg[i++].replace(trim, "") + '"';
						v = arg[i++];
						if(k.charAt(0) == "@") continue;
						postBody.push("--" + boundary + "\r\n");
						if( v instanceof File || v instanceof Blob )
							postBody.push(k + '; filename="' + ( v.name || 'bsPost' + (i/2) + '.bin') + '"\r\n',
								"Content-Type: application/octet-stream\r\n\r\n");
						else postBody.push(k + "\r\n\r\n");
						postBody.push(v, "\r\n");
					}
					postBody.push("--" + boundary);
					break;
				}
			}
			U = url(U),
			crossCK = "",
			arg = param(arg, 2);
		}
		i = U.indexOf( '://' );
		if(i > -1 && U.substr(i + 3, (j = location.hostname).length) != j ){
			if(!end || !cross) return err(5001);
			key = head.crossKey || CROSSPROXYKEY,
			httpCross.length = httpH.length = 0;
			for(i = 0, j = head.length ; i < j ; i += 2){
				k = head[i];
				if(baseHeader[k]) ignoreHeader.push(k);
				httpCross.push(k, head[i + 1]);
			}
			for(i in baseHeader) if(ignoreHeader.indexOf(i) == -1) httpCross.push(i, paramHeader(baseHeader[i]));
			k = param(httpCross, 0),
			httpCross.length = 0,
			httpCross.push("url", U, "cookie", ck, "method", method, "key", key, "data", arg, "header", k);
			cross(param(httpCross, 0), end);
		}else{
			x = xhr();
			if(end) async(x, end);
			if(postBody) head.push("Content-Type", "multipart/form-data; boundary=" + boundary);
			x.open(method, U, end ? true : false),
			ignoreHeader.length = 0;
			for(i = 0, j = head.length ; i < j ; i += 2){
				k = head[i];
				if(baseHeader[k]) ignoreHeader.push(k);
				x.setRequestHeader(k, head[i + 1]);
			}
			for(i in baseHeader) if(ignoreHeader.indexOf(i) == -1) x.setRequestHeader(i, paramHeader(baseHeader[i]));
			if(postBody) x.send(new Blob(postBody));
			else x.send(arg);
			if(!end){
				i = x.responseText,
				xhrType ? delete x.onreadystatechange : x.onreadystatechange = null;
				return i;
			}
		}
	}
	mk = function(method){
		return function(end, url){
			return http(method, end, url, arguments);
		};
	};
	result = {
		baseHeader:function(k, v){
			if(v) baseHeader[k] = v;
			return baseHeader[k];
		},
		post:mk('POST'), 
		put:mk('PUT'),
		del:mk('DELETE'),
		get:mk('GET')
	};
	result.baseHeader("Cache-Control", "no-cache"),
	result.baseHeader("Content-Type", function(method){
		return (method == "GET" ? "text/plain" : "application/x-www-form-urlencoded") + "; charset=UTF-8";
	});
	return result;
})();
if(module) module.exports = bs_net_ajax;