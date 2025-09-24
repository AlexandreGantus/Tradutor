document.getElementById("btt").addEventListener("click", traduzir);

async function traduzir() {
    const texto = document.getElementById("i_texto").value;
    const idioma_destino = document.getElementById("i_idioma").value;
    const div_resp = document.getElementById("resp");
    const txt_traducao = document.getElementById("txt_traducao");

    if (texto === "") {
        alert("Por favor, digite um texto para traduzir.");
        return;
    }

    // Exibe a área de resposta
    div_resp.style.display = "block";
    txt_traducao.innerHTML = "Traduzindo...";

    // A MyMemory API usa um formato de URL simples
    // A API traduz de forma automática para o idioma de destino,
    // então a língua de origem não é necessária no endpoint
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=pt|${idioma_destino}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            if (data.responseData && data.responseData.translatedText) {
                // Se a requisição foi bem-sucedida, exibe a tradução
                txt_traducao.innerHTML = data.responseData.translatedText;
            } else {
                // Se a API retornou um erro, mas o status foi 200 (OK)
                txt_traducao.innerHTML = "Erro ao traduzir. A resposta da API é inválida.";
                console.error('Resposta da API inválida:', data);
            }
        } else {
            // Se o status da requisição não foi OK
            txt_traducao.innerHTML = "Erro ao traduzir. Código de status: " + response.status;
            console.error('Erro na API:', data);
        }
    } catch (error) {
        // Se houve um erro de conexão (rede)
        txt_traducao.innerHTML = "Erro de conexão. Verifique sua internet.";
        console.error('Erro de rede:', error);
    }
}