class Header extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <header>
    <nav class="navbar">
        <div class="logotipo">
            <a href="index.html" class="logo"><img src="https://unisales.br/wp-content/uploads/2020/03/logo.svg" alt="unisaleslogo"></a>
        </div>
        <ul class="nav-menu">
            <li class="nav-item"><a href="index.html">Home</a></li>
            <li class="nav-item"><a href="home">Cadastro de Curso</a></li>
            <li class="nav-item"><a href="CadastroPeriodo.html">Cadastro de Periodo</a></li>
            <li class="nav-item"><a href="home">Cadastro de Desafio</a></li>
            <li class="nav-item"><a href="home">Cadastro de Salas</a></li>
            <li class="nav-item"><a href="CadastroProfessores.html">Cadastro de Professores</a></li>
            <li class="nav-item"><a href="home">Cadastro de Horários</a></li>
        </ul>

        <div class="ghost">
            <span garpaszinho></span>
            <span garpaszinho></span>
            <span garpaszinho></span>
        </div>
    </nav>
</header>

        `
    }
    
}


customElements.define('custom-header', Header)