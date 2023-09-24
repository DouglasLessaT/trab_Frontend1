// Inicializa o contador a partir do valor armazenado no localStorage ou 1
let contador = parseInt(localStorage.getItem('contador')) || 1;

// Recupera a variável listaPeriodo do localStorage
let listaPeriodo = JSON.parse(localStorage.getItem('listaPeriodo')) || [];

// Constantes para seletores
const inputPeriodo = document.querySelector('#Período input');
const inputqtdAluno = document.querySelector('#qtdAluno input');
const inputCurso = document.querySelector('#Curso input');
const tableBody = document.querySelector('.tabela tbody');
const btnInsert = document.querySelector('.navbar button.btnInsert');
const btnConfirmarAlteracao = document.querySelector('#botaoConfirmarAlteracao');

// Função para remover uma linha
const removeLine = (linha) => {
    const id = linha.dataset.id;

    // Remove a linha da tabela
    linha.remove();

    // Remove o item correspondente da listaPeriodo
    const index = listaPeriodo.findIndex(item => item.id === id);
    if (index !== -1) {
        listaPeriodo.splice(index, 1);
    }

    // Atualiza o localStorage com a lista atualizada
    atualizarLocalStorage();
};

// Função para preencher os campos de edição e mostrar o botão "Confirmar Alteração"
const preencherCamposDeEdicao = (linha) => {
    if (!linha) {
        return; // Verificação para evitar erro
    }

    const id = linha.dataset.id;
    const [Periodo, qtdAluno, curso] = linha.querySelectorAll('td:nth-child(n+2)');

    inputPeriodo.value = Periodo.innerText;
    inputqtdAluno.value = qtdAluno.innerText;
    inputCurso.value = curso.innerText;

    // Mostrar o botão "Confirmar Alteração" e ocultar o botão "Incluir"
    document.querySelector('.btn.btnInsert').style.display = 'none';
    document.querySelector('#divConfirmarAlteracao').style.display = 'block';

    // Armazenar a referência da linha em edição
    linhaEmEdicao = linha;
};

// Função para confirmar as alterações
const confirmarAlteracao = () => {
    if (linhaEmEdicao) {
        // Obtenha os valores dos campos de edição
        const novoPeriodo = inputPeriodo.value;
        const novaQtdAluno = inputqtdAluno.value;
        const novoCurso = inputCurso.value;

        // Atualize os valores da linha em edição
        const id = linhaEmEdicao.dataset.id;
        const [_, periodoCell, qtdAlunoCell, cursoCell] = linhaEmEdicao.querySelectorAll('td');
        periodoCell.innerText = novoPeriodo;
        qtdAlunoCell.innerText = novaQtdAluno;
        cursoCell.innerText = novoCurso;

        // Atualize a listaPeriodo com os novos valores
        const index = listaPeriodo.findIndex(item => item.id === id);
        if (index !== -1) {
            listaPeriodo[index] = {
                id,
                Periodo: novoPeriodo,
                qtdAluno: novaQtdAluno,
                curso: novoCurso,
            };
        }

        // Ocultar o botão "Confirmar Alteração" e mostrar o botão "Incluir" novamente
        document.querySelector('#divConfirmarAlteracao').style.display = 'none';
        document.querySelector('.btn.btnInsert').style.display = 'block';

        // Limpar os campos de edição
        inputPeriodo.value = '';
        inputqtdAluno.value = '';
        inputCurso.value = '';

        // Limpar a referência da linha em edição
        linhaEmEdicao = null;

        // Atualizar o localStorage com a lista atualizada
        atualizarLocalStorage();
    }
};

// Função para criar uma nova linha na tabela
const createNewLine = (id, Periodo, qtdAluno, curso) => {
    const nline = document.createElement('tr');
    nline.dataset.id = id; // Define o ID da linha
    nline.innerHTML = `
        <td>${id}</td>
        <td>${Periodo}</td>
        <td>${qtdAluno}</td>
        <td>${curso}</td>
        <td><button class="btnAlterar">Alterar</button></td>
        <td><button class="btnRemover">Remover</button></td>
    `;

    const btnAlterar = nline.querySelector('.btnAlterar');
    const btnRemover = nline.querySelector('.btnRemover');

    btnAlterar.addEventListener('click', () => {
        preencherCamposDeEdicao(nline);
    });

    btnRemover.addEventListener('click', () => {
        removeLine(nline);
    });

    return nline;
};

// Função para incluir um novo item
const aoIncluir = () => {
    const novoPeriodo = inputPeriodo.value;
    const novaQtdAluno = inputqtdAluno.value;
    const novoCurso = inputCurso.value;

    if (novoPeriodo && novaQtdAluno && novoCurso) {
        const id = contador.toString(); // Transforma o contador em ID
        const objTurma = {
            id,
            Periodo: novoPeriodo,
            qtdAluno: novaQtdAluno,
            curso: novoCurso,
        };
        
        // Adiciona o novo item à listaPeriodo
        listaPeriodo.push(objTurma);

        // Atualiza o localStorage com a lista atualizada
        atualizarLocalStorage();

        // Cria uma nova linha na tabela
        tableBody.appendChild(createNewLine(id, novoPeriodo, novaQtdAluno, novoCurso));

        // Incrementa o contador para o próximo ID
        contador++;

        // Limpa os campos após a inclusão
        // inputPeriodo.value = '';
        // inputqtdAluno.value = '';
        // inputCurso.value = '';
    }
};

// Função para atualizar o localStorage com a lista atualizada
function atualizarLocalStorage() {
    const strLista = JSON.stringify(listaPeriodo);
    localStorage.setItem('listaPeriodo', strLista);
    localStorage.setItem('contador', contador.toString());
}

// Função de inicialização
const init = () => {
    // Exibe uma mensagem de carregamento no console
    console.log('A página foi carregada com sucesso!');

    // Adiciona um ouvinte de eventos ao botão de inserção
    btnInsert.addEventListener('click', aoIncluir);

    // Adiciona um ouvinte de eventos ao botão "Confirmar Alteração"
    btnConfirmarAlteracao.addEventListener('click', confirmarAlteracao);

    // Popula a tabela com os itens do localStorage
    listaPeriodo.forEach((item) => {
        tableBody.appendChild(createNewLine(item.id, item.Periodo, item.qtdAluno, item.curso));
    });
};

// Chama a função de inicialização quando a página carregar
window.onload = init;