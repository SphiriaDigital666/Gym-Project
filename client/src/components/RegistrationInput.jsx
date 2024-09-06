const RegistrationInput = ({ type, id, name, handleChange, classes }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      onChange={handleChange}
      className={`border border-white bg-secondary px-[1ch] text-[8px] text-white outline-none sm:px-[2ch] sm:py-[1.3em] md:text-[10px] xl:text-[12px] 2xl:text-[14px] ${classes}`}
      required
    />
  );
};

export default RegistrationInput;
