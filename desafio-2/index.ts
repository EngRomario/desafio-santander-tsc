interface IPessoa {
  nome: string;
  idade: number;
  profissao: Trabalho;
}

enum Trabalho {
  Atriz,
  Padeiro,
}

let pessoa_list: IPessoa[] = [
  {
    nome: "Maria",
    idade: 29,
    profissao: Trabalho.Atriz,
  },

  {
    nome: "Roberto",
    idade: 19,
    profissao: Trabalho.Padeiro,
  },

  {
    nome: "Laura",
    idade: 32,
    profissao: Trabalho.Atriz,
  },

  {
    nome: "Carlos",
    idade: 19,
    profissao: Trabalho.Padeiro,
  },
];
const pessoa_list_element = document.getElementById("pessoa-list");

for (let i = 0; i < 4; i++) {
  let pessoa = document.createElement("div");
  pessoa.setAttribute("id", `pessoa-${i + 1}`);
  pessoa.style.cssText = "display: flex; flex-direction: column";

  let pessoa_nome = document.createElement("span");
  pessoa_nome.setAttribute("id", "nome");
  pessoa_nome.innerHTML = "Nome: " + pessoa_list[i].nome + " ";

  let pessoa_idade = document.createElement("span");
  pessoa_idade.setAttribute("id", "idade");
  pessoa_idade.innerHTML = "Idade: " + pessoa_list[i].idade.toString() + " ";

  let pessoa_profissao = document.createElement("span");
  pessoa_profissao.setAttribute("id", "profissao");
  pessoa_profissao.innerHTML =
    "Profissão: " + Trabalho[pessoa_list[i].profissao] ;

  pessoa.appendChild(pessoa_nome);
  pessoa.appendChild(pessoa_idade);
  pessoa.appendChild(pessoa_profissao);
  pessoa.appendChild(document.createElement("br"));
  pessoa_list_element?.appendChild(pessoa);
}
