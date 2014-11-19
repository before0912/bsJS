bs.cls( 'Css', function( fn, clsfn, bs ){
		var sheet = doc.createElement('style'), rule, ruleSet, ruleKey, idx, add, del;
		doc.getElementsByTagName('head')[0].appendChild(sheet),
		sheet = sheet.styleSheet || sheet.sheet, ruleSet = sheet.cssRules || sheet.rules,
		ruleKey = {
			'keyframes':(function(){
				var i = W['CSSRule'], j = 'keyframes';
				return i ? i.WEBKIT_KEYFRAME_RULE ? '-webkit-' + j : i.MOZ_KEYFRAME_RULE ? '-moz-' + j : i.KEYFRAME_RULE ? j : 0 : 0;
			})()
		},
		idx = function(rule){
			var i, j, k, l;
			for( i = 0, j = ruleSet.length, k = parseInt( j * .5 ) + 1, j-- ; i < k ; i++ ) if( ruleSet[l = i] === rule || ruleSet[l = j - i] === rule ) return l;
		},
		add = sheet.insertRule ? function( k, v ){return sheet.insertRule( k + ( v ? '{' + v + '}' : '{}' ), ruleSet.length ), ruleSet[ruleSet.length - 1];} :
			function( k, v ){return sheet.addRule( k, v||' ' ), ruleSet[ruleSet.length - 1];};
		del = sheet.deleteRule ? function(v){sheet.deleteRule(idx(v));} : function(v){sheet.removeRule(idx(v));};
		rule = function(rule){this.r = rule, this.s = new style(rule);},
		fn.NEW = function(key){
			var t0, v;
			if( key.indexOf('@') > -1 ){
				t0 = key.split('@');
				if( t0[0] == 'font-face' ){
					v = t0[1].split(' '), v = 'font-family:'+v[0]+";src:url('"+v[1]+".eot');src:"+
						"url('"+v[1]+".eot?#iefix') format('embedded-opentype'),url('"+v[1]+".woff') format('woff'),"+
						"url('"+v[1]+".ttf') format('truetype'),url('"+v[1]+".svg') format('svg');",
					this.type = 5;
					doc.getElementsByTagName('head')[0].appendChild( t0 = doc.createElement('style') ),
					( t0.styleSheet || t0.sheet ).cssText = '@font-face{' + v + '}';
					return;
				}else if( t0[0] == 'keyframes' ){
					if( !ruleKey[t0[0]] ) return this.type = -1;
					else t0 = '@' + ruleKey[t0[0]] + ' ' + t0[1], this.type = 7;
				}
			}else t0 = key, this.type = 1;
			this.r = add( t0, v ), this.style = this.r.style;
			if( this.type == 1 ) this.s = bs.Style();
		},
		fn.S = function(){
			var type, t0, t1;
			t0 = arguments[0], type = this.type;
			if( t0 === null ) return del( type < 0 ? 0 : this.END(), this.r );
			if( t0 == 'cssText' ) return this.style.cssText;
			else if( type == 1 ) return this.s.S( this.style, arguments, 0 );
			else if( type == 7 ){
				if( !this[t0] ){
					if( this.r.appendRule ) this.r.appendRule( t0 + '{}' );
					else this.r.insertRule( t0 + '{}' );
					t1 = this.r.cssRules[this.r.cssRules.length - 1], this[t0] = {r:t1, s:new style(), style:t1.style};
				}
				arguments[1] == null ? this[t0].s.init() : this[t0].s.S( this[t0].style, arguments, 1 );
			}
			return this;
		};
	} ),
	