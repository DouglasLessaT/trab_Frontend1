// Inicializa o contador
let contador = 0;

// Recupera a variável listaPeriodo do localStorage
let listaPeriodo = JSON.parse(localStorage.getItem('listaPeriodo')) || [];

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

// Função para alterar uma linha
const alterarLine = (evt) => {
    alert(`Você irá alterar um item`);
    let Periodo = prompt('Escreva um número ordinal: ');
    let qtdAluno = prompt('Digite um número de alunos');
    let curso = prompt('Digite nome do curso');

    const row = evt.target.parentElement.parentElement; // Acesse a linha corretamente
    row.querySelector('td:nth-child(2)').textContent = Periodo;
    row.querySelector('td:nth-child(3)').textContent = qtdAluno;
    row.querySelector('td:nth-child(4)').textContent = curso;

    // Atualize a listaPeriodo com os novos valores
    const indice = row.querySelector('td:nth-child(1)').textContent;
    listaPeriodo[indice - 1].Periodo = Periodo;
    listaPeriodo[indice - 1].qtdAluno = qtdAluno;
    listaPeriodo[indice - 1].curso = curso;

    // Atualiza o localStorage com a lista atualizada
    atualizarLocalStorage();
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
    btnAlterar.onclick = alterarLine;
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
function aoIncluir(evt) {
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
    objTableBody.appendChild(createNewLine(objPeriodo.value, objqtdAluno.value, objCurso.value));
}

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

    // Pega cada elemento da lista e inclui no HTML
    listaPeriodo.forEach(item => {
        const objTableBody = document.querySelector('.tabela tbody');
        objTableBody.appendChild(createNewLine(item.Periodo, item.qtdAluno, item.curso));
    });
};

// Chama a função de inicialização quando a página carregar
window.onload = init;