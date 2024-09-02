import ImageSection from "../components/ImageSection";
import RegistrationLabel from "../components/RegistrationLabel";
import RegistrationInput from "../components/RegistrationInput";

import bgMobile from "../assets/images/Registration/bgMobile.png";
import bgDesktop from "../assets/images/Registration/bgDesktop.png";
import "../assets/styles/Registration.css";

const Registration = () => {
  const handleFromSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ImageSection bgMobile={bgMobile} bgDesktop={bgDesktop} />
      {/* -------- -------- REGISTRATION FORM -------- -------- */}
      <section className="bg-white px-[10vw] md:px-[5vw]">
        <form
          onSubmit={handleFromSubmit}
          className="-translate-y-[8%] bg-secondary px-4 py-2"
        >
          <h2 className="font-medium capitalize leading-[2em] text-primary">
            Personal information
          </h2>

          <fieldset className="my-3 flex size-[110px] flex-col items-center justify-center border-2 border-[#808080] text-[#A1A1AA]">
            <RegistrationLabel
              htmlFor="profile-image"
              text="Click to select image"
              type="sub"
            />
            <input
              type="file"
              name="profile-image"
              id="profile-image"
              className="hidden text-[9px]"
            />
          </fieldset>

          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4">
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

          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4">
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

          <fieldset className="grid grid-cols-2 grid-rows-2 gap-x-4">
            <RegistrationLabel htmlFor="dob" text="Date of birth" />
            <RegistrationLabel htmlFor="gender" text="Gender" />
            <RegistrationInput type="date" name="dob" classes="w-full" />
            <select
              id="gender"
              name="gender"
              className="border-2 border-white bg-secondary ps-[1ch] text-[9px] text-white outline-none"
            >
              <option value="male" selected>
                Male
              </option>
              <option value="female">Female</option>
            </select>
          </fieldset>

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
          {/* <input type="text" /> */}
          <fieldset className="grid grid-cols-2 grid-rows-2 gap-x-4">
            <RegistrationLabel htmlFor="current-weight" text="Current weight" />
            <RegistrationLabel htmlFor="height" text="Height" />
            <RegistrationInput type="number" name="current-weight" />
            <RegistrationInput type="number" name="height" />
          </fieldset>
          <fieldset className="grid grid-cols-2 grid-rows-2 gap-x-4 pt-3">
            <RegistrationLabel htmlFor="goal-weight" text="Goal weight" />
            <RegistrationLabel htmlFor="job" text="Current job title" />
            <RegistrationInput type="number" name="goal-weight" />
            <RegistrationInput type="text" name="job" />
          </fieldset>
          <div className="flex justify-end pt-4">
            <input
              type="submit"
              value="Next"
              className="bg-primary px-[1em] py-[0.5em] text-[11px] font-semibold capitalize leading-none text-black"
            />
          </div>
          <div className="mx-auto flex w-fit items-center py-4">
            <div className="size-[15px] rounded-full border-2 border-primary bg-primary"></div>
            <div className="h-[3px] w-[15px] bg-primary"></div>
            <div className="size-[15px] rounded-full border-2 border-primary"></div>
            <div className="h-[3px] w-[15px] bg-primary"></div>
            <div className="size-[15px] rounded-full border-2 border-primary"></div>
            <div className="h-[3px] w-[15px] bg-primary"></div>
            <div className="size-[15px] rounded-full border-2 border-primary"></div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Registration;
