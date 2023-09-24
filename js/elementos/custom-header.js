class Header extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <link rel="stylesheet" href="css/estilo.css">
        <header>
    <nav class="navbar">
        <div class="logotipo">
            <a href="index.html" class="logo"><img src="https://unisales.br/wp-content/uploads/2020/03/logo.svg" alt="unisaleslogo"></a>
        </div>

        <div class="nav-menu" >
        <ul >
            <a href="index.html"><li class="nav-item">Home</li></a>
            <li class=" dropdown-trigger">
            <div class ="dropdown-title">Cadastro</div>
            <div class="dropdown-content">
                <a href="index.html">Cadastro de Curso</a>
                <a href="CadastroPeriodo.html">Cadastro de Periodo</a>
                <a href="index.html">Cadastro de Desafio</a>
                <a href="index.html">Cadastro de Salas</a>
                <a href="CadastroProfessores.html">Cadastro de Professores</a>
                <a href="CadastroHorario.html">Cadastro de Horários</a>
            </div>
        </ul>
        </div>

        
        </div>
    </nav>
</header>

        `
    }
    
}


customElements.define('custom-header', Header)