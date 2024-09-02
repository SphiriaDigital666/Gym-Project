const RegistrationLabel = ({ htmlFor, text, classes = "", type = "main" }) => {
  classes += type === "main" ? " text-[12px]" : " text-[9px]";

  return (
    <label htmlFor={htmlFor} className={`capitalize leading-[2em] ${classes}`}>
      {text}
    </label>
  );
};

export default RegistrationLabel;
