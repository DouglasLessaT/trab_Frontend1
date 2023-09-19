// Inicializa o contador
let contador = 1;

// Recupera a variável listaDadosProfessor do localStorage
const listaDadosProfessor = JSON.parse(localStorage.getItem('listaDadosProfessor')) || [];

// Função para remover uma linha
const removeLine = (evt) => {
    const btn = evt.target;
    const linha = btn.parentElement.parentElement;
    const idx = linha.children[0].innerHTML;

    // Remove a linha da tabela
    linha.remove();

    // Remove o item correspondente da listaDadosProfessor
    const indice = idx - 1;
    listaDadosProfessor.splice(indice, 1);

    // Atualiza o localStorage com a lista atualizada
    const strLista = JSON.stringify(listaDadosProfessor);
    localStorage.setItem('listaDadosProfessor', strLista);
};

// Função para alterar uma linha
const alterarLine = (evt) => {
    alert(`Você irá alterar um item`);
    let nomeProfessor = prompt('Digite o nome do professor: ');
    let matriculaProfessor = prompt('Digite a matrícula do professor: ');

    const row = evt.target.parentElement.parentElement; // Acesse a linha corretamente
    row.querySelector('td:nth-child(2)').textContent = nomeProfessor;
    row.querySelector('td:nth-child(3)').textContent = matriculaProfessor;

   // Atualize a listaDadosProfessor com os novos valores
   const indice = row.querySelector('td:nth-child(1)').textContent;

   /*console.log(listaDadosProfessor[indice].nomeProfessor);
   console.log(typeof(listaDadosProfessor[indice].nomeProfessor));*/
   listaDadosProfessor[indice - 1].nomeProfessor = nomeProfessor;
   listaDadosProfessor[indice - 1].matriculaProfessor = matriculaProfessor;

   // Atualiza o localStorage com a lista atualizada
   const strLista = JSON.stringify(listaDadosProfessor);
   localStorage.listaDadosProfessor = strLista;
};

// Função para criar uma nova linha na tabela
const createNewLine = (nomeProfessor, matriculaProfessor) => {
    const nline = document.createElement('tr');
    const ncell1 = document.createElement('td');
    ncell1.innerText = contador;
    nline.appendChild(ncell1);
    const ncell2 = document.createElement('td');
    ncell2.innerText = nomeProfessor;
    nline.appendChild(ncell2);
    const ncell3 = document.createElement('td');
    ncell3.innerText = matriculaProfessor;
    nline.appendChild(ncell3);
    const ncell4 = document.createElement('td');
    const btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = 'Alterar';
    btnAlterar.onclick = alterarLine;
    ncell4.appendChild(btnAlterar);
    nline.appendChild(ncell4);
    const ncell5 = document.createElement('td');
    const btnRemove = document.createElement('button');
    btnRemove.innerHTML = 'Remover';
    btnRemove.onclick = removeLine;
    ncell5.appendChild(btnRemove);
    nline.appendChild(ncell5);

    contador++;
    return nline;
};

// Função para incluir um novo item
function aoIncluir(evt) {
    const objNomeProfessor = document.querySelector('#elementoNomeProfessor');
    const objMatriculaProfessor = document.querySelector('#elementoMatriculaProfessor');
    const objTableBody = document.querySelector('.tabela tbody');
    
    const objDadosProfessor = {
        nomeProfessor: objNomeProfessor.value,
        matriculaProfessor: objMatriculaProfessor.value,
    };

    // Adiciona o novo item à listaDadosProfessor
    listaDadosProfessor.push(objDadosProfessor);

    // Atualiza o localStorage com a lista atualizada
    const strLista = JSON.stringify(listaDadosProfessor);
    localStorage.setItem('listaDadosProfessor', strLista);
    objTableBody.appendChild(createNewLine(objNomeProfessor.value, objMatriculaProfessor.value));
}

// Função de inicialização
const init = () => {
    // Exibe uma mensagem de carregamento no console
    console.log('A página foi carregada com sucesso!');

    // Seleciona o botão de inserção e associa a função aoIncluir ao evento de clique
    const btnInsert = document.querySelector('#botaoCriarProfessor');
    btnInsert.onclick = aoIncluir;

    // Pega cada elemento da lista e inclui no HTML
    listaDadosProfessor.forEach(item => {
        const objTableBody = document.querySelector('.tabela tbody');
        objTableBody.appendChild(createNewLine(item.nomeProfessor, item.matriculaProfessor));
    });
};

// Chama a função de inicialização quando a página carregar
window.onload = init;
