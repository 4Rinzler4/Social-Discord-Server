type NotFoundProps = {
  title: string;
  message: string;
};

const NotFound = ({ title, message }: NotFoundProps) => {
  return (
    <>
      <p>{title}</p>
      <p>{message}</p>
    </>
  );
};

export default NotFound;
