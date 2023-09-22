
const listaDadosSala = localStorage.getItem(listaDadosSala)



function aoclicar(){
    const numeroSala = document.querySelector('#numeroSala').value
    const andarSala = document.querySelector('#andarSala').value

    const linha = createNewLine(contador, numeroSala, andarSala)

    document.querySelector('#space').appendChild(linha) 
    
    const sala = createObject(contador, numeroSala, andarSala)

    listaDadosSala.push(sala)
    localStorage.listaDadosSala = listaDadosSala   

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

    celulaId.innerText = id
    celulaNumero.innerText = numero
    celulaAndar.innerText = andar


    linha.appendChild(celulaId)
    linha.appendChild(celulaNumero)
    linha.appendChild(celulaAndar)

    return linha
    

}

function armazenar(sala){
    
}

function init(){
    //atribui função ao botao
    document.querySelector('#botaoCriarSala').onclick = aoclicar

    //carrega os dados salvos/cria novos


    if (!listaDadosSala){
        listaDadosSala = []
    }

    let contador = 1
}

init()