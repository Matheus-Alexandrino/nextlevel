function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res  => res.json() )
    .then( states => {

        for(const state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}
populateUFs()


function getCityes (event) {
    const citySelect = document.querySelector("select[name=city]")

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ="<option value> Selecione a Cidade </option>"
    citySelect.disabled =true

    fetch(url)
    .then ( res  => res.json() )
    .then( cityes => {

        for(const city of cityes){
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCityes )

//Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]") //coleta dados para input vazio (Hidden)

let selectedItems = [] //array

function handleSelectedItem(event) {
 
    const itemLi = event.target
     // adicionar ou remover uma classe com js
     itemLi.classList.toggle("selected")

    const itemId= itemLi.dataset.id
   
    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados DB


    const alreadySelected= selectedItems.findIndex( item => {
     
       const itemFound = item == itemId //retorna true ou false
       return itemFound

    })     
         //se já estiver selecionado
     if(alreadySelected >=0) {
     // tirar da seleção
     const filteredItems = selectedItems.filter( item => {
        const itemIsDifferent = item != itemId //false    
        return itemIsDifferent
     })
     selectedItems = filteredItems
    } else {
         // se não estiver selecionado, adicionar a seleção
         //adicionar elemento
         selectedItems.push(itemId)
    } 

    
         //atualizar o campo HIDDEN(escondido) com os itens selecionados
         collectedItems.value = selectedItems
         
}