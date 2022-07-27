"use strict";
// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// A ideia dessa atividade é criar um aplicativo que:
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela
// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction
const apiKey_v3 = "c280fdbe28295d5c4ab4347c48cad979";
let requestToken;
let apiKey;
let username = "romariopmarinho";
let password = "TMDB_pass_movie";
let sessionId;
let listId;
document.getElementById("login").value = username;
document.getElementById("senha").value = password;
document.getElementById("api-key").value = apiKey_v3;
const loginButton = document.getElementById("login-button");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");
let searchContainer = document.getElementById("search-container");
loginButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield criarRequestToken();
    yield logar();
    yield criarSessao();
}));
searchButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query = searchInput.value;
    let listaDeFilmes = yield procurarFilme(query);
    let ul = document.createElement("ul");
    ul.id = "lista";
    for (const item of listaDeFilmes.results) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(item.original_title));
        li.id = "lista-" + item.original_title;
        const button_add = document.createElement("button");
        button_add.id = "button" + item.original_title;
        button_add.innerText = "+";
        button_add.style.cssText =
            "font-weight: bold; background-color: #4CAF50; margin-left: 10px; border: none; color: white; padding: 0 5px; text-align: center; text-decoration: none; display: inline-block; border-radius:2px ";
        button_add.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            yield preencherListaFavorita(item.original_title);
            button_add.disabled = true;
        }));
        for (const child of Array.from(document.getElementById("lista-favoritos").children)) {
            if (child.id.slice(4) === item.original_title) {
                button_add.disabled = true;
            }
        }
        li.appendChild(button_add);
        ul.appendChild(li);
    }
    console.log(listaDeFilmes);
    searchContainer.appendChild(ul);
}));
function preencherListaFavorita(original_title) {
    console.log(original_title);
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(original_title));
    li.id = "fav-" + original_title;
    const button_sub = document.createElement("button");
    button_sub.innerText = "-";
    button_sub.style.cssText =
        "font-weight: bold; background-color: #f44336; margin-left: 10px; border: none; color: white; padding: 0 5px; text-align: center; text-decoration: none; display: inline-block; border-radius:2px";
    button_sub.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        yield removerDaListaFavorita(li.id);
    }));
    li.appendChild(button_sub);
    document.getElementById("lista-favoritos").appendChild(li);
}
function removerDaListaFavorita(id) {
    document.getElementById(id).remove();
    console.log(id.slice(4));
    (document.getElementById("button" + id.slice(4))).disabled = false;
}
function preencherSenha() {
    password = document.getElementById("senha").value;
    validateLoginButton();
}
function preencherLogin() {
    username = document.getElementById("login").value;
    validateLoginButton();
}
function preencherApi() {
    apiKey = document.getElementById("api-key").value;
    validateLoginButton();
}
function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
}
class HttpClient {
    static get({ url, method, body = null }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open(method, url, true);
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(JSON.parse(request.responseText));
                    }
                    else {
                        reject({
                            status: request.status,
                            statusText: request.statusText,
                        });
                    }
                };
                request.onerror = () => {
                    reject({
                        status: request.status,
                        statusText: request.statusText,
                    });
                };
                if (body) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    body = JSON.stringify(body);
                }
                request.send(body);
            });
        });
    }
}
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function* () {
        query = encodeURI(query);
        console.log(query);
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey_v3}&query=${query}`,
            method: "GET",
        });
        return result;
    });
}
function adicionarFilme(filmeId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey_v3}&language=en-US`,
            method: "GET",
        });
        console.log(result);
    });
}
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey_v3}`,
            method: "GET",
        });
        requestToken = result.request_token;
    });
}
function logar() {
    return __awaiter(this, void 0, void 0, function* () {
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey_v3}`,
            method: "POST",
            body: {
                username: `${username}`,
                password: `${password}`,
                request_token: `${requestToken}`,
            },
        });
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey_v3}&request_token=${requestToken}`,
            method: "GET",
        });
        sessionId = result.session_id;
    });
}
function criarLista(nomeDaLista, descricao) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list?api_key=${apiKey_v3}&session_id=${sessionId}`,
            method: "POST",
            body: {
                name: nomeDaLista,
                description: descricao,
                language: "pt-br",
            },
        });
        console.log(result);
    });
}
function adicionarFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey_v3}&session_id=${sessionId}`,
            method: "POST",
            body: {
                media_id: filmeId,
            },
        });
        console.log(result);
    });
}
function pegarLista() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey_v3}`,
            method: "GET",
        });
        console.log(result);
    });
}
