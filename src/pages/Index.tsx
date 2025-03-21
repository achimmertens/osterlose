
import React, { useState, useEffect } from "react";
import { Prize, prizes, lotteryTickets, csvPrizeData, initializeData } from "@/utils/prizeData";
import LotteryForm from "@/components/LotteryForm";
import PrizeReveal from "@/components/PrizeReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "sonner";

const Index = () => {
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketNumber, setTicketNumber] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await initializeData();
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const handlePrizeFound = (prize: Prize | null, inputTicketNumber: string) => {
    setSelectedPrize(prize);
    setTicketNumber(inputTicketNumber);
  };

  // Admin-Funktion zum Anzeigen/Verstecken der Tabelle
  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div className="min-h-screen py-12 stars-bg">
      <Toaster position="top-center" />
      <div className="container max-w-md mx-auto px-4">
        <div className="text-center mb-6">
          {/* Lions Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/b9f9d7e7-f163-414a-afe4-01e7b596bf7b.png" 
              alt="Lions Club Logo" 
              className="h-40 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-1 text-primary">Lions Club</h1>
          <h1 className="text-4xl font-bold mb-1 text-primary">Bergische Löwinnen</h1>
          <h2 className="text-2xl text-primary mb-4">Osterlose</h2>
          <p className="text-lg text-muted-foreground">
            Geben Sie Ihre Losnummer ein und entdecken Sie Ihren Gewinn!
            {isLoading ? ' Daten werden geladen...' : ' Achtung - Die Losnummern sind Fake. Das hier ist nur eine Demo Testversion!'}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-center">
              <p className="text-primary">Gewinnliste wird geladen...</p>
            </div>
          </div>
        ) : (
          <>
            <Card className="border-primary/20 bg-card/90 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <LotteryForm onPrizeFound={handlePrizeFound} />
              </CardContent>
            </Card>

            {ticketNumber && <PrizeReveal prize={selectedPrize} ticketNumber={ticketNumber} />}
          </>
        )}

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
            <div className="container mx-auto max-w-4xl">
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
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">Losnummer</th>
                      <th className="py-2 px-4 text-left">Gewinn</th>
                      <th className="py-2 px-4 text-right">Wert</th>
                      <th className="py-2 px-4 text-left">Sponsor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvPrizeData.map((row) => (
                      <tr key={row.id} className="border-b border-muted/30 hover:bg-muted/20">
                        <td className="py-2 px-4">{row.id}</td>
                        <td className="py-2 px-4">{row.ticketNumber}</td>
                        <td className="py-2 px-4">{row.description}</td>
                        <td className="py-2 px-4 text-right">{row.value}€</td>
                        <td className="py-2 px-4">{row.sponsorName}</td>
                      </tr>
                    ))}
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
