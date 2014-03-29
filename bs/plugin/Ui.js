bs['plugin+']('class', 'ui', (function() {
    function cssLoad() {
        var headID=document.getElementsByTagName("head")[0],css=document.createElement('link');
        css.type='text/css',css.rel='stylesheet',css.href=arguments[0]
        if(arguments[1]) css.id=arguments[1]
        headID.appendChild(css);
        return css
    }

    cssLoad('//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css');
    var theme=cssLoad('//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css','__bsTheme');
    return function() {
        var add=arguments[1] ? arguments[1] : '',pre=" "
        switch(arguments[0]){
            case 'button' : pre=' btn-' ;break
            case 'label' : pre=' label-' ;break
            case 'buttonIcon' : pre=' btn-';break
            case 'buttonGroup' : pre=' btn-group-';break
            case 'inputGroup' : pre=' input-group-';break
            case 'alert' : pre=" alert-" ;break
            case 'panel' : pre=" panel-" ;break
        }
        var etcs = {}
        for(var i=1; i < arguments.length; i++) arguments[i].indexOf('@')>-1 ? etcs[arguments[i].split('@')[0]]=arguments[i].split('@')[1] : add+=pre + arguments[i] ;
        switch(arguments[0]) {
            case 'theme' :theme.setAttribute('href',arguments[1])
                return
            case 'icon' :return bs.Dom('<span></span>').S('@class','glyphicon glyphicon-' + add,'this')
            case "form" :return bs.Dom('<form></form>').S('@class',add,'this')
            case "submit" :return bs.Dom('<input type="submit"/>').S('@class','btn btn-' + add,'this')
            case "reset" :return bs.Dom('<input type="reset"/>').S('@class','btn btn-' + add,'this')
            case "text" :return bs.Dom('<input type="text"/>').S('@class','form-control','@placeholder','textField','this')
            case "email" :return bs.Dom('<input type="email"/>').S('@class','form-control','@placeholder','email','this')
            case "password" :return bs.Dom('<input type="password"/>').S('@class','form-control','@placeholder','password','this')


            case "panel" :
                etcs['title'] = etcs['title'] ? etcs['title'] : ''
                etcs['contents'] = etcs['contents'] ? etcs['contents'] : ''
                var box =  bs.Dom('<div></div>').S('@class','panel '+add,'this')
                var title = bs.Dom('<div class="panel-heading"">'+etcs['title']  +'</div>')
                var contents = bs.Dom('<div class="panel-body">'+etcs['contents']+'</div>')
                box.S('>', title,'>', contents,'this')
                return {box:box,title:title,contents:contents}

            case "label" :return bs.Dom('<span></span>').S('@class','label '+add,'this')
            case "badge" :return bs.Dom('<span class="badge"></span>')

            case "inputGroup" :return bs.Dom('<div></div>').S('@class','input-group ' + add,'this')
            case "inputAddon" :return bs.Dom('<div class="input-group-addon"></div>')

            case "buttonToolbar" :return bs.Dom('<div class="btn-toolbar" role="toolbar"></div>')
            case "buttonGroup" :return bs.Dom('<div></div>').S('@class','btn-group ' + add,'this')
            case "button" :return bs.Dom('<input type="button"/>').S('@class','btn btn-' + add,'this')
            case "buttonIcon" : {
                var result = bs.Dom('<button type="button"></button>').S('@class','btn btn-' + add,'html','<span class="glyphicon glyphicon-'+etcs['icon']+'"></span>','this')
                return result
            }
            case "alert" :return bs.Dom('<div></div>').S('@class','alert alert-' + add,'this')
            case "dialog" :
                //TODO 다이알로그 일단 구현해보자 -0-
                //TODO 부트스트랩 IE7에서 먼가 렌더링문제가 -_- 있는듯한데?
                var result={box: bs.Dom('<div></div>').S(
                    '<', bs.Dom('body'),
                    'left', document.documentElement.offsetWidth / 2,
                    'top', (window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop) + document.documentElement.clientHeight / 2,
                    'border', '1px solid #eee', 'border-radius', 5, 'user-select', 'none', 'position', 'absolute', 'box-shadow', '0px 0px 20px 0px rgba(50, 50, 50, 0.75)',
                    'this'
                ), contents: []}, t0=arguments, t1, startX, startY, x, y, move={}
                var titleBox=bs.Dom('<div></div>').S(
                    '>', bs.Dom('<div>X</div>').S('float', 'right', 'mousedown', function() {titleBox.S('mousedown', null), result.box.S(null)}, 'this'),
                    '<', result.box,
                    'cursor', 'pointer', 'user-select', 'none', '@class', 'btn btn-default', 'width', '100%', 'padding', 10, 'user-select', 'none', 'font-size', 16,
                    'border-bottom-right-radius', 0, 'border-bottom-left-radius', 0,
                    'mousedown', function($e) {
                        startX=$e.event.offsetX||$e.lx, startY=$e.event.offsetY||$e.ly, x=$e.x, y=$e.y
                        bs.Dom('body').S('mousemove', function($e) {x=$e.x, y=$e.y})
                        move.ANI=function() {result.box.S('left', x - startX, 'top', y - startY)}
                        bs.ANI.ani(move)
                        bs.Dom('body').S(
                            'mouseup', function() {
                                move.ANI=function() {return true}
                                bs.Dom('body').S('mousemove', null)
                            }
                        )
                    },
                    'this'
                )
                result.titleBox = titleBox
                var t2={
                    title:bs.Dom('<div></div>').S('<', titleBox, 'float', 'left', 'this'),
                    contents:bs.Dom('<div></div>').S('<', result.box, 'background', '#fff', 'width', '100%', 'user-select', 'none', 'border-top-right-radius', 0, 'border-top-left-radius', 0, 'padding', 15, 'this')
                }
                titleBox.S('>', bs.Dom('<div style="clear:both"></div>'))
                for(i=1; i<t0.length; i++) t2[t1=t0[i]] ? result.contents.push(t2[t1].S('html', t0[++i], 'this')) : ++i
                return result
            // 음확장해볼까..
            default  :
                return bs.Dom('<input type=""'+arguments[0]+'"/>').S('@class', 'form-control', '@value', arguments[0], 'this')


        }
    }
})(), 1.0);