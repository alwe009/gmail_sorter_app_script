# Sort Emails by Domain - Google Apps Script Documentation

This script automatically sorts your Gmail inbox by grouping emails into labels based on their sender's domain. For example, emails from john@example.com will be grouped under the label example.com.

## How It Works
1. It scans all the threads in your Gmail inbox.
2. For each email thread, it checks the domain of the sender's email address.
3. If it finds an email from a new domain, it creates a new label for that domain (if one doesn't already exist).
4. It then assigns that label to the email thread.

## What Do You Need to Use This Script?
- A Gmail account with access to Google Apps Script.
- Access to Google Apps Script through your Google account.

## How to Use

### 1. Open Google Apps Script:
- Go to [Google Apps Script](https://script.google.com).
- Create a new project by clicking on **New Project**.

### 2. Paste the Script:
- In the new project, delete any default code in the script editor.
- Copy the entire script provided below and paste it into the editor.

### 3. Save the Script:
- Click on **File** → **Save** and give your project a name.

### 4. Run the Script:
- To run the script, click the **Run** button (the triangle icon at the top of the screen).
- The script will start processing your inbox, creating labels, and organizing your threads.

### 5. Grant Permissions:
- The first time you run the script, you may be prompted to grant permissions for the script to access your Gmail account.
- Review the permissions, and click **Allow** to give the script access to your Gmail.

### 6. Check Your Gmail:
- Once the script finishes running, you will find that emails from the same domain are grouped under their respective labels in your Gmail.




## Running the Script Periodically

To have the script run automatically at certain intervals (e.g., every day, week, etc.), follow these steps to set up a trigger:

### 1. Open the Script Editor:
- In your Google Apps Script project, go to the **Triggers** menu by clicking on the clock icon on the left side of the screen, or click on **Edit** → **Current project's triggers**.

### 2. Set Up a New Trigger:
- Click **+ Add Trigger** in the bottom-right corner.
- A new window will appear to configure the trigger.

### 3. Configure Trigger Settings:
- **Choose which function to run**: Select `sortEmailsByDomain` (the main function of the script).
- **Choose which deployment should run**: Select **Head** (this refers to the current version of your script).
- **Select event source**: Choose **Time-driven**.
- **Select type of time-based trigger**: You can choose one of the following:
  - **Minutes timer**: Run every 5, 10, 15, 30 minutes, etc.
  - **Hour timer**: Run every hour, 2 hours, etc.
  - **Day timer**: Run once a day at a specific time.
  - **Week timer**: Run once a week on a specific day and time.
  - **Month timer**: Run once a month on a specific day and time.

### 4. Save the Trigger:
- After configuring the trigger, click **Save**.
- The script will now run automatically at the set interval.



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
