// Inicializa o contador
let contador = 1;

// Recupera a variável listaPeriodo do localStorage
let listaPeriodo = JSON.parse(localStorage.getItem('listaPeriodo')) || [];

// Variável para armazenar a linha em edição
let linhaEmEdicao = null;

// Função para remover uma linha
const removeLine = (evt) => {
    const btn = evt.target;
    const linha = btn.parentElement.parentElement;
    const idx = linha.children[0].innerHTML;

    // Remove a linha da tabela
    linha.remove();

    // Remove o item correspondente da listaPeriodo
    const indice = idx - 1;
    listaPeriodo.splice(indice, 1);

    // Atualiza o localStorage com a lista atualizada
    atualizarLocalStorage();
};

// Função para preencher os campos de edição e mostrar o botão "Confirmar Alteração"
const preencherCamposDeEdicao = (linha) => {
    if (!linha) {
        return; // Verificação para evitar erro
    }
    const Periodo = linha.children[1].innerText;
    const qtdAluno = linha.children[2].innerText;
    const curso = linha.children[3].innerText;

    const inputPeriodo = document.querySelector('#Período input');
    const inputqtdAluno = document.querySelector('#qtdAluno input');
    const inputCurso = document.querySelector('#Curso input');

    inputPeriodo.value = Periodo;
    inputqtdAluno.value = qtdAluno;
    inputCurso.value = curso;

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
        const inputPeriodo = document.querySelector('#Período input').value;
        const inputqtdAluno = document.querySelector('#qtdAluno input').value;
        const inputCurso = document.querySelector('#Curso input').value;

        // Atualize os valores da linha em edição
        linhaEmEdicao.children[1].innerText = inputPeriodo;
        linhaEmEdicao.children[2].innerText = inputqtdAluno;
        linhaEmEdicao.children[3].innerText = inputCurso;

        // Atualize a listaPeriodo com os novos valores
        const indice = linhaEmEdicao.children[0].innerText;
        listaPeriodo[indice - 1].Periodo = inputPeriodo;
        listaPeriodo[indice - 1].qtdAluno = inputqtdAluno;
        listaPeriodo[indice - 1].curso = inputCurso;

        // Ocultar o botão "Confirmar Alteração" e mostrar o botão "Incluir" novamente
        document.querySelector('#divConfirmarAlteracao').style.display = 'none';
        document.querySelector('.btn.btnInsert').style.display = 'block';

        // Limpar os campos de edição
        document.querySelector('#Período input').value = '';
        document.querySelector('#qtdAluno input').value = '';
        document.querySelector('#Curso input').value = '';

        // Limpar a referência da linha em edição
        linhaEmEdicao = null;

        // Atualizar o localStorage com a lista atualizada
        atualizarLocalStorage();
    }
};

// Função para criar uma nova linha na tabela
const createNewLine = (Periodo, qtdAluno, curso) => {
    const nline = document.createElement('tr');
    const ncell1 = document.createElement('td');
    ncell1.innerText = contador;
    nline.appendChild(ncell1);
    const ncell2 = document.createElement('td');
    ncell2.innerText = Periodo;
    nline.appendChild(ncell2);
    const ncell3 = document.createElement('td');
    ncell3.innerText = qtdAluno;
    nline.appendChild(ncell3);
    const ncell4 = document.createElement('td');
    ncell4.innerText = curso;
    nline.appendChild(ncell4);
    const ncell5 = document.createElement('td');
    const btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = 'Alterar';
    btnAlterar.onclick = () => {
        preencherCamposDeEdicao(nline); // Passa a linha como argumento
    };
    ncell5.appendChild(btnAlterar);
    nline.appendChild(ncell5);
    const ncell6 = document.createElement('td');
    const btnRemove = document.createElement('button');
    btnRemove.innerHTML = 'Remover';
    btnRemove.onclick = removeLine;
    ncell6.appendChild(btnRemove);
    nline.appendChild(ncell6);

    contador++;
    return nline;
};

// Função para incluir um novo item
const aoIncluir = (evt) => {
    const objPeriodo = document.querySelector('#Período input');
    const objqtdAluno = document.querySelector('#qtdAluno input');
    const objCurso = document.querySelector('#Curso input');
    const objTableBody = document.querySelector('.tabela tbody');

    const objTurma = {
        Periodo: objPeriodo.value,
        qtdAluno: objqtdAluno.value,
        curso: objCurso.value
    };

    // Adiciona o novo item à listaPeriodo
    listaPeriodo.push(objTurma);

    // Atualiza o localStorage com a lista atualizada
    atualizarLocalStorage();
    objTableBody.appendChild(createNewLine(objTurma.Periodo, objTurma.qtdAluno, objTurma.curso));

    // Limpa os campos após a inclusão
    objPeriodo.value = '';
    objqtdAluno.value = '';
    objCurso.value = '';
};

// Função para atualizar o localStorage com a lista atualizada
function atualizarLocalStorage() {
    const strLista = JSON.stringify(listaPeriodo);
    localStorage.setItem('listaPeriodo', strLista);
}

// Função de inicialização
const init = () => {
    // Exibe uma mensagem de carregamento no console
    console.log('A página foi carregada com sucesso!');

    // Seleciona o botão de inserção e associa a função aoIncluir ao evento de clique
    const btnInsert = document.querySelector('.navbar button.btnInsert');
    btnInsert.onclick = aoIncluir;

    // Seleciona o botão "Confirmar Alteração" e associa a função confirmarAlteracao ao evento de clique
    const btnConfirmarAlteracao = document.querySelector('#botaoConfirmarAlteracao');
    btnConfirmarAlteracao.onclick = confirmarAlteracao;

    // Pega cada elemento da lista e inclui no HTML
    listaPeriodo.forEach(item => {
        const objTableBody = document.querySelector('.tabela tbody');
        objTableBody.appendChild(createNewLine(item.Periodo, item.qtdAluno, item.curso));
    });
};

// Chama a função de inicialização quando a página carregar
window.onload = init;