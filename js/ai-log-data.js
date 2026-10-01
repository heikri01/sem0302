/**
 * AI log — indholdsdata
 *
 * Kilde: "AI log.xlsx" (Heidis eget, løbende opdaterede excel-ark).
 * Siden læser IKKE excel-arket direkte — den læser dette array.
 * For at synkronisere: bed Claude læse den nyeste "AI log.xlsx" og opdatere
 * dette array til at matche. Resten af siden (ai-log.html + js/ai-log.js)
 * behøver ikke røres.
 *
 * tool: 'claude-design' | 'claude-code' | 'claude-cowork' | 'chatgpt' | 'gemini'
 *       bruges til filterknapperne og prikfarven. Kommer der et nyt værktøj
 *       til, skal det have en filterknap i ai-log.html og en prik
 *       (.ai-log-dot-<tool>) i css/style.css.
 *
 * Senest synkroniseret: 1/10 2026 (34 poster).
 */
window.AI_LOG_DATA = [
  {
    dato: '2026-09-04',
    ai: 'ChatGPT',
    tool: 'chatgpt',
    formaal: 'Sparring om fremtidspersona',
    prompt: 'Opgave fra undervisning samt eget udkast og projektbeskrivelse',
    output: 'Uddybende spørgsmål samt nyt udkast',
    bearbejdning: 'Svaret på spørgsmål, gennemgang af udkast, let tilrettelse'
  },
  {
    dato: '2026-09-09',
    ai: 'Claude Design',
    tool: 'claude-design',
    formaal: 'Vibe-code en "kommer snart" index fil',
    prompt: 'we are going to create a digital portfolio using Figma Design for the design decisions and VSC for the final version',
    output: 'forslag til side',
    bearbejdning: 'Bad Claude stille uddybende spørgsmål undervejs og ellers let tilpasning'
  },
  {
    dato: '2026-09-14',
    ai: 'ChatGPT',
    tool: 'chatgpt',
    formaal: 'Prompt til Claude Design',
    prompt: 'Opsummer viden om mig og mine projekter + fremtidspersona',
    output: 'forslag til prompt',
    bearbejdning: 'tilrettet lidt'
  },
  {
    dato: '2026-09-14',
    ai: 'Claude Design',
    tool: 'claude-design',
    formaal: 'Vibe-code et forslag til portefølge',
    prompt: 'fra ChatGPT',
    output: '3 forskellige variationer af en mulig portefølje site',
    bearbejdning: 'kombination af to af variationerne til udkast'
  },
  {
    dato: '2026-09-14',
    ai: 'Claude Code',
    tool: 'claude-code',
    formaal: 'Se koden bag Design forslag',
    prompt: 'Udkast fra Claude Design',
    output: 'Filer til VSC',
    bearbejdning: 'Forsøgt rettet, men slettet pga dårlig resultat og svær afkodning'
  },
  {
    dato: '2026-09-15',
    ai: 'ChatGPT',
    tool: 'chatgpt',
    formaal: 'Forslag til portefølge retninger',
    prompt: 'Opsummer det den ved om mig allerede, holdt op mod et bruge informationerne til portefølje',
    output: 'Lang smøre om forskellige detaljer der alle sammen er vigtige pointer',
    bearbejdning: 'Taget udklip af samtalen og givet til Claude'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Ideudvikling og brainstorming',
    prompt: 'Egne tanker, "kommer snart", elementer fra Design forslag, ChatGPT input (med opfordring af brug den kritiske sans)',
    output: 'Kombination af ideerne fra ChatGPT, mig selv og Claude',
    bearbejdning: 'Svaret på opklarende spørgsmål'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Projektledelse - holde styr på tjeklisten og opgaverne undervejs',
    prompt: 'Projektbeskrivelse, plan og formål',
    output: 'styringsdokument.md der løbende bliver opdateret',
    bearbejdning: 'Tilføjelser og svar på spørgsmål'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Designe min personlige stil & identitet',
    prompt: 'CV, læringsmål',
    output: 'Mockups af forskellige sider',
    bearbejdning: 'Tilpasning undervejs'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Case Study Webtilgængelighed/AI Anton overblik',
    prompt: 'Figma filer, kodefiler, aflevering, egne refleksioner',
    output: 'Design forslag i Figma Design',
    bearbejdning: 'Tilføjelser af billeder, egne reflektioner og overvejelser'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Case Study CyberSikker overblik',
    prompt: 'Figma filer, kodefiler, aflevering, egne refleksioner',
    output: 'Klargjort til at arbejde med som case study',
    bearbejdning: 'Ingen - afventer case study AI anton færdiggøres'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Overblik over paper indhold',
    prompt: 'Henvisning til styringsdokument og projektbeskrivelse',
    output: 'tjekliste.md og paper-indhold.md, dokumenter der løbende opdateres',
    bearbejdning: 'Ingen - afventer opgavens progression'
  },
  {
    dato: '2026-09-22',
    ai: 'Claude Code',
    tool: 'claude-code',
    formaal: 'Case Study Webtilgængelighed kodes i VSC',
    prompt: 'Case Study færdig i Figma, nu skal det kodes i VSC',
    output: 'Kode i branch lavet til formålet',
    bearbejdning: 'Kvalitetstjek, gennemgang og merching af branch'
  },
  {
    dato: '2026-09-22',
    ai: 'ChatGPT',
    tool: 'chatgpt',
    formaal: 'Inspiration til de små "skatte"',
    prompt: 'Forklare ideen, udkast til egne forslag',
    output: 'Liste med forslag inkl begrundelser',
    bearbejdning: 'Tilrettet'
  },
  {
    dato: '2026-09-24',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Case Study CyberSikker opsætning i Figma',
    prompt: 'Baseret på case study webtilgængelighed, opsættes i Figma',
    output: 'Forslag til opsætning i Figma Design',
    bearbejdning: 'Tilføjelser af billeder, egne reflektioner og overvejelser'
  },
  {
    dato: '2026-09-27',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Prompt til Claude Code',
    prompt: 'Tjek styringsdokument, opsæt en prompt til Claude Code',
    output: 'Prompt + indhold',
    bearbejdning: 'Kvalitetstjek og gennemgang af prompt'
  },
  {
    dato: '2026-09-27',
    ai: 'Claude Code',
    tool: 'claude-code',
    formaal: 'Kodning af CyberSikker Case Study',
    prompt: 'Fra Claude Cowork, lagt ind som .md fil i VSC',
    output: 'Kode i branch lavet til formålet',
    bearbejdning: 'Kvalitetstjek, gennemgang og merching af branch'
  },
  {
    dato: '2026-09-27',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Skattejagt på plads',
    prompt: 'Liste med skatte + beskrivelse af js-ide',
    output: 'js kode + skatte indsat som js.',
    bearbejdning: 'Tilføjet ekstra skatte til listen'
  },
  {
    dato: '2026-09-27',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Opdateret styringsdokument',
    prompt: 'Tilføjet ideer og punkter på listen',
    output: 'Detaljeret oversigt',
    bearbejdning: 'læst igennem og opdateret'
  },
  {
    dato: '2026-09-28',
    ai: 'ChatGPT',
    tool: 'chatgpt',
    formaal: 'Brainstorming omkring design-elementer til brug på CV & portefølje',
    prompt: 'Mit CV, screenshots af nuværende portefølje + ide',
    output: 'Lang liste med forslag',
    bearbejdning: 'Tjekket, overvejet, udviklet videre på'
  },
  {
    dato: '2026-09-28',
    ai: 'Claude Code',
    tool: 'claude-code',
    formaal: 'Præsentation af studietur som kort & interaktive postkort',
    prompt: 'Beskrivelse af ideer, tilføjelse af billeder i VSC samt detaljerede beskrivelser af programmet',
    output: 'Stiliseret kort over barcelona, men pins på lokationer hvor hover effekt viser billeder som postkort',
    bearbejdning: 'Kvalitetstjek og gennemgang af detaljer'
  },
  {
    dato: '2026-09-28',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Oprettet Design System i Claude CoWork for at se hvordan det fungerer',
    prompt: 'Links til Figma og til VSC mapper',
    output: 'Komplet Design System',
    bearbejdning: 'Gennemlæst og kvalitetssikret, godkendt til Claude Code kan benytte dette'
  },
  {
    dato: '2026-09-28',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Rettelser af småting fundet undervejs i arbejdet',
    prompt: 'Liste med ting, der skal rettes, oprettet branch til formålet',
    output: 'Forslag og opklarende spørgsmål, kodet',
    bearbejdning: 'Gennemgang, branch commitet og merged'
  },
  {
    dato: '2026-09-29',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Opdatere forsidens design',
    prompt: 'Konkrete ændringer og ideer',
    output: 'Kodet af et par omgange',
    bearbejdning: 'Rettelser, gennemgang og kvalitetssikring'
  },
  {
    dato: '2026-09-29',
    ai: 'Claude Design',
    tool: 'claude-design',
    formaal: 'Lave nyt CV i Canva',
    prompt: 'Mockup fra ChatGPT samt korrektioner',
    output: 'Prompt til Canva',
    bearbejdning: 'Mange fejl og mærkelige detaljer rettet op og fikset'
  },
  {
    dato: '2026-09-29',
    ai: 'Claude Code',
    tool: 'claude-code',
    formaal: 'Opsætning af om-mig siden',
    prompt: 'Beskrivelse + de to CV (kontor og MMD)',
    output: 'Liste med uddybende spørgsmål, samt forslag til opsætning og formulering',
    bearbejdning: 'Tilrettet detaljer'
  },
  {
    dato: '2026-09-30',
    ai: 'ChatGPT',
    tool: 'chatgpt',
    formaal: 'At forstå koden bedre',
    prompt: 'index.html, style.css & main.js',
    output: 'Test, gennemgang og uddybende forklaringer',
    bearbejdning: 'Stille spørgsmål, udføre test og undersøge nærmere'
  },
  {
    dato: '2026-09-30',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Opsætning af en "kommer snart" side til mikromod.dk',
    prompt: 'Forklare ideen bag',
    output: 'Forslag til design, kodet i VSC, opsætning af kontaktformular',
    bearbejdning: 'Ændret farver, tilføjet HubSpot detaljer, rettet i farver og font'
  },
  {
    dato: '2026-09-30',
    ai: 'Claude Code',
    tool: 'claude-code',
    formaal: 'Finpudsning af navigation, header og design',
    prompt: 'Liste med ændringer og ideer, screenshots',
    output: 'Sticky header, tilbage til toppen, smårettelser i design',
    bearbejdning: 'Tilpasning undervejs'
  },
  {
    dato: '2026-09-30',
    ai: 'Gemini',
    tool: 'gemini',
    formaal: 'Forslag til design ændringer',
    prompt: 'Screenshot af mikromod og forklaring på hvad der skal udtrykkes',
    output: 'Liste med ny farvepalette samt forslag til opsætning af case study navigation',
    bearbejdning: 'Tilrettet egne ønsker, rettet farver i VSC og fejlrettelser'
  },
  {
    dato: '2026-09-30',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'WCAG tjek',
    prompt: 'Tjek siden mod WCAG særlige punkter omkring knapper på lys baggrund',
    output: 'Knapper rettet til, "spring til indhold"',
    bearbejdning: 'Gennemgang, branch commitet og merged'
  },
  {
    dato: '2026-10-01',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Afslut, tjek og kvalitetssikre',
    prompt: 'Uformel brugertest, brugervenlighed',
    output: 'Hover på billeder, tilføjet billeder til "rejsen"',
    bearbejdning: 'Små rettelser, tjek af funktionalitet og merge branch'
  },
  {
    dato: '2026-10-01',
    ai: 'Claude Cowork',
    tool: 'claude-cowork',
    formaal: 'Opsamling på paperdokument samlet undervejs',
    prompt: 'Tjek for dubletter, sorter og ryd op',
    output: 'Overskueligt opsamling af ideer, beslutninger, planer og pointer',
    bearbejdning: 'Gennemlæst og sammenskrevet til paper'
  },
  {
    dato: '2026-10-01',
    ai: 'ChatGPT',
    tool: 'chatgpt',
    formaal: 'Få paper færdig',
    prompt: 'Opsamlingsdokument, projektbeskrivelse, eget udkast',
    output: 'Revideret udkast',
    bearbejdning: 'Læst igennem og opdateret'
  }
];
