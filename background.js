chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'saveJob') {
        const { jobTitle, jobLink, companyName } = request.data;
        
        // Aqui você deve implementar a lógica para enviar os dados para a API do Notion
        // Exemplo de como você pode fazer isso:
        fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_NOTION_API_KEY',
                'Content-Type': 'application/json',
                'Notion-Version': '2021-05-13'
            },
            body: JSON.stringify({
                parent: { database_id: 'YOUR_DATABASE_ID' },
                properties: {
                    Name: {
                        title: [
                            {
                                text: {
                                    content: jobTitle
                                }
                            }
                        ]
                    },
                    Link: {
                        url: jobLink
                    },
                    Company: {
                        rich_text: [
                            {
                                text: {
                                    content: companyName
                                }
                            }
                        ]
                    },
                    Status: {
                        select: {
                            name: 'Inscrito'
                        }
                    }
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            const notionPageUrl = data.url; // Supondo que a resposta contenha a URL da página
            if (notionPageUrl) {
                chrome.tabs.create({ url: notionPageUrl });
            }
        })
        .catch((error) => console.error('Error:', error));
    }
}); 