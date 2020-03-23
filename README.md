# github-repo-status

A WebExtension for the Mozilla Firefox web browser to provide an at-a-glance overview of GitHub repositories activity status.

# Disclaimer

I needed a quick way to determine if a repository on GitHub seems to have an active community or not. The way I typically do this is by looking at the `Latest commit` timestamp on the repo overview page:

![Last commit date screenshot](screenshots/last_commit.png?raw=true "Last commit date screenshot")

This is by no means the one true indicator of a repository's activity and/or "quality". It simply serves my need of quickly filtering out inactive repositories. If you have a similar need, be my guest.

Also note this extension is not affiliated in any way with GitHub, Inc.

# What it does

A repository can be in any of these statuses:

- **ACTIVE**: a commit was made in the last two weeks
- **INACTIVE**: the last commit was made between two and 8 weeks ago
- **UNMAINTAINED**: the last commit was made more than 8 weeks ago
- **ABANDONED**: the last commit was made more than a year ago

The PageAction icon in the browser tab shows a different color representing the status:

- Green for ACTIVE
- Yellow for INACTIVE
- Orange for UNMAINTAINED
- Red for ABANDONED

![Active](screenshots/bar_active.png?raw=true "Repository is Active")
![Inactive](screenshots/bar_inactive.png?raw=true "Repository is Inactive")
![Unmaintained](screenshots/bar_unmaintained.png?raw=true "Repository is Unmaintained")
![Abandoned](screenshots/bar_abandoned.png?raw=true "Repository is Abandoned")

The colors are taken from the [GitHub Primer CSS color system](https://primer.style/css/support/color-system).

The threshold for these is currently hardcoded (in `background.js`), but I plan on making them customizable.

## Installation

Clone this repo (or download the zip and extract it to a local folder) and follow these steps:
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out


## How it works

This extension includes:

- a background script, "background.js"
- a content script, "content.js"
- a page action

The content scripts uses a MutationObserver to detect when the `Last commit` element appears on the repository overview page. It then parses the `datetime` for the commit and sends a message to the background script.

It adds the [page action](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction)
to every tab the user opens for the github.com domain, with an indicator of how active the repository is.
