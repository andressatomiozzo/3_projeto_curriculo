const cursosCaixas = document.querySelectorAll(".cursos-curso");

cursosCaixas.forEach((cursosCaixa) => {
  cursosCaixa.addEventListener("click", () => {
    // descobre qual texto está ligado a essa caixa
    const idTexto = cursosCaixa.getAttribute("data-target");
    const cursosTexto = document.getElementById(idTexto);

    if (cursosTexto.style.display === "flex") {
      cursosTexto.style.display = "none";
    } else {
      cursosTexto.style.display = "flex";
    }
  });
});

const track = document.getElementById("projetos-container");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const viewport = document.querySelector(".carrosel");

const nPaginas = 5


let index = 0; 

//impedir que o index fique inválido. Passar além do último projeto
function clampIndex() {
  const max = nPaginas - 1;
  if (index < 0) index = 0;
  if (index > max) index = max;
}

//Criar as bolinhas do carrossel
function renderDots() {
  dotsEl.innerHTML = "";

  for (let i = 0; i < nPaginas; i++) {
    const b = document.createElement("button");                      //Cria o botão
    b.className = "dot" + (i === index ? " active" : "");            //Dá um name e se for igual ao i fica ativo

    b.addEventListener("click", () => {                              // Comportamento da bolinha
      index = i;                                                     // muda o slide atual para o número da bolinha clicada
      update();                                                      // atualiza o carrossel (move os cards e atualiza a interface)
    });

    dotsEl.appendChild(b);                                           // Insere o button dentro do dotsEl
  }
}

renderDots();

//Atualiza as bolinhas e as setas
function updateCounterAndButtons() {
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === nPaginas - 1;

  [...dotsEl.children].forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

function updateTransform() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

renderDots();

function update() {
  clampIndex();
  renderDots();
  updateTransform();
  updateCounterAndButtons();
}


prevBtn.addEventListener("click", () => { index--; update(); });
nextBtn.addEventListener("click", () => { index++; update(); });
