import mongoose from 'mongoose';

const Schema = mongoose.Schema;

type IEventType =
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

export type IEvent = {
  id: string;
  datetime: Date;
  name: string;
  summary: string;
  url: string;
  type: IEventType;
  location: {
    name: string;
    gps: string;
  };
};

export type EventDocument = mongoose.Document & IEvent & { remoteId: string };

const EventSchema = new Schema<EventDocument>({
  id: String,
  remoteId: String,
  datetime: Date,
  name: String,
  summary: String,
  url: String,
  type: String,
  location: {
    name: String,
    gps: String
  }
});

export default mongoose.model<EventDocument>('event', EventSchema);
