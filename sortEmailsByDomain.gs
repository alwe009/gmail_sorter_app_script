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
