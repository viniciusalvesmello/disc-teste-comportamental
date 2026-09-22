// Banco de conteúdo do teste DISC. Todo o texto aqui é original, escrito para este projeto.

const DISC_FACTORS = {
  D: {
    name: 'Dominância',
    short:
      'Pessoas diretas, competitivas e focadas em resultados rápidos. Gostam de assumir o controle e aceitam bem os desafios.',
  },
  I: {
    name: 'Influência',
    short:
      'Indivíduos comunicativos, persuasivos e entusiasmados. Gostam de interagir em grupo e motivar os outros.',
  },
  S: {
    name: 'Estabilidade',
    short:
      'Perfis pacientes, calmos e previsíveis. Valorizam a harmonia, o trabalho em equipe e a segurança da rotina.',
  },
  C: {
    name: 'Conformidade',
    short:
      'Pessoas analíticas, detalhistas e organizadas. Prezam por regras, precisão e qualidade técnica.',
  },
};

// 24 blocos, cada um com uma frase por fator (D, I, S, C), em ordem
// embaralhada para evitar viés de posição.
const QUESTION_BLOCKS = [
  [
    { factor: 'S', text: 'Prefiro rotinas previsíveis' },
    { factor: 'D', text: 'Gosto de tomar decisões rápidas' },
    { factor: 'C', text: 'Gosto de seguir processos bem definidos' },
    { factor: 'I', text: 'Gosto de conhecer pessoas novas' },
  ],
  [
    { factor: 'I', text: 'Fico animado ao falar sobre minhas ideias' },
    { factor: 'C', text: 'Presto atenção aos detalhes' },
    { factor: 'D', text: 'Prefiro assumir o controle das situações' },
    { factor: 'S', text: 'Gosto de manter a harmonia no grupo' },
  ],
  [
    { factor: 'C', text: 'Prefiro analisar dados antes de decidir' },
    { factor: 'S', text: 'Sou paciente mesmo sob pressão' },
    { factor: 'I', text: 'Gosto de estar cercado de gente' },
    { factor: 'D', text: 'Encaro desafios como motivação' },
  ],
  [
    { factor: 'D', text: 'Vou direto ao ponto nas conversas' },
    { factor: 'I', text: 'Costumo motivar quem está ao meu redor' },
    { factor: 'S', text: 'Prefiro consistência a mudanças bruscas' },
    { factor: 'C', text: 'Gosto de organizar tudo com antecedência' },
  ],
  [
    { factor: 'S', text: 'Gosto de ouvir antes de falar' },
    { factor: 'C', text: 'Sou cauteloso antes de agir' },
    { factor: 'D', text: 'Não tenho medo de correr riscos calculados' },
    { factor: 'I', text: 'Prefiro trabalhar em grupo a sozinho' },
  ],
  [
    { factor: 'I', text: 'Gosto de contar histórias e causos' },
    { factor: 'D', text: 'Gosto de competir e superar metas' },
    { factor: 'C', text: 'Prefiro regras claras a ambiguidade' },
    { factor: 'S', text: 'Costumo evitar conflitos desnecessários' },
  ],
  [
    { factor: 'C', text: 'Gosto de revisar meu trabalho várias vezes' },
    { factor: 'S', text: 'Prefiro apoiar a competir' },
    { factor: 'D', text: 'Prefiro agir logo a ficar planejando demais' },
    { factor: 'I', text: 'Fico entusiasmado com ideias novas' },
  ],
  [
    { factor: 'D', text: 'Costumo assumir a liderança em grupos' },
    { factor: 'I', text: 'Gosto de ser o centro das atenções às vezes' },
    { factor: 'S', text: 'Gosto de terminar o que comecei' },
    { factor: 'C', text: 'Sou exigente com a qualidade do que faço' },
  ],
  [
    { factor: 'S', text: 'Sou leal com quem confia em mim' },
    { factor: 'C', text: 'Prefiro planejar cada etapa com cuidado' },
    { factor: 'I', text: 'Prefiro conversar a escrever um relatório' },
    { factor: 'D', text: 'Fico impaciente com processos lentos' },
  ],
  [
    { factor: 'I', text: 'Costumo fazer amizade com facilidade' },
    { factor: 'D', text: 'Gosto de resolver problemas com autonomia' },
    { factor: 'C', text: 'Costumo pesquisar bastante antes de opinar' },
    { factor: 'S', text: 'Prefiro ambientes calmos e estáveis' },
  ],
  [
    { factor: 'C', text: 'Gosto de manter tudo documentado' },
    { factor: 'I', text: 'Gosto de celebrar conquistas com os outros' },
    { factor: 'S', text: 'Costumo pensar nos outros antes de mim' },
    { factor: 'D', text: 'Prefiro resultados a explicações longas' },
  ],
  [
    { factor: 'D', text: 'Enfrento conflitos de forma direta' },
    { factor: 'S', text: 'Sou uma presença constante e confiável na equipe' },
    { factor: 'I', text: 'Sou otimista mesmo em situações difíceis' },
    { factor: 'C', text: 'Prefiro precisão a velocidade' },
  ],
  [
    { factor: 'I', text: 'Gosto de improvisar quando falta um plano' },
    { factor: 'C', text: 'Sou criterioso ao avaliar riscos' },
    { factor: 'D', text: 'Gosto de definir metas ambiciosas' },
    { factor: 'S', text: 'Prefiro seguir um ritmo tranquilo' },
  ],
  [
    { factor: 'S', text: 'Sou discreto sobre minhas conquistas' },
    { factor: 'D', text: 'Tomo a frente quando algo precisa ser feito' },
    { factor: 'C', text: 'Gosto de seguir normas e procedimentos' },
    { factor: 'I', text: 'Prefiro persuadir a impor' },
  ],
  [
    { factor: 'C', text: 'Prefiro fatos a opiniões' },
    { factor: 'I', text: 'Costumo expressar emoções abertamente' },
    { factor: 'S', text: 'Gosto de rotinas bem estabelecidas' },
    { factor: 'D', text: 'Prefiro trabalhar sob pressão a ficar parado' },
  ],
  [
    { factor: 'D', text: 'Gosto de desafiar o status quo' },
    { factor: 'S', text: 'Prefiro segurança a novidade' },
    { factor: 'I', text: 'Gosto de ambientes descontraídos' },
    { factor: 'C', text: 'Costumo notar erros que outros não veem' },
  ],
  [
    { factor: 'I', text: 'Fico entediado com rotinas muito repetitivas' },
    { factor: 'C', text: 'Gosto de trabalhar com métodos comprovados' },
    { factor: 'D', text: 'Sou direto ao dar minha opinião' },
    { factor: 'S', text: 'Costumo me adaptar para manter a paz' },
  ],
  [
    { factor: 'S', text: 'Sou confiável em compromissos assumidos' },
    { factor: 'D', text: 'Prefiro decidir sozinho a esperar consenso' },
    { factor: 'C', text: 'Sou reservado até ter certeza de algo' },
    { factor: 'I', text: 'Gosto de brainstorms e ideias em grupo' },
  ],
  [
    { factor: 'C', text: 'Prefiro qualidade técnica a improviso' },
    { factor: 'S', text: 'Prefiro previsibilidade a surpresas' },
    { factor: 'I', text: 'Prefiro elogiar a criticar' },
    { factor: 'D', text: 'Gosto de ambientes competitivos' },
  ],
  [
    { factor: 'D', text: 'Encaro obstáculos como oportunidades' },
    { factor: 'I', text: 'Sou animado ao apresentar algo em público' },
    { factor: 'C', text: 'Gosto de estruturar bem minhas ideias antes de falar' },
    { factor: 'S', text: 'Gosto de cuidar das pessoas ao meu redor' },
  ],
  [
    { factor: 'I', text: 'Gosto de criar conexões espontâneas' },
    { factor: 'S', text: 'Sou calmo diante de imprevistos' },
    { factor: 'D', text: 'Prefiro ação a debate prolongado' },
    { factor: 'C', text: 'Sou meticuloso com prazos e detalhes' },
  ],
  [
    { factor: 'C', text: 'Prefiro seguir um roteiro a inventar na hora' },
    { factor: 'D', text: 'Gosto de assumir responsabilidades grandes' },
    { factor: 'S', text: 'Prefiro decisões consultadas em grupo' },
    { factor: 'I', text: 'Costumo contagiar o clima do ambiente' },
  ],
  [
    { factor: 'S', text: 'Costumo ser o apoio nos momentos difíceis' },
    { factor: 'I', text: 'Prefiro flexibilidade a rigidez' },
    { factor: 'C', text: 'Costumo questionar antes de aceitar algo' },
    { factor: 'D', text: 'Sou determinado quando decido algo' },
  ],
  [
    { factor: 'D', text: 'Prefiro liderar a ser liderado' },
    { factor: 'C', text: 'Gosto de garantir que tudo esteja correto' },
    { factor: 'I', text: 'Gosto de compartilhar novidades com todos' },
    { factor: 'S', text: 'Gosto de manter tradições e costumes' },
  ],
];

// Perfis puros — usados como conteúdo de apoio e como fallback em caso de
// empate entre o fator dominante e o secundário.
const PURE_PROFILES = {
  D: {
    archetype: 'Executor',
    narrative:
      'Seu perfil é marcado pela ação e pelo foco em resultado. Você prefere decidir rápido e assumir o controle a esperar um consenso perfeito, e encara desafios como combustível em vez de ameaça. Isso te torna alguém que destrava situações travadas, mas que pode passar por cima de detalhes ou sentimentos alheios no caminho.',
    development: [
      'Praticar pausas antes de decidir, ouvindo quem discorda antes de agir.',
      'Reconhecer o esforço da equipe, não só o resultado final.',
      'Ajustar o ritmo em momentos que pedem mais cautela do que velocidade.',
    ],
  },
  I: {
    archetype: 'Comunicador',
    narrative:
      'Você se movimenta pelo contato humano: gosta de gente, de ideias novas e de contagiar o ambiente com entusiasmo. Sua energia costuma destravar grupos travados e criar conexões rápidas, mas o mesmo entusiasmo pode te afastar de detalhes e prazos quando a rotina fica repetitiva.',
    development: [
      'Levar até o fim tarefas que perderam a novidade, sem depender só da motivação.',
      'Organizar compromissos e prazos com mais estrutura, mesmo sem gostar disso.',
      'Dar espaço de fala pra quem processa ideias em silêncio antes de opinar.',
    ],
  },
  S: {
    archetype: 'Apoiador',
    narrative:
      'Sua base é a constância: você é a pessoa que os outros procuram quando precisam de estabilidade, paciência e um ombro confiável. Prefere harmonia a confronto e termina o que começa, mas essa mesma discrição pode fazer suas próprias necessidades passarem despercebidas.',
    development: [
      'Comunicar preferências e limites de forma mais direta, sem esperar que os outros percebam sozinhos.',
      'Encarar mudanças rápidas como oportunidade, não só como risco.',
      'Aceitar que discordar abertamente às vezes evita desgaste maior depois.',
    ],
  },
  C: {
    archetype: 'Analista',
    narrative:
      'Você pensa antes de agir, confere antes de entregar e prefere fatos a impressões. Essa precisão te torna a pessoa que garante que os detalhes não vão falhar, mas o mesmo cuidado pode virar lentidão ou excesso de crítica quando o contexto pede decisões rápidas e imperfeitas.',
    development: [
      'Aceitar entregar algo "bom o suficiente" quando o prazo não permite perfeição.',
      'Expressar discordância técnica sem que soe como crítica pessoal.',
      'Se abrir mais pra decisões tomadas com dados incompletos.',
    ],
  },
};

// 12 combinações bifatoriais ordenadas (fator dominante + fator secundário).
// A chave é DOMINANTE + SECUNDÁRIO, ex.: "SD" = Estabilidade dominante,
// Dominância secundária.
const COMBINED_PROFILES = {
  DI: {
    archetype: 'Executor Envolvente',
    narrative:
      'Você une o foco em resultado com a facilidade de arrastar gente junto. Sua base é a Dominância (D), que te faz agir rápido e assumir o controle, e a Influência (I) secundária te dá o carisma pra convencer o time a seguir sem precisar impor. Você lidera pelo exemplo e pelo entusiasmo ao mesmo tempo.',
    development: [
      'Reservar tempo pra ouvir objeções antes de acelerar a execução.',
      'Cuidar pra que o entusiasmo não vire promessa maior do que o combinado.',
      'Reconhecer quando o time precisa de estrutura, não só de energia.',
    ],
  },
  DS: {
    archetype: 'Executor Constante',
    narrative:
      'Sua base é a Dominância (D) — decisões rápidas, foco em resultado, controle da situação. Mas a Estabilidade (S) secundária te dá paciência pra sustentar o que decidiu, em vez de abandonar o rumo na primeira dificuldade. Você é firme sem ser instável: decide rápido, mas segura o compromisso até o fim.',
    development: [
      'Dar mais espaço pra opiniões divergentes antes de fechar uma decisão.',
      'Notar quando a firmeza está sendo interpretada como inflexibilidade.',
      'Comunicar mudanças de rumo com antecedência, já que isso pesa mais pra quem valoriza rotina.',
    ],
  },
  DC: {
    archetype: 'Executor Criterioso',
    narrative:
      'Você decide rápido (Dominância, seu fator dominante) mas não no escuro — a Conformidade (C) secundária te leva a checar dados antes de agir. É uma combinação de ritmo acelerado com padrão técnico alto, o que te torna exigente tanto com velocidade quanto com qualidade.',
    development: [
      'Aceitar que nem toda decisão precisa do mesmo nível de checagem.',
      'Suavizar a cobrança por precisão quando o time está sob pressão de tempo.',
      'Delegar verificações de detalhe em vez de querer confirmar tudo pessoalmente.',
    ],
  },
  ID: {
    archetype: 'Comunicador Determinado',
    narrative:
      'Sua base é a Influência (I) — você conecta, motiva e contagia pelo entusiasmo. A Dominância (D) secundária te dá uma firmeza que aparece quando é preciso: você não é só simpático, também sabe cravar posição e empurrar decisões pra frente quando o grupo trava na indecisão.',
    development: [
      'Perceber quando a firmeza chega antes de terminar de ouvir o outro lado.',
      'Manter constância nos compromissos assumidos com entusiasmo no calor do momento.',
      'Dar espaço pra vozes mais quietas antes de impor o próprio ritmo.',
    ],
  },
  IS: {
    archetype: 'Comunicador Constante',
    narrative:
      'Você tem a Influência (I) como base — gosta de gente, de novidade, de contagiar o ambiente. A Estabilidade (S) secundária suaviza esse entusiasmo com paciência e lealdade: você não é só animado, também é alguém em quem as pessoas confiam para continuar por perto no dia a dia.',
    development: [
      'Levar tarefas repetitivas até o fim mesmo depois que a novidade passou.',
      'Expressar quando algo te incomoda, em vez de manter a harmonia calando a própria opinião.',
      'Organizar prazos e compromissos com mais estrutura.',
    ],
  },
  IC: {
    archetype: 'Comunicador Criterioso',
    narrative:
      'Sua base é a Influência (I): comunicação fácil, entusiasmo contagiante. Mas a Conformidade (C) secundária te dá um cuidado incomum com precisão — você não fala só pra empolgar, também se preocupa em estar certo. É uma mistura rara de carisma com rigor técnico.',
    development: [
      'Aceitar compartilhar uma ideia mesmo sem ter checado cada detalhe antes.',
      'Notar quando o perfeccionismo está atrasando uma comunicação que poderia ser mais simples.',
      'Equilibrar o desejo de agradar com a necessidade de dar feedbacks técnicos diretos.',
    ],
  },
  SD: {
    archetype: 'Apoiador Determinado',
    narrative:
      'Sua base é a Estabilidade (S), o que te torna confiável, paciente e constante. Mas a Dominância (D) secundária faz de você alguém que, uma vez decidido, não recua diante de pressão externa para proteger o time ou o projeto. Você é respeitado pelo equilíbrio, mas surpreende com firmeza quando um limite é cruzado.',
    development: [
      'Aceitar que o conflito produtivo pode ser necessário para a inovação.',
      'Comunicar suas necessidades de forma mais direta, sem esperar que os outros percebam seu esforço silencioso.',
      'Abrir-se para mudanças mais rápidas, entendendo que nem todo risco é uma ameaça à estabilidade.',
    ],
  },
  SI: {
    archetype: 'Apoiador Envolvente',
    narrative:
      'Você tem a Estabilidade (S) como base — é a pessoa confiável, paciente, que sustenta o grupo nos bastidores. A Influência (I) secundária traz um calor humano extra: você cuida das pessoas de forma próxima e acolhedora, não só funcional. É apoio com leveza.',
    development: [
      'Colocar as próprias necessidades na conversa, não só as dos outros.',
      'Dizer não sem se sentir culpado quando o pedido é desproporcional.',
      'Aceitar mudanças de rotina como parte natural do convívio em grupo, não como ameaça.',
    ],
  },
  SC: {
    archetype: 'Apoiador Criterioso',
    narrative:
      'Sua base é a Estabilidade (S) — constância, lealdade, paciência. A Conformidade (C) secundária adiciona rigor e cuidado com o processo: você não é só confiável, também é preciso. É a pessoa que sustenta o time com qualidade técnica e sem drama.',
    development: [
      'Expor discordâncias técnicas mesmo quando isso gera algum atrito.',
      'Aceitar decisões tomadas com informação incompleta quando o prazo aperta.',
      'Comunicar de forma mais direta quando um padrão de qualidade não está sendo respeitado.',
    ],
  },
  CD: {
    archetype: 'Analista Determinado',
    narrative:
      'Você pensa antes de agir — a Conformidade (C) é sua base, com atenção a dados e detalhes. Mas a Dominância (D) secundária te dá a coragem de agir com firmeza assim que a análise está pronta, em vez de ficar girando em torno da decisão. Você é criterioso, mas não indeciso.',
    development: [
      'Aceitar agir com informação parcial quando o tempo de análise não está disponível.',
      'Suavizar o tom ao apontar erros técnicos dos outros.',
      'Notar quando a firmeza está sendo recebida como rigidez pela equipe.',
    ],
  },
  CI: {
    archetype: 'Analista Envolvente',
    narrative:
      'Sua base é a Conformidade (C) — precisão, cautela, apego a dados. A Influência (I) secundária suaviza esse perfil técnico com comunicação mais aberta: você consegue explicar análises complexas de um jeito que engaja, em vez de só documentar.',
    development: [
      'Compartilhar uma ideia antes de tê-la totalmente validada, quando o contexto pede agilidade.',
      'Aceitar que nem toda conversa precisa terminar em conclusão fechada.',
      'Notar quando o desejo de ser preciso está competindo com o desejo de ser compreendido.',
    ],
  },
  CS: {
    archetype: 'Analista Constante',
    narrative:
      'Você tem a Conformidade (C) como base — atenção a detalhes, apego a processo, exigência técnica. A Estabilidade (S) secundária traz paciência e constância: você não muda de método por impulso, e entrega qualidade de forma sustentável ao longo do tempo, sem precisar de pressão externa.',
    development: [
      'Aceitar mudanças de método quando o contexto muda, mesmo sem tempo de validar tudo de novo.',
      'Expressar discordâncias antes que o silêncio vire desgaste acumulado.',
      'Buscar mais trocas com pessoas fora do próprio ritmo, para não travar decisões em cima de detalhes.',
    ],
  },
};
