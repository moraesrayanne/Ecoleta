/* INICIO DO CÓDIGO PARA USO DA API*/

//querySelector = procurar no código o elemento x;
// .addEventListener = quando um evento acontece, ele vai executar uma função (arrow function)


function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        });
};

populateUFs();


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = false;

    fetch(url)
        .then((res) => { return res.json() })
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
        });
    citySelect.disabled = false;
};

document.querySelector("select[name=uf]").addEventListener("change", getCities);

/*FIM DO CODIGO DE USO DA API*/

// INICIO DO CODIGO DOS ITENS DE COLETA

const itemsToCollect = document.querySelectorAll(".items-grid li");
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
};

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;

    //console.log('ITEM ID: ', itemId);


    // L O G I C A

    //Verificar se existem items selecionados, se sim 
    // pegar os itens selecionados.

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId;
        return itemFound;
    });

    //Se já estiver selecionado, tirar da seleção.

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    } else{
        //Se não tiver selecionado, adicionar a seleção.
        selectedItems.push(itemId);
    }

    console.log(selectedItems);

    //Atualizar o campo escondido com os itens selecionados.

    //console.log('selectedItems: ', selectedItems);

    collectedItems.value = selectedItems;
}
