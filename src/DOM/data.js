clsfn.data = domData = (function(){
			var id = 1, data = {}, t0 = doc.createElement('div');
			t0.innerHTML = '<div data-test-aaa="3"></div>';
			return t0.childNodes[0].dataset && t0.childNodes[0].dataset.testAaa == "3" ? function( el, k, v ){
				var t0 = el.dataset.bs || ( data[id] = {}, el.dataset.bs = id++ );
				return k == undefined ? data[t0] : k == null ? ( delete data[el.dataset.bs], delete el.dataset.bs ) : v == undefined ? data[t0][k] : v === null ? delete data[t0][k] : ( data[t0][k] = v );
			} : function( el, k, v ){
				var t0 = el.getAttribute('data-bs') || ( data[id] = {}, el.setAttribute('data-bs', id ), id++ );
				return k == undefined ? data[t0] : k == null ? ( delete data[el.getAttribute('data-bs')], el.removeAttribute('data-bs') ) : v == undefined ? data[t0][k] : v === null ? delete data[t0][k] : ( data[t0][k] = v );
			};
		})(),