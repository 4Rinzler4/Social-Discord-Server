import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

const CreatePostInput = () => {
  const [preview, setPreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImageFile(file);
  };

  const handleReset = () => {
    setImageFile(null);
    setPreview("");
  };

  useEffect(() => {
    if (!imageFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  return (
    <>
      <div>
        {preview ? <img src={preview} alt="Preview" /> : null}
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div>
              {imageFile ? null : (
                <div
                  className="border-2 border-dashed border-gray-300 p-4 text-center text-white"
                  {...getRootProps()}
                >
                  <p>Drag 'n' drop an image here, or click to select one</p>
                  <input {...getInputProps()} />
                </div>
              )}
            </div>
          )}
        </Dropzone>
        <div>
          <Button variant="destructive" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="default">Upload</Button>
        </div>
      </div>
    </>
  );
};

export default CreatePostInput;
