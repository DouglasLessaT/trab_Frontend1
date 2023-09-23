
let contador = 1;

// recupera a variável listaDadosProfessor do localStorage
const listaDadosProfessor = JSON.parse(localStorage.getItem('listaDadosProfessor')) || [];

// remover uma linha
const removeLine = (evt) => {
    const btn = evt.target;
    const linha = btn.parentElement.parentElement;
    const idx = linha.children[0].innerHTML;

    linha.remove();

    // vai remover o item corresponde a listadadosprofessores 
    const indice = idx - 1;
    listaDadosProfessor.splice(indice, 1);

    // Atualiza o localStorage com a lista atualizada
    const strLista = JSON.stringify(listaDadosProfessor);
    localStorage.setItem('listaDadosProfessor', strLista);
};

// Função para alterar uma linha
const alterarLine = (evt) => {
    const linha = evt.target.parentElement.parentElement; // Acesse a linha corretamente
    
    // cria inputs 
    const nomeInput = document.createElement('input');
    nomeInput.type = 'text';
    nomeInput.placeholder = 'Digite o nome do professor';
    
    const matriculaInput = document.createElement('input');
    matriculaInput.type = 'text';
    matriculaInput.placeholder = 'Digite a matrícula do professor';
    
    // BOTAO DE CONFIRMAÇAO
    const confirmarBtn = document.createElement('button');
    confirmarBtn.innerHTML = 'Confirmar';
    confirmarBtn.onclick = () => {
        const nomeProfessor = nomeInput.value;
        const matriculaProfessor = matriculaInput.value;
        
        if (nomeProfessor && matriculaProfessor) {
            linha.querySelector('td:nth-child(2)').textContent = nomeProfessor;
            linha.querySelector('td:nth-child(3)').textContent = matriculaProfessor;
    
            const indice = linha.querySelector('td:nth-child(1)').textContent;
    
            listaDadosProfessor[indice - 1].nomeProfessor = nomeProfessor;
            listaDadosProfessor[indice - 1].matriculaProfessor = matriculaProfessor;
    
            const strLista = JSON.stringify(listaDadosProfessor);
            localStorage.setItem('listaDadosProfessor', strLista);
    
            nomeInput.remove();
            matriculaInput.remove();
            confirmarBtn.remove();
        }
    };
    
    // COLOCAR NO FINAL DA CELULA
    linha.querySelector('td:nth-child(2)').innerHTML = '';
    linha.querySelector('td:nth-child(2)').appendChild(nomeInput);
    
    linha.querySelector('td:nth-child(3)').innerHTML = '';
    linha.querySelector('td:nth-child(3)').appendChild(matriculaInput);
    
    // BOTAO DE CONFIRMAÇÃO
    if (!linha.querySelector('.confirmar-btn')) {
        linha.appendChild(confirmarBtn);
    }
};

// CRIAR NOVA LINHA NA TABELA
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

// FUNÇÃO PARA INCLUIR NOVO ITEM
function aoIncluir(evt) {
    const objNomeProfessor = document.querySelector('#elementoNomeProfessor');
    const objMatriculaProfessor = document.querySelector('#elementoMatriculaProfessor');
    const objTableBody = document.querySelector('.tabela tbody');
    
    const objDadosProfessor = {
        nomeProfessor: objNomeProfessor.value,
        matriculaProfessor: objMatriculaProfessor.value,
    };

    // ADICIONA DADOS NA LISTA DADOS PROFESSOR OU EMPURRA CONFORME LIDO NO PUSH
    listaDadosProfessor.push(objDadosProfessor);

    // ATUALIZA LOCALSTORAGE MEDIANTE QUE NOVOS ITENS SÃO EMPURRADOS
    const strLista = JSON.stringify(listaDadosProfessor);
    localStorage.setItem('listaDadosProfessor', strLista);
    objTableBody.appendChild(createNewLine(objNomeProfessor.value, objMatriculaProfessor.value));
}

// FUNÇÃO DE INCIALIZAÇÃO
const init = () => {
    
    console.log('A página foi carregada com sucesso!');

    const btnInsert = document.querySelector('#botaoCriarProfessor');
    btnInsert.onclick = aoIncluir;

    listaDadosProfessor.forEach(item => {
        const objTableBody = document.querySelector('.tabela tbody');
        objTableBody.appendChild(createNewLine(item.nomeProfessor, item.matriculaProfessor));
    });
};

// INICIALIZAÇÃO QUANDO A PÁGINA INICIAR
window.onload = init;
