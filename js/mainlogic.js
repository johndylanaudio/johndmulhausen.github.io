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
var leftNav = new Array();
function renderLeftNav(tree)
{
  for (var j=0;j<tree.length;j++)
  {
    if (tree[j].section)
    {
      // this is a branch; output nested HTML, recurse/process subsection
      leftNav.push('<i class="_37e7 chevronRight _3n44 _3n45 _3n46 _3n47"></i><a href="' + tree[j].path + '" target="_self" class="_37e8">'+ tree[j].title +'</a>')
      leftNav.push('<ul class="_37e9">')
      renderLeftNav(tree[j].section);
      leftNav.push('</ul>')
    } else {
      // just a regular old topic; this is a leaf, not a branch; render a link!
      leftNav.push('<li class="_37ds"><a href="' + tree[j].path + '" target="_self" class="_37e8">'+ tree[j].title +'</a></li>')
      if (tree[j].path == pageURL)
      {
        // you are here logic TODO
      }
  }
}
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
}
