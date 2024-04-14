import axios from 'axios';

const createForm = () => {
  const form = document.createElement('form');

  form.innerHTML = `
    <form id="registrationForm">
        <div class="form-group">
            <label for="inputName">Name</label>
            <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
        </div>
        <div class="form-group">
            <label for="inputEmail">Email</label>
            <input type="text" class="form-control" id="inputEmail" placeholder="Введите email" name="email" required>
        </div>
        <input type="submit" value="Submit" class="btn btn-primary">
    </form>`;

  const formContainer = document.querySelector('.form-container');
  formContainer.appendChild(form);

  return form;
};

const validate = {
  name: (input) => input.trim().length,
  email: (input) => /\w+@\w+/.test(input),
};

// function updateSubmit() {
//     const submitButton = document.querySelector('input[type="submit"]');
//     const inputName = document.querySelector('input[id="inputName"]');
//     const inputEmail = document.querySelector('input[id="inputEmail"]');
//     const isNameValid = validate.name(inputName.value);
//     const isEmailValid = validate.email(inputEmail.value);

//     if (isEmailValid || isNameValid) {
//         submitButton.disabled = true;
//     } else {
//         submitButton.disabled = false;
//     }
// }

function updateInputStatus(input, isValid) {
  input.classList.remove('is-valid', 'is-invalid');
  if (isValid) {
    input.classList.add('is-valid');
  } else {
    input.classList.add('is-invalid');
  }
}

export default () => {
  const form = createForm();

  form.addEventListener('input', (e) => {
    e.preventDefault();
    const currentInputValue = e.target.value;
    const target = e.target.name;
    const isValid = validate[target](currentInputValue);
    updateInputStatus(e.target, isValid);
    // updateSubmit(form);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    axios.post('/users', {
      name: formData.get('name'),
      email: formData.get('email'),
    })
      .then((response) => {
        document.body.innerHTML = `<p>${response.data.message}</p>.`;
      }).catch((error) => {
        console.error(error);
      });
  });
};
