const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultSection = document.getElementById('result-section');
const resultDiv = document.getElementById('result');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
        alert('Por favor, digite o nome de um medicamento.');
        return;
    }

    try {
        // Exemplo de URL da API da Anvisa (substitua pela URL real, se disponível)
        const response = await fetch(`https://api.anvisa.gov.br/medicamentos?nome=${query}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados. Tente novamente mais tarde.');
        }

        const data = await response.json();
        if (data.length === 0) {
            resultDiv.innerHTML = '<p>Nenhuma informação encontrada para o medicamento pesquisado.</p>';
        } else {
            // Exemplo de renderização dos dados
            resultDiv.innerHTML = `
                <h3>${data[0].nome}</h3>
                <p><strong>Registro:</strong> ${data[0].registro}</p>
                <p><strong>Fabricante:</strong> ${data[0].fabricante}</p>
                <p><strong>Descrição:</strong> ${data[0].descricao}</p>
            `;
        }

        resultSection.classList.remove('hidden');
    } catch (error) {
        resultDiv.innerHTML = `<p>${error.message}</p>`;
        resultSection.classList.remove('hidden');
    }
});
