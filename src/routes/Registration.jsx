import ImageSection from "../components/ImageSection";
import RegistrationLabel from "../components/RegistrationLabel";
import RegistrationInput from "../components/RegistrationInput";

import bgMobile from "../assets/images/Registration/bgMobile.png";
import bgDesktop from "../assets/images/Registration/bgDesktop.png";
import "../assets/styles/Registration.css";

const Registration = () => {
  const gap = "gap-x-4 sm:gap-x-[8%]";
  const handleFromSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ImageSection bgMobile={bgMobile} bgDesktop={bgDesktop} />
      {/* -------- -------- REGISTRATION FORM -------- -------- */}
      <section className="-mb-[8%] bg-white px-[10vw] sm:-mb-[13.5%]">
        <form
          onSubmit={handleFromSubmit}
          className="-translate-y-[8%] bg-secondary px-4 py-2 sm:-translate-y-[13.5%] sm:px-[12%] sm:py-[5%]"
        >
          <h2 className="text-[13px] font-medium capitalize leading-[2em] text-primary sm:pb-[1em] sm:text-[18px] md:text-[23px] lg:text-[28px] xl:text-[33px] 2xl:text-[38px]">
            Personal information
          </h2>

          {/* Image */}
          <fieldset className="my-3 flex size-[110px] flex-col items-center justify-center border-2 border-[#808080] text-[#A1A1AA] md:size-[120px] lg:size-[140px] xl:size-[160px] 2xl:size-[180px]">
            <label
              htmlFor="profile-image"
              className="cursor-pointer text-[8px] capitalize md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]"
            >
              Click to select image
            </label>
            <input
              type="file"
              name="profile-image"
              id="profile-image"
              className="hidden text-[8px]"
            />
          </fieldset>

          {/* Full name */}
          <fieldset className={`grid grid-cols-2 grid-rows-3 ${gap}`}>
            <RegistrationLabel
              htmlFor="first-name"
              text="Full name"
              classes="col-span-2"
            />
            <RegistrationInput type="text" name="first-name" />
            <RegistrationInput type="text" name="last-name" />
            <RegistrationLabel
              htmlFor="first-name"
              text="First name"
              type="sub"
            />
            <RegistrationLabel
              htmlFor="last-name"
              text="Last name"
              type="sub"
            />
          </fieldset>

          {/* Email and phone */}
          <fieldset className={`grid grid-cols-2 grid-rows-3 ${gap}`}>
            <RegistrationLabel htmlFor="email" text="Email address" />
            <RegistrationLabel htmlFor="contact" text="Phone number" />
            <RegistrationInput type="email" name="email" />
            <RegistrationInput type="tel" name="contact" />
            <RegistrationLabel
              htmlFor="email"
              text="example@example.com"
              type="sub"
            />
            <RegistrationLabel
              htmlFor="contact"
              text="Valid phone number"
              type="sub"
            />
          </fieldset>

          {/* DOB and gender */}
          <fieldset className={`grid grid-cols-2 grid-rows-2 ${gap}`}>
            <RegistrationLabel htmlFor="dob" text="Date of birth" />
            <RegistrationLabel htmlFor="gender" text="Gender" />
            <RegistrationInput type="date" name="dob" classes="w-full" />
            <select
              id="gender"
              name="gender"
              className="border border-white bg-secondary px-[1ch] text-[8px] text-white outline-none md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]"
            >
              <option value="male" selected>
                Male
              </option>
              <option value="female">Female</option>
            </select>
          </fieldset>

          {/* Address */}
          <fieldset className="grid grid-cols-1 grid-rows-5 pt-3">
            <RegistrationLabel htmlFor="address-one" text="Address" />
            <RegistrationInput type="text" name="address-one" />
            <RegistrationLabel
              htmlFor="address-one"
              text="Street address"
              type="sub"
            />
            <RegistrationInput type="text" name="address-two" />
            <RegistrationLabel
              htmlFor="address-two"
              text="Street address line 2"
              type="sub"
            />
          </fieldset>

          {/* Current weight and height */}
          <fieldset className={`grid grid-cols-2 grid-rows-2 ${gap}`}>
            <RegistrationLabel htmlFor="current-weight" text="Current weight" />
            <RegistrationLabel htmlFor="height" text="Height" />
            <RegistrationInput type="number" name="current-weight" />
            <RegistrationInput type="number" name="height" />
          </fieldset>

          {/* Goal weight and job title */}
          <fieldset className={`grid grid-cols-2 grid-rows-2 pt-3 ${gap}`}>
            <RegistrationLabel htmlFor="goal-weight" text="Goal weight" />
            <RegistrationLabel htmlFor="job" text="Current job title" />
            <RegistrationInput type="number" name="goal-weight" />
            <RegistrationInput type="text" name="job" />
          </fieldset>

          <div className="flex justify-end pt-[1.4em]">
            <input
              type="submit"
              value="Next"
              className="cursor-pointer bg-primary px-[1em] py-[0.5em] text-[10px] font-semibold capitalize leading-none text-black md:text-[12px] xl:text-[14px] 2xl:text-[16px]"
            />
          </div>

          <div className="mx-auto flex w-fit items-center pb-4 pt-3 sm:pt-[15%]">
            <div className="size-[12px] rounded-full border-2 border-primary bg-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
            <div className="h-[2px] w-[15px] bg-primary sm:w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]"></div>

            <div className="size-[12px] rounded-full border-2 border-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
            <div className="h-[2px] w-[15px] bg-primary sm:w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]"></div>

            <div className="size-[12px] rounded-full border-2 border-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
            <div className="h-[2px] w-[15px] bg-primary sm:w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]"></div>

            <div className="size-[12px] rounded-full border-2 border-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Registration;
