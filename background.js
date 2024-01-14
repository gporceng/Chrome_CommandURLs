chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.storage.sync.get(text, function(result) {
        if (result[text]) {
            let urls = result[text];
            if (Array.isArray(urls)) {
                urls.forEach(url => {
                    chrome.tabs.create({ url: url });
                });
            } else {
                console.log("Error: Command data is not in array format.");
            }
        } else {
            console.log("Command not found:", text);
        }
    });
});
