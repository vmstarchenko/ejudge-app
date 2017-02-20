function updateInfo() {
  console.log("update popup");
}

chrome.storage.onChanged.addListener(function(changes, areaName) {
  console.log('works');
});


console.log('kek', chrome, chrome.storage);
