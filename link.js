/*
 * This addon makes a Jira issue name in a Github PR title clickable.
 */

var getting = chrome.storage.local.get("jiraOrganization",  function(item) {

  if (!item.jiraOrganization) {
      console.log("Jira organization is not configured");
      return
  }

  var selectors = [
    '.js-issue-title',
    '.comment-body'
  ];

  selectors.forEach(function(selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function(span, index, list) {
      matches = span.innerHTML.match(/(.*)\b([A-Z]{2}-[0-9]+)\b(.*)/);
      if (matches != null) {
        // matches[0] is the full text
        link = `<a href="https://${item.jiraOrganization}.atlassian.net/browse/${matches[2]}">${matches[2]}</a>`;
        span.innerHTML = matches[1] + link + matches[3];
      }
    });
  });
});
