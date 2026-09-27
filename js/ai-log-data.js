/**
 * AI log — indholdsdata
 *
 * Kilde: "AI log.xlsx" (Heidis eget, løbende opdaterede excel-ark).
 * For at synkronisere: bed Claude læse den nyeste "AI log.xlsx" i projektet
 * og opdatere dette array til at matche — resten af siden (ai-log.html +
 * js/ai-log.js) behøver ikke røres.
 *
 * tool: 'claude' dækker Claude Design / Claude Code / Claude Cowork,
 *       'chatgpt' dækker ChatGPT — bruges til filterknapperne og prikfarven.
 */
window.AI_LOG_DATA = [
  {
    dato: '2026-09-09',
    ai: 'Claude Design',
    tool: 'claude',
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
    tool: 'claude',
    formaal: 'Vibe-code et forslag til portefølge',
    prompt: 'fra ChatGPT',
    output: '3 forskellige variationer af en mulig portefølje site',
    bearbejdning: 'kombination af to af variationerne til udkast'
  },
  {
    dato: '2026-09-14',
    ai: 'Claude Code',
    tool: 'claude',
    formaal: 'Se koden bag Design forslag',
    prompt: 'Udkast fra Claude Design',
    output: 'filer til VSC',
    bearbejdning: 'forsøgt rettet, men slettet pga dårlig resultat og svær afkodning'
  },
  {
    dato: '2026-09-15',
    ai: 'ChatGPT',
    tool: 'chatgpt',
    formaal: 'Forslag til portefølge retninger',
    prompt: 'opsummer det den ved om mig allerede, holdt op mod et bruge informationerne til portefølje',
    output: 'lang smøre om forskellige detaljer der alle sammen er vigtige pointer',
    bearbejdning: 'taget udklip af samtalen og givet til Claude'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude',
    formaal: 'Ideudvikling og brainstorming',
    prompt: 'egne tanker, "kommer snart", elementer fra Design forslag, ChatGPT input (med opfordring af brug den kritiske sans)',
    output: 'kombination af ideerne fra ChatGPT, mig selv og Claude',
    bearbejdning: 'svaret på opklarende spørgsmål'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude',
    formaal: 'Projektledelse - holde styr på tjeklisten og opgaverne undervejs',
    prompt: 'Projektbeskrivelse, plan og formål',
    output: 'styringsdokument.md der løbende bliver opdateret',
    bearbejdning: 'tilføjelser og svar på spørgsmål'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude',
    formaal: 'Designe min personlige stil & identitet',
    prompt: 'CV, læringsmål',
    output: 'Mockups af forskellige sider',
    bearbejdning: 'Tilpasning undervejs'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude',
    formaal: 'Case Study Webtilgængelighed/AI Anton',
    prompt: 'Figma filer, kodefiler, aflevering, egne refleksioner',
    output: 'Design forslag i Figma Design',
    bearbejdning: 'Tilføjelser af billeder, egne reflektioner og overvejelser'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude',
    formaal: 'Case Study CyberSikker',
    prompt: 'Figma filer, kodefiler, aflevering, egne refleksioner',
    output: 'Klargjort til at arbejde med som case study',
    bearbejdning: 'ingen - afventer case study AI anton færdiggøres'
  },
  {
    dato: '2026-09-15',
    ai: 'Claude Cowork',
    tool: 'claude',
    formaal: 'Overblik over paper indhold',
    prompt: 'henvisning til styringsdokument og projektbeskrivelse',
    output: 'tjekliste.md og paper-indhold.md, dokumenter der løbende opdateres',
    bearbejdning: 'Ingen - afventer opgavens progression'
  }
];
