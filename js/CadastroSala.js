
<<<<<<< HEAD
let listaDadosSala = JSON.parse(localStorage.getItem('listaDadosSala'))
let contador = JSON.parse(localStorage.getItem('contadorDadosSala'))

if (!listaDadosSala){
    listaDadosSala = []
    contador = 1
}else{
    atualizaTabela()
}

document.querySelector('#idSala').value = contador
=======
const listaDadosSala = localStorage.getItem(listaDadosSala)


>>>>>>> a064b02017a4738608689183dd380a1fd22c4654

function aoclicar(){
    const numeroSala = document.querySelector('#numeroSala').value
    const andarSala = document.querySelector('#andarSala').value

    const linha = createNewLine(contador, numeroSala, andarSala)

    document.querySelector('#space').appendChild(linha) 
    
    const sala = createObject(contador, numeroSala, andarSala)

    listaDadosSala.push(sala)
<<<<<<< HEAD
    contador++

    localStorage.listaDadosSala = JSON.stringify(listaDadosSala)  
    localStorage.contadorDadosSala = JSON.stringify(contador)  

    document.querySelector('#idSala').value = contador
=======
    localStorage.listaDadosSala = listaDadosSala   

    contador++
>>>>>>> a064b02017a4738608689183dd380a1fd22c4654
}

function createObject(id, numero, andar){
    const sala = {
        id: id,
        numero: numero,
        andar: andar
    }

    return sala
}

<<<<<<< HEAD
=======

>>>>>>> a064b02017a4738608689183dd380a1fd22c4654
function createNewLine(id, numero, andar){
    const linha = document.createElement('tr')
    const celulaId = document.createElement('td')
    const celulaNumero = document.createElement('td')
    const celulaAndar = document.createElement('td')
<<<<<<< HEAD
    const celulaBotaoEdit = document.createElement('td')
    const celulaBotaoRm = document.createElement('td')
=======
>>>>>>> a064b02017a4738608689183dd380a1fd22c4654

    celulaId.innerText = id
    celulaNumero.innerText = numero
    celulaAndar.innerText = andar

<<<<<<< HEAD
    const BotaoEdit = document.createElement('button')
    BotaoEdit.innerText = "Editar"
    BotaoEdit.onclick = editaLinha
    celulaBotaoEdit.appendChild(BotaoEdit)

    const BotaoRm = document.createElement('button')
    BotaoRm.innerText = "Remover"
    BotaoRm.onclick = removeLinha
    celulaBotaoRm.appendChild(BotaoRm)
=======
>>>>>>> a064b02017a4738608689183dd380a1fd22c4654

    linha.appendChild(celulaId)
    linha.appendChild(celulaNumero)
    linha.appendChild(celulaAndar)
<<<<<<< HEAD
    linha.appendChild(celulaBotaoEdit)
    linha.appendChild(celulaBotaoRm)

    return linha
}

function editaLinha(tgt){
    const linha = tgt.target.parentElement.parentElement
    
    document.querySelector('#idSala').value = linha.children[0].innerText
    document.querySelector('#numeroSala').value = linha.children[1].innerText
    document.querySelector('#andarSala').value = linha.children[2].innerText

    document.querySelector('#botaoCriarSala').style.display = 'none'
    document.querySelector('#botaoEditarSala').style.display = 'block'

}

function salvarAlteracao(){
        const id = document.querySelector('#idSala').value
        const numero = document.querySelector('#numeroSala').value
        const andar = document.querySelector('#andarSala').value

    listaDadosSala.forEach(element => {
        if (element.id == id){
            element.numero = numero
            element.andar = andar
        }
        localStorage.listaDadosSala = JSON.stringify(listaDadosSala)

        

    });
    document.querySelector('#botaoCriarSala').style.display = 'block'
    document.querySelector('#botaoEditarSala').style.display = 'none'

    document.querySelector('#idSala').value = contador
    atualizaTabela()

    

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
=======

    return linha
    
>>>>>>> a064b02017a4738608689183dd380a1fd22c4654

}

function armazenar(sala){
    
}

function init(){
    //atribui função ao botao
    document.querySelector('#botaoCriarSala').onclick = aoclicar
<<<<<<< HEAD
    document.querySelector('#botaoEditarSala').onclick = salvarAlteracao
=======
>>>>>>> a064b02017a4738608689183dd380a1fd22c4654

    //carrega os dados salvos/cria novos


    if (!listaDadosSala){
        listaDadosSala = []
    }

<<<<<<< HEAD
}

function atualizaTabela(){
    
    document.querySelector('#space').innerHTML=''
    listaDadosSala.forEach(element => {
        const linha = createNewLine(element.id, element.numero, element.andar)
        document.querySelector('#space').appendChild(linha) 
    });
=======
    let contador = 1
>>>>>>> a064b02017a4738608689183dd380a1fd22c4654
}

init()