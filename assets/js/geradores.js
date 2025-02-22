export default class Geradores {
    constructor() {
        this.letrasMin = [97, 122];
        this.simbolos = [[33, 47], [58, 64], [91, 96], [123, 126]];
        this.letrasMaius = [65, 90];
    }

    gerarNumeros(min = 0, max = 9) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    gerarMaiusculas() {
        return String.fromCharCode(this.gerarNumeros(this.letrasMaius[0], this.letrasMaius[1]))
    }

    gerarMinusculas() {
        return String.fromCharCode(this.gerarNumeros(this.letrasMin[0], this.letrasMin[1]))
    }

    gerarSimbolos() {
        const gerarIndice = this.gerarNumeros(0, this.simbolos.length);
        const escolhido = this.gerarNumeros(this.simbolos[gerarIndice][0], this.simbolos[gerarIndice][1])
        return String.fromCharCode(escolhido)
    }
}