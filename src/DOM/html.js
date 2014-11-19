clsfn.html = (function(doc){
			var div = doc.createElement('div'), tbody = doc.createElement('tbody'), tags = {
				tr:[1, '<table><tbody>', '</tbody></table>'], th:[2, '<table><tbody><tr>', '</tr></tbody></table>'],
				col:[1, '<table><tbody></tbody><colgroup>', '</colgroup></table>'], option:[0, '<select>', '</select>']
			}, t0, i;
			tags.td = tags.th, tags.optgroup = tags.option,
			t0 = 'thead,tfoot,tbody,caption,colgroup'.split(','), i = t0.length;
			while( i-- ) tags[t0[i]] = [0,'<table>','</table>'];
			return function( str, target, mode ){
				var t0, t1, t2, t3, i, j, n0, n1, n2, parent, tbodyStr;
				str += '',
				tbodyStr = str.toLowerCase().indexOf('tbody') > -1 ? true : false,
				t0 = str.replace( trim, '' ), n0 = t0.indexOf(' '), n1 = t0.indexOf('>'), n2 = t0.indexOf('/'),
				t1 = ( n0 != -1 && n0 < n1 ) ? t0.substring( 1, n0 ) : ( n2 != -1 && n2 < n1 ) ? t0.substring( 1, n2 ) : t0.substring( 1, n1 ),
				t1 = t1.toLowerCase();
				if( mode == 'html' && target.nodeName.toLowerCase() == 'table' && t1 == 'tr' ) tbodyStr = true, t1 = 'tbody';
				if( mode == '>' || 'html+' && t1 == 'tr' && target ) target = target.getElementsByTagName('tbody')[0] || ( target.appendChild(tbody), target.getElementsByTagName('tbody')[0] );
				if( tags[t1] ){
					if( div.innerHTML ) del(div.childNodes);
					div.innerHTML = tags[t1][1] + str + tags[t1][2], t2 = div.childNodes[0];
					if( tags[t1][0] ) for( i = 0 ; i < tags[t1][0] ; i++ ) t2 = t2.childNodes[0];
					parent = t2;
				}else div.innerHTML = str, parent = div;
				i = parent.childNodes.length;
				if( !target ) return parent.childNodes;
				else if( mode == 'html' ){
					if( target.innerHTML ) del(target.childNodes);
					while( i-- ) target.appendChild(parent.childNodes[0]);
				}else if( mode == 'html+' ) while( i-- ) target.appendChild(parent.childNodes[0]);
				else if( mode == '+html' ) {
					i = target.childNodes.length, t0 = {length:i};
					while(i--) t0[i] = target.childNodes[i];
					for( i = 0, j = parent.childNodes.length ; i < j ; i++) target.appendChild(parent.childNodes[0]);
					for( i = 0, j = t0.length ; i < j ; i++) target.appendChild(t0[i]);
				}
				else while( i-- ) target.appendChild(parent.childNodes[0]);
				j = target.childNodes.length;
				while( j-- ) if( target.childNodes[j].nodeType == 1 && target.childNodes[j].nodeName == 'TBODY' && !target.childNodes[j].childNodes.length && !tbodyStr ) target.removeChild(target.childNodes[j]);
				return target.innerHTML || target;
			};
		})(doc),