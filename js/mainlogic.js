var topNavHTML = new Array();
var leftNavHTML = new Array();
var currentSection;
var sectionToHighlight;
function locatePage(tree)
{
  function walkBranch(branch)
  {
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
  walkBranch(tree)
  return foundPage;
}
function renderLeftNav(tree)
{
  for (var j=0;j<tree.length;j++)
  {
    if (tree[j].section)
    {
      // this is a branch; output nested HTML, recurse/process subsection
      renderLeftNav(tree[j].section);
    } else {
      // just a regular old topic; this is a leaf, not a branch; render a link!
      if (tree[j].path == pageURL)
      {
        sectionToHighlight = currentSection;
      }
  }
}
function writeNavigation(tree)
{
  for (i=0;i<tree.topnav.length;i++)
  {
      currentSection = tree.topnav[i].node;
      // build vertical nav
      var youAreHere = locatePage(tree[tree.topnav[i].node]);
      if (youAreHere || tree.topnav[i].path == pageURL)
      {
        renderLeftNav(tree[tree.topnav[i].node]);
      }
    // build horizontal nav
    if (tree.topnav[i].path==pageURL || tree.topnav[i].node==sectionToHighlight)
    {
      outputHorzTabs.push(' class="active"');
    }
  }
  document.getElementById('topNav').innerHTML = topNavHTML.join('');
  document.getElementById('leftNav').innerHTML = leftNavHTML.join('');
}
