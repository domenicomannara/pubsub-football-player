import { pubsub } from './pubsub.js';

export const playerForm = {
  render: container => {
    let template = document.getElementById('playerFormTemplate');
    let form = template.content.cloneNode(true);
    form.querySelector('button').addEventListener('click', playerForm.add);
    container.appendChild(form);
  },
  add: ev => {
    ev.preventDefault();
    let input = document.querySelector('.player-form input');
    let name = input.value;
    input.value = ''; 

    console.log(`player FORM: just playerAdded ${name}`);
    pubsub.publish('playerAdded', name);
  }
};
