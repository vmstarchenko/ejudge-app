// console.dir(chrome);

function updatePopup(tabId, tab) {
}

function checkUrl(tabId, changeInfo, tab){
  var re = /.*caos.ejudge.ru.*/;

  if (re.test(tab.url)){
    chrome.pageAction.show(tabId);
  } else {
    chrome.pageAction.hide(tabId);
  }

  updatePopup(tabId, tab);
}


chrome.tabs.onCreated.addListener(function(tab) {
  checkUrl(tab.id, null, tab);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (changeInfo.status=='complete'){
    checkUrl(tabId, changeInfo, tab);
  }
});

chrome.tabs.onActivated.addListener(function() {
  updatePopup
});

var user;

chrome.runtime.onMessage.addListener( // update user request
  function(request, sender, sendResponse) {
    // console.log('eeee', request);
  });

