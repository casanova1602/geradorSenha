const letrasMin = [97, 122];
const simbolos = [[33, 47], [58, 64], [91, 96], [123, 126]];
const letrasMaius = [65, 90];
let senhaGerada = []

class GeradorSenha {
    constructor() {
        this.contador = document.getElementById('caracteres')
        this.checkSimb = document.getElementById('simbolos');
        this.barra = document.querySelector('.barra');
        this.barra.classList.add('esconder');
        this.editar = document.getElementById('editar');
        this.exibir = document.getElementById('exibir-simbolos');
        this.copiar = document.querySelector('.copiar');
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

        this.editar.addEventListener('change', () => {
            if (this.editar.checked) {
                this.exibir.classList.remove('esconder');
                this.exibir.value = this.imprimirSimbolos();
            } else {
                this.exibir.classList.add('esconder');
            }
        })
        this.gerar();
    }

    gerar() {
        const form = document.getElementById('formulario')
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.barra.classList.remove('esconder');
            const checkNumber = document.getElementById('number');
            const checkMaius = document.getElementById('maiuscula');
            const checkMinus = document.getElementById('minuscula');
            const qntCaracteres = document.getElementById('caracteres');
            const qnt = qntCaracteres.value
            for (let x = 1; x <= qnt; x++) {
                if (checkNumber.checked) senhaGerada.push(this.gerarNumeros());
                if (checkMaius.checked) senhaGerada.push(this.gerarMaiusculas());
                if (checkMinus.checked) senhaGerada.push(this.gerarMinusculas());
                if (this.checkSimb.checked && this.editar.checked) {
                    senhaGerada.push(String(this.exibir.value).charAt(this.gerarNumeros(0, this.exibir.value.length)))
                } else {
                    if (this.checkSimb.checked) senhaGerada.push(this.gerarSimbolos());
                }
            }
            senhaGerada.sort(() => 0.5 - Math.random());
            const senha = senhaGerada.join('').slice(0, qnt);
            senhaGerada.length = 0
            this.exibirSenha(senha);
            this.calcularScore(senha);
        })

    }

    calcularScore(senha) {

        let score = 0;

        if (senha.length >= 8) score++;
        if (senha.length >= 15) score++;
        if (senha.length >= 25) score++;

        if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) score++;
        if (/[0-9]/.test(senha)) score++;
        if (/[^0-9A-Za-z]/.test(senha)) score++;

        this.gerarBarra(score);
    }

    gerarBarra(score) {
        const legenda = document.querySelector('.legenda')

        const barraForca = document.querySelector('.barraForca')

        const cores = ["#FF0000", "#ff4d4d", "#ff751a", "#ffcc00", "#99cc00", "#4CAF50", "#808000"];

        const tamanho = (score > 0) ? (score / 6) * 100 : 5;

        barraForca.style.width = `${tamanho}%`;

        const forca = Math.min(score, 7);

        barraForca.style.backgroundColor = cores[forca];
        let mensagem = ''
        if (forca === 0) mensagem = 'Extremamente Fraco'
        if (forca === 1) mensagem = 'Muito Fraco';
        if (forca === 2) mensagem = 'Fraco';
        if (forca === 3) mensagem = 'Médio';
        if (forca === 4) mensagem = 'Forte';
        if (forca === 5) mensagem = 'Muito Forte';
        if (forca === 6) mensagem = 'Extremamente Forte';
        legenda.innerHTML = mensagem;
        legenda.style.color = cores[forca];
    }

    gerarNumeros(min = 0, max = 9) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    gerarMaiusculas() {
        return String.fromCharCode(this.gerarNumeros(letrasMaius[0], letrasMaius[1]))
    }

    gerarMinusculas() {
        return String.fromCharCode(this.gerarNumeros(letrasMin[0], letrasMin[1]))
    }

    gerarSimbolos() {
        const gerarIndice = this.gerarNumeros(0, simbolos.length);
        const escolhido = this.gerarNumeros(simbolos[gerarIndice][0], simbolos[gerarIndice][1])
        return String.fromCharCode(escolhido)
    }

    exibirSenha(valor) {
        const text = document.querySelector('.senha');
        text.value = valor;
    }

    imprimirSimbolos() {
        const qnt = simbolos.length;
        const arraySimbolos = []
        for (let x = 0; x < qnt; x++) {
            for (let y = simbolos[x][0]; y <= simbolos[x][1]; y++) {
                arraySimbolos.push(String.fromCharCode(y))
            }
        }
        return arraySimbolos.join('');
    }

}
new GeradorSenha();