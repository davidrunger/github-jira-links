/*
 * Addons settings: Allow to configure Jira organization name.
 *
 */

function saveOptions(e) {
  e.preventDefault();
  chrome.storage.local.set({
    jiraOrganization: document.querySelector('#organization').value,
  });
}

function restoreOptions() {
  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = chrome.storage.local.get('jiraOrganization', function (item) {
    document.querySelector('#organization').value = item.jiraOrganization || '';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
