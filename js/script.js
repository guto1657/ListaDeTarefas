let btn = document.querySelector('#botao');

let input = document.querySelector('input[name=tarefa]');

let lista = document.querySelector('#lista');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let card = document.querySelector('.card');

function renderizarTarefas(){
    
    lista.innerHTML = ''

    for(tarefa of tarefas){
        
        let itemLista = document.createElement('li');

        itemLista.setAttribute('class','list-group-item list-group-item-action');

        itemLista.onclick = function(){
            deletarTarefa(this)
        }
        
        let itemTexto = document.createTextNode(tarefa)

        itemLista.appendChild(itemTexto);

        lista.appendChild(itemLista);

    }
}

renderizarTarefas()

btn.onclick = function(){

    let NovaTarefa = input.value

    if(NovaTarefa !== ''){

        tarefas.push(NovaTarefa)

        renderizarTarefas()

        input.value = ''

        removerSpans();

        salvarDadosNoStorage();

    }else{

        removerSpans();
        
        let span = document.createElement('span')

        span.setAttribute('class','alert alert-warning')

        msg = document.createTextNode('Você precisa informar a tarefa!')

        span.appendChild(msg)

        card.appendChild(span)
    }
}

function removerSpans(){

    let spans = document.querySelectorAll('span');

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i])
    }
}

function deletarTarefa(tar){
    
    tarefas.splice(tarefas.indexOf(tar.textContent), 1)

    renderizarTarefas()

    salvarDadosNoStorage()

}

function salvarDadosNoStorage(){

    localStorage.setItem('tarefas',JSON.stringify(tarefas));

}