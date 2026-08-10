import { TypographyH4 } from "../ui/typography";
import { Button } from "../ui/button";
import { useModalContext } from "@/context/modal-context";

const SuccessPostModal = () => {
  const { closeModal } = useModalContext();
  return (
    <>
      <div className="text-white w-full p-10 flex flex-col items-center gap-4">
        <TypographyH4>Congratulations!</TypographyH4>
        <p>Your post has been successfully uploaded.</p>
        <Button variant="default" onClick={closeModal}>
          Awesome
        </Button>
      </div>
    </>
  );
};

export default SuccessPostModal;
