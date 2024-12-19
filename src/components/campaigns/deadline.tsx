"use client"
import React, { useState, useEffect } from 'react';

interface DeadlineProps {
  deadlineTimestamp: number; // Kampanyanın bitiş zamanının timestamp'ı
}

const Deadline: React.FC<DeadlineProps> = ({ deadlineTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState<string>('Calculating time left...');
  
  useEffect(() => {
    const deadlineDate = new Date(deadlineTimestamp * 1000); // Timestamp'ı Date'e dönüştür
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = deadlineDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        setTimeLeft('Campaign has ended');
        clearInterval(interval); // Kampanya sona erdiğinde interval'i durdur
      } else {
        const days = Math.floor(timeDifference / (1000 * 3600 * 24));
        const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
        const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));

        setTimeLeft(`${days} days, ${hours} hours, ${minutes} minutes`);
      }
    }, 600); // Her dakika bir kez hesaplama yap

    return () => clearInterval(interval); // Component unmount olduğunda interval'i temizle
  }, [deadlineTimestamp]);

  return <p>{timeLeft}</p>;
};

export default Deadline;
