chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'autoFill') {
        // Lógica para capturar informações da página do LinkedIn
        const jobTitle = document.querySelector('.job-details-jobs-unified-top-card__job-title')?.innerText;
        const jobLink = window.location.href;
        const companyName = document.querySelector('.job-details-jobs-unified-top-card__company-name')?.innerText;

        sendResponse({
            jobTitle,
            jobLink,
            companyName
        });
    }
    return true; // Manter o canal de mensagem aberto para enviar a resposta
}); 