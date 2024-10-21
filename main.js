const form = document.querySelector('form#form-atividade')
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji celebrando" />';

//adiciona remos em um array todas as atividades que o usuário digitou
// no outro array adicionaremos/armazenaremos todas as notas

const atividades = [];
const notas = [];

const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class = "resultado reprovado">Reprovado</span>'

const notaMinima = parseFloat(prompt("Digite a nota mínima para passar!"))

let linhas = '';

//foi movida para o escopo global, pois toda vez que o evento submit ocorre
//as variáveis dentro dele são resetadas. 

form.addEventListener('submit', function(e){
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();

})

function adicionaLinha (){
    //capturando os campos

    const inputNomeAtividade = document.querySelector('#nome-atividade');
    const inputNotaAtividade = document.querySelector('#nota-atividade');

    // verificando se a atividade se repete
    
    if (atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        //criando uma linha

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado} </td>`;
        linha += '</tr>'

        //colocando esse conteúdo dentro do corpo da tabela

    
        linhas += linha;

        //linha agora é linhas, entrou no espaço linhasm contem uma linha. Quando escrever mais uma
        //informação, ela vai virar linha, e então o linhas vai ser linha + linha + linha..
    }

    

    
    //Limpando os campos de input após enviar o formulário. 

    inputNomeAtividade.value = '';
    inputNotaAtividade.value  = '';
}

function atualizaTabela(){

    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas; 

    //de inicio era corpoTabela.innerHTML = linha; para testar se a linha iria ser adicionada. 

}

function atualizaMediaFinal (){
    const mediaFinal = calculaMediaFinal();

    document.querySelector('#media-final-valor').innerHTML = mediaFinal;
    document.querySelector('#media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}