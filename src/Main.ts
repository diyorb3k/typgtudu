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
const nameInput = document.querySelector('input[placeholder="Ism"]') as HTMLInputElement;
const familyInput = document.querySelector('input[placeholder="Familya"]') as HTMLInputElement;
const addressSelect = document.querySelector('select.Samarqand') as HTMLSelectElement;
const birthdateInput = document.getElementById('birthdate') as HTMLInputElement;
const positionSelect = document.querySelector('select.Samarqandd') as HTMLSelectElement;
const salaryInput = document.getElementById('quantity') as HTMLInputElement;
const marriedCheckbox = document.querySelector('input[type="checkbox"][name="option1"]') as HTMLInputElement;
const studentListContainer = document.querySelector('.student-list'); // Ma'lumotlarni ko‘rsatish uchun joy

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
  if (studentListContainer) {
    studentListContainer.innerHTML = ''; // Eski ma'lumotlarni tozalash
    students.forEach((student: any, index: number) => {
      const studentElement = document.createElement('div');
      studentElement.innerHTML = `
        <h3>O'quvchi ${index + 1}</h3>
        <p>Ismi: ${student.name}</p>
        <p>Familyasi: ${student.family}</p>
        <p>Manzil: ${student.address}</p>
        <p>Tug'ilgan kuni: ${student.birthdate}</p>
        <p>Lavozim: ${student.position}</p>
        <p>Maoshi: ${student.salary}</p>
        <p>Uylanganmi: ${student.married}</p>
        <hr>
      `;
      studentListContainer.appendChild(studentElement);
    });
  }
}

// Sahifa yuklanganda ma'lumotlarni ko'rsatish
window.addEventListener('load', displayStudents);
