let flowRender = (function(){
    const { offset,toJSON,arrto } = window.utils;

    let flowBox = document.getElementById('flowBox');
    let flowli = flowBox.getElementsByTagName('li');

    let page = null;
    function query(){
        page++;
        let xhr = new XMLHttpRequest();
        xhr.open('GET',`json/data.json?page=${page}`,false);
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4 && xhr.status == 200){
                let data = toJSON(xhr.responseText);
                bindHTml(data);
            }
        }
        xhr.send();
    }
    query();
    function bindHTml(imgData){
        for(let i = 0;i<imgData.length;i+=3){
            let dataArr = [
                imgData[i],
                imgData[i+1],
                imgData[i+2],
            ];
            let flowList = arrto(flowli);
            flowList.sort((a,b)=>{
                a.offsetHeight - b.offsetHeight;
            });
            flowList.forEach((elment,liIndex) => {
                dataArr[liIndex]?elment.innerHTML+=queryHTML(dataArr[liIndex]):null;
            });
        }
    // }

    // function queryHTML({ link,pic,title }){
    //     return `<a href='${link}'>
    //     <div><img data-src='${pic}' alt=''>
    //     </div><span>${title}</span></a>`
    // }
    function queryHTML({link, pic, title}){
        return `<a href="${link}">
        <div><img data-src="${pic}" alt=""></div>
        <span>${title}</span>
      </a>`
      }

    let timer  = null;
    function handleScroll(){
        window.onscroll = function(){
            let pageH = win('scrollHeight');
            let scrollTop = win('scrollTop');
            let winH = win('clientHeight');
            if(timer) clearTimeout(timer)
            if(pageH - scrollTop - win <= 100){
                timer = setTimeout(()=>{
                    query();
                },300)
            }
        }
    }


    // 图片懒加载
    
})()