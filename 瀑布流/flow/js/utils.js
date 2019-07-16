window.utils = (function(){
    function toJSON(jsonstr) {
        if ('JSON' in window) { // 'JSON' in window 返回false表示JSON的方法不可以用
          return JSON.parse(jsonstr);
        } else {
          return eval('(' + jsonstr + ')');
        }
      }

      function arrto(arrlike){
        try {
            return Array.from(arrlike);
          } catch (e) {
            var ary = []; 
            for (var i = 0; i < arrlike.length; i++) {
              ary.push(arrlike[i]);
            }
            return ary;
          }
      }

    
      function offset(ele) {
       let left = ele.offsetLeft;
       let top = ele.offsetTop;
       let parent = ele.offsetParent;
        while (parent && parent.nodeName !== 'BODY') {
          left += parent.clientLeft + parent.offsetLeft;
          top += parent.clientTop + parent.offsetTop;
          parent = parent.offsetParent;
        }
        return {
          left,
          top
        }
      }
      return {
        toJSON,
        arrto,
        offset,
    }
})();