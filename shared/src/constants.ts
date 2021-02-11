export type IEventType =
  | 'Alkohollagen'
  | 'Anträffad död'
  | 'Anträffat gods'
  | 'Arbetsplatsolycka'
  | 'Bedrägeri'
  | 'Bombhot'
  | 'Brand'
  | 'Brand automatlarm'
  | 'Bråk'
  | 'Detonation'
  | 'Djur skadat/omhändertaget'
  | 'Ekobrott'
  | 'Farligt föremål, misstänkt'
  | 'Fjällräddning'
  | 'Fylleri/LOB'
  | 'Förfalskningsbrott'
  | 'Försvunnen person'
  | 'Gränskontroll'
  | 'HäleriInbrott'
  | 'Inbrott, försök'
  | 'Knivlagen'
  | 'Kontroll person/fordon'
  | 'Lagen om hundar och katter'
  | 'Larm Inbrott'
  | 'Larm Överfall'
  | 'Miljöbrott'
  | 'Missbruk av urkund'
  | 'Misshandel'
  | 'Misshandel, grov'
  | 'Mord/dråp'
  | 'Mord/dråp, försök'
  | 'Motorfordon, anträffat stulet'
  | 'Motorfordon, stöld'
  | 'Narkotikabrott'
  | 'Naturkatastrof'
  | 'Ofog barn/ungdom'
  | 'Ofredande/förargelse'
  | 'Olaga frihetsberövande'
  | 'Olaga hot'
  | 'Olaga intrång/hemfridsbrott'
  | 'Olovlig körning'
  | 'Ordningslagen'
  | 'Polisinsats/kommendering'
  | 'Rattfylleri'
  | 'Rån'
  | 'Rån väpnat'
  | 'Rån övrigt'
  | 'Rån, försök'
  | 'Räddningsinsats'
  | 'Sammanfattning dag'
  | 'Sammanfattning dygn'
  | 'Sammanfattning eftermiddag'
  | 'Sammanfattning förmiddag'
  | 'Sammanfattning helg'
  | 'Sammanfattning kväll'
  | 'Sammanfattning kväll och natt'
  | 'Sammanfattning natt'
  | 'Sammanfattning vecka'
  | 'Sedlighetsbrott'
  | 'Sjukdom/olycksfall'
  | 'Sjölagen'
  | 'Skadegörelse'
  | 'Skottlossning'
  | 'Skottlossning, misstänkt'
  | 'Spridning smittsamma kemikalier'
  | 'Stöld'
  | 'Stöld, försök'
  | 'Stöld, ringa'
  | 'Stöld/inbrott'
  | 'Tillfälligt obemannat'
  | 'Trafikbrott'
  | 'Trafikhinder'
  | 'Trafikkontroll'
  | 'Trafikolycka'
  | 'Trafikolycka, personskada'
  | 'Trafikolycka, singel'
  | 'Trafikolycka, smitning från'
  | 'Trafikolycka, vilt'
  | 'Uppdatering'
  | 'Utlänningslagen'
  | 'Vapenlagen'
  | 'Varningslarm/haveri'
  | 'Våld/hot mot tjänsteman'
  | 'Våldtäkt'
  | 'Våldtäkt, försök'
  | 'Vållande till kroppsskada';

const eventTypes: IEventType[] = [
  'Alkohollagen',
  'Anträffad död',
  'Anträffat gods',
  'Arbetsplatsolycka',
  'Bedrägeri',
  'Bombhot',
  'Brand',
  'Brand automatlarm',
  'Bråk',
  'Detonation',
  'Djur skadat/omhändertaget',
  'Ekobrott',
  'Farligt föremål, misstänkt',
  'Fjällräddning',
  'Fylleri/LOB',
  'Förfalskningsbrott',
  'Försvunnen person',
  'Gränskontroll',
  'HäleriInbrott',
  'Inbrott, försök',
  'Knivlagen',
  'Kontroll person/fordon',
  'Lagen om hundar och katter',
  'Larm Inbrott',
  'Larm Överfall',
  'Miljöbrott',
  'Missbruk av urkund',
  'Misshandel',
  'Misshandel, grov',
  'Mord/dråp',
  'Mord/dråp, försök',
  'Motorfordon, anträffat stulet',
  'Motorfordon, stöld',
  'Narkotikabrott',
  'Naturkatastrof',
  'Ofog barn/ungdom',
  'Ofredande/förargelse',
  'Olaga frihetsberövande',
  'Olaga hot',
  'Olaga intrång/hemfridsbrott',
  'Olovlig körning',
  'Ordningslagen',
  'Polisinsats/kommendering',
  'Rattfylleri',
  'Rån',
  'Rån väpnat',
  'Rån övrigt',
  'Rån, försök',
  'Räddningsinsats',
  'Sammanfattning dag',
  'Sammanfattning dygn',
  'Sammanfattning eftermiddag',
  'Sammanfattning förmiddag',
  'Sammanfattning helg',
  'Sammanfattning kväll',
  'Sammanfattning kväll och natt',
  'Sammanfattning natt',
  'Sammanfattning vecka',
  'Sedlighetsbrott',
  'Sjukdom/olycksfall',
  'Sjölagen',
  'Skadegörelse',
  'Skottlossning',
  'Skottlossning, misstänkt',
  'Spridning smittsamma kemikalier',
  'Stöld',
  'Stöld, försök',
  'Stöld, ringa',
  'Stöld/inbrott',
  'Tillfälligt obemannat',
  'Trafikbrott',
  'Trafikhinder',
  'Trafikkontroll',
  'Trafikolycka',
  'Trafikolycka, personskada',
  'Trafikolycka, singel',
  'Trafikolycka, smitning från',
  'Trafikolycka, vilt',
  'Uppdatering',
  'Utlänningslagen',
  'Vapenlagen',
  'Varningslarm/haveri',
  'Våld/hot mot tjänsteman',
  'Våldtäkt',
  'Våldtäkt, försök',
  'Vållande till kroppsskada'
];

export default {
  eventTypes
};
