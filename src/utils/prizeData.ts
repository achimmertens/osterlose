
export interface Prize {
  id: number;
  description: string;
  value: string;
}

export interface LotteryTicket {
  ticketNumber: string;
  prizeId: number;
}

// Preisdaten
export const prizes: Prize[] = [
  { id: 0, description: "Kein Gewinn", value: "0€" },
  { id: 1, description: "Trostpreis", value: "5€" },
  { id: 2, description: "Kleiner Preis", value: "10€" },
  { id: 3, description: "Mittelgroßer Preis", value: "50€" },
  { id: 4, description: "Großer Preis", value: "100€" },
  { id: 5, description: "Hauptpreis", value: "500€" },
];

// Losnummern und zugehörige Preise
export const lotteryTickets: LotteryTicket[] = [
  { ticketNumber: "1001", prizeId: 1 },
  { ticketNumber: "1002", prizeId: 2 },
  { ticketNumber: "1003", prizeId: 3 },
  { ticketNumber: "1004", prizeId: 4 },
  { ticketNumber: "1005", prizeId: 5 },
  { ticketNumber: "2001", prizeId: 1 },
  { ticketNumber: "2002", prizeId: 2 },
  { ticketNumber: "3001", prizeId: 1 },
  { ticketNumber: "3002", prizeId: 3 },
  { ticketNumber: "4001", prizeId: 4 },
  { ticketNumber: "5001", prizeId: 5 },
  { ticketNumber: "6001", prizeId: 2 },
  { ticketNumber: "7001", prizeId: 1 },
  { ticketNumber: "8001", prizeId: 3 },
  { ticketNumber: "9001", prizeId: 4 },
  { ticketNumber: "9999", prizeId: 5 },
];

// Funktion zum Finden eines Gewinns basierend auf der Losnummer
export const findPrizeByTicketNumber = (ticketNumber: string): Prize | null => {
  const ticket = lotteryTickets.find(
    (t) => t.ticketNumber === ticketNumber.trim()
  );
  
  if (!ticket) return null;
  
  return prizes.find((p) => p.id === ticket.prizeId) || null;
};
