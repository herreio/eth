function initRemoteContent(url, func) {
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          func(xhttp.responseXML);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.overrideMimeType("application/atom+xml");
    xhttp.send();
}


function createNode(tag,id=null,className=null,type=null) {
    let elem = document.createElement(tag);
    if(id!==null){
        elem.setAttribute('id',id);
    }
    if (type !==null){
        elem.setAttribute('type',type);
    }
    if (className!==null) {
        elem.className=className;
    }
    return elem;
}
