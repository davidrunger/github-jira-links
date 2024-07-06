/*
 * This addon makes a Jira issue name in a Github PR title clickable.
 */

// Needed to avoid UNSAFE_VAR_ASSIGNMENT web-ext warning.
//https://devtidbits.com/2017/12/06/quick-fix-the-unsafe_var_assignment-warning-in-javascript/
function safeAssignInnerHtml(element, html) {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, `text/html`);
  const tags = parsed.querySelector('body').children;

  element.innerHTML = ``;

  for (const tag of tags) {
    element.appendChild(tag);
  }
}

function linkifyJiraKeys() {
  chrome.storage.local.get("jiraOrganization",  function(item) {
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

      elements.forEach(function(element, index, list) {
        matches = element.innerHTML.match(/(.*)\b([A-Z]{2,7}-[0-9]+)\b(.*)/);
        if (matches != null) {
          // matches[0] is the full text
          link = `<a href="https://${item.jiraOrganization}.atlassian.net/browse/${matches[2]}">${matches[2]}</a>`;
          const newSpanHtml = `<span>${matches[1] + link + matches[3]}</span>`;
          safeAssignInnerHtml(element, newSpanHtml)
        }
      });
    });
  });
}

window.addEventListener('turbo:load', linkifyJiraKeys);
