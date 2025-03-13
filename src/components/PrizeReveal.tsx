
import React from "react";
import { Prize } from "@/utils/prizeData";
import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";

interface PrizeRevealProps {
  prize: Prize;
}

const PrizeReveal: React.FC<PrizeRevealProps> = ({ prize }) => {
  
  React.useEffect(() => {
    // Konfetti-Effekt beim Anzeigen eines Gewinns
    if (prize.id > 1) {
      confetti({
        particleCount: prize.id * 30,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#0057B8']  // Lions Farben: Gold und Blau
      });
    }
  }, [prize.id]);

  return (
    <Card className="prize-reveal border-primary/30 bg-secondary/50 overflow-hidden">
      <CardContent className="p-6 text-center">
        <h3 className="text-2xl font-bold mb-2">Ihr Gewinn</h3>
        <div className="my-4">
          <span className="text-4xl font-extrabold text-primary">
            {prize.value}
          </span>
        </div>
        <p className="text-lg">{prize.description}</p>
      </CardContent>
    </Card>
  );
};

export default PrizeReveal;
