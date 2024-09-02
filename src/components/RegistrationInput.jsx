const RegistrationInput = ({ type, name, classes = "" }) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      className={`border-2 border-white bg-secondary ps-[1ch] text-[11px] text-white outline-none ${classes}`}
      required
    />
  );
};

export default RegistrationInput;
