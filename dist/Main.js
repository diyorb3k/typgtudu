document.addEventListener('DOMContentLoaded', () => {
  const openModalButton = document.getElementById('openModalButton');
  const modal = document.getElementById('myModal');
  const closeButton = document.querySelector('.close');
  const saveButton = document.getElementById('saveButton');
  const nameInput = document.getElementById('nameInput');
  const familyInput = document.getElementById('familyInput');
  const addressSelectModal = document.getElementById('addressSelect');
  const birthdateInput = document.getElementById('birthdate');
  const positionSelectModal = document.getElementById('positionSelect');
  const jobTypeSelectModal = document.getElementById('jobTypeSelect');
  const salaryInput = document.getElementById('quantity');
  const marriedCheckbox = document.getElementById('marriedCheckbox');
  const studentTableBody = document.getElementById('studentTableBody');
  const searchInput = document.getElementById('searchInput');
  const jobTypeFilter = document.getElementById('jobTypeSelect');
  const addressFilter = document.getElementById('addressSelectFilter');

  if (openModalButton && modal && closeButton) {
    openModalButton.addEventListener('click', () => {
      modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (saveButton) {
    saveButton.addEventListener('click', () => {
      const studentInfo = {
        name: nameInput.value,
        family: familyInput.value,
        address: addressSelectModal.value,
        birthdate: birthdateInput.value,
        position: positionSelectModal.value,
        jobType: jobTypeSelectModal.value,
        salary: salaryInput.value,
        married: marriedCheckbox.checked ? 'Yes' : 'No',
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
      const filterJobType = jobTypeFilter ? jobTypeFilter.value : '';
      const filterAddress = addressFilter ? addressFilter.value : '';
      students
        .filter(student => 
          (filterJobType === '' || student.jobType === filterJobType) &&
          (filterAddress === '' || student.address === filterAddress)
        )
        .forEach((student, index) => {
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
    const editButtons = document.querySelectorAll('.edit');
    const deleteButtons = document.querySelectorAll('.delete');

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

  function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students[index];
    if (student) {
      nameInput.value = student.name;
      familyInput.value = student.family;
      addressSelectModal.value = student.address;
      birthdateInput.value = student.birthdate;
      positionSelectModal.value = student.position;
      jobTypeSelectModal.value = student.jobType;
      salaryInput.value = student.salary;
      marriedCheckbox.checked = student.married === 'Yes';

      if (modal) {
        modal.style.display = 'block';
      }

      saveButton.removeEventListener('click', saveStudent);
      saveButton.addEventListener('click', () => {
        saveStudent(index);
      });
    }
  }

  function saveStudent(index) {
    const studentInfo = {
      name: nameInput.value,
      family: familyInput.value,
      address: addressSelectModal.value,
      birthdate: birthdateInput.value,
      position: positionSelectModal.value,
      jobType: jobTypeSelectModal.value,
      salary: salaryInput.value,
      married: marriedCheckbox.checked ? 'Yes' : 'No',
    };

    let students = JSON.parse(localStorage.getItem('students') || '[]');
    if (index !== undefined) {
      students[index] = studentInfo;
    } else {
      students.push(studentInfo);
    }
    localStorage.setItem('students', JSON.stringify(students));
    if (modal) {
      modal.style.display = 'none';
    }
    displayStudents();
  }

  function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students') || '[]');
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const rows = studentTableBody.querySelectorAll('tr');

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
    });
  }

  if (jobTypeFilter) {
    jobTypeFilter.addEventListener('change', () => {
      displayStudents();
    });
  }

  if (addressFilter) {
    addressFilter.addEventListener('change', () => {
      displayStudents();
    });
  }

  displayStudents();
});
