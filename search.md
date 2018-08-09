---
title: Search results
norightnav: true
---
<style>
.st-ui-type-heading, .st-ui-type-detail, .st-ui-type-detail-bold, .st-query-present, .st-ui-search-summary-query  {
  font-family: "Oculus Sans", Arial, Helvetica, sans-serif !important;
}
.st-ui-type-detail-bold {
  color: #006621;
}
.st-ui-type-detail-bold::after {
  content: "\A";
  white-space: pre;
}
.st-ui-type-detail:before {
}
</style>
<script language="JavaScript">
var replacedOnce = false;
function massageSearchResultHTML()
{
  var x = document.getElementsByClassName("st-ui-type-detail");
  console.log(x);
  for (var i = 0; i < x.length; i++) {
    var currentHTML = x[i].innerHTML;
    var newHTML = currentHTML.replace('&nbsp;•&nbsp;','')
    newHTML = newHTML.replace('https://forums.oculusvr.com','<b>Forums</b>: ')
    newHTML = newHTML.replace('https://developer.oculus.com','<b>Docs</b>: ')
    x[i].innerHTML = newHTML;
  }
}
$("body").on('DOMSubtreeModified', "#searchResults", function(data) {
  if (data.currentTarget.innerText.length > 0 && replacedOnce==false) {
    massageSearchResultHTML();
    replacedOnce = true;
  }
});
</script>
<div class="st-search-container" id="searchResults"></div>
