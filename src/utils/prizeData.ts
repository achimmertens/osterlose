import { PrizeCSVRow, parseCSVData, debugCSVData } from './csvParser';

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

// Funktion zum Laden der CSV-Datei
export const loadCSVData = async (): Promise<string> => {
  try {
    const response = await fetch('/Osterlose-2025.csv');
    if (!response.ok) {
      throw new Error('CSV-Datei konnte nicht geladen werden');
    }
    return await response.text();
  } catch (error) {
    console.error('Fehler beim Laden der CSV-Datei:', error);
    return sampleCSVData; // Fallback zu Beispieldaten
  }
};

// Initial sample CSV data (wird als Fallback verwendet)
const sampleCSVData = `Lfd.Nr.;Gewinn Losnummer;Sponsor Anrede;Sponsor Name;Sponsor Strasse;Sponsor PLZ und Ort;e-mail; Bar Spende ? ;reine Sachspende;Gewinn;Wert Spende ?;akquisiert durch wen;Lagerort Gewinn;Erfasst von:;Gewinner Anrede;Gewinner Name;Gewinner Strasse;Gewinner PLZ und Ort;ausgeliefert am;ausgeh?ndigt von;Sponsorenquittung 
1;3230;Althoff;Grandhotel Schloss Bensberg;Kadettenstrasse;51429 Bergisch Gladach;info@schlossbensberg.com;;;Gutschein Day Spa;79,00;Manuela Rex-Eberle;wird pers?nlich ?bergeben ;Manuela;;;;;;;
2;6730;Frau;Susanne Herbers Herzensgl?ck;Schlo?str. 13;51429 Bergisch Gladach;02204-9795494;;;Gutschein;20,00;Brigitte Hoffmann;im Gesch?ft;Clementine;;;;;;;
3;9456;Frau;Susanne Herbers Herzensgl?ck;Schlo?str. 13;51429 Bergisch Gladach;02204-9795494;;;Gutschein;20,00;Brigitte Hoffmann;im Gesch?ft;Clementine;;;;;;;
4;1001;Hr.;Musterspender;Musterstraße 1;12345 Musterstadt;muster@example.com;;;Kinogutschein;25,00;Max Mustermann;Büro;Hans;;;;;;;
5;1002;Fa.;Elektronik Plus;Technikweg 5;54321 Techstadt;info@elektronikplus.de;;;Bluetooth-Kopfhörer;59,99;Petra Schmidt;Lager;Maria;;;;;;;
6;1003;Fr.;Anna Beispiel;Beispielgasse 3;67890 Beispielstadt;anna@beispiel.de;;;Restaurantgutschein;50,00;Thomas Müller;Schrank;Lisa;;;;;;;
7;1004;Hr.;Max Mustermann;Musterallee 42;98765 Musterhausen;max@muster.de;;;Tablet;199,99;Sarah Wagner;Tresor;Thomas;;;;;;;
8;1005;Fa.;Luxus Boutique;Edelstraße 8;34567 Luxusburg;kontakt@luxusboutique.de;;;Designer Handtasche;299,00;Michael Klein;Schaufenster;Sophia;;;;;;;;`;

// Parse die CSV-Daten (initial mit Beispieldaten, wird später ersetzt)
export let csvPrizeData: PrizeCSVRow[] = parseCSVData(sampleCSVData);

// Konvertiere CSV-Daten in Preise
export let prizes: Prize[] = [
  { id: 0, description: "Kein Gewinn", value: "0€" }, // Fallback für keine Übereinstimmung
];

// Erstelle Losnummern-Mapping
export let lotteryTickets: LotteryTicket[] = [];

// Funktion zum Formatieren des Wertes
const formatValue = (value: string) => {
  // Replace commas with dots for proper number parsing
  const normalizedValue = value.replace(',', '.');
  if (!isNaN(parseFloat(normalizedValue)) && isFinite(Number(normalizedValue))) {
    return `${value}€`;
  }
  return value;
};

// Initialisiere die Daten
export const initializeData = async () => {
  try {
    const csvData = await loadCSVData();
    
    // Debug-Ausgabe
    console.log("CSV-Daten geladen, Länge:", csvData.length);
    debugCSVData(csvData);
    
    csvPrizeData = parseCSVData(csvData);
    
    // Aktualisiere die Preise
    prizes = [
      { id: 0, description: "Kein Gewinn", value: "0€" }, // Fallback für keine Übereinstimmung
      ...csvPrizeData.map(row => ({
        id: row.id,
        description: row.description,
        value: formatValue(row.value),
        sponsorName: row.sponsorName,
        ticketNumber: row.ticketNumber
      }))
    ];

    // Aktualisiere die Losnummern
    lotteryTickets = csvPrizeData.map(row => ({
      ticketNumber: row.ticketNumber,
      prizeId: row.id
    }));
    
    // Debug-Ausgabe der verarbeiteten Preise
    console.log('CSV-Daten erfolgreich geladen:', csvPrizeData.length, 'Einträge');
    console.log('Erste 3 Losnummern:', lotteryTickets.slice(0, 3).map(t => t.ticketNumber));
  } catch (error) {
    console.error('Fehler bei der Initialisierung der Daten:', error);
  }
};

// Funktion zum Finden eines Gewinns basierend auf der Losnummer
export const findPrizeByTicketNumber = (ticketNumber: string): Prize | null => {
  // Normalize the ticket number to ensure it is 4 digits
  const normalizedTicketNumber = ticketNumber.padStart(4, '0');

  console.log(`Suche nach Losnummer: "${normalizedTicketNumber}"`);
  console.log(`Verfügbare Losnummern: ${csvPrizeData.slice(0, 3).map(row => `"${row.ticketNumber.padStart(4, '0')}"`).join(', ')}...`);

  const row = csvPrizeData.find(
    row => row.ticketNumber.padStart(4, '0') === normalizedTicketNumber
  );

  if (!row) {
    console.log('Keine Übereinstimmung gefunden für:', normalizedTicketNumber);
    return null;
  }

  console.log('Gewinn gefunden für Losnummer', normalizedTicketNumber, ':', row.description);

  return {
    id: row.id,
    description: row.description,
    value: formatValue(row.value),
    sponsorName: row.sponsorName,
    ticketNumber: row.ticketNumber
  };
};
