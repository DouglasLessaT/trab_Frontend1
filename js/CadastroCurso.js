
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    let cursoEditandoIndex = -1;

    function salvarCursosNoCache() {
        localStorage.setItem("cursos", JSON.stringify(cursos));
    }

    function atualizarListaCursos() {
        const listaCursos = document.getElementById("cursos");
        listaCursos.innerHTML = "";

        cursos.forEach((curso, index) => {
            const linha = document.createElement("tbody")
            linha.innerHTML = `

            <tr>
                <td>Nome: ${curso.nome}</td>
                <td>Área: ${curso.area}</td>
                <td>Duração: ${curso.duracao}</td>
                <td>Tipo: ${curso.tipo}</td>
                <td><button onclick="editarCurso(${index})">Editar</button></td>
                <td><button onclick="excluirCurso(${index})">Excluir</button></td>
            </tr>`;
            listaCursos.appendChild(linha);
        });

        salvarCursosNoCache(); 
    }

    function cadastrarCurso() {
        const nome = document.getElementById("nome").value;
        const area = document.getElementById("area").value;
        const duracao = document.getElementById("duracao").value;
        const tipo = document.getElementById("tipo").value;

        const curso = {
            nome,
            area,
            duracao,
            tipo
        };

        cursos.push(curso);
        atualizarListaCursos();
        limparCampos();
    }

    function limparCampos() {
        document.getElementById("nome").value = "";
        document.getElementById("area").value = "";
        document.getElementById("duracao").value = "";
        document.getElementById("tipo").value = "opcao1";
    }

    function editarCurso(index) {
        cursoEditandoIndex = index;
        const cursoEditando = cursos[index];

        document.getElementById("nomeEdicao").value = cursoEditando.nome;
        document.getElementById("areaEdicao").value = cursoEditando.area;
        document.getElementById("duracaoEdicao").value = cursoEditando.duracao;
        document.getElementById("tipoEdicao").value = cursoEditando.tipo;

        document.getElementById("listacursos").style.display = "none";
        document.getElementById("edicaoCurso").style.display = "block";
    }

    function salvarEdicao() {
        if (cursoEditandoIndex !== -1) {
            const nome = document.getElementById("nomeEdicao").value;
            const area = document.getElementById("areaEdicao").value;
            const duracao = document.getElementById("duracaoEdicao").value;
            const tipo = document.getElementById("tipoEdicao").value;

            cursos[cursoEditandoIndex] = {
                nome,
                area,
                duracao,
                tipo
            };

            cursoEditandoIndex = -1;
            atualizarListaCursos();
            limparCamposEdicao();

            document.getElementById("listacursos").style.display = "block";
            document.getElementById("edicaoCurso").style.display = "none";
        }
    }

    function cancelarEdicao() {
        cursoEditandoIndex = -1;
        limparCamposEdicao();

        document.getElementById("listacursos").style.display = "block";
        document.getElementById("edicaoCurso").style.display = "none";
    }

    function limparCamposEdicao() {
        document.getElementById("nomeEdicao").value = "";
        document.getElementById("areaEdicao").value = "";
        document.getElementById("duracaoEdicao").value = "";
        document.getElementById("tipoEdicao").value = "opcao1";
    }

    function excluirCurso(index) {
        cursos.splice(index, 1);
        atualizarListaCursos();
    }

    document.getElementById("btncadastrar").addEventListener("click", cadastrarCurso);
    document.getElementById("btneditar").addEventListener("click", salvarEdicao);
    document.getElementById("btncancelar").addEventListener("click", cancelarEdicao);

    atualizarListaCursos();