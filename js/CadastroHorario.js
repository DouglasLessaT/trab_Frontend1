let contador = parseInt(localStorage.getItem('contador')) || 1;
let listaHorarios = JSON.parse(localStorage.getItem('listaHorarios')) || [];
let horarioEmEdicao = null; 

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
  const selectCursos = document.getElementById('selectCurso');

  listaCursos.forEach((curso) => {
    const option = document.createElement('option');
    option.value = curso.nome; // Defina o valor com base no ID do curso
    option.textContent = curso.nome; // Defina o texto com base no nome do curso
    selectCursos.appendChild(option);
  });
}

function preencherSelectPeriodos() {
  const listaPeriodos = JSON.parse(localStorage.getItem('listaPeriodo')) || [];
  const selectPeriodos = document.getElementById('selectPeriodo');

  listaPeriodos.forEach((periodo) => {
    const option = document.createElement('option');
    option.value = periodo.Periodo; // Defina o valor com base no ID do período
    option.textContent = periodo.Periodo; // Defina o texto com base no nome do período
    selectPeriodos.appendChild(option);
  });
}


function preencherSelectSalas() {
  const listaSalas = JSON.parse(localStorage.getItem('listaDadosSala')) || [];
  const selectSalas = document.getElementById('selectSala');

  listaSalas.forEach((sala) => {
    const option = document.createElement('option');
    option.value = `Sala ${sala.numero}, Andar ${sala.andar}`; // Defina o valor com base no ID da sala
    option.textContent = `Sala ${sala.numero}, Andar ${sala.andar}`; // Texto personalizado
    selectSalas.appendChild(option);
  });
}

function preencherSelectProfessores() {
  const listaProfessores = JSON.parse(localStorage.getItem('listaDadosProfessor')) || [];
  const selectProfessores = document.getElementById('selectProfessor');

  listaProfessores.forEach((professor) => {
    const option = document.createElement('option');
    option.value = professor.nomeProfessor; // Defina o valor com base no ID do professor
    option.textContent = professor.nomeProfessor; // Defina o texto com base no nome do professor
    selectProfessores.appendChild(option);
  });
}

function preencherSelectDesafio() {
  const listaDesafio = JSON.parse(localStorage.getItem('listaDesafio'))
  const selectDesafio = document.getElementById("selectDesafio");

  listaDesafio.forEach((desafio) => {
    const option = document.createElement('option');
    option.value = desafio.nmDesafio; // Corrija esta linha para definir o valor com base no ID do desafio
    option.textContent = desafio.nmDesafio;
    selectDesafio.appendChild(option);
  });
}


// Função para atualizar o localStorage com a lista atualizada
const atualizarLocalStorage = () => {
    const strLista = JSON.stringify(listaHorarios);
    localStorage.setItem('listaHorarios', strLista);
    localStorage.setItem('contador', contador.toString());
};


// Função para criar uma nova linha na tabela
const createNewLineHorario = (id, horario, curso, periodo, desafio, professor, sala) => {
  const newRow = document.createElement('tr');
  newRow.dataset.id = id; // Define o ID da linha
  newRow.innerHTML = `
      <td>${id}</td>
      <td>${horario}</td>
      <td>${curso}</td>
      <td>${periodo}</td>
      <td>${desafio}</td>
      <td>${professor}</td>
      <td>${sala}</td>
      <td><button class="btnAlterar">Alterar</button></td>
      <td><button class="btnRemover">Remover</button></td>
  `;

  const btnAlterar = newRow.querySelector('.btnAlterar');
  const btnRemover = newRow.querySelector('.btnRemover');

  btnAlterar.addEventListener('click', () => {
      preencherCamposDeEdicao(newRow);
  });

  btnRemover.addEventListener('click', () => {
      removeLine(newRow, id);
  });

  return newRow;
};

// Função para adicionar um novo horário
const adicionarHorario = () => {
  const novoHorario = inputHorario.value;
  const novoCurso = selectCurso.value;
  const novoPeriodo = selectPeriodo.value;
  const novoDesafio = selectDesafio.value;
  const nomeProfessor = selectProfessor.value;
  const novaSala = selectSala.value;

  if (novoHorario && novoCurso && novoPeriodo && novoDesafio && nomeProfessor) {
      const id = contador.toString();
      const objHorario = {
          id,
          horario: novoHorario,
          curso: novoCurso,
          periodo: novoPeriodo,
          desafio: novoDesafio,
          professor: nomeProfessor,
          sala: novaSala,
      };

      // Adiciona o novo item à listaHorarios
      listaHorarios.push(objHorario);

      // Atualiza o localStorage com a lista atualizada
      atualizarLocalStorage();

      // Cria uma nova linha na tabela
      tableBody.appendChild(
          createNewLineHorario(id, novoHorario, novoCurso, novoPeriodo, novoDesafio, nomeProfessor, novaSala)
      );

      // Incrementa o contador para o próximo ID
      contador++;

      // Limpa os campos após a inclusão
      inputHorario.value = '';
      selectCurso.value = 'Curso';
      selectPeriodo.value = 'Periodo';
      selectDesafio.value = 'Desafio';
      selectSala.value = 'Sala';
      selectProfessor.value = 'Professor';
  }
};

// Função para confirmar as alterações de horário
const confirmarAlteracaoHorario = () => {
  if (horarioEmEdicao) {
      // Obtenha os valores dos campos de edição
      const novoHorario = inputHorario.value;
      const novoCurso = selectCurso.value;
      const novoPeriodo = selectPeriodo.value;
      const novoDesafio = selectDesafio.value;
      const novoProfessor = selectProfessor.value;
      const novaSala = selectSala.value;

      // Atualize os valores da linha em edição
      const id = horarioEmEdicao.id;
      const linhaEmEdicaoHorario = tableBody.querySelector(`tr[data-id="${id}"]`);
      if (linhaEmEdicaoHorario) {
          const cells = linhaEmEdicaoHorario.querySelectorAll('td');
          cells[1].textContent = novoHorario;
          cells[2].textContent = novoCurso;
          cells[3].textContent = novoPeriodo;
          cells[4].textContent = novoDesafio;
          cells[5].textContent = novoProfessor;
          cells[6].textContent = novaSala;
      }

      // Atualize a listaHorarios com os novos valores
      const index = listaHorarios.findIndex(item => item.id === id);
      if (index !== -1) {
          listaHorarios[index] = {
              id,
              horario: novoHorario,
              curso: novoCurso,
              periodo: novoPeriodo,
              desafio: novoDesafio,
              professor: novoProfessor,
              sala: novaSala,
          };
      }

      // Ocultar o botão "Atualizar" e mostrar o botão "Incluir" novamente
      btnInsert.style.display = 'block';
      btnUpdate.style.display = 'none';

      // Limpar os campos de edição
      inputHorario.value = '';
      selectCurso.value = 'Curso';
      selectPeriodo.value = 'Periodo';
      selectDesafio.value = 'Desafio';
      selectSala.value = 'Sala';
      selectProfessor.value = 'Professor';

      // Limpar a referência da linha em edição
      horarioEmEdicao = null;

      // Atualizar o localStorage com a lista atualizada de horários
      atualizarLocalStorage();
  }
};

// Função para preencher os campos de edição com os valores da linha selecionada
const preencherCamposDeEdicao = (linha) => {
  if (!linha) {
      return; // Verificação para evitar erro
  }

  const id = linha.dataset.id;
  const [horario, curso, periodo, desafio, professor, sala] = linha.querySelectorAll('td:nth-child(n+2)');

  inputHorario.value = horario.innerText;
  selectCurso.value = curso.innerText;
  selectPeriodo.value = periodo.innerText;
  selectDesafio.value = desafio.innerText;
  selectProfessor.value = professor.innerText;
  selectSala.value = sala.innerText;

  // Mostrar o botão "Atualizar" e ocultar o botão "Incluir"
  btnInsert.style.display = 'none';
  btnUpdate.style.display = 'block';

  // Armazenar a referência da linha em edição
  horarioEmEdicao = {
      id,
      horario: horario.innerText,
      curso: curso.innerText,
      periodo: periodo.innerText,
      desafio: desafio.innerText,
      professor: professor.innerText,
      sala: sala.innerText,
  };
};

// Função para remover uma linha da tabela e da listaHorarios
const removeLine = (linha, horarioId) => {
  // Remove a linha da tabela
  linha.remove();

  // Remove o horário da lista
  listaHorarios = listaHorarios.filter((horario) => horario.id !== horarioId);

  // Atualiza o localStorage com a lista atualizada
  atualizarLocalStorage();
};

// Função de inicialização
const init = () => {
  // Exibe uma mensagem de carregamento no console
  console.log('A página foi carregada com sucesso!');

  // Chame as funções para preencher os selects
  preencherSelectCursos();
  preencherSelectProfessores();
  preencherSelectDesafio()
  preencherSelectSalas();
  preencherSelectPeriodos();

  // Adicione um ouvinte de eventos ao botão de inserção
  btnInsert.addEventListener('click', adicionarHorario);

  btnUpdate.addEventListener('click',confirmarAlteracaoHorario);
  // Popula a tabela com os itens do localStorage
  listaHorarios.forEach((item) => {
      tableBody.appendChild(
          createNewLineHorario(item.id, item.horario, item.curso, item.periodo, item.desafio, item.professor, item.sala)
      );
  });
};

// Chama a função de inicialização quando a página carregar
window.onload = init;