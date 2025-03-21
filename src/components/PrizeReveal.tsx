
import React from "react";
import { Prize } from "@/utils/prizeData";
import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";

interface PrizeRevealProps {
  prize: Prize | null;
  ticketNumber: string;
}

const PrizeReveal: React.FC<PrizeRevealProps> = ({ prize, ticketNumber }) => {
  
  React.useEffect(() => {
    // Konfetti-Effekt beim Anzeigen eines Gewinns
    if (prize && prize.id !== 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#0057B8']  // Lions Farben: Gold und Blau
      });
    }
  }, [prize?.id]);

  if (!prize) {
    return (
      <Card className="border-primary/30 bg-secondary/50 overflow-hidden">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Kein Gewinn</h3>
          <p className="text-lg mb-2">
            Leider hatten Sie mit dieser Losnummer <span className="font-bold">{ticketNumber}</span> kein Glück.
          </p>
          <p className="text-lg">
            Vielen Dank für Ihre Unterstützung!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="prize-reveal border-primary/30 bg-secondary/50 overflow-hidden">
      <CardContent className="p-6 text-center">
        <h3 className="text-2xl font-bold mb-2">Ihr Gewinn</h3>
        <p className="text-md mb-4">
          für Losnummer: <span className="font-semibold">{ticketNumber}</span>
        </p>
        <div className="my-4">
          <span className="text-4xl font-extrabold text-primary">
            {prize.value}
          </span>
        </div>
        <p className="text-lg">{prize.description}</p>
        
        {prize.sponsorName && (
          <div className="mt-4 pt-3 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              Gesponsert von: <span className="font-medium">{prize.sponsorName}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrizeReveal;
