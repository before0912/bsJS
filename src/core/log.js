var r = /[<]/g, data = [], isOpened = 1, base, prev, result, isInited, init;
init = function(){
	var header, style, css, target,
	isInited = 1;
	css = '.BSCSE0{border-bottom:1px solid #ddd;padding:10px 0}' +
		'.BSCSE1{font-size:8px;color:#777;margin-left:10px}' +
		'.BSCSE2{float:left;margin:5px;border:1px dashed #aaa;padding:2px}' +
		'#BSCSE{position:fixed;z-index:999999;width:100%;background:#fdfdfd;bottom:0;left:0}'+
		'#BSCCctab,#BSCCetab{font-size:11px;cursor:pointer;margin:2px;padding:0 10px;border-radius:30px;float:left;border:1px solid #666}'+
		'#BSCC{font-size:10px;font-family:DotumChe,Courier;overflow-y:scroll;height:180px}';
	prev = base = +new Date();
	header = document.getElementsByTagName("head")[0];
	style = doc.createElement("style");
	header.appendChild(style);
	if(style["styleSheet"]) style["styleSheet"].cssText = css;
	else style.innerHTML = css;
	target = document.createElement("div");
	target.id = "BSCSE";
	target.style.height = "200px";
	target.innerHTML = '<div style="width:100%;background:#ccc;cursor:pointer;height:20px">' +
		'<div id="BSCCpanel" style="width:100%;background:#ccc;cursor:pointer;height:20px">' +
			'<div style="background:#fff" id="BSCCctab">Console</div>' +
			'<div style="background;#bbb" id="BSCCetab">Elements</div>' +
		'</div>'
	'</div>' +
	'<div id="BSCC"><div id="BSCcon"></div><div id="BSCele" style="display:none"></div></div>';
	document.body.appendChild(target);
	document.getElementById("BSCCpanel").onmousedown = function(e){
		var target = document.getElementById("BSCSE");
		if(isOpened){
			isOpened = 0,
			target.style.height = "20px";
		}else{
			isOpened = 1,
			target.style.height = "200px";
		}
	}		
	document.getElementById("BSCCctab").onmousedown = function(e){
		document.getElementById("BSCCctab").style.background = "#fff";
		document.getElementById("BSCCetab").style.background = "#bbb";
		document.getElementById("BSCcon").style.display = "block";
		document.getElementById("BSCele").style.display = "none";
	}
	document.getElementById("BSCCetab").onmousedown = function(e){
		document.getElementById("BSCCctab").style.background = "#bbb";
		document.getElementById("BSCCetab").style.background = "#fff";
		document.getElementById("BSCcon").style.display = "none";
		document.getElementById("BSCele").style.display = "block";
		document.getElementById("BSCele").innerHTML = '<pre>' + 
			('<html>\n' + document.getElementsByTagName("html")[0].innerHTML + '\n</html>').replace(r, '&lt;') + 
			'</pre>';
	}
};
result = function(){
	var target, i, j, k, l;
	if(!isInited) init();
	data.length = 0,
	k = +new Date();
	l = k - base;
	data[0] = '<div class="BSCSE1">' + l + ' : ' + ( k - prev ) + '</div>';
	prev = k;
	for( i = 0, j = arguments.length ; i < j ; i++ ){
		k = arguments[i], 
		data.push('<div class="BSCSE2">' + (typeof k == 'object' ? JSON.stringify(k) : k + '' ) + '</div>');
	}
	target = document.createElement("div");
	target.className = "BSCSE0";
	target.innerHTML = data.join("") + '<br clear="both">';
	document.getElementById("BSCcon").appendChild(target);
	return l;
};
if( !W['console'] ) W['console'] = {log:result};

module.exports = result;