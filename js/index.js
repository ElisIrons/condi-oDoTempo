"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const form = document.querySelector("#search-form > form");
//passando a informação que o input é um elemento do html para ser aceito na função e que pode ser nulo
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");
//a interrogação é um ternário de que pode ser nulo :)
//função de evento
form === null || form === void 0
  ? void 0
  : form.addEventListener("submit", (event) =>
      __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault(); //ele evita do formulário carregar a página
        //se o input for nulo, ele sai da função
        if (!input || !sectionTempoInfo) return;
        //pegar o conteúdo do input
        const localizacao = input.value;
        if (localizacao.length < 3) {
          alert("O local precisa ter pelo menos 3 letras");
          return;
        }
        try {
          const resposta = yield fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=f6eb1ffd5bae329a5fee793c671e8c5a`
          );
          const dados = yield resposta.json();
          console.log(resposta);
          const infos = {
            //   temperatura: Math.floor(dados.main.temp),
            temperatura: dados.main.temp.toString().slice(0, 2),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
          };
          console.log(infos);
          //o inner é pra definir o HTML
          sectionTempoInfo.innerHTML = `
  <div class="tempo-dados">
          <h2>${infos.local}</h2>

          <span>${infos.temperatura}ºC</span>
        </div>

        <img src="${infos.icone}" />`;
        } catch (err) {
          console.log("Deu um erro na obtenção dos dados da API.", err);
        }
      })
    );

//You may also like Plugin
/*alsolike(
  "LwlqI", "100 followers jelly cake!",
  "nKCsI", "Semantic Sandwich",
  "vlrnd", "CSS Only iPhone 6" 
);*/
