
import { PrizeCSVRow, parseCSVData } from './csvParser';

export interface Prize {
  id: number | string;
  description: string;
  value: string;
  sponsorName?: string;
  ticketNumber?: string;
}

export interface LotteryTicket {
  ticketNumber: string;
  prizeId: number | string;
}

// Initial sample CSV data (wird später durch echte CSV-Datei ersetzt)
const sampleCSVData = `Lfd.Nr.;Gewinn Losnummer;Sponsor Anrede;Sponsor Name;Sponsor Strasse;Sponsor PLZ und Ort;e-mail; Bar Spende ? ;reine Sachspende;Gewinn;Wert Spende ?;akquisiert durch wen;Lagerort Gewinn;Erfasst von:;Gewinner Anrede;Gewinner Name;Gewinner Strasse;Gewinner PLZ und Ort;ausgeliefert am;ausgeh?ndigt von;Sponsorenquittung 
1;3230;Althoff;Grandhotel Schloss Bensberg;Kadettenstrasse;51429 Bergisch Gladach;info@schlossbensberg.com;;;Gutschein Day Spa;79,00;Manuela Rex-Eberle;wird pers?nlich ?bergeben ;Manuela;;;;;;;
2;6730;Frau;Susanne Herbers Herzensgl?ck;Schlo?str. 13;51429 Bergisch Gladach;02204-9795494;;;Gutschein;20,00;Brigitte Hoffmann;im Gesch?ft;Clementine;;;;;;;
3;9456;Frau;Susanne Herbers Herzensgl?ck;Schlo?str. 13;51429 Bergisch Gladach;02204-9795494;;;Gutschein;20,00;Brigitte Hoffmann;im Gesch?ft;Clementine;;;;;;;
4;1001;Hr.;Musterspender;Musterstraße 1;12345 Musterstadt;muster@example.com;;;Kinogutschein;25,00;Max Mustermann;Büro;Hans;;;;;;;
5;1002;Fa.;Elektronik Plus;Technikweg 5;54321 Techstadt;info@elektronikplus.de;;;Bluetooth-Kopfhörer;59,99;Petra Schmidt;Lager;Maria;;;;;;;
6;1003;Fr.;Anna Beispiel;Beispielgasse 3;67890 Beispielstadt;anna@beispiel.de;;;Restaurantgutschein;50,00;Thomas Müller;Schrank;Lisa;;;;;;;
7;1004;Hr.;Max Mustermann;Musterallee 42;98765 Musterhausen;max@muster.de;;;Tablet;199,99;Sarah Wagner;Tresor;Thomas;;;;;;;
8;1005;Fa.;Luxus Boutique;Edelstraße 8;34567 Luxusburg;kontakt@luxusboutique.de;;;Designer Handtasche;299,00;Michael Klein;Schaufenster;Sophia;;;;;;;;`;

// Parse die CSV-Daten
export const csvPrizeData: PrizeCSVRow[] = parseCSVData(sampleCSVData);

// Konvertiere CSV-Daten in Preise
export const prizes: Prize[] = [
  { id: 0, description: "Kein Gewinn", value: "0€" }, // Fallback für keine Übereinstimmung
  ...csvPrizeData.map(row => ({
    id: row.id,
    description: row.description,
    value: row.value.includes('€') ? row.value : `${row.value}€`,
    sponsorName: row.sponsorName,
    ticketNumber: row.ticketNumber
  }))
];

// Erstelle Losnummern-Mapping
export const lotteryTickets: LotteryTicket[] = csvPrizeData.map(row => ({
  ticketNumber: row.ticketNumber,
  prizeId: row.id
}));

// Funktion zum Finden eines Gewinns basierend auf der Losnummer
export const findPrizeByTicketNumber = (ticketNumber: string): Prize | null => {
  const row = csvPrizeData.find(
    row => row.ticketNumber === ticketNumber.trim()
  );
  
  if (!row) return null;
  
  return {
    id: row.id,
    description: row.description,
    value: row.value.includes('€') ? row.value : `${row.value}€`,
    sponsorName: row.sponsorName,
    ticketNumber: row.ticketNumber
  };
};
