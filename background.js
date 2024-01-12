chrome.omnibox.onInputEntered.addListener(function(text) {
    // Use the text parameter to handle the command
    chrome.storage.sync.get(text, function(result) {
        if (result[text]) {
            let urls = result[text];
            if (Array.isArray(urls)) {
                // Open each URL in a new tab
                urls.forEach(url => {
                    chrome.tabs.create({ url: url });
                });
            } else {
                // Open the single URL
                chrome.tabs.create({ url: urls });
            }
        } else {
            console.log("Command not found");
        }
    });
});
