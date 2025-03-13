
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { findPrizeByTicketNumber, Prize } from "@/utils/prizeData";

interface LotteryFormProps {
  onPrizeFound: (prize: Prize | null) => void;
}

const LotteryForm: React.FC<LotteryFormProps> = ({ onPrizeFound }) => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketNumber.trim()) {
      setError("Bitte geben Sie eine Losnummer ein.");
      return;
    }
    
    const prize = findPrizeByTicketNumber(ticketNumber);
    
    if (!prize) {
      setError("Diese Losnummer ist nicht gültig oder hat keinen Gewinn.");
      onPrizeFound(null);
    } else {
      setError("");
      onPrizeFound(prize);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="ticketNumber" className="block text-lg font-medium">
          Ihre Losnummer
        </label>
        <Input
          id="ticketNumber"
          type="text"
          value={ticketNumber}
          onChange={(e) => setTicketNumber(e.target.value)}
          placeholder="z.B. 1001"
          className="bg-secondary/50 border-primary/30 text-center text-xl py-6"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
      <Button 
        type="submit" 
        className="w-full py-6 text-lg font-bold transition-all hover:scale-105"
      >
        Gewinn anzeigen
      </Button>
    </form>
  );
};

export default LotteryForm;
