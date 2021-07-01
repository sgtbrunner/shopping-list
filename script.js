const LI = 'li';
const CLICK = 'click';

const app = document.getElementsByClassName('app')[0];
const colorButtons = [...document.getElementsByClassName('color-button')];
const submitButton = document.getElementById('submit');
const input = document.getElementById('user-input');
const list = document.querySelector('ul');
let listItems = [...document.querySelectorAll(LI)];

const changeBackgroundColor = (event) => {
  app.style.backgroundColor =
    colorButtons[event.target.id].style.backgroundColor;
};

const refreshList = () => {
  listItems = document.querySelectorAll(LI);
  listItems.forEach((item, index) => (item.id = index));
};

const resetInput = () => {
  input.value = '';
};

const changeStatus = (event) => {
  const item = listItems[event.target.id];
  item.classList.toggle('done');
};

const removeListItem = (event) => {
  event.stopPropagation();
  const item = listItems[event.target.parentNode.id];
  item.parentNode.removeChild(item);
};

const createDeleteButton = () => {
  const removeButton = document.createElement('button');
  removeButton.textContent = 'X';
  removeButton.classList.add('delete');
  removeButton.addEventListener(CLICK, (event) => removeListItem(event), true);
  return removeButton;
};

const addDeleteButton = (item) => {
  const removeButton = createDeleteButton();
  item.appendChild(removeButton);
  item.addEventListener(CLICK, changeStatus);
};

const createListItem = () => {
  const item = document.createElement(LI);
  item.textContent = input.value;
  item.id = listItems.length;
  addDeleteButton(item);
  list.appendChild(item);
  resetInput();
  refreshList();
};

const addEventToColorButtons = () => {
  colorButtons.forEach((item, index) => {
    item.id = index;
    item.addEventListener(CLICK, changeBackgroundColor);
  });
};

const addEventAndDeleteButtonToExistingItems = () => {
  listItems.forEach((item, index) => {
    item.id = index;
    addDeleteButton(item);
  });
};

const addListItemAfterKeypress = (event) => {
  if (input.value && (event.type === CLICK || event.key === 'Enter'))
    createListItem();
};

addEventToColorButtons();
addEventAndDeleteButtonToExistingItems();
submitButton.addEventListener(CLICK, addListItemAfterKeypress);
input.addEventListener('keydown', addListItemAfterKeypress);
