import { Card } from "@/components/ui/card";
import FormGif from "@/assets/gif/form.gif";
import SignUpForm from "../SignUpForm/SignUpForm";

const SignUpDialog = () => {
  return (
    <>
      <Card className="flex flex-row w-full max-w-4xl overflow-hidden p-0 border-2">
        <div className="flex-1">
          <SignUpForm />
        </div>

        <div className="hidden md:flex">
          <img
            src={FormGif}
            alt="Form gif"
            className="w-full h-full object-cover"
          />
        </div>
      </Card>
    </>
  );
};

export default SignUpDialog;
