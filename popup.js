// Function to save a command with multiple URLs
function saveCommand(name, urlStr) {
    // Convert the string to an array of URLs
    let urls = urlStr.startsWith('[') ? JSON.parse(urlStr) : [urlStr];

    chrome.storage.sync.set({ [name]: urls }, function() {
        console.log('Command saved', name, urls);
        loadCommands(); // Refresh the list of commands
    });
}

// Function to load and display all commands
function loadCommands() {
    chrome.storage.sync.get(null, function(commands) {
        const commandsDropdown = document.getElementById('commandsDropdown');
        commandsDropdown.innerHTML = '<option value="">Select a command...</option>';

        for (let name in commands) {
            let option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            commandsDropdown.appendChild(option);
        }
    });
}



// Load commands when the popup is opened
document.addEventListener('DOMContentLoaded', loadCommands);


// Event listener for the form submission
document.getElementById('commandForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('commandName').value;
    const url = document.getElementById('commandUrl').value;

    if (name && url) {
        saveCommand(name, url);
    }
});

// Load commands when the popup is opened
document.addEventListener('DOMContentLoaded', loadCommands);

// Event listener for command selection
document.getElementById('commandsDropdown').addEventListener('change', function(e) {
    const command = e.target.value;
    if (command) {
        chrome.storage.sync.get(command, function(result) {
            if (result[command]) {
                document.getElementById('commandName').value = command;
                document.getElementById('commandUrl').value = JSON.stringify(result[command]);
            }
        });
    }
});

// Event listener for delete button
document.getElementById('deleteCommand').addEventListener('click', function() {
    const commandToDelete = document.getElementById('commandName').value;
    if (commandToDelete && confirm('Do you want to delete this command?')) {
        chrome.storage.sync.remove(commandToDelete, function() {
            loadCommands();
            document.getElementById('commandName').value = '';
            document.getElementById('commandUrl').value = '';
        });
    }
});
