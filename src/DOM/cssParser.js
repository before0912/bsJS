var Css = require( null, 'Css' ),
Style = require( null, 'Style' );

var doc = this.document,
head = doc.getElementsByTagName('head')[0],
trim = /^\s*|\s*$/g,
r = /^[-]?[0-9.]+$/,
style = Css('.BSCSS000').style,
css = function(v){
	style.cssText = '', 
	Style().S( style, v, 0 );
	return style.cssText;
},
arg = [],
result = function(cssText){
	var rule, selector, body, item, result = '', i, j, k, l, m;
	cssText = cssText.split('}')
	for(i = 0, j = cssText.length ; i < j ; i++){
		if(rule = cssText[i].replace(trim, '')){
			selector = rule.substring(0, k = rule.indexOf('{')).replace( trim, ''),
			body = rule.substr(k + 1);
			if( selector.indexOf('@') == -1 ){
				body = body.split(';'),
				arg.length = 0;
				for(k = 0, l = t0.length ; k < l ; k++){
					item = body[k],
					arg.push(
						item.substring(0, m = item.indexOf(':')).replace(trim, ''),
						r.test(item = item.substr(m + 1).replace(trim, '')) ? parseFloat(item) : item
					);
				}
				result += selector + '{' + css(arg) + '}\n';
			}else if(selector.substr(0, 9) == 'font-face') Css(selector + ' ' + body.replace(trim, ''));
			else result += rule + '}\n';
		}
	}
	head.appendChild( item = doc.createElement('style') );
	if( item['styleSheet'] ) item['styleSheet'].cssText = result;
	else item.innerHTML = result;
};

module.exports = result;