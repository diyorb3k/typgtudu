// Modalni ochish
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

// Form elementlarini olish
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
    // Input qiymatlarini olish
    const nameValue = nameInput.value;
    const familyValue = familyInput.value;
    const addressValue = addressSelect.value;
    const birthdateValue = birthdateInput.value;
    const positionValue = positionSelect.value;
    const salaryValue = salaryInput.value;
    const marriedValue = marriedCheckbox.checked ? 'Yes' : 'No';

    // Ma'lumotlarni objectda saqlash
    const studentInfo = {
      name: nameValue,
      family: familyValue,
      address: addressValue,
      birthdate: birthdateValue,
      position: positionValue,
      salary: salaryValue,
      married: marriedValue,
    };

    // Ma'lumotlarni localStorage ga saqlash
    let students = JSON.parse(localStorage.getItem('students') || '[]');
    students.push(studentInfo);
    localStorage.setItem('students', JSON.stringify(students));

    // Modalni yopish
    if (modal) {
      modal.style.display = 'none';
    }

    // Ma'lumotlarni HTMLda ko‘rsatish
    displayStudents();
  });
}

// LocalStorage dagi ma'lumotlarni ko'rsatish
function displayStudents() {
  const students = JSON.parse(localStorage.getItem('students') || '[]');
  if (studentTableBody) {
    studentTableBody.innerHTML = ''; // Eski ma'lumotlarni tozalash
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
      `;
      studentTableBody.appendChild(studentRow);
    });
  }
}

// Sahifa yuklanganda ma'lumotlarni ko'rsatish
window.addEventListener('load', displayStudents);
