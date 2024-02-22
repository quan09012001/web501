/* Demo */
// Ví dụ nâng cao về xây dựng cấu trúc html

var li = (obj) => `<li><a href="${obj.url}">${obj.label}</a></li>`;
var ul = (arr) => `<ul>${arr.map((obj) => li(obj)).join('\n')}</ul>`
var arr =  [
    {url: "http://facebook.com", label: "Facebook"},
    {url: "http://youtube.com", label: "Youtube"},
    {url: "http://twitter.com", label: "Twitter"}

];
document.getElementById('list').innerHTML = ul(arr);