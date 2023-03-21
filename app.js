const mensagemErro = document.querySelector("#mensagemErro");
const cepbusca = document.querySelector("#cep");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const localidade = document.querySelector("#localidade");
const uf = document.querySelector("#uf");
const btnBuscar = document.querySelector("#botao_buscar");
const btnLimpar = document.querySelector("#botao_limpar");
const btnSalvar = document.querySelector("#botao_salvar");
let endereco;

btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    validarCEP();
  } catch (erro) {
    mensagemErro.innerHTML = erro.message;
  }
});

btnLimpar.addEventListener("click", () => {
  limparCampos();
});

btnSalvar.addEventListener("click", () => {
  alert("Dados salvos com sucesso!!!");
  limparCampos();
});
/*
function validarCEP() {
  const regex = /^[0-9]{8}$/;
  if (regex.test(cepbusca.value)) {
    console.log(cepbusca.value);
  } else {
    throw new Error("cep inválido");
  }
  buscarEndereco();
}
*/
function validarCEP() {
  const regex = /^[0-9]{8}$/;

  if (regex.test(cepbusca.value)) {
    buscarEndereco();
    mensagemErro.innerHTML = "";
  } else {
    throw new Error("cep inválido");
  }
}

function buscarEndereco() {
  fetch(`http://viacep.com.br/ws/${cepbusca.value}/json/`)
    .then((response) => {
      return response.json();
    })
    .then((endereco) => {
      preencherCampos(endereco);
    })
    .catch((error) => {
      console.error(error);
    });
}

function preencherCampos(endereco) {
  for (const campo in endereco) {
    if (document.querySelector("#" + campo)) {
      document.querySelector("#" + campo).value = endereco[campo];
    }
  }
}

function limparCampos() {
  cepbusca.value = "";
  logradouro.value = "";
  bairro.value = "";
  localidade.value = "";
  uf.value = "";
  mensagemErro.innerHTML = "";
}
