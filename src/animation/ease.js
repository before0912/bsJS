fn = bs.ANI.ease,
	(function(){
		var PI = Math.PI, HPI = PI * .5, bio;
		//rate,start,term
		fn( 'linear', function(a,c,b){return b*a+c} ),
		fn( 'backIn', function(a,c,b){return b*a*a*(2.70158*a-1.70158)+c} ),
		fn( 'backOut', function(a,c,b){a-=1;return b*(a*a*(2.70158*a+1.70158)+1)+c} ),
		fn( 'backInOut', bio = function(a,c,b){a*=2;if(1>a)return 0.5*b*a*a*(3.5949095*a-2.5949095)+c;a-=2;return 0.5*b*(a*a*(3.70158*a+2.70158)+2)+c} ),
		//fn( 'bounceIn', function(a,c,b,d,e){return b-bio((e-d)/e,0,b)+c} ),
		fn( 'bounceOut', function(a,c,b){if(0.363636>a)return 7.5625*b*a*a+c;if(0.727272>a)return a-=0.545454,b*(7.5625*a*a+0.75)+c;if(0.90909>a)return a-=0.818181,b*(7.5625*a*a+0.9375)+c;a-=0.95454;return b*(7.5625*a*a+0.984375)+c} ),
		//fn( 'bounceInOut', function(a,c,b,d,e){if(d<0.5*e)return d*=2,0.5*ease[13](d/e,0,b,d,e)+c;d=2*d-e;return 0.5*ease[14](d/e,0,b,d,e)+0.5*b+c} ),
		fn( 'sineIn', function(a,c,b){return -b*Math.cos(a*HPI)+b+c} ),
		fn( 'sineOut', function(a,c,b){return b*Math.sin(a*HPI)+c} ),
		fn( 'sineInOut', function(a,c,b){return 0.5*-b*(Math.cos(PI*a)-1)+c} ),
		fn( 'circleIn', function(a,c,b){return -b*(Math.sqrt(1-a*a)-1)+c} ),
		fn( 'circleOut', function(a,c,b){a-=1;return b*Math.sqrt(1-a*a)+c} ),
		fn( 'circleInOut', function(a,c,b){a*=2;if(1>a)return 0.5*-b*(Math.sqrt(1-a*a)-1)+c;a-=2;return 0.5*b*(Math.sqrt(1-a*a)+1)+c} ),
		fn( 'quadraticIn', function(a,c,b){return b*a*a+c} ),
		fn( 'quadraticOut', function(a,c,b){return -b*a*(a-2)+c} );
	})(),
	