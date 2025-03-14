
/**
 * Utility functions for parsing CSV data
 */

export interface PrizeCSVRow {
  id: string;
  ticketNumber: string;
  sponsorTitle?: string;
  sponsorName?: string;
  sponsorStreet?: string;
  sponsorLocation?: string;
  email?: string;
  isCashDonation?: string;
  isItemDonation?: string;
  description: string;
  value: string;
  acquiredBy?: string;
  storageLocation?: string;
  registeredBy?: string;
  winnerTitle?: string;
  winnerName?: string;
  winnerStreet?: string;
  winnerLocation?: string;
  deliveredOn?: string;
  handedOverBy?: string;
  sponsorReceipt?: string;
}

/**
 * Parse CSV string to array of data objects
 */
export const parseCSVData = (csvContent: string): PrizeCSVRow[] => {
  // Split the CSV by lines
  const lines = csvContent.split('\n');
  
  // Get the header line (first line)
  const headers = lines[0].split(';');
  
  // Process each data line (skip header)
  return lines.slice(1)
    .filter(line => line.trim() !== '') // Skip empty lines
    .map((line, index) => {
      const values = line.split(';');
      const row: Record<string, string> = {};
      
      // Map each value to its corresponding header
      headers.forEach((header, i) => {
        if (i < values.length) {
          row[header] = values[i];
        }
      });
      
      // Return structured data
      return {
        id: row['Lfd.Nr.'] || String(index + 1),
        ticketNumber: row['Gewinn Losnummer'] || '',
        sponsorTitle: row['Sponsor Anrede'],
        sponsorName: row['Sponsor Name'],
        sponsorStreet: row['Sponsor Strasse'],
        sponsorLocation: row['Sponsor PLZ und Ort'],
        email: row['e-mail'],
        isCashDonation: row[' Bar Spende ? '],
        isItemDonation: row['reine Sachspende'],
        description: row['Gewinn'] || 'Kein Gewinn',
        value: row['Wert Spende ?'] || '0€',
        acquiredBy: row['akquisiert durch wen'],
        storageLocation: row['Lagerort Gewinn'],
        registeredBy: row['Erfasst von:'],
        winnerTitle: row['Gewinner Anrede'],
        winnerName: row['Gewinner Name'],
        winnerStreet: row['Gewinner Strasse'],
        winnerLocation: row['Gewinner PLZ und Ort'],
        deliveredOn: row['ausgeliefert am'],
        handedOverBy: row['ausgeh?ndigt von'],
        sponsorReceipt: row['Sponsorenquittung']
      };
    });
};
