// Inicializa o contador a partir do valor armazenado no localStorage ou 1
let contadorDesafio = parseInt(localStorage.getItem('contadorDesafio')) || 1;

// Recupera a variável listaDesafio do localStorage
let listaDesafio = JSON.parse(localStorage.getItem('listaDesafio')) || [];

// Constantes para seletores
const inputDesafio = document.querySelector('#nmDesafio');
const inputDuracao = document.querySelector('#Duracao');
const inputCurso = document.querySelector('#curso');
const inputProfessor = document.querySelector('#professor');
const tableBody = document.querySelector('.tabela tbody');
const btnInsertDesafio = document.querySelector('#btnInsertDesafio');
const btnUpdateDesafio = document.querySelector('#btnUpdateDesafio');

let linhaEmEdicaoDesafio = null; // Variável para armazenar a linha em edição

// Função para remover uma linha de desafio
const removeLineDesafio = (linha) => {
    const id = linha.dataset.id;

    // Remove a linha da tabela
    linha.remove();

    // Remove o item correspondente da listaDesafio
    const index = listaDesafio.findIndex(item => item.id === id);
    if (index !== -1) {
        listaDesafio.splice(index, 1);
    }

    // Atualiza o localStorage com a lista atualizada
    atualizarLocalStorageDesafio();
};

// Função para preencher os campos de edição e mostrar o botão "Confirmar Alteração" para desafio
const preencherCamposDeEdicaoDesafio = (linha) => {
    if (!linha) {
        return; // Verificação para evitar erro
    }

    const id = linha.dataset.id;
    const [desafio, duracao, curso, professor] = linha.querySelectorAll('td:nth-child(n+2)');

    inputDesafio.value = desafio.innerText;
    inputDuracao.value = duracao.innerText;
    inputCurso.value = curso.innerText;
    inputProfessor.value = professor.innerText;

    // Mostrar o botão "Confirmar Alteração" e ocultar o botão "Incluir"
    btnInsertDesafio.style.display = 'none';
    btnUpdateDesafio.style.display = 'block';

    // Armazenar a referência da linha em edição
    linhaEmEdicaoDesafio = linha;
};

// Função para confirmar as alterações de desafio
const confirmarAlteracaoDesafio = () => {
    if (linhaEmEdicaoDesafio) {
        // Obtenha os valores dos campos de edição
        const novoDesafio = inputDesafio.value;
        const novaDuracao = inputDuracao.value;
        const novoCurso = inputCurso.value;
        const novoProfessor = inputProfessor.value;

        // Atualize os valores da linha em edição
        const id = linhaEmEdicaoDesafio.dataset.id;
        const [_, desafioCell, duracaoCell, cursoCell, professorCell] = linhaEmEdicaoDesafio.querySelectorAll('td');
        desafioCell.innerText = novoDesafio;
        duracaoCell.innerText = novaDuracao;
        cursoCell.innerText = novoCurso;
        professorCell.innerText = novoProfessor;

        // Atualize a listaDesafio com os novos valores
        const index = listaDesafio.findIndex(item => item.id === id);
        if (index !== -1) {
            listaDesafio[index] = {
                id,
                nomeDesafio: novoDesafio,
                duracao: novaDuracao,
                curso: novoCurso,
                professor: novoProfessor,
            };
        }

        // Ocultar o botão "Confirmar Alteração" e mostrar o botão "Incluir" novamente
        btnInsertDesafio.style.display = 'block';
        btnUpdateDesafio.style.display = 'none';

        // Limpar os campos de edição
        inputDesafio.value = '';
        inputDuracao.value = '';
        inputCurso.value = '';
        inputProfessor.value = '';

        // Limpar a referência da linha em edição
        linhaEmEdicaoDesafio = null;

        // Atualizar o localStorage com a lista atualizada de desafios
        atualizarLocalStorageDesafio();
    }
};


// Função para criar uma nova linha na tabela de desafios
const createNewLineDesafio = (id, desafio, duracao, curso, professor) => {
    const nline = document.createElement('tr');
    nline.dataset.id = id; // Define o ID da linha
    nline.innerHTML = `
        <td>${id}</td>
        <td>${desafio}</td>
        <td>${duracao}</td>
        <td>${curso}</td>
        <td>${professor}</td>
        <td><button class="btnAlterarDesafio">Alterar</button></td>
        <td><button class="btnRemoverDesafio">Remover</button></td>
    `;

    const btnAlterarDesafio = nline.querySelector('.btnAlterarDesafio');
    const btnRemoverDesafio = nline.querySelector('.btnRemoverDesafio');

    btnAlterarDesafio.addEventListener('click', () => {
        preencherCamposDeEdicaoDesafio(nline);
    });

    btnRemoverDesafio.addEventListener('click', () => {
        removeLineDesafio(nline);
    });

    return nline;
};

// Função para incluir um novo desafio
const aoIncluirDesafio = () => {
    const novoDesafio = inputDesafio.value;
    const novaDuracao = inputDuracao.value;
    const novoCurso = inputCurso.value;
    const novoProfessor = inputProfessor.value;

    if (novoDesafio && novaDuracao && novoCurso && novoProfessor) {
        const id = contadorDesafio.toString(); // Transforma o contador em ID
        const objDesafio = {
            id,
            nmDesafio: novoDesafio,
            duracao: novaDuracao,
            curso: novoCurso,
            professor: novoProfessor,
        };
        
        // Adiciona o novo desafio à listaDesafio
        listaDesafio.push(objDesafio);

        // Atualiza o localStorage com a lista atualizada de desafios
        atualizarLocalStorageDesafio();

        // Cria uma nova linha na tabela de desafios
        tableBody.appendChild(createNewLineDesafio(id, novoDesafio, novaDuracao, novoCurso, novoProfessor));

        // Incrementa o contador para o próximo ID de desafio
        contadorDesafio++;

        // Limpa os campos após a inclusão
        inputDesafio.value = '';
        inputDuracao.value = '';
        inputCurso.value = '';
        inputProfessor.value = '';
    }
};

// Função para atualizar o localStorage com a lista atualizada de desafios
function atualizarLocalStorageDesafio() {
    const strListaDesafio = JSON.stringify(listaDesafio);
    localStorage.setItem('listaDesafio', strListaDesafio);
    localStorage.setItem('contadorDesafio', contadorDesafio.toString());
}

// Função de inicialização
const initDesafio = () => {
    // Adiciona um ouvinte de eventos ao botão de inserção de desafio
    btnInsertDesafio.addEventListener('click', aoIncluirDesafio);
    
    // Adiciona um ouvinte de eventos ao botão "Confirmar Alteração" de desafio
    btnUpdateDesafio.addEventListener('click', confirmarAlteracaoDesafio);

    // Popula a tabela de desafios com os itens do localStorage
    listaDesafio.forEach((item) => {
        tableBody.appendChild(createNewLineDesafio(item.id, item.desafio, item.duracao, item.curso, item.professor));
    });
};

// Chama a função de inicialização de desafio quando a página carregar
window.onload = initDesafio;
