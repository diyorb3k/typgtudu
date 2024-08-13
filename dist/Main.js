"use strict";
class Modal {
    constructor(modalId) {
        this.modalElement = document.getElementById(modalId);
        this.closeButton = this.modalElement.querySelector('.close');
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
    const openModalButton = document.getElementById('openModalButton');
    openModalButton.addEventListener('click', () => {
        myModal.open();
    });
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', () => {
        // Modal ichidagi inputlardan ma'lumotlarni olish va foydalanish
        const inputs = myModal.modalElement.querySelectorAll('input');
        inputs.forEach((input) => {
            console.log(input.value);
        });
        myModal.close();
    });
});
