let contador = parseInt(localStorage.getItem('contador')) || 1;
let listaHorarios = JSON.parse(localStorage.getItem('listaHorarios')) || [];

const inputHorario = document.querySelector('#Horario input');
const selectCurso = document.querySelector('#selectCurso');
const selectPeriodo = document.querySelector('#selectPeriodo');
const selectDesafio = document.querySelector('#selectDesafio');
const selectProfessor = document.querySelector('#selectProfessor');
const selectSala = document.querySelector('#selectSala');
const btnInsert = document.querySelector('.navbar button.btnInsertHorarios'); 
const btnUpdate = document.querySelector('#btnUpdateHorarios'); 
const tableBody = document.querySelector('.tabela tbody');

function preencherSelectCursos() {
    const listaCursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const selectCursos = document.getElementById('seuSelectDeCursos');

    listaCursos.forEach((curso) => {
        const option = document.createElement('option');
        option.value = curso.id; // Defina o valor com base no ID do curso
        option.textContent = curso.nome; // Defina o texto com base no nome do curso
        selectCursos.appendChild(option);
    });
}

// Chame esta função para preencher o select de cursos quando a página carregar
preencherSelectCursos();

function preencherSelectPeriodos() {
    const listaPeriodos = JSON.parse(localStorage.getItem('listaPeriodo')) || [];
    const selectPeriodos = document.getElementById('seuSelectDePeriodos');

    listaPeriodos.forEach((periodo) => {
        const option = document.createElement('option');
        option.value = periodo.id; // Defina o valor com base no ID do período
        option.textContent = periodo.nome; // Defina o texto com base no nome do período
        selectPeriodos.appendChild(option);
    });
}

// Chame esta função para preencher o select de períodos quando a página carregar
preencherSelectPeriodos();

function preencherSelectSalas() {
    const listaSalas = JSON.parse(localStorage.getItem('listaDadosSala')) || [];
    const selectSalas = document.getElementById('seuSelectDeSalas');

    listaSalas.forEach((sala) => {
        const option = document.createElement('option');
        option.value = sala.id; // Defina o valor com base no ID da sala
        option.textContent = `Sala ${sala.numero}, Andar ${sala.andar}`; // Texto personalizado
        selectSalas.appendChild(option);
    });
}

// Chame esta função para preencher o select de salas quando a página carregar
preencherSelectSalas();

function preencherSelectProfessores() {
    const listaProfessores = JSON.parse(localStorage.getItem('listaDadosProfessor')) || [];
    const selectProfessores = document.getElementById('seuSelectDeProfessores');

    listaProfessores.forEach((professor) => {
        const option = document.createElement('option');
        option.value = professor.id; // Defina o valor com base no ID do professor
        option.textContent = professor.nome; // Defina o texto com base no nome do professor
        selectProfessores.appendChild(option);
    });
}

// Chame esta função para preencher o select de professores quando a página carregar
preencherSelectProfessores();

function preencherSelectDesafio() {
    const selectDesafio = document.getElementById("selectDesafio");

    // Limpe todas as opções atuais do select
    selectDesafio.innerHTML = "";

    // Crie uma opção vazia (opcional, para indicar seleção)
    const optionVazia = document.createElement("option");
    optionVazia.value = "";
    selectDesafio.appendChild(optionVazia);

    // Adicione as opções de desafio ao select
    listaDesafio.forEach((desafio) => {
        const option = document.createElement("option");
        option.value = desafio.id; // Valor da opção
        option.text = desafio.desafio; // Texto visível no select
        selectDesafio.appendChild(option);
    });
}

preencherSelectDesafio()

// Função para remover uma linha
const removeLine = (linha) => {
    const id = linha.dataset.id;

    // Remove o item correspondente da listaHorarios
    const indice = listaHorarios.findIndex((item) => item.id === id);
    if (indice !== -1) {
        listaHorarios.splice(indice, 1);
    }

    // Atualiza o localStorage com a lista atualizada
    atualizarLocalStorage();

    // Remove a linha da tabela
    linha.remove();
};

// Função para preencher os campos de edição com os dados do horário selecionado
const preencherCamposDeEdicao = (horario) => {
    // Preencha os campos de edição com os dados do horário selecionado
    inputHorario.value = horario.Horario;
    selectCurso.value = horario.Curso;
    selectPeriodo.value = horario.Periodo;
    selectDesafio.value = horario.Desafio;
    selectSala.value = horario.Sala;
    selectProfessor.value = horario.Professor;

    // Mostrar o botão "Confirmar Alteração" e ocultar o botão "Incluir"
    document.querySelector('.btn.btnInsert').style.display = 'none';
    document.querySelector('#divConfirmarAlteracao').style.display = 'block';
    horarioEmEdicao = horario;
};

// Função para realizar a alteração de um horário
const alterar = () => {
    // Verifique se há um horário em edição
    if (horarioEmEdicao) {
        const novoHorario = inputHorario.value;
        const novoCurso = selectCurso.value;
        const novoPeriodo = selectPeriodo.value;
        const novaDesafio = selectDesafio.value;
        const novaSala = selectSala.value;
        const novoProfessor = selectProfessor.value; 

        // Verifique se os campos não estão vazios
        if (novoHorario && novoCurso && novoPeriodo && novaDesafio && novoProfessor) {
            // Atualize os dados do horário em edição
            horarioEmEdicao.Horario = novoHorario;
            horarioEmEdicao.Curso = novoCurso;
            horarioEmEdicao.Periodo = novoPeriodo;
            horarioEmEdicao.Desafio = novaDesafio;
            horarioEmEdicao.Sala = novaSala;
            horarioEmEdicao.Professor = novoProfessor;

            // Atualize a linha na tabela com os novos dados
            const linha = document.querySelector(`tr[data-id="${horarioEmEdicao.id}"]`);
            if (linha) {
                linha.innerHTML = ''; // Limpe o conteúdo da linha
                linha.appendChild(createNewLine(horarioEmEdicao)); // Crie uma nova linha com os dados atualizados
            }

            // Atualize o localStorage com a lista atualizada
            atualizarLocalStorage();

            // Limpe os campos de edição
            inputHorario.value = '';
            selectCurso.value = 'Curso';
            selectPeriodo.value = 'Periodo';
            selectDesafio.value = 'Desafio';
            selectSala.value = 'Sala';
            selectProfessor.value = 'Professor'

            document.querySelector('.btn.btnInsert').style.display = 'block';
            document.querySelector('#divConfirmarAlteracao').style.display = 'none';
            // Limpe a variável horarioEmEdicao
            horarioEmEdicao = null;
        }
    }
};

// Adicione um ouvinte de eventos ao botão "Incluir Alteração"
btnUpdate.addEventListener('click', alterar);

// Função para criar uma nova linha na tabela
const createNewLine = (horario) => {
    const id = horario.id;
    const Horario = horario.Horario;
    const Curso = horario.Curso;
    const Periodo = horario.Periodo;
    const Desafio = horario.Desafio;
    const Professor = horario.Professor;
    const Sala = horario.Sala;

    const nline = document.createElement('tr');
    nline.dataset.id = id;
    nline.innerHTML = `
        <td colunaTabela>${id}</td>
        <td >${Horario}</td>
        <td >${Curso}</td>
        <td >${Periodo}</td>
        <td >${Desafio}</td>
        <td >${Professor}</td>
        <td >${Sala}</td>
        <td ><button class="btnAlterar">Alterar</button></td>
        <td ><button class="btnRemover">Remover</button></td>
    `;

    const btnAlterar = nline.querySelector('.btnAlterar');
    const btnRemover = nline.querySelector('.btnRemover');

    btnAlterar.addEventListener('click', () => {
        preencherCamposDeEdicao(horario);
    });

    btnRemover.addEventListener('click', () => {
        removeLine(nline);
    });

    return nline;
};

const aoIncluir = () => {
    const novoHorario = inputHorario.value;
    const novoCurso = selectCurso.value;
    const novoPeriodo = selectPeriodo.value;
    const novaDesafio = selectDesafio.value;
    const novaSala = selectSala.value;
    const nomeProfessor = selectProfessor.value;

    if (novoHorario && novoCurso && novoPeriodo &&
         novaDesafio && nomeProfessor) {
        const id = contador.toString();
        const objHorario = {
            id,
            Horario: novoHorario,
            Curso: novoCurso,
            Periodo: novoPeriodo,
            Desafio: novaDesafio,
            Sala: novaSala,
            Professor: nomeProfessor, 
        };

        // Adiciona o novo item à listaHorarios
        listaHorarios.push(objHorario);

        // Atualiza o localStorage com a lista atualizada
        atualizarLocalStorage();

        // Cria uma nova linha na tabela
        const novaLinha = createNewLine(objHorario);
        tableBody.appendChild(novaLinha);

        // Incrementa o contador para o próximo ID
        contador++;

        // Limpa os campos após a inclusão
        inputHorario.value = '';
        selectCurso.value = 'Curso';
        selectPeriodo.value = 'Periodo';
        selectDesafio.value = 'Desafio';
        selectSala.value = 'Sala';
        selectProfessor.value = 'Professor'
    }
};

// Função para atualizar o localStorage com a lista atualizada
const atualizarLocalStorage = () => {
    const strLista = JSON.stringify(listaHorarios);
    localStorage.setItem('listaHorarios', strLista);
    localStorage.setItem('contador', contador.toString());
};



// Função de inicialização
const init = () => {
    // Exibe uma mensagem de carregamento no console
    console.log('A página foi carregada com sucesso!');

    // Chame as funções para preencher os selects
    preencherSelectCurso();
    preencherSelectProfessor();
    preencherSelectPeriodos();
    preencherSelectDesafio();
    preencherSelectSala();

    // Adicione um ouvinte de eventos ao botão de inserção
    btnInsert.addEventListener('click', aoIncluir);

    // Popula a tabela com os itens do localStorage
    listaHorarios.forEach((item) => {
        tableBody.appendChild(createNewLine(item));
    });
};


// Chama a função de inicialização quando a página carregar
window.onload = init;