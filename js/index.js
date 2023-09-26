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
    `;
    return newRow;
  };
  
  // Função para preencher a tabela com os horários do localStorage
  function preencherTabelaHorarios() {
    const tableBody = document.querySelector('.tabela tbody'); // Seleciona o corpo da tabela
  
    // Obtém os horários do localStorage
    const listaHorarios = JSON.parse(localStorage.getItem('listaHorarios')) || [];
  
    // Limpa o conteúdo atual da tabela
    tableBody.innerHTML = '';
  
    // Preenche a tabela com os horários do localStorage
    listaHorarios.forEach((item) => {
      tableBody.appendChild(
        createNewLineHorario(item.id, item.horario, item.curso, item.periodo, item.desafio, item.professor, item.sala)
      );
    });
  }
  
  // Chame a função de preencher a tabela quando a página for carregada
  window.onload = () => {
    preencherTabelaHorarios();
  };