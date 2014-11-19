(function(){
		var _dateGet = function(date){
			var i, temp, h, m, s;
			if( typeof date == 'string' ){
				i = date.split( '-' );
				h = m = s = 0;
				if( i[2] && i[2].indexOf( ' ' ) > -1 ){
					temp = i[2].split( ' ' );
					i[2] = temp[0];
					temp = temp[1].split( ':' );
					h = parseInt( temp[0], 10 );
					m = parseInt( temp[1], 10 );
					s = parseInt( temp[2], 10 );
				}
				return new Date( parseInt( i[0], 10 ), parseInt( i[1], 10 ) - 1, parseInt( i[2], 10 ), h, m, s );
			}else return date instanceof Date ? date : new Date;
		},
		_leapYear = function(year){
			return ( year % 4 == 0 && year % 100 != 0 ) || year % 400 == 0;
		},
		_day = ['sun','mon','tue','wed','thu','fri','sat'],
		_date = function( part, date ){
			var i;
			switch( part ){
			case 'Y': return date.getFullYear() + '';
			case 'y': return i = _date( 'Y', date ), i.substr( i.length - 2 );
			case 'm': return i = '00' + _date( 'n', date ), i.substr( i.length - 2 );
			case 'n': return ( date.getMonth() + 1 ) + '';
			case 'd': return i = '00' + _date( 'j', date ), i.substr( i.length - 2 );
			case 'j': return date.getDate() + '';
			case 'H': return i = '00' + _date( 'G', date ), i.substr( i.length - 2 );
			case 'h': return i = '00' + _date( 'g', date ), i.substr( i.length - 2 );
			case 'G': return date.getHours() + '';
			case 'g': return parseInt( date.getHours() ) % 12 + '' || '0';
			case 'i': return i = '00' + date.getMinutes(), i.substr( i.length - 2 );
			case 's': return i = '00' + date.getSeconds(), i.substr( i.length - 2 );
			case 'u': return date.getMilliseconds() + '';
			case 'w': return _day[date.getDay()];
			default: return part;
			}
		}, dateDiff;
		fn( 'dateadd', function( interval, number, date ){
			date = _dateGet( date );
			switch( interval.toLowerCase()){
			case'y': date.setFullYear( date.getFullYear() + number );break;
			case'm': date.setMonth( date.getMonth() + number );break;
			case'd': date.setDate( date.getDate() + number );break;
			case'h': date.setHours( date.getHours() + number );break;
			case'i': date.setMinutes( date.getMinutes() + number );break;
			case's': date.setSeconds( date.getSeconds() + number );break;
			case'ms': date.setMilliseconds( date.getMilliseconds() + number );break;
			default: return null;
			}
			return date;
		}),
		fn( 'datediff', dateDiff = function( interval, dateOld, dateNew ){
			var date1, date2, d1_year, d1_month, d1_date, d2_year, d2_month, d2_date, i, j, k, d, year, month, order, temp;
			date1 = _dateGet( dateOld );
			date2 = _dateGet( dateNew );
			switch( interval.toLowerCase()){
			case'y': return date2.getFullYear() - date1.getFullYear();
			case'm': return ( date2.getFullYear() - date1.getFullYear() ) * 12 + date2.getMonth() - date1.getMonth();
			case'd':
				if( date2 > date1 ){
					order = 1;
				}else{
					order = -1;
					date1 = _dateGet( dateNew );
					date2 = _dateGet( dateOld );
				}
				d1_year = date1.getFullYear();
				d1_month = date1.getMonth();
				d1_date = date1.getDate();
				d2_year = date2.getFullYear();
				d2_month = date2.getMonth();
				d2_date = date2.getDate();
				j = d2_year - d1_year;
				d = 0;
				if( j > 0 ){
					d += dateDiff( 'd', new Date( d1_year , d1_month, d1_date ), new Date( d1_year , 11, 31 ) );
					d += dateDiff( 'd', new Date( d2_year , 0, 1 ), new Date( d2_year , d2_month, d2_date ) );
					year = d1_year + 2;
					for( i = 2 ; i < j - 1 ; i++ ){
						if( _leapYear( year ) ){
							d += 366;
						}else{
							d += 365;
						}
						year++;
					}
				}else{
					temp = [31,28,31,30,31,30,31,31,30,31,30,31];
					if ( _leapYear( d1_year ) ) temp[1]++;
					j = d2_month - d1_month;
					if( j > 0 ){
						d += dateDiff( 'd', new Date( d1_year , d1_month, d1_date ), new Date( d1_year , d1_month, temp[d1_month] ) ) + 1;
						d += dateDiff( 'd', new Date( d2_year , d2_month, 1 ), new Date( d2_year , d2_month, d2_date ) );
						month = d1_month + 1;
						for( i = 1 ; i < j ; i++ ){
							d += temp[month++];

						}
					}else{
						d += d2_date - d1_date;
					}
				}
				return d * order;
			case'h': return parseInt( ( date2.getTime() - date1.getTime() ) / 3600000 );
			case'i': return parseInt( ( date2.getTime() - date1.getTime() ) / 60000 );
			case's': return parseInt( ( date2.getTime() - date1.getTime() ) / 1000 );
			case'ms': return date2.getTime() - date1.getTime();
			default: return null;
			}
		} ),
		fn( 'datepart', function( part, date ){
			var part, i, j, result;
			part = part || 'Y-m-d H:i:s';
			date = _dateGet( date );
			result = '';
			for( i = 0, j = part.length ; i < j ; ++i ) result += _date( part.charAt(i), date );
			return result;
		} );
	})();