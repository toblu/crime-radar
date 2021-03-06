export type IEventType =
    | 'Alkohollagen'
    | 'Anträffad död'
    | 'Anträffat gods'
    | 'Arbetsplatsolycka'
    | 'Bedrägeri'
    | 'Bombhot'
    | 'Bråk'
    | 'Brand automatlarm'
    | 'Brand'
    | 'Detonation'
    | 'Djur skadat/omhändertaget'
    | 'Djur'
    | 'Efterlyst person'
    | 'Ekobrott'
    | 'Farligt föremål, misstänkt'
    | 'Fjällräddning'
    | 'Fylleri/LOB'
    | 'Förfalskningsbrott'
    | 'Försvunnen person'
    | 'Gränskontroll'
    | 'Hemfridsbrott'
    | 'Häleri'
    | 'HäleriInbrott'
    | 'Inbrott, försök'
    | 'Inbrott'
    | 'Knivlagen'
    | 'Kontroll person/fordon'
    | 'Lagen om hundar och katter'
    | 'Larm Inbrott'
    | 'Larm Överfall'
    | 'Miljöbrott'
    | 'Missbruk av urkund'
    | 'Misshandel, grov'
    | 'Misshandel'
    | 'Mord/dråp, försök'
    | 'Mord/dråp'
    | 'Motorfordon, anträffat stulet'
    | 'Motorfordon, stöld'
    | 'Narkotikabrott'
    | 'Naturkatastrof'
    | 'Ofog barn/ungdom'
    | 'Ofredande/förargelse'
    | 'Olaga frihetsberövande'
    | 'Olaga frihetsberövande/människorov'
    | 'Olaga hot'
    | 'Olaga intrång'
    | 'Olaga intrång/hemfridsbrott'
    | 'Olovlig körning'
    | 'Ordningslagen'
    | 'Polisinsats/kommendering'
    | 'Rattfylleri'
    | 'Rån övrigt'
    | 'Rån väpnat'
    | 'Rån, försök'
    | 'Rån'
    | 'Räddningsinsats'
    | 'Sabotage mot blåljusverksamhet'
    | 'Sammanfattning dag'
    | 'Sammanfattning dygn'
    | 'Sammanfattning eftermiddag'
    | 'Sammanfattning förmiddag'
    | 'Sammanfattning helg'
    | 'Sammanfattning kväll och natt'
    | 'Sammanfattning kväll'
    | 'Sammanfattning natt'
    | 'Sammanfattning vecka'
    | 'Sedlighetsbrott'
    | 'Sjukdom/olycksfall'
    | 'Sjölagen'
    | 'Skadegörelse'
    | 'Skottlossning, misstänkt'
    | 'Skottlossning'
    | 'Skyddslagen'
    | 'Spridning smittsamma kemikalier'
    | 'Stöld, försök'
    | 'Stöld, ringa'
    | 'Stöld'
    | 'Stöld/inbrott'
    | 'Tillfälligt obemannat'
    | 'Trafikbrott'
    | 'Trafikhinder'
    | 'Trafikkontroll'
    | 'Trafikolycka, personskada'
    | 'Trafikolycka, singel'
    | 'Trafikolycka, smitning från'
    | 'Trafikolycka, vilt'
    | 'Trafikolycka'
    | 'Uppdatering'
    | 'Utlänningslagen'
    | 'Vapenlagen'
    | 'Varningslarm/haveri'
    | 'Våld/hot mot tjänsteman'
    | 'Våldtäkt, försök'
    | 'Våldtäkt'
    | 'Vållande till kroppsskada'
    | 'Åldringsbrott'
    | 'Övrigt';

const eventTypes: IEventType[] = [
    'Alkohollagen',
    'Anträffad död',
    'Anträffat gods',
    'Arbetsplatsolycka',
    'Bedrägeri',
    'Bombhot',
    'Bråk',
    'Brand automatlarm',
    'Brand',
    'Detonation',
    'Djur skadat/omhändertaget',
    'Djur',
    'Efterlyst person',
    'Ekobrott',
    'Farligt föremål, misstänkt',
    'Fjällräddning',
    'Fylleri/LOB',
    'Förfalskningsbrott',
    'Försvunnen person',
    'Gränskontroll',
    'Hemfridsbrott',
    'Häleri',
    'HäleriInbrott',
    'Inbrott, försök',
    'Inbrott',
    'Knivlagen',
    'Kontroll person/fordon',
    'Lagen om hundar och katter',
    'Larm Inbrott',
    'Larm Överfall',
    'Miljöbrott',
    'Missbruk av urkund',
    'Misshandel, grov',
    'Misshandel',
    'Mord/dråp, försök',
    'Mord/dråp',
    'Motorfordon, anträffat stulet',
    'Motorfordon, stöld',
    'Narkotikabrott',
    'Naturkatastrof',
    'Ofog barn/ungdom',
    'Ofredande/förargelse',
    'Olaga frihetsberövande',
    'Olaga frihetsberövande/människorov',
    'Olaga hot',
    'Olaga intrång',
    'Olaga intrång/hemfridsbrott',
    'Olovlig körning',
    'Ordningslagen',
    'Polisinsats/kommendering',
    'Rattfylleri',
    'Rån övrigt',
    'Rån väpnat',
    'Rån, försök',
    'Rån',
    'Räddningsinsats',
    'Sabotage mot blåljusverksamhet',
    'Sammanfattning dag',
    'Sammanfattning dygn',
    'Sammanfattning eftermiddag',
    'Sammanfattning förmiddag',
    'Sammanfattning helg',
    'Sammanfattning kväll och natt',
    'Sammanfattning kväll',
    'Sammanfattning natt',
    'Sammanfattning vecka',
    'Sedlighetsbrott',
    'Sjukdom/olycksfall',
    'Sjölagen',
    'Skadegörelse',
    'Skottlossning, misstänkt',
    'Skottlossning',
    'Skyddslagen',
    'Spridning smittsamma kemikalier',
    'Stöld, försök',
    'Stöld, ringa',
    'Stöld',
    'Stöld/inbrott',
    'Tillfälligt obemannat',
    'Trafikbrott',
    'Trafikhinder',
    'Trafikkontroll',
    'Trafikolycka, personskada',
    'Trafikolycka, singel',
    'Trafikolycka, smitning från',
    'Trafikolycka, vilt',
    'Trafikolycka',
    'Uppdatering',
    'Utlänningslagen',
    'Vapenlagen',
    'Varningslarm/haveri',
    'Våld/hot mot tjänsteman',
    'Våldtäkt, försök',
    'Våldtäkt',
    'Vållande till kroppsskada',
    'Åldringsbrott',
    'Övrigt'
];

export default {
    eventTypes
};
