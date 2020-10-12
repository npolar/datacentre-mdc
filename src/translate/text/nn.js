import { nn as country } from "../../../vocab/country.js";
import { nn as terrain } from "../../../vocab/terrain.js";

export default {
  app: {
    name: "Stadnamn i norske polarområde",
    heading: "Stadnamn",
    welcome: {
      area: {
        undefined: "Norske polare stadnamn",
        Svalbard: "Stadnamn på Svalbard"
      }
    }
  },
  any: {
    Edit: "Skriv",
    New: "Legg til",
    rel: "kobla til"
  },
  case: {
    case: "sak",
    sak: "sak",
    Case: "Sak",
    Cases: "Saker",
    New: "Ny sak",
    Committee: "Stadnamnkomitéen",
    search: { placeholder: "Søk i protokollane til stadnamnkomitéen" }
  },
  country,
  https: {
    npolar: {
      no: "https://npolar.no"
    }
  },
  lang: {
    Language: "Språk",
    en: "English",
    nn: "Norsk (nynorsk)"
  },
  "local-edits": {
    Commit: "Lagre",
    "Uncommited-changes": "Lokale endringar"
  },
  name: {
    new: {
      input: {
        label: "Nytt namn",
        placeholder: "Nytt namn"
      },
      suggest: {
        text:
          "Alle kan sende inn forslag til stadnamn. Namna skal ha nynorsk målform og bør vere høvelege, stutte og velklingande. Hugs å ha med med informasjon om kva namnet tyder og nøyaktig plassering.",
        details:
          "Forslag handsamast av stadnamnkomitéen, som er offisiell forvaltar av stadnamn i dei norske polarområda.",
        href:
          "https://www.npolar.no/nyhet/sjekk-lista-over-nye-stadnamn-pa-svalbard/",
        hreftext: "Meir informasjon",
        hreflang: "nn",
        action: "Foreslå stadnamn"
      }
    },
    Facts: "Fakta",
    Name: "Name",
    history: {
      Headline: "400 år med namn",
      "Caption-prefix": "Interaktiv graf over namngjevingar per"
    },
    definition: "definisjon",
    origin: "opphav",
    note: "merk",
    Area: "Område",
    Definition: "Definisjon",
    Definitions: "Definisjonar",
    Origin: "Opphav",
    New: "Nytt stadnamn",
    Note: "Merk",
    Now: "No",
    "Not-unique": "Dette namnet finst frå før",
    "Replaced-by": "Nytt namn",
    Name: "Namn",
    Placename: "Stadnamn",
    Placenames: "Stadnamn",
    Proposer: "Foreslått av",
    Replaces: "Tidlegare namn",
    "Same-as": "Same namn",
    Suggestion: "Forslag"
  },
  status: {
    suggestion: "forslag",
    official: "offisielt",
    historical: "historisk",
    standardised: "standardisert",
    switch: "Offisielle"
  },
  patch: {
    op: "handling",
    value: "verdi",
    path: "sti",
    from: "frå",
    add: "legg til",
    replace: "bytt",
    move: "flytt",
    extra: {
      when: "endra"
    }
  },
  period: {
    decade: "tiår",
    year: "år"
  },
  ref: {
    New: "Ny refereanse",
    References: "Referansar",
    search: { placeholder: "Søk i referansar" }
  },
  search: {
    Search: "Search",
    Filter: "Filter",
    "Filter-close": "Filter",
    input: {
      placeholder: "Søk"
    }
  },
  sort: {
    by: {
      relevance: "Høgast relevans",
      "-updated": "Sist oppdatert",
      "-created": "Nyaste stadnamn",
      created: "Først oppretta",
      name: "Alfabetisk",
      "properties.label,name.@value": "Alfabetisk",
      "-name": "Omvendt alfabetisk"
    }
  },
  "sign-in": {
    "Sign in": "Sign in"
  },
  text: {
    "missing-nn": "Nynorsk manglar",
    "missing-en": "Engelsk manglar"
  },
  terrain,
  "used-since": "frå",
  vocab: {
    area: "område",
    country: "nasjon"
  },
  opensearch: {
    totalResults: "treff"
  }
};
