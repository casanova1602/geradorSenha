import Geradores from './geradores.js';
import Score from './score.js';
import Elementos from './elementos.js';
let senhaGerada = []

export default class GerarSenha {
    constructor() {
        this.gerador = new Geradores();
        this.score = new Score();
        this.elemento = new Elementos();

        this.elemento.editar.addEventListener('change', () => {
            if (this.elemento.editar.checked) {
                this.elemento.exibir.classList.remove('esconder');
                this.elemento.exibir.value = this.imprimirSimbolos();
            } else {
                this.elemento.exibir.classList.add('esconder');
            }
        })
    }

    get gerar() {

        this.elemento.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.score.barra.classList.remove('esconder');
            this.score.legenda.classList.remove('esconder');
            const qnt = this.elemento.qntCaracteres.value
            for (let x = 1; x <= qnt; x++) {
                if (this.elemento.checkNumber.checked) senhaGerada.push(this.gerador.gerarNumeros());
                if (this.elemento.checkMaius.checked) senhaGerada.push(this.gerador.gerarMaiusculas());
                if (this.elemento.checkMinus.checked) senhaGerada.push(this.gerador.gerarMinusculas());
                if (this.elemento.checkSimb.checked && this.elemento.editar.checked) {
                    senhaGerada.push(String(this.elemento.exibir.value).charAt(this.gerador.gerarNumeros(0, this.elemento.exibir.value.length)))
                } else {
                    if (this.elemento.checkSimb.checked) senhaGerada.push(this.gerador.gerarSimbolos());
                }
            }
            const passCutted = senhaGerada.slice(0, qnt)
            passCutted.sort(() => 0.5 - Math.random());
            const senha = passCutted.join('');
            senhaGerada.length = 0
            this.exibirSenha(senha);
            this.score.calcularScore(senha);
        })
    }

    exibirSenha(valor) {
        const text = document.querySelector('.senha');
        text.value = valor;
    }

    imprimirSimbolos() {
        const qnt = this.gerador.simbolos.length;
        const arraySimbolos = []
        for (let x = 0; x < qnt; x++) {
            for (let y = this.gerador.simbolos[x][0]; y <= this.gerador.simbolos[x][1]; y++) {
                arraySimbolos.push(String.fromCharCode(y))
            }
        }
        return arraySimbolos.join('');
    }
}