export default class Score{

    constructor(){
        this.barra = document.querySelector('.barra');
        this.legenda = document.querySelector('.legenda')
    }

     calcularScore(senha){

        let score = 0;

        if (senha.length >= 8) score++;
        if (senha.length >= 15) score++;
        if (senha.length >= 25) score++;

        if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) score++;
        if ((/[0-9]/.test(senha) && /[a-z]/.test(senha)) || (/[0-9]/.test(senha) && /[A-Z]/.test(senha))) score++;
        if (/[^0-9A-Za-z]/.test(senha)) score++;

        this.gerarBarra(score);
    }

    gerarBarra(score) {

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
        this.legenda.innerHTML = mensagem;
        this.legenda.style.color = cores[forca];
    }

}