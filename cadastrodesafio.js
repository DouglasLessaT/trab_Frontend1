
        const desafios = JSON.parse(localStorage.getItem("desafios")) || [];
        let cursoEditandoIndex = -1;
        
        function salvardesafiosNoCache() {
            localStorage.setItem("desafios", JSON.stringify(desafios));
        }
        
        function atualizarListadesafios() {
            const listadesafios = document.getElementById("desafios");
            listadesafios.innerHTML = "";
        
            desafios.forEach((curso, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    Nome: ${curso.nome}<br>
                    Duração: ${curso.duracao}<br>
                    <button onclick="editarDesafio(${index})">Editar</button>
                    <button onclick="excluirDesafio(${index})">Excluir</button>
                `;
                listadesafios.appendChild(listItem);
            });
        
            salvardesafiosNoCache(); 
        }
        
        function cadastrarCurso() {
            const nome = document.getElementById("nome").value;
            const duracao = document.getElementById("duracao").value;
        
            const curso = {
                nome,
                duracao
        
            };
        
            desafios.push(curso);
            atualizarListadesafios();
            limparCampos();
        }
        
        function limparCampos() {
            document.getElementById("nome").value = "";
            document.getElementById("duracao").value = "";
        }
        
        function editarDesafio(index) {
            cursoEditandoIndex = index;
            const cursoEditando = desafios[index];
        
            document.getElementById("nomeEdicao").value = cursoEditando.nome;
            document.getElementById("duracaoEdicao").value = cursoEditando.duracao;
        
            document.getElementById("listadesafios").style.display = "none";
            document.getElementById("edicaodesafio").style.display = "block";
        }
        
        function salvarEdicao() {
            if (cursoEditandoIndex !== -1) {
                const nome = document.getElementById("nomeEdicao").value;
                const duracao = document.getElementById("duracaoEdicao").value;
        
                desafios[cursoEditandoIndex] = {
                    nome,
                    duracao
                    
                };
        
                cursoEditandoIndex = -1;
                atualizarListadesafios();
                limparCamposEdicao();
        
                document.getElementById("listadesafios").style.display = "block";
                document.getElementById("edicaodesafio").style.display = "none"; 
            }
        }
        
        function cancelarEdicao() {
            cursoEditandoIndex = -1;
            limparCamposEdicao();
        
            document.getElementById("listadesafios").style.display = "block";
            document.getElementById("edicaodesafio").style.display = "none";
        }
        
        function limparCamposEdicao() {
            document.getElementById("nomeEdicao").value = "";
            document.getElementById("duracaoEdicao").value = "";
        }
        
        function excluirDesafio(index) {
            desafios.splice(index, 1);
            atualizarListadesafios();
        }
        
        document.getElementById("btncadastrar").addEventListener("click", cadastrarCurso);
        document.getElementById("btneditar").addEventListener("click", salvarEdicao);
        document.getElementById("btncancelar").addEventListener("click", cancelarEdicao);
        
        atualizarListadesafios();
        