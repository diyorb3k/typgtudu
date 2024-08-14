const openModalButton = document.getElementById('openModalButton') as HTMLButtonElement;
const modal = document.getElementById('myModal') as HTMLDivElement;
const closeButton = document.querySelector('.close') as HTMLSpanElement;

if (openModalButton && modal && closeButton) {
  openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
const nameInput = document.getElementById('nameInput') as HTMLInputElement;
const familyInput = document.getElementById('familyInput') as HTMLInputElement;
const addressSelect = document.getElementById('addressSelect') as HTMLSelectElement;
const birthdateInput = document.getElementById('birthdate') as HTMLInputElement;
const positionSelect = document.getElementById('positionSelect') as HTMLSelectElement;
const jobTypeSelect = document.getElementById('jobTypeSelect') as HTMLSelectElement;
const salaryInput = document.getElementById('quantity') as HTMLInputElement;
const marriedCheckbox = document.getElementById('marriedCheckbox') as HTMLInputElement;
const studentTableBody = document.getElementById('studentTableBody') as HTMLTableSectionElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;

if (saveButton && nameInput && familyInput && addressSelect && birthdateInput && positionSelect && jobTypeSelect && salaryInput && marriedCheckbox) {
  saveButton.addEventListener('click', () => {
    const nameValue = nameInput.value;
    const familyValue = familyInput.value;
    const addressValue = addressSelect.value;
    const birthdateValue = birthdateInput.value;
    const positionValue = positionSelect.value;
    const jobTypeValue = jobTypeSelect.value;
    const salaryValue = salaryInput.value;
    const marriedValue = marriedCheckbox.checked ? 'Yes' : 'No';

    const studentInfo = {
      name: nameValue,
      family: familyValue,
      address: addressValue,
      birthdate: birthdateValue,
      position: positionValue,
      jobType: jobTypeValue,
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
    students.forEach((student: any, index: number) => {
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
    addEventListenersToButtons();
  }
}

function addEventListenersToButtons() {
  const editButtons = document.querySelectorAll('.edit') as NodeListOf<HTMLButtonElement>;
  const deleteButtons = document.querySelectorAll('.delete') as NodeListOf<HTMLButtonElement>;

  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      if (index !== null) {
        editStudent(Number(index));
      }
    });
  });

  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      if (index !== null) {
        deleteStudent(Number(index));
      }
    });
  });
}

function editStudent(index: number) {
  const students = JSON.parse(localStorage.getItem('students') || '[]');
  const student = students[index];
  if (student) {
    nameInput.value = student.name;
    familyInput.value = student.family;
    addressSelect.value = student.address;
    birthdateInput.value = student.birthdate;
    positionSelect.value = student.position;
    jobTypeSelect.value = student.jobType;
    salaryInput.value = student.salary;
    marriedCheckbox.checked = student.married === 'Yes';

    modal.style.display = 'block';

    saveButton.removeEventListener('click', saveStudent);
    saveButton.addEventListener('click', () => {
      saveStudent(index);
    });
  }
}

function saveStudent(index?: number) {
  const nameValue = nameInput.value;
  const familyValue = familyInput.value;
  const addressValue = addressSelect.value;
  const birthdateValue = birthdateInput.value;
  const positionValue = positionSelect.value;
  const jobTypeValue = jobTypeSelect.value;
  const salaryValue = salaryInput.value;
  const marriedValue = marriedCheckbox.checked ? 'Yes' : 'No';

  const studentInfo = {
    name: nameValue,
    family: familyValue,
    address: addressValue,
    birthdate: birthdateValue,
    position: positionValue,
    jobType: jobTypeValue,
    salary: salaryValue,
    married: marriedValue,
  };

  let students = JSON.parse(localStorage.getItem('students') || '[]');
  if (index !== undefined) {
    students[index] = studentInfo;
  } else {
    students.push(studentInfo);
  }
  localStorage.setItem('students', JSON.stringify(students));
  modal.style.display = 'none';
  displayStudents();
}

function deleteStudent(index: number) {
  let students = JSON.parse(localStorage.getItem('students') || '[]');
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const rows = studentTableBody?.querySelectorAll('tr');
    
    if (rows) {
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let found = false;
        cells.forEach(cell => {
          if (cell.textContent?.toLowerCase().includes(query)) {
            found = true;
          }
        });
        row.style.display = found ? '' : 'none';
      });
    }
  });
}

window.addEventListener('load', displayStudents);
