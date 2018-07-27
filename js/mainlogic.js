var topNavHTML = new Array();
var leftNavHTML = new Array();
var currentSection;
var sectionToHighlight;
function locatePage(tree)
{
  function walkBranch(branch)
  {
    console.log("BRANCH:")
    console.log(branch)
    for (var k=0;k<branch.length;k++)
    {
      if (branch[k].section) {
        walkBranch(branch[k].section);
      } else {
        if (branch[k].path == pageURL)
        {
          // console.log(branch[k].path + ' was == ' + pageURL)
          foundPage = true;
          break;
        } else {
          // console.log(branch[k].path + ' was != ' + pageURL)
        }
      }
    }
  }
  var foundPage = false;
  console.log("TREE:")
  console.log(tree)
  walkBranch(tree)
  return foundPage;
}

function openBranch(srcObj)
{
  console.log(srcObj);
  var classString = srcObj.getAttribute("class");
  if (classString.indexOf("chevronDown") > -1)
  {
    // close
    srcObj.setAttribute("class",srcObj.getAttribute("class").replace("chevronDown","chevronRight")); // open chevron
    var children = srcObj.parentNode.childNodes;
    for(var i = 0; i < children.length; i++) {
        if(children[i].nodeName == "UL") {
          children[i].setAttribute("style","display:none"); // open chevron
        }
    }
  } else {
    // open
    srcObj.setAttribute("class",srcObj.getAttribute("class").replace("chevronRight","chevronDown")); // open chevron
    var children = srcObj.parentNode.childNodes;
    for(var i = 0; i < children.length; i++) {
        if(children[i].nodeName == "UL") {
          children[i].removeAttribute("style"); // open chevron
        }
    }
  }
}

var leftNav = new Array();
function renderLeftNav(tree)
{
  for (var j=0;j<tree.length;j++)
  {
    if (tree[j].section)
    {
      // this is a branch; output nested HTML, recurse/process subsection
      leftNav.push('<li class="_3d7s _37du"><i class="_37e7 chevronRight _3n44 _3n45 _3n46 _3n47" onclick="openBranch(this)"></i><a href="' + tree[j].path + '" target="_self" class="_37e8">'+ tree[j].title +'</a>')
      leftNav.push('<ul class="_37e9" style="display:none">')
      renderLeftNav(tree[j].section);
      leftNav.push('</ul></li>')
    } else {
      // just a regular old topic; this is a leaf, not a branch; render a link!
      var youAreHere = '';
      if (tree[j].path == pageURL)
      {
        // you are here logic TODO
        youAreHere=' id="youAreHere"';
      }
      leftNav.push('<li class="_37ds"><a href="' + tree[j].path + '" target="_self" class="_37e8"'+ youAreHere +'>'+ tree[j].title +'</a></li>')

  }
}
}
function syncLeftNav(navSpot)
{
  // open leftnav tree to current URL, bolding the parent nav items as we go
  if (!navSpot) navSpot = document.getElementById("youAreHere");
  navSpot.setAttribute("style", "font-weight: bold; color: black"); // bold current topic
  navSpot.parentNode.removeAttribute("style"); // open tree by removing "display:none"
  var children = navSpot.childNodes;
  for(var i = 0; i < children.length; i++) {
      if(children[i].nodeName == "I") {
        children[i].setAttribute("class",children[i].getAttribute("class").replace("chevronRight","chevronDown")); // open chevron
      }
  }
  if(navSpot.parentNode.parentNode.nodeName != "DIV") syncLeftNav(navSpot.parentNode) // go up level
}
function writeNavigation(tree)
{
  console.log(tree)

  //build topnav
  var topNav = new Array();
  for (i=0;i<tree.topnav.length;i++)
  {
    topNav.push('<li class="_m4a _m4h _nn8 _m4d _nna"><a href="'+ tree.topnav[i].path + '" class="_m4b" tabindex="10">'+ tree.topnav[i].title +'</a></li>')
  }

  // build leftnav
  renderLeftNav(tree.leftnav)

  // write output to DOM
  document.getElementById('u_0_0').innerHTML = topNav.join(''); // topnav
  document.getElementById('leftnavContainer').innerHTML = leftNav.join(''); // leftnav
  window.setTimeout(syncLeftNav,1);
}
