const search = 'https://pure.mpg.de/rest/feed/search?q=';
var query = '{"bool":{"must":[{"term":{"publicState":{"value":"RELEASED","boost":1.0}}},{"term":{"versionState":{"value":"RELEASED","boost":1.0}}},{"bool":{"should":[{"term":{"metadata.creators.person.organizations.identifierPath":{"value":"ou_907574","boost":1.0}}},{"term":{"metadata.creators.organization.identifierPath":{"value":"ou_907574","boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}';
var src = search + query;

var language;
if (window.navigator.languages) {
    language = window.navigator.languages[0];
} else {
    language = window.navigator.userLanguage || window.navigator.language;
}


function showRecent(){
    createHome();
    initRemoteContent(src, initContent);
}


/*
    CREATE HOME PAGE
*/

function createHome(){

    let root = document.getElementById('b');
    let pre = createNode('pre','content');

    let a = createNode('a','eth');
    a.innerHTML = 'MPI for Social Anthropology';
    a.href = 'https://www.eth.mpg.de/';
    pre.appendChild(a);

    pre.innerHTML += '\n';
    pre.innerHTML += 'Items recently released in ';

    a = createNode('a');
    a.innerHTML = 'MPG.PuRe';
    a.href = 'https://pure.mpg.de/'
    pre.appendChild(a);

    pre.innerHTML += ':';
    pre.innerHTML += '\n\n';

    root.appendChild(pre);
}


/*
    INITIALISE FEED
*/


function initContent(xmlFeed){

    var i = 0;
    var content = "";

    var feed = xmlFeed.getElementsByTagName("feed").item(0);

    if (feed == null) {
        document.getElementById('content').innerHTML += "ERROR: Error in parsing ATOM Feeds XML format."
        return;
    }

    var entries = feed.getElementsByTagName("entry").length;

    for (i = 0; i < entries; ++i) {

        var entry = feed.getElementsByTagName('entry').item(i);

        var title = entry.getElementsByTagName('title').item(0).firstChild.data;
        if (title.length > 79) {
            title = title.substr(0,77) + "...";
        }

        var creator = entry.getElementsByTagName('dc:creator').item(0).innerHTML;

        var published = entry.getElementsByTagName('published').item(0).innerHTML;
        var date = new Date(published);
        var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }; /*weekday: 'long', */
        published = date.toLocaleDateString(language,dateOptions) + '   ';
        published += date.toLocaleTimeString(language);

        var link = entry.getElementsByTagName('link').item(0).getAttribute("href");

        content += creator + '\n' +
            '<a target="_blank" href="' + link +'">' + title.substr(0,100) + '</a>\n' +
            published + '\n\n';
        }

        document.getElementById('content').innerHTML += content;

}