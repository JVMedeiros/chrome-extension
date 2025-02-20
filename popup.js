document.getElementById('save-job').addEventListener('click', function() {
    const jobTitle = document.getElementById('job-title').value;
    const jobLink = document.getElementById('job-link').value;
    const companyName = document.getElementById('company-name').value;
    
    // Enviar dados para a API do Notion
    chrome.runtime.sendMessage({
        action: 'saveJob',
        data: {
            jobTitle,
            jobLink,
            companyName
        }
    });
});

document.getElementById('auto-fill').addEventListener('click', function() {
    // Capturar dados automaticamente da página
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'autoFill'}, function(response) {
            if (response) {
                document.getElementById('job-title').value = response.jobTitle || '';
                document.getElementById('job-link').value = response.jobLink || '';
                document.getElementById('company-name').value = response.companyName || '';
            }
        });
    });
}); 