// Saves options to chrome.storage
function saveOption(event) {
  var target = event.target;

  var data = {};

  if (target.id !== 'hideReg') {
    data[target.value] = target.checked;
  } else {
    data['hideReg'] = target.value;
  }

  chrome.storage.sync.set(data, function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {data: data, type:'fkm-update-problems'},
        function(response) {});
    });
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    hideOk: false,
    hideBad: false,
    hideNew: false,
    hideReg: ''
  }, function(items) {
    document.getElementById('hideOk').checked = items.hideOk;
    document.getElementById('hideBad').checked = items.hideBad;
    document.getElementById('hideNew').checked = items.hideNew;
    document.getElementById('hideReg').value = items.hideReg;
  });
}


document.addEventListener('DOMContentLoaded', function onLoad() {
  restoreOptions();
  document.getElementById('hideOk').addEventListener('change', saveOption);
  document.getElementById('hideBad').addEventListener('change', saveOption);
  document.getElementById('hideNew').addEventListener('change', saveOption);
  document.getElementById('hideReg').addEventListener('keyup', saveOption);
});

/* document.getElementById('hideBad').checked = items.hideBad;
 * document.getElementById('hideNew').checked = items.hideNew;*/
