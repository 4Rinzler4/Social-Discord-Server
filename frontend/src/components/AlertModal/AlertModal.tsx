import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

type AlertModalProps = {
  title: string;
  description: string;
  onClose: () => void;
};

const DURATION = 5000;

const AlertModal = ({ title, description, onClose }: AlertModalProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;

      const value = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setProgress(value);

      if (elapsed >= DURATION) {
        clearInterval(interval);
        onClose();
      }
    }, 35);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <Alert>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>

      <Progress value={progress} className="mt-2 h-1 rounded-none" />
    </Alert>
  );
};

export default AlertModal;
