const RegistrationLabel = ({ htmlFor, text, classes = "", type = "main" }) => {
  classes +=
    type === "main"
      ? " text-[10px] sm:self-center sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[20px] 2xl:text-[23px]"
      : " text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]";

  return (
    <>
      {htmlFor ? (
        <label
          htmlFor={htmlFor}
          className={`capitalize leading-[2em] ${classes}`}
        >
          {text}
        </label>
      ) : (
        <span className={`capitalize leading-[2em] ${classes}`}>{text}</span>
      )}
    </>
  );
};

export default RegistrationLabel;
