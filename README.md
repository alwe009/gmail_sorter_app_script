# Gmail Email Sorting by Domain Script

This script automatically sorts Gmail email threads by the sender's email domain. It creates labels based on the domain of the sender and applies them to the corresponding email threads in your inbox.

## Features

- Automatically creates labels based on the domain of the sender's email address.
- Applies the labels to email threads in the inbox.
- Handles emails in the format of `Name <email@domain.com>` and extracts the domain correctly.
  
## Functions

### `sortEmailsByDomain()`
Sorts the email threads in your Gmail inbox by the domain of the sender's email address. It assigns labels to each thread according to the sender's domain.

#### Usage
- Retrieve all email threads from the inbox.
- Extract the sender's domain using the helper function.
- Create a new label if it doesn't already exist for the domain.
- Apply the label to the email thread.

```javascript
function sortEmailsByDomain() {
  const threads = GmailApp.getInboxThreads();
  const labelCache = {};

  for (let i = 0; i < threads.length; i++) {
    const thread = threads[i];
    const messages = thread.getMessages();
    const sender = messages[0].getFrom();

    const domain = extractDomain(sender);
    if (domain) {
      // Create label if not already cached
      if (!labelCache[domain]) {
        labelCache[domain] = GmailApp.createLabel(domain);
      }
      labelCache[domain].addToThread(thread);
    }
  }
}
