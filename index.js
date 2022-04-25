const inputNoivo = document.getElementById("nomeNoivo");
const inputNoiva = document.getElementById("nomeNoiva");
const noivo = document.getElementById("noivo");
const noiva = document.getElementById("noiva");
const concatena = document.getElementById("concatena");

let dadosBd = [];

// Adiciona o nome dos noivos na tela
const titulo = () => {
  if (inputNoivo.value.length === 0) {
    alert("Insira o nome do noivo");
  } else if (inputNoiva.value.length === 0) {
    alert("Insira o nome do noiva");
  } else {
    noiva.innerHTML = inputNoiva.value.toUpperCase();
    noivo.innerHTML = inputNoivo.value.toUpperCase();
  }
};

// cria elementos do html
const criarLista = (produto, status, valor, indice) => {
  const item = document.createElement("tr");
  item.setAttribute("class", "item-linha");
  item.innerHTML = `
    <input class="check"type="checkbox" ${status} data-id =${indice} >
    <td>${produto}</td>
    <td>${valor}</td>
    <td><button type ="button" class ="material-icons" data-id =${indice}>delete</button></td>
    `;
  document.getElementById("corpoLista").appendChild(item);
};

//Função para nao duplicar os itens da lista quando for atualizado a tela
const limparprodutos = () => {
  const corpoLista = document.getElementById("corpoLista");
  while (corpoLista.firstChild) {
    corpoLista.removeChild(corpoLista.lastChild);
  }
};

// recebe os dados que estao no array dadosBD
//e manda para função que ira criar os item no html
const atualizaTela = () => {
  limparprodutos();
  dadosBd.forEach((item, indice) =>
    criarLista(item.produto, item.status, item.valor, indice)
  );
  document.getElementById("valor").innerText = ValorTotal();
};

//inserir item no array do dadosBd
const inserirItem = () => {
  const texto = document.getElementById("inputProduto").value;

  const itemRepete = dadosBd.some((item) => item.produto == texto);
  if (itemRepete) {
    alert("Já foi inserido este produto na lista");
    texto = "";
  } else {
    dadosBd.push({ produto: texto, status: "", valor: 0 });

    atualizaTela();

    texto.innerText = "";
  }
};

//remove item da lista
const removerItem = (id) => {
  dadosBd.splice(id, 1);
  atualizaTela();
};

//Atualiza a propriedade checkbox
const atualizaCheckbox = (id) => {
  dadosBd[id].status = dadosBd[id].status === "" ? "checked" : "";
  atualizaTela();
};

// Atualiza a propriedade de Valor
const adicionarValorSeClicado = (id) => {
  let preco = parseFloat(document.getElementById("inputValor").value);
  if (document.getElementById("inputValor").value == "") {
    dadosBd[id].valor = 0;
  } else {
    dadosBd[id].valor = preco;
    atualizaTela();
  }
};

const adicionarValorNaoClicado = (id) => {
  dadosBd[id].valor = 0;
  atualizaTela();
};

//Verifica com item foi clicado
const clickItem = (evento) => {
  const elementoClicado = evento.target;

  if (elementoClicado.type === "button") {
    const id = elementoClicado.dataset.id;
    removerItem(id);
  } else if (elementoClicado.type === "checkbox") {
    const id = elementoClicado.dataset.id;

    atualizaCheckbox(id);
  }

  //ira abrir modal apenas quando o checkebox for selecionado
  if (elementoClicado.checked) {
    openModal(`dv-modal`);
    setTimeout(() => {
      const id = elementoClicado.dataset.id;
      adicionarValorSeClicado(id);
    }, 5000);
  } else {
    const id = elementoClicado.dataset.id;
    adicionarValorNaoClicado(id);
  }
};

//soma total dos produtos selecionados
const ValorTotal = () => {
  let total = 0;

  if (dadosBd.length !== 0) {
    for (let i = 0; i < dadosBd.length; i++) {
      total = total + dadosBd[i].valor;
    }
  }
  return total;
};

//modal função
function openModal(nomeModal) {
  let modal = document.getElementById(nomeModal);

  if (typeof modal == "undefined" || modal === null) return;
  modal.style.display = "Block";
  document.body.style.overflow = "hidden";
  document.getElementById("inputValor").value = "";

  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }, 5000);
}

document.getElementById("corpoLista").addEventListener("click", clickItem);
atualizaTela();
