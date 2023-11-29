const form = document.querySelector("#search-form > form");
//passando a informação que o input é um elemento do html para ser aceito na função e que pode ser nulo
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionTempoInfo = document.querySelector("#tempo-info");

//a interrogação é um ternário de que pode ser nulo :)
//função de evento
form?.addEventListener("submit", async (event) => {
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
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=f6eb1ffd5bae329a5fee793c671e8c5a`
    );
    const dados = await resposta.json();

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
});
