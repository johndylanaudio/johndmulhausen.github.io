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
var bottomNav = new Array();
function renderBottomNav(tree)
{
  for (var l=0;l<tree.length;l++)
  {
    var thisNavNode = tree[l];
    if (thisNavNode.column)
    {
      // this is a new column, create the container DIV, write header, recurse
      bottomNav.push('<div class="bxGrid__column bxGrid__column-25 bxPageSiteMap__column">')
      bottomNav.push('<h3 class="bxHeading bxHeading--level-6 bxHeading--dark bxPageSiteMap__header">'+ thisNavNode.columntitle +'</h3>')
      bottomNav.push('<ul class="bxPageSiteMap__list">')
      renderBottomNav(thisNavNode.column);
      bottomNav.push('</ul></div>')
    } else if (thisNavNode.path) {
      // this is a simple link
      bottomNav.push('<li class="bxPageSiteMap__listItem"><a href="'+thisNavNode.path+'" class="bxPageSiteMap__listItemLink">'+thisNavNode.title+'</a></li>')
    } else if (thisNavNode.separator) {
      // this is a separator HR line
      bottomNav.push('<hr class="_3fwr _4tae _uhr">')
    }
  }
}

var leftNav = new Array();
function renderLeftNav(tree)
{
  for (var j=0;j<tree.length;j++)
  {
    var youAreHere = '';
    var openBranchHere = false;
    if (tree[j].path == pageURL)
    {
      // you are here logic TODO
      youAreHere=' id="youAreHere" style="font-weight: bold; color: black !important"';
      openBranchHere = '';
    } else {
      youAreHere='';
      openBranchHere = ' style="display:none"'
    }
    if (tree[j].section)
    {
      // this is a branch; output nested HTML, recurse/process subsection
      leftNav.push('<li class="_3d7s _37du"><i class="_37e7 chevronRight _3n44 _3n45 _3n46 _3n47" onclick="openBranch(this)"></i><a href="' + tree[j].path + '" target="_self" class="_37e8"'+ youAreHere +'>'+ tree[j].title +'</a>')
      leftNav.push('<ul class="_37e9"'+openBranchHere+'>')
      renderLeftNav(tree[j].section);
      leftNav.push('</ul></li>')
    } else {
      // just a regular old topic; this is a leaf, not a branch; render a link!

      leftNav.push('<li class="_37ds"><a href="' + tree[j].path + '" target="_self" class="_37e8"'+ youAreHere +'>'+ tree[j].title +'</a></li>')

    }
  }
}
function syncLeftNav(navSpot)
{
  // open leftnav tree to current URL, bolding the parent nav items as we go
  if (!navSpot) navSpot = document.getElementById("youAreHere");
  navSpot.setAttribute("style", "font-weight: bold; color: black !important"); // bold current topic
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

  // build left nav
  renderLeftNav(tree.leftnav);

  // build bottom nav
  renderBottomNav(tree.bottomnav);

  // build footer nav
  console.log(tree.footernav);
  var footerNavText = new Array();
  var footerNavIcon = new Array();
  for (var i=0;i<tree.footernav.length;i++)
  {
    thisFooterItem = tree.footernav[i];
    if (thisFooterItem.type=='text')
    {
      footerNavText.push('<li class="bxPageFooter__navItem"><a href="'+thisFooterItem.path+'" class="bxPageFooter__navLink" tabindex="20">'+thisFooterItem.title+'</a></li>')
    } else if (thisFooterItem.type=='icon')
    {
      footerNavIcon.push('<li class="_2gxi"><a href="'+thisFooterItem.path+'" target="_blank" class="_2gxj" tabindex="0"><i class="'+thisFooterItem.icon+' _3n44 _3n45 _3n46 _3n47 _1_uy _2gxk"></i></a></li>')
    }
  }

  // build right nav
  var tags = [ "h1","h2","h3" ];
  var all_headings = [];

  for(var i = 0; i < tags.length; i++) {
    all_headings = all_headings.concat(document.getElementById('contentBody').getElementsByTagName(tags[i]));
  }
  console.log(all_headings);

  // write output to DOM
  document.getElementById('u_0_0').innerHTML = topNav.join(''); // topnav
  document.getElementById('leftnavContainer').innerHTML = leftNav.join(''); // leftnav
  document.getElementById('bottomNavContainer').innerHTML = bottomNav.join('') // bottomnav
  document.getElementById('textFooter').innerHTML = footerNavText.join('') // footer text links
  document.getElementById('iconFooter').innerHTML = footerNavIcon.join('') // footer icon links
  window.setTimeout(syncLeftNav,1);
}
