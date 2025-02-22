export default class Elementos{
    constructor(){
        this.contador = document.getElementById('caracteres')
        this.checkSimb = document.getElementById('simbolos');
        this.editar = document.getElementById('editar');
        this.exibir = document.getElementById('exibir-simbolos');
        this.copiar = document.querySelector('.copiar');
        this.form = document.getElementById('formulario')
        this.checkNumber = document.getElementById('number');
        this.checkMaius = document.getElementById('maiuscula');
        this.checkMinus = document.getElementById('minuscula');
        this.qntCaracteres = document.getElementById('caracteres');

        this.checkSimb.addEventListener('change', () => {
            if (this.checkSimb.checked) {
                this.editar.classList.remove('esconder');
                this.editar.previousElementSibling.classList.remove('esconder');
            } else {
                this.editar.classList.add('esconder');
                this.editar.previousElementSibling.classList.add('esconder')
                this.exibir.classList.add('esconder');
                this.editar.checked = false;
            }
        });

        this.copiar.addEventListener('click', (e) => {
            const senhaGerada = document.querySelector('.senha');
            e.preventDefault();
            navigator.clipboard.writeText(senhaGerada.value);
            this.copiar.innerHTML = 'Copiado 😀'
            setTimeout(() => {
                this.copiar.innerHTML = 'Copiar!'
            }, 4000)
        })

        this.copiar.addEventListener('mousedown', (e) => {
            e.preventDefault();
        })
    }
}