class Modal {
    private modalElement: HTMLDivElement;
    private closeButton: HTMLSpanElement;
  
    constructor(modalId: string) {
      this.modalElement = document.getElementById(modalId) as HTMLDivElement;
      this.closeButton = this.modalElement.querySelector('.close') as HTMLSpanElement;
  
      this.closeButton.addEventListener('click', () => this.close());
      window.addEventListener('click', (event) => {
        if (event.target === this.modalElement) {
          this.close();
        }
      });
    }
  
    open() {
      this.modalElement.style.display = 'block';
    }
  
    close() {
      this.modalElement.style.display = 'none';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const myModal = new Modal('myModal');
  
    const openModalButton = document.getElementById('openModalButton') as HTMLButtonElement;
    openModalButton.addEventListener('click', () => {
      myModal.open();
    });
  
    const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
    saveButton.addEventListener('click', () => {
      // Modal ichidagi inputlardan ma'lumotlarni olish va foydalanish
      const inputs = myModal.modalElement.querySelectorAll('input');
      inputs.forEach((input) => {
        console.log((input as HTMLInputElement).value);
      });
      myModal.close();
    });
  });
  