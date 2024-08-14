const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('myModal');
const closeButton = document.querySelector('.close');

if (openModalButton && modal && closeButton) {
  openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

const saveButton = document.getElementById('saveButton');
const nameInput = document.querySelector('input[placeholder="Ism"]');
const familyInput = document.querySelector('input[placeholder="Familya"]');
const addressSelect = document.querySelector('select.Samarqand');
const birthdateInput = document.getElementById('birthdate');
const positionSelect = document.querySelector('select.Samarqandd');
const salaryInput = document.getElementById('quantity');
const marriedCheckbox = document.querySelector('input[type="checkbox"][name="option1"]');
const studentTableBody = document.getElementById('studentTableBody'); // Jadvaldagi tbody elementi

if (saveButton && nameInput && familyInput && addressSelect && birthdateInput && positionSelect && salaryInput && marriedCheckbox) {
  saveButton.addEventListener('click', () => {
    const nameValue = nameInput.value;
    const familyValue = familyInput.value;
    const addressValue = addressSelect.value;
    const birthdateValue = birthdateInput.value;
    const positionValue = positionSelect.value;
    const salaryValue = salaryInput.value;
    const marriedValue = marriedCheckbox.checked ? 'Yes' : 'No';

    const studentInfo = {
      name: nameValue,
      family: familyValue,
      address: addressValue,
      birthdate: birthdateValue,
      position: positionValue,
      salary: salaryValue,
      married: marriedValue,
    };

    let students = JSON.parse(localStorage.getItem('students') || '[]');
    students.push(studentInfo);
    localStorage.setItem('students', JSON.stringify(students));

    if (modal) {
      modal.style.display = 'none';
    }

    
    displayStudents();
  });
}


function displayStudents() {
  const students = JSON.parse(localStorage.getItem('students') || '[]');
  if (studentTableBody) {
    studentTableBody.innerHTML = ''; 
    students.forEach((student, index) => {
      const studentRow = document.createElement('tr');
      studentRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.family}</td>
        <td>${student.address}</td>
        <td>${student.birthdate}</td>
        <td>${student.position}</td>
        <td>${student.salary}</td>
        <td>${student.married}</td>
        <td>
          <button class="edit" data-index="${index}">Edit</button>
          <button class="delete" data-index="${index}">Delete</button>
        </td>
      `;
      studentTableBody.appendChild(studentRow);
    });

    document.querySelectorAll('.edit').forEach(button => {
      button.addEventListener('click', handleEdit);
    });

    document.querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', handleDelete);
    });
  }
}

function handleEdit(event) {
  const index = event.target.getAttribute('data-index');
  const students = JSON.parse(localStorage.getItem('students') || '[]');
  const student = students[index];

  if (nameInput && familyInput && addressSelect && birthdateInput && positionSelect && salaryInput && marriedCheckbox) {
    nameInput.value = student.name;
    familyInput.value = student.family;
    addressSelect.value = student.address;
    birthdateInput.value = student.birthdate;
    positionSelect.value = student.position;
    salaryInput.value = student.salary;
    marriedCheckbox.checked = student.married === 'Yes';
  }

  if (modal) {
    modal.style.display = 'block';
  }

  saveButton.textContent = 'Update';
  saveButton.removeEventListener('click', saveStudent);
  saveButton.addEventListener('click', () => {
    updateStudent(index);
  });
}

function updateStudent(index) {
  const students = JSON.parse(localStorage.getItem('students') || '[]');

  const nameValue = nameInput.value;
  const familyValue = familyInput.value;
  const addressValue = addressSelect.value;
  const birthdateValue = birthdateInput.value;
  const positionValue = positionSelect.value;
  const salaryValue = salaryInput.value;
  const marriedValue = marriedCheckbox.checked ? 'Yes' : 'No';

  students[index] = {
    name: nameValue,
    family: familyValue,
    address: addressValue,
    birthdate: birthdateValue,
    position: positionValue,
    salary: salaryValue,
    married: marriedValue,
  };

  localStorage.setItem('students', JSON.stringify(students));

  if (modal) {
    modal.style.display = 'none';
  }

  displayStudents();
}

function handleDelete(event) {
  const index = event.target.getAttribute('data-index');
  let students = JSON.parse(localStorage.getItem('students') || '[]');

  students.splice(index, 1);

  localStorage.setItem('students', JSON.stringify(students));

  displayStudents();
}

window.addEventListener('load', displayStudents);
