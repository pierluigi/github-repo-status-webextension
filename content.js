// Finds the latest commit on the repo page.
const LATEST_COMMIT_SELECTOR =
  ".commit-tease span[itemprop=dateModified] > relative-time";

// Uses a MutationObserver to ensure we respond
// to dynamically loaded content in the DOM
var observer = new MutationObserver(function(mutations, me) {
  const el = document.querySelector(LATEST_COMMIT_SELECTOR);
  if (el) {
    const datetime = el.getAttribute("datetime");
    browser.runtime.sendMessage({ datetime });
    me.disconnect();
    return;
  }
});

observer.observe(document, {
  childList: true,
  subtree: true
});
