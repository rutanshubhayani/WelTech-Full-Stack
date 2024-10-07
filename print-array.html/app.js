const inputvalueElement = document.getElementById('inputvalue');
const clearbutton = document.getElementById('cbutton');
const submitbutton = document.getElementById('button-addon2');
const itemsContainer = document.querySelector('.items-container');
const clearInputButton = document.getElementById('clear-input');

let valuearray = [];

function createItemElement(value) {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';

    const textNode = document.createElement('span');
    textNode.textContent = value;
    itemElement.appendChild(textNode);

    return itemElement;
}

function removeItemFromDisplay(value) {
    const items = document.querySelectorAll('.items-container .item');
    items.forEach(item => {
        if (item.textContent.trim() === value) {
            itemsContainer.removeChild(item);
        }
    });
}

inputvalueElement.addEventListener('input', () => {
    if (inputvalueElement.value.trim() !== '') {
        clearInputButton.classList.add('show');
    } else {
        clearInputButton.classList.remove('show');
    }
});

submitbutton.addEventListener('click', () => {
    const inputvalue = inputvalueElement.value.trim();

    if (inputvalue) {
        valuearray.push(inputvalue);

        console.log(valuearray);

        const itemElement = createItemElement(inputvalue);

        itemsContainer.appendChild(itemElement);

        inputvalueElement.value = '';
        clearInputButton.classList.remove('show'); 
    }
});

clearInputButton.addEventListener('click', () => {
    const valueToClear = inputvalueElement.value.trim();

    if (valueToClear) {
        valuearray = valuearray.filter(item => item !== valueToClear);

        removeItemFromDisplay(valueToClear);

        inputvalueElement.value = '';
        clearInputButton.classList.remove('show'); 

        console.log(valuearray);
    }
});

clearbutton.addEventListener('click', () => {
    valuearray = [];
    itemsContainer.innerHTML = '';

    inputvalueElement.value = '';
    clearInputButton.classList.remove('show'); 

    console.log(valuearray);
});
