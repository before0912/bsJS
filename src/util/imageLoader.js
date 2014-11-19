var isCanvas = this['HTMLCanvasElement'],
result = function(loaded, paths, progress, parallel){
	var target, result, next, i, j;
	parallel = parallel || 1;
	if(paths.splice) target = paths;
	else{
		target = [];
		for( i in paths )target.push( paths[i] )
	}
		result = [], i = 0, j = path.length;
		next = function(){
			var img, id;
			if( i == j ) loaded(result);
			else{
				result.push(img = new Image);
				if( isCanvas ) img.onload = next;
				else id = setInterval( function(){
					if( img.complete ) clearInterval(id), next();
				}, 16 );
				img.src = path[i++];
				if( progress ) progress( result, i, j );
			}
		};
	}else{
		result = {}
	}
	next();
};
	
module.exports = result;