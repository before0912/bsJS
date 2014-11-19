bs.cls( 'Audio', function( fn, clsFn, bs ){
		var ext = bs.DETECT.audioMp3 ? '.mp3' : '.ogg';
		fn.NEW = function( id, src ){this.audio = new Audio(), this.S( 'src', src ), bs.ANI.ani(this);},
		fn.loop = 1, fn._seek = 0, fn.loopCnt = 0,
		fn.play = function(seek){
			return this.isPause || this.isPlay ? 0 : ( this.stop(), this.isPlay = 1, this._seek = seek || 0, this.audio.play(), 1 );
		},
		fn.stop = function(){
			var a;
			if( this.isPlay ){
				if( this.isLoaded ){
					( a = this.audio ).pause(), a.currentTime = 0;
					if( this.progress ) this.progress( this, 0, a.duration );
				}
				return this.loopCnt = this.isPause = this.isPlay = 0, 1;
			}
		},
		fn.ANI = function(){
			var a = this.audio;
			if( !this.isLoaded ){
				if( a.readyState > 2 ) this.isLoaded = 1, this.load && this.load( this, a.currentTime, a.duration );
			}else if( this.isPlay ){
				if( this._seek ){
					if( this._seek >= a.duration ) this.stop();
					else a.currentTime = this._seek, this._seek = 0;
				}
				if( a.duration && a.currentTime > a.duration - .05 ){
					if( ++this.loopCnt == this.loop ) this.stop(), this.end && this.end(this);
					else a.pause(), a.currentTime = 0, a.play();
				}else if( this.progress ) this.progress( this, a.currentTime, a.duration );
			}
		},
		fn.seek = function(seek){
			if( this.isLoaded ) this.stop(), this.play(seek);
			else this.play(seek);
		},
		fn.pause = function(){if( !this.isPause && this.isPlay ) this.isPlay = 0, this.isPause = 1, this.pauseTime = this.audio.currentTime, this.audio.pause();},
		fn.resume = function(){if( this.isPause && !this.isPlay ) this.isPlay = 1, this.isPause = 0, this.audio.play();},
		fn.toggle = function(){this.isPause ? this.resume() : this.pause();},
		fn.S = (function(){
			var blur = (function(){
				var init = function(){
					var unactive = function(type){ 
						if( isUnactive ) return;
						isUnactive = 1;
						if( callback ) callback(type);
					}, t0, time = Date.now(), prevTime = 0, isUnactive = 0;
					bs.ANI.ani({
						ANI:function(t){isUnactive = 0, time = t;}
					});
					setInterval( function(){
						if( isUnactive ) return;
						if( time == prevTime ) unactive('setInterval');
						else prevTime = time;
					}, 500 );
					bs.WIN.on( 'blur', function(){if(isUnactive) return; unactive('blur');} );
					bs.WIN.on( 'unload', function(){if(isUnactive) return; unactive('unload');} );
					t0 = 0;
					if( typeof document.hidden != 'undefined' ) t0 = 'visibilitychange';
					else if( typeof document.mozHidden != 'undefined' ) t0 = 'mozvisibilitychange';
					else if( typeof document.msHidden != 'undefined' ) t0 = 'msvisibilitychange';
					else if( typeof document.webkitHidden != 'undefined' ) t0 = 'webkitvisibilitychange';
					t0 && document.addEventListener( t0, function(){
						if( isUnactive ) return;
						if( document.visibilityState != 'visible' ) unactive('visibilitychange');
					});				
				}, callback = 0;
				return function( func ){
					if( typeof func != 'function') return;
					if( !callback ) init();
					callback = func;
				};					
			})();			
			return function(){
				var t0, i = 0, j = arguments.length, k, v;
				while( i < j ){
					switch(k = arguments[i++]){
						case'src':case'currentTime':case'duration':t0 = this.audio; break;
						default:t0 = this;
					}
					if( i == j ) return t0[k];
					if( ( v = arguments[i++] ) === null ) delete t0[k];
					else switch(k){
						case'src':t0.src = ( v += ext ), this.isLoaded = 0; break;
						case'blur':blur(v);
						default:t0[k] = v;
					}
				}
				return v;
			};
		})();
	} );