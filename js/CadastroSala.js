
let listaDadosSala = JSON.parse(localStorage.getItem('listaDadosSala'))
if (!listaDadosSala){
    listaDadosSala = []
}else{
    listaDadosSala.forEach(element => {
        const linha = createNewLine(element.id, element.numero, element.andar)
        document.querySelector('#space').appendChild(linha) 

        
    });
}
let contador = 1

function aoclicar(){
    const numeroSala = document.querySelector('#numeroSala').value
    const andarSala = document.querySelector('#andarSala').value

    const linha = createNewLine(contador, numeroSala, andarSala)

    document.querySelector('#space').appendChild(linha) 
    
    const sala = createObject(contador, numeroSala, andarSala)

    listaDadosSala.push(sala)
    localStorage.listaDadosSala = JSON.stringify(listaDadosSala)    

    contador++
}

function createObject(id, numero, andar){
    const sala = {
        id: id,
        numero: numero,
        andar: andar
    }

    return sala
}

function createNewLine(id, numero, andar){
    const linha = document.createElement('tr')
    const celulaId = document.createElement('td')
    const celulaNumero = document.createElement('td')
    const celulaAndar = document.createElement('td')
    const celulaBotaoEdit = document.createElement('td')
    const celulaBotaoRm = document.createElement('td')

    celulaId.innerText = id
    celulaNumero.innerText = numero
    celulaAndar.innerText = andar

    const BotaoEdit = document.createElement('button')
    BotaoEdit.innerText = "Editar"
    BotaoEdit.onclick = editaLinha
    celulaBotaoEdit.appendChild(BotaoEdit)

    const BotaoRm = document.createElement('button')
    BotaoRm.innerText = "Remover"
    BotaoRm.onclick = removeLinha
    celulaBotaoRm.appendChild(BotaoRm)

    linha.appendChild(celulaId)
    linha.appendChild(celulaNumero)
    linha.appendChild(celulaAndar)
    linha.appendChild(celulaBotaoEdit)
    linha.appendChild(celulaBotaoRm)

    return linha
}

function editaLinha(tgt){
    const linha = tgt.target.parentElement.parentElement
    /*console.log(linha.children[1]);
    console.log(typeof(linha.children[1]));*/
    
    document.querySelector('#idSala').value = linha.children[0].innerText
    document.querySelector('#numeroSala').value = linha.children[1].innerText
    document.querySelector('#andarSala').value = linha.children[2].innerText

    document.querySelector('#botaoCriarSala').style.display = 'none'
    document.querySelector('#botaoEditarSala').style.display = 'block'

}

function salvarAlteracao(){

    listaDadosSala.forEach(element => {
        
        
    });


    document.querySelector('#botaoCriarSala').style.display = 'block'
    document.querySelector('#botaoEditarSala').style.display = 'none'

    

}

function removeLinha(tgt){
   const linha = tgt.target.parentElement.parentElement

    const id = linha.firstChild.innerText; 
    linha.remove()

    listaDadosSala.forEach(element => {
        if (element.id == id) {
            listaDadosSala.splice(listaDadosSala.indexOf(element), 1)
            localStorage.listaDadosSala = JSON.stringify(listaDadosSala)
        }

        
    });

}

function armazenar(sala){
    
}

function init(){
    //atribui função ao botao
    document.querySelector('#botaoCriarSala').onclick = aoclicar
    document.querySelector('#botaoEditarSala').onclick = salvarAlteracao

    //carrega os dados salvos/cria novos


    if (!listaDadosSala){
        listaDadosSala = []
    }

}

init()