import type { FC, ReactElement } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type PopupDialogProps = {
  content: ReactElement | null;
  closeModal: () => void;
};

const PopupDialog: FC<PopupDialogProps> = ({ content, closeModal }) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative rounded-lg bg-zinc-900 p-6">
        <Button className="absolute right-2 top-2" onClick={closeModal}>
          {<X />}
        </Button>

        {content}
      </div>
    </div>
  );
};

export default PopupDialog;
