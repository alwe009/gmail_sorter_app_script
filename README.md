# Gmail Email Sorter by Domain

This Google Apps Script sorts Gmail inbox threads based on the sender's email domain. It automatically labels threads based on the domain of the email sender, which helps organize the inbox for better management.

## Features
- Sorts email threads by the domain of the sender’s email address.
- Creates a new label for each domain (if it doesn’t already exist).
- Applies the label to the email threads of the sender from that domain.
- Handles emails in the format of "Name <email@domain.com>" and regular email addresses.

## Requirements
- A Gmail account with access to Google Apps Script.

## Setup
1. Open your [Google Apps Script editor](https://script.google.com).
2. Create a new project or use an existing one.
3. Copy and paste the script provided below into the script editor.
4. Save the script and run the `sortEmailsByDomain` function to begin sorting emails by domain.

## Script Overview

### `sortEmailsByDomain`
This function retrieves all inbox threads, extracts the sender's domain from each thread's first message, and applies a label based on the domain.

#### Example Usage
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
```

### `extractDomain`

The `extractDomain` function extracts the domain part of an email address. It handles email addresses in both formats:
- `"Name <email@domain.com>"`
- `email@domain.com`

It returns the domain name in lowercase (e.g., `example.com`).

#### Parameters:
- `sender` (string): The email address of the sender. This can be in the format `"Name <email@domain.com>"` or just the email address itself (e.g., `email@domain.com`).

#### Returns:
- `string|null`: Returns the domain part of the email address in lowercase. If the email address is invalid or the domain cannot be extracted, it returns `null`.

#### Example Usage:
```javascript
function extractDomain(sender) {
  const emailRegex = /<(.+?)>/;
  let email = sender;

  // Extract email if in format "Name <email@domain.com>"
  const match = sender.match(emailRegex);
  if (match) {
    email = match[1];
  }

  const domainMatch = email.match(/@(.+)$/);
  return domainMatch ? domainMatch[1].toLowerCase() : null;
}
```

## Notes
- The script only operates on the inbox threads in your Gmail account.
- If a label for a specific domain already exists, it will reuse that label; otherwise, a new label will be created.
- The script handles emails in the format `"Name <email@domain.com>"` and simple email addresses (e.g., `email@domain.com`).
- Ensure that you authorize the script to access your Gmail data when prompted by Google Apps Script.
- This script is intended for users who wish to organize their Gmail inbox based on the sender's email domain.
