// fix title
var info;

var infoRegExp = /([a-zA-Zа-яА-Я ]+)\[.*(16[0-9]-[12])/;

function parseInfo(title) {
  var res = title.match(infoRegExp);
  if (res) {
    res = [res[1].trim(), res[2].trim()]
    if (res[0] !== "User login page")
      return res
  }
}

function updateTitle() {
  title = document.querySelector('#l12 .main_phrase');
  info = parseInfo(title.innerText);
  title.innerHTML = "Кокосик";
  title.style.opacity = "1";
}

// update person info
function updateInfo(info) {
  // oldTitle //
  chrome.storage.local.set({type: 'fkm-info', info: info});
}


// find
function hide(obj) { obj.style.display = 'none'; }
function hideBySelector(selector) {
  document.querySelectorAll(selector).forEach(hide);
}

function getProblems(textRegexp) {
  try {
    var reg = new RegExp(textRegexp);
  } catch (e) {
    return [];
  }

  var problems = document.querySelectorAll('#probNavRightList a')

  return [].filter.call(problems, function f(obj) {
    return reg.test(obj.innerHTML);
  }).map(function f(obj) { return obj.parentNode; });
}

function hideProblemsByText(textRegexp) {
  getProblems(textRegexp).forEach(hide);
}

var hideOkProblems = hideBySelector.bind({}, '#probNavRightList .probOk');
var hideBadProblems = hideBySelector.bind({}, '#probNavRightList .probBad');
var hideNewProblems = hideBySelector.bind({}, '#probNavRightList .probEmpty');

// hide required problems by options argument
function hideProblems(options) {
  if (options === undefined)
    options = getOptions();
  if (options.hideOk)
    hideOkProblems();
  if (options.hideBad)
    hideBadProblems();
  if (options.hideNew)
    hideNewProblems();
  if (options.hideReg)
    hideProblemsByText(options.hideReg);
}

// show all problems and hide correct again
function updateProblems() {
  var pList = document.querySelector('#probNavRightList');
  pList.style.display = 'none';

  [].forEach.call(pList.children, function f(obj) {
    obj.style.display = ''
  });
  hideProblems();
  pList.style.display = '';
}

// saveOptions to localStorage, update current value
function saveOptions(options) {
  var newoptions = Object.assign(
    {},
    JSON.parse(localStorage['fkm-options'] || '{}'),
    options);
  localStorage['fkm-options'] = JSON.stringify(newoptions);
  return newoptions;
}

// load options from localStorage
function getOptions() {
  return JSON.parse(localStorage['fkm-options'] || '{}');
}

// listen requests
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type == 'fkm-update-problems') {
      data = saveOptions(request.data);
      updateProblems(data);
    }
  });

updateTitle();
if (info) {
  updateProblems();
  updateInfo(info);
}
