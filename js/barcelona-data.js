/**
 * Barcelona-studietur — indholdsdata (barcelona.html)
 *
 * Alt indhold på siden ligger her, så tekster og billeder kan rettes uden
 * at røre js/barcelona.js eller HTML'en.
 *
 * STEDER  — nålene på kortet. x/y er placeringen på kortet i procent
 *           (0,0 = øverste venstre hjørne). kategori styrer farven:
 *             'forsta'  = faglige besøg   (salviegrøn)
 *             'forbind' = fællesskab      (terracotta)
 *             'forme'   = kunst & arkitektur (fersken)
 *           offMap: true = stedet ligger uden for kortet (vises i kanten).
 *           jump: '#id' = nålen hopper til en sektion i stedet for at åbne et postkort.
 *
 * FOTOSAFARI — karrusellen, i opgavens rækkefølge (punkt 1-9).
 *
 * Billeder/videoer ligger i img/barcelona/web/ (web-venlige kopier, maks.
 * 1600 px, uden GPS-data). Originalerne ligger ikke i sitet.
 */
window.BCN_STEDER = [
  {
    id: 'sagrada',
    navn: 'Sagrada Família',
    kategori: 'forme',
    dag: 'Man 23/3',
    adresse: 'Carrer de Mallorca 401 · Eixample',
    x: 41.1, y: 21.7,
    tekst: [
      'Alt ved kirkens design er gennemtænkt — fra strukturen til lyset. Det er ikke bare smukt, det er konstrueret til at føles sådan.',
      'I kælderen lå et museum med de modeller og processer, Gaudí arbejdede med. Det gjorde det hele endnu mere inspirerende.',
      'PS: Jeg prøvede at tage ét billede … men blev stående lidt for længe og bare kiggede op.'
    ],
    medier: [
      { type: 'img', src: 'img/barcelona/web/sagrada-dag.jpg', alt: 'Sagrada Família set nedefra i dagslys, med tårne og byggekraner mod en blå himmel' },
      { type: 'img', src: 'img/barcelona/web/sagrada-nat.jpg', alt: 'Sagrada Família om aftenen, facaden oplyst mod en mørk himmel' },
      { type: 'video', src: 'img/barcelona/web/sagrada.mp4', poster: 'img/barcelona/web/sagrada-poster.jpg', alt: 'Video inde i Sagrada Família: søjler som træstammer og farvet lys fra glasmosaikkerne' }
    ]
  },
  {
    id: 'ciutadella',
    navn: 'Parc de la Ciutadella',
    kategori: 'forme',
    dag: 'I løbet af ugen',
    adresse: 'Passeig de Picasso 21 · Ciutat Vella',
    x: 56.3, y: 54,
    tekst: [
      'En park med et springvand, der overgår de fleste — guldstatuer og de flotteste omgivelser.'
    ],
    medier: [
      { type: 'img', src: 'img/barcelona/web/parc-ciutadella.jpg', alt: 'Det store springvand i Parc de la Ciutadella med gyldne statuer og grønt vand' }
    ]
  },
  {
    id: 'hotel',
    navn: 'BCN Stop Parc Güell',
    kategori: 'forbind',
    dag: 'Søn–fre',
    adresse: 'Carrer de Bolívar 17 · Gràcia',
    x: 11.1, y: 7.3,
    tekst: [
      'Vores base for ugen. Den lå på en bakke, perfekt mellem to metrostationer — så man altid kunne gå ned ad bakken.'
    ],
    medier: [
      { type: 'img', src: 'img/barcelona/web/hotel-bcn-stop.jpg', alt: 'Udsigt fra hotellet over palmer og træer til etageejendomme i Gràcia' }
    ]
  },
  {
    id: 'ied',
    navn: 'IED — Istituto Europeo di Design',
    kort: 'IED Designskole',
    kategori: 'forsta',
    dag: 'Ons 25/3',
    adresse: 'Carrer de Sant Salvador 70 · Gràcia',
    x: 23.9, y: 16.0,
    tekst: [
      'Et besøg på en virkelig kreativ skole — Barcelonas designskole, hvor vi så alt fra tøjdesignere til 3D-print i værk.'
    ],
    medier: [
      { type: 'img', src: 'img/barcelona/web/ied.jpg', alt: 'En futuristisk motorcykel-model udstillet på et bord på IED, med en skærm i baggrunden' },
      { type: 'video', src: 'img/barcelona/web/ied.mp4', poster: 'img/barcelona/web/ied-poster.jpg', alt: 'Video fra rundvisningen på IED designskole' }
    ]
  },
  {
    id: 'firma',
    navn: 'Firma',
    kategori: 'forsta',
    dag: 'Ons 25/3',
    adresse: 'Carrer de Pujades 48 · Poblenou',
    link: { href: 'https://www.wearefirma.com/', tekst: 'wearefirma.com' },
    x: 63.6, y: 43.3,
    tekst: [
      'Virksomhedsbesøg hos Firma, et innovations- og brandingbureau i Poblenou — et kig ind i, hvordan et spansk bureau arbejder med brands.'
    ],
    medier: [
      { type: 'img', src: 'img/barcelona/web/firma.jpg', alt: 'Oplæg hos Firma: studerende ser en præsentation på to lærreder' }
    ]
  },
  {
    id: 'moco',
    navn: 'Moco Museum',
    kategori: 'forme',
    dag: 'Tors 26/3',
    adresse: 'Carrer de Montcada 25 · El Born',
    link: { href: 'https://www.mocomuseum.com/barcelona/', tekst: 'mocomuseum.com' },
    x: 49.2, y: 60,
    tekst: [
      'Moderne kunst med fokus på digitalt design — og Banksy. Jeg elsker Banksy.'
    ],
    medier: [
      { type: 'img', src: 'img/barcelona/web/moco-banksy-2.jpg', alt: 'Banksy-citat på en hvid væg: "A lot of parents will do anything for their kids, except let them be themselves", over et indrammet værk' },
      { type: 'img', src: 'img/barcelona/web/moco-banksy-1.jpg', alt: 'Banksy-værk og tekst på en hvid museumsvæg' },
      { type: 'video', src: 'img/barcelona/web/moco.mp4', poster: 'img/barcelona/web/moco-poster.jpg', alt: 'Video af en projiceret væg med tegnede mennesker, der går i en uendelig række' },
      { type: 'video', src: 'img/barcelona/web/moco-digital.mp4', poster: 'img/barcelona/web/moco-digital-poster.jpg', alt: 'Video af et digitalt kunstværk med en gylden bamse på en skærm' }
    ]
  },
  {
    id: 'xalet',
    navn: 'El Xalet de Montjuïc',
    kategori: 'forbind',
    dag: 'Tors 26/3',
    adresse: 'Avinguda Miramar 31 · Montjuïc',
    x: 34.2, y: 92.3,
    tekst: [
      'Fællesmiddag med stort set hele gruppen — på toppen af Barcelona, med en fantastisk udsigt over byen.',
      'Vi var fem fra de to online hold med, og det var første gang, online studerende deltog på turen. Det tog ikke lang tid, før det ikke gjorde nogen forskel.'
    ],
    medier: [
      { type: 'img', src: 'img/barcelona/web/el-xalet-udsigt.jpg', alt: 'Udsigt over Barcelona by night fra Montjuïc' },
      { type: 'img', src: 'img/barcelona/web/el-xalet.jpg', alt: 'Gruppen samlet ved et langt bord på restauranten, med byen og havet bag vinduerne' }
    ]
  },
  {
    id: 'gotisk',
    navn: 'Det gotiske kvarter',
    kort: 'Fotosafari',
    kategori: 'forme',
    dag: 'Man 23/3',
    adresse: 'Barri Gòtic · Ciutat Vella',
    x: 43.3, y: 62.5,
    jump: '#fotosafari',
    tekst: [
      'Første opgave på turen: en times fotosafari i det gotiske kvarter. Ni stop, i den rækkefølge vi tog dem.'
    ],
    medier: [
      { type: 'img', src: 'img/barcelona/web/fotosafari/05-catedral.jpg', alt: 'Barcelonas katedral' }
    ]
  },
  {
    id: 'tecnocampus',
    navn: 'TecnoCampus',
    kategori: 'forsta',
    dag: 'Tirs 24/3',
    adresse: 'Mataró · ca. 30 km nord for Barcelona',
    link: { href: 'https://www.tecnocampus.cat/en/', tekst: 'tecnocampus.cat' },
    offMap: true,
    x: 96, y: 4,
    tekst: [
      'Det catalanske svar på DTU — med egen TV-station, radiostudie og et stærkt samarbejde med lokalområdet omkring iværksætteri.',
      'Stranden lå bogstaveligt talt i baghaven. Mens resten af gruppen tog retur til Barcelona, gik jeg og en studiekammerat ned til vandet, nød solen, luften og havet og spiste frokost, inden vi tog tilbage.'
    ],
    medier: [
      { type: 'img', src: 'img/barcelona/web/tecnocampus-tv.jpg', alt: 'TV-kamera i TecnoCampus’ studie, med blåt lys og en skærm der viser optagelsen' },
      { type: 'img', src: 'img/barcelona/web/tecnocampus-radio.jpg', alt: 'Radiostudie med mikrofon, mixerpult og højttalere' },
      { type: 'video', src: 'img/barcelona/web/tecnocampus-strand.mp4', poster: 'img/barcelona/web/tecnocampus-strand-poster.jpg', alt: 'Video fra stranden ved TecnoCampus i Mataró: sand, bølger og en mole i horisonten' }
    ]
  }
];

window.BCN_FOTOSAFARI = [
  {
    nr: 1,
    navn: 'Plaça de Catalunya',
    tekst: 'Startpunktet. Byens store samlingsplads, hvor Eixample møder den gamle by — springvand, klassiske facader og et myldrende liv.',
    billeder: [{ src: 'img/barcelona/web/fotosafari/01-placa-de-catalunya.jpg', alt: 'Springvand og grønne bede på Plaça de Catalunya med en høj, klassisk bygning i baggrunden' }]
  },
  {
    nr: 2,
    navn: 'Els 4 Gats',
    tekst: 'Picassos stamcafé. Opgaven bad os holde øje med skilte og typografi — og her sidder navnet i en støbt plade fyldt med små symboler.',
    billeder: [{ src: 'img/barcelona/web/fotosafari/02-els-4-gats.jpg', alt: 'Støbt metalplade med mønstre og navnet "Els Quatre Gats"' }]
  },
  {
    nr: 3,
    navn: 'The World Comes to Life With Each Kiss',
    tekst: 'Et kæmpe kys, som på afstand ligner ét billede, men tæt på er en mosaik af tusindvis af små fotos.',
    billeder: [{ src: 'img/barcelona/web/fotosafari/03-kiss-mural.jpg', alt: 'Mosaik-væg der viser to læber, der kysser' }]
  },
  {
    nr: 4,
    navn: 'Barcino',
    tekst: 'Store bogstaver foran katedralen, der staver byens romerske navn — typografi som skulptur midt på pladsen.',
    billeder: [{ src: 'img/barcelona/web/fotosafari/04-barcino.jpg', alt: 'Store metalbogstaver på en brostensbelagt plads foran gamle stenmure' }]
  },
  {
    nr: 5,
    navn: 'Barcelonas katedral',
    tekst: 'Gotisk arkitektur i fuld højde — spir, detaljer og en plads fuld af mennesker.',
    billeder: [{ src: 'img/barcelona/web/fotosafari/05-catedral.jpg', alt: 'Barcelonas gotiske katedral med spir mod en klar blå himmel' }]
  },
  {
    nr: 6,
    navn: 'Temple d’August',
    tekst: 'Fire romerske søjler, gemt inde i en gård. Et af opgavens bonuspunkter i praksis: vær ikke bange for at gå ind.',
    billeder: [{ src: 'img/barcelona/web/fotosafari/06-temple-august.jpg', alt: 'Romerske søjler inde i en gård, omgivet af grønne mure' }]
  },
  {
    nr: 7,
    navn: 'Plaça de Sant Felip Neri',
    tekst: 'Mærkerne i murene er fra et bombardement under den spanske borgerkrig — pladen fortæller historien. Samme dag stod et brudepar og blev fotograferet på pladsen.',
    billeder: [
      { src: 'img/barcelona/web/fotosafari/07-sant-felip-neri-1.jpg', alt: 'Mindeplade i jorden om bombningen af Plaça de Sant Felip Neri' },
      { src: 'img/barcelona/web/fotosafari/07-sant-felip-neri-2.jpg', alt: 'Brudepar fotograferes på den brostensbelagte plads' }
    ]
  },
  {
    nr: 8,
    navn: 'Carrer del Bisbe',
    tekst: 'Blikket op under broen over gaden. Opgaven: find kraniet med dolken og gargoylerne.',
    billeder: [{ src: 'img/barcelona/web/fotosafari/08-carrer-del-bisbe.jpg', alt: 'Gotisk hvælving med stenribber set nedefra' }]
  },
  {
    nr: 9,
    navn: 'Monument als Castellers',
    tekst: 'En hyldest til de catalanske menneskelige tårne — et spinkelt tårn af stål, der strækker sig mod himlen.',
    billeder: [{ src: 'img/barcelona/web/fotosafari/09-castellers.jpg', alt: 'Skulptur af stål, der strækker sig op mod solen og en blå himmel' }]
  }
];
