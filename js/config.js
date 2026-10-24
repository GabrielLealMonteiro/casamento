// ============================================================
//  CONFIGURAÇÃO DO SITE — edite apenas este arquivo
//  Dica: no GitHub, abra este arquivo e clique no lápis (Edit)
// ============================================================
const CONFIG = {
  casal: {
    noiva: "Ana",
    noivo: "Gabriel",
    hashtag: "#AnaEGabriel2027",
    frase: "Vamos nos casar! E queremos você com a gente nesse dia.",
    fotoCapa: "img/capa.jpg",          // foto da página inicial
  },

  // Data e hora (horário de Brasília = -03:00)
  dataCasamento: "2027-05-15T16:00:00-03:00",

  // ---------------- PÁGINA "NOSSA HISTÓRIA" ----------------
  historia: {
    fotoTopo: "img/historia/topo.jpg",
    introducao:
      "Toda grande história começa com um encontro inesperado. A nossa começou assim — e de lá pra cá, cada capítulo nos trouxe até aqui.",
    capitulos: [
      {
        data: "Março de 2019",
        titulo: "O primeiro encontro",
        texto: "Conte aqui como vocês se conheceram: onde foi, quem viu quem primeiro, o que cada um pensou.",
        foto: "img/historia/1.jpg",
      },
      {
        data: "Dezembro de 2019",
        titulo: "O primeiro beijo",
        texto: "Aquele momento que mudou tudo. Pode ser divertido, emocionante ou desastroso — os convidados adoram detalhes!",
        foto: "img/historia/2.jpg",
      },
      {
        data: "2022",
        titulo: "Nosso primeiro lar",
        texto: "A primeira casa, a primeira planta (ou pet!), as primeiras brigas sobre a louça.",
        foto: "img/historia/3.jpg",
      },
      {
        data: "Julho de 2025",
        titulo: "O pedido",
        texto: "Como foi o pedido? Onde, quem chorou mais, quem sabia do segredo?",
        foto: "img/historia/4.jpg",
      },
    ],
    citacao: "E agora, o próximo capítulo a gente escreve com vocês.",
  },

  // ---------------- PÁGINA "FOTOS" (pré-wedding) ----------------
  // Suba as fotos na pasta img/prewedding com os nomes 1.jpg, 2.jpg, 3.jpg...
  // e informe abaixo quantas são. Fotos que não existirem são ignoradas.
  galeria: {
    titulo: "Nosso pré-wedding",
    subtitulo: "Alguns registros desse momento tão especial.",
    pasta: "img/prewedding/",
    quantidade: 12,
    extensao: "jpg",          // atenção: "jpg" é diferente de "JPG" no GitHub
    legendas: {               // opcional: número da foto: "legenda"
      1: "Onde tudo começou",
    },
    fotografo: "Fotos: @seufotografo",
  },

  // ---------------- O GRANDE DIA ----------------
  eventos: [
    {
      titulo: "Cerimônia",
      hora: "16h00",
      local: "Paróquia Exemplo",
      endereco: "SHIS QL 10, Lago Sul - Brasília, DF",
      mapa: "https://maps.google.com/?q=SHIS+QL+10+Lago+Sul+Brasilia",
    },
    {
      titulo: "Recepção",
      hora: "18h00",
      local: "Espaço Exemplo",
      endereco: "SCES Trecho 2, Brasília, DF",
      mapa: "https://maps.google.com/?q=SCES+Trecho+2+Brasilia",
    },
  ],

  infos: [
    { icone: "👔", titulo: "Traje", texto: "Esporte fino. Evite branco, por favor." },
    { icone: "🚗", titulo: "Estacionamento", texto: "Gratuito no local, com manobrista." },
    { icone: "🏨", titulo: "Hospedagem", texto: "Sugestões de hotéis próximos para quem vem de fora." },
    { icone: "📅", titulo: "Confirme até", texto: "15 de abril de 2027." },
  ],

  // ---------------- PIX (todos os presentes caem aqui) ----------------
  pix: {
    chave: "seuemail@exemplo.com",     // CPF, e-mail, telefone (+5561...) ou chave aleatória
    nomeRecebedor: "GABRIEL MONTEIRO",  // até 25 caracteres
    cidade: "BRASILIA",                 // até 15 caracteres
  },

  // ---------------- LISTA DE PRESENTES ----------------
  presentes: {
    mensagem:
      "Sua presença é o nosso maior presente! Mas, se quiser nos mimar, escolha um item abaixo. O valor chega até nós via Pix e usamos com muito carinho no que ele representa.",
    categorias: [
      { nome: "Lua de mel", icone: "✈️" },
      { nome: "Casa nova", icone: "🏡" },
      { nome: "Experiências", icone: "🥂" },
      { nome: "Divertidos", icone: "😂" },
    ],
    // Campos de cada presente:
    //  nome, valor, categoria  → obrigatórios
    //  descricao               → texto curto no card
    //  foto                    → ex.: "img/presentes/panelas.jpg" (se não existir, usa o emoji)
    //  emoji                   → ícone de reserva quando não há foto
    //  destaque                → selo no card, ex.: "Mais desejado"
    //  cota: true              → o convidado escolhe quantas cotas quer dar
    //  cotasTotal / cotasRecebidas → mostra barra de progresso (atualize à mão; quando encher, mostra "Esgotado")
    itens: [
      { nome: "Passagens aéreas", descricao: "Ajude a gente a chegar ao destino dos sonhos.", valor: 200, categoria: "Lua de mel",
        foto: "img/presentes/passagem.jpg", emoji: "✈️", destaque: "Mais desejado", cota: true, cotasTotal: 20, cotasRecebidas: 6 },
      { nome: "Jantar à beira-mar", descricao: "Uma noite especial a dois na lua de mel.", valor: 350, categoria: "Lua de mel",
        foto: "img/presentes/jantar.jpg", emoji: "🍷" },
      { nome: "Passeio de barco", descricao: "Um dia inteiro navegando por praias paradisíacas.", valor: 480, categoria: "Lua de mel",
        foto: "img/presentes/barco.jpg", emoji: "⛵" },
      { nome: "Diárias no hotel", descricao: "Cada cota é uma noite de descanso merecido.", valor: 300, categoria: "Lua de mel",
        foto: "img/presentes/hotel.jpg", emoji: "🏨", cota: true, cotasTotal: 7, cotasRecebidas: 2 },

      { nome: "Jogo de panelas", descricao: "Para os jantares que (prometemos) vamos cozinhar.", valor: 599, categoria: "Casa nova",
        foto: "img/presentes/panelas.jpg", emoji: "🍳" },
      { nome: "Geladeira", descricao: "A grande estrela da cozinha nova.", valor: 250, categoria: "Casa nova",
        foto: "img/presentes/geladeira.jpg", emoji: "🧊", destaque: "Ajude com cotas", cota: true, cotasTotal: 16, cotasRecebidas: 4 },
      { nome: "Cafeteira espresso", descricao: "Combustível oficial das manhãs do casal.", valor: 899, categoria: "Casa nova",
        foto: "img/presentes/cafeteira.jpg", emoji: "☕" },
      { nome: "Jogo de cama premium", descricao: "Lençóis macios para noites tranquilas.", valor: 420, categoria: "Casa nova",
        foto: "img/presentes/cama.jpg", emoji: "🛏️" },

      { nome: "Dia de spa para o casal", descricao: "Para relaxar depois de tanta organização.", valor: 550, categoria: "Experiências",
        foto: "img/presentes/spa.jpg", emoji: "💆" },
      { nome: "Show surpresa", descricao: "Ingressos para o próximo show que a gente amar.", valor: 400, categoria: "Experiências",
        foto: "img/presentes/show.jpg", emoji: "🎶" },

      { nome: "Kit sobrevivência da noiva", descricao: "Chocolate, chá de camomila e paciência.", valor: 100, categoria: "Divertidos",
        emoji: "😅" },
      { nome: "Garantir o noivo pontual no altar", descricao: "Despertador, café e um amigo de plantão.", valor: 150, categoria: "Divertidos",
        emoji: "⏰" },
      { nome: "Primeira briga de casados", descricao: "Seguro contra discussões sobre o controle remoto.", valor: 80, categoria: "Divertidos",
        emoji: "📺" },
    ],
    // Botão "valor livre": o convidado digita quanto quer dar
    valorLivre: { ativo: true, titulo: "Valor livre", descricao: "Prefere escolher o valor? Fique à vontade!", emoji: "💛" },
  },

  // URL do Google Apps Script (veja README). Deixe "" para testar sem planilha.
  googleScriptUrl: "",
};
