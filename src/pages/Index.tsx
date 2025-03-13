
import React, { useState } from "react";
import { Prize, prizes, lotteryTickets } from "@/utils/prizeData";
import LotteryForm from "@/components/LotteryForm";
import PrizeReveal from "@/components/PrizeReveal";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [showTable, setShowTable] = useState(false);

  const handlePrizeFound = (prize: Prize | null) => {
    setSelectedPrize(prize);
  };

  // Admin-Funktion zum Anzeigen/Verstecken der Tabelle
  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div className="min-h-screen py-12 stars-bg">
      <div className="container max-w-md mx-auto px-4">
        <div className="text-center mb-6">
          <img 
            src="/lovable-uploads/46b8f54e-174d-45b3-a3f4-13f11174ef0f.png" 
            alt="Lions International Logo" 
            className="mx-auto mb-4 w-32 h-32"
          />
          <h1 className="text-4xl font-bold mb-2 text-primary">Losverlosung</h1>
          <p className="text-lg text-muted-foreground">
            Geben Sie Ihre Losnummer ein und entdecken Sie Ihren Gewinn!
          </p>
        </div>

        <Card className="border-primary/20 bg-card/90 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <LotteryForm onPrizeFound={handlePrizeFound} />
          </CardContent>
        </Card>

        {selectedPrize && <PrizeReveal prize={selectedPrize} />}

        {/* Versteckte Admin-Schaltfläche in der Ecke */}
        <button
          onClick={toggleTable}
          className="fixed bottom-2 right-2 p-2 opacity-20 hover:opacity-100 text-xs"
          aria-label="Admin-Bereich"
        >
          Admin
        </button>

        {/* Versteckte Tabelle mit allen Losnummern und Gewinnen */}
        {showTable && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-auto p-4">
            <div className="container mx-auto max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gewinn-Tabelle (Admin)</h2>
                <button 
                  onClick={toggleTable}
                  className="text-primary hover:text-primary/80"
                >
                  Schließen
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-primary/30">
                      <th className="py-2 px-4 text-left">Losnummer</th>
                      <th className="py-2 px-4 text-left">Gewinn</th>
                      <th className="py-2 px-4 text-right">Wert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotteryTickets.map((ticket) => {
                      const prize = prizes.find((p) => p.id === ticket.prizeId);
                      return (
                        <tr key={ticket.ticketNumber} className="border-b border-muted/30 hover:bg-muted/20">
                          <td className="py-2 px-4">{ticket.ticketNumber}</td>
                          <td className="py-2 px-4">{prize?.description}</td>
                          <td className="py-2 px-4 text-right">{prize?.value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
