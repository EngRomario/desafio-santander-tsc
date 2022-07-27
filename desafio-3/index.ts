let botaoAtualizar = document.getElementById(
  "atualizar-saldo"
) as HTMLButtonElement;
let botaoLimpar = document.getElementById("limpar-saldo") as HTMLButtonElement;
let soma = document.getElementById("soma") as HTMLInputElement;
let campoSaldo = document.getElementById("campo-saldo");

campoSaldo!.innerHTML = "0";

function somarAoSaldo(soma: number) {
  console.log(soma);
  campoSaldo!.innerHTML = (parseFloat(campoSaldo!.innerText) + soma)
    .toFixed(2)
    .toString();
}

function limparSaldo() {
  campoSaldo!.innerHTML = "0";
}

botaoAtualizar.addEventListener("click", function () {
  somarAoSaldo(soma.valueAsNumber);
});

botaoLimpar.addEventListener("click", function () {
  limparSaldo();
});

/**
    <h4>Valor a ser adicionado: <input id="soma"> </h4>
    <button id="atualizar-saldo">Atualizar saldo</button>
    <button id="limpar-saldo">Limpar seu saldo</button>
    <h1>"Seu saldo é: " <span id="campo-saldo"></span></h1>
 */
