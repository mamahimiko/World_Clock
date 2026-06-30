type buttonProps = {
  handleNow: () => void;
};

const Button = ({ handleNow }: buttonProps) => {
  return (
    <button
      onClick={handleNow}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded  text-sm"
    >
      Now
    </button>
  );
};

export default Button;
