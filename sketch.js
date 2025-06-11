let chapeuzinho;
let doces = [];
let lobo;
let pontos = 0;
let jogoAcabou = false;
let docesColetados = 0;
let totalDoces = 10;

function setup() {
  createCanvas(600, 400);
  chapeuzinho = new Chapeuzinho();
  lobo = new Lobo();

  // Criando 10 doces no mapa
  for (let i = 0; i < totalDoces; i++) {
    doces.push(new Doce());
  }
}

function draw() {
  background(220);

  if (jogoAcabou) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Jogo Acabou!", width / 2, height / 2);
    textSize(20);
    text("Pontos: " + pontos, width / 2, height / 2 + 40);
    return;
  }

  // Atualiza e desenha a Chapeuzinho Vermelho
  chapeuzinho.update();
  chapeuzinho.display();

  // Atualiza e desenha o Lobo
  lobo.update(chapeuzinho);
  lobo.display();

  // Desenha e verifica colisão com os doces
  for (let i = doces.length - 1; i >= 0; i--) {
    doces[i].display();
    if (chapeuzinho.hits(doces[i])) {
      doces.splice(i, 1);
      pontos += 10;
      docesColetados++;
    }
  }

  // Verifica se o lobo pegou a Chapeuzinho
  if (lobo.hits(chapeuzinho)) {
    jogoAcabou = true;
  }

  // Se todos os doces forem coletados, o jogo acaba
  if (docesColetados === totalDoces) {
    jogoAcabou = true;
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0, 255, 0);
    text("Você ganhou!", width / 2, height / 2);
    textSize(20);
    text("Pontos: " + pontos, width / 2, height / 2 + 40);
  }

  // Exibe pontos
  fill(0);
  textSize(20);
  text("Pontos: " + pontos, 20, 30);
}

// Classe para Chapeuzinho Vermelho
class Chapeuzinho {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 30;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
  }

  hits(doc) {
    let d = dist(this.x, this.y, doc.x, doc.y);
    return d < this.size / 2 + doc.size / 2;
  }
}

// Classe para o Lobo
class Lobo {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 40;
    this.speed = 2;
  }

  update(chapeuzinho) {
    let angle = atan2(chapeuzinho.y - this.y, chapeuzinho.x - this.x);
    this.x += this.speed * cos(angle);
    this.y += this.speed * sin(angle);
  }

  display() {
    fill(100);
    ellipse(this.x, this.y, this.size);
  }

  hits(chapeuzinho) {
    let d = dist(this.x, this.y, chapeuzinho.x, chapeuzinho.y);
    return d < this.size / 2 + chapeuzinho.size / 2;
  }
}

// Classe para os Doces
class Doce {
  constructor() {
    this.x = random(width);
    this.y = random(height - 100);
    this.size = 20;
  }

  display() {
    fill(255, 204, 0);
    ellipse(this.x, this.y, this.size);
  }
}