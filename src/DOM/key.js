bs.obj( 'KEY', (function(){
		var t0 = {downed:{}, code2name:{}, name2code:{}}, i, j, k, v,
			t1 = 'a,65,b,66,c,67,d,68,e,69,f,70,g,71,h,72,i,73,j,74,k,75,l,76,m,77,n,78,o,79,p,80,q,81,r,82,s,83,t,84,u,85,v,86,w,87xx,x,88,y,89,z,90,back,8,tab,9,enter,13,shift,16,control,17,alt,18,pause,19,caps,20,esc,27,space,32,pageup,33,pagedown,34,end,35,home,36,left,37,up,38,right,39,down,40,insert,45,delete,46,numlock,144,scrolllock,145,0,48,1,49,2,50,3,51,4,52,5,53,6,54,7,55,8,56,9,57'.split(',');
		i = 0, j = t1.length;
		while( i < j ) k = t1[i++], v = parseInt(t1[i++]), t0.name2code[k] = v, t0.code2name[v] = k;
		return t0;
	})() ),
	
	(function(){
		var downed = bs.KEY.downed, code2name = bs.KEY.code2name;
		bs.WIN.on( 'keydown', function(e){downed[code2name[e.keyCode]] = 1;}),
		bs.WIN.on( 'keyup', function(e){downed[code2name[e.keyCode]] = 0;});
	})();