import { useState } from "react";

import ImageSection from "../../components/ImageSection";
import RegistrationLabel from "../../components/RegistrationLabel";
import RegistrationInput from "../../components/RegistrationInput";
import bgMobile from "../../assets/images/Registration/bgMobile.png";
import bgDesktop from "../../assets/images/Registration/bgDesktop.png";
import "../../assets/styles/Registration.css";

const Registration = () => {
  const [isFormOneHidden, setIsFormOneHidden] = useState(false);
  const [isFormTwoHidden, setIsFormTwoHidden] = useState(true);
  const [isTextAreaHidden, setIsTextAreaHidden] = useState(true);
  const [isFormThreeHidden, setIsFormThreeHidden] = useState(true);
  const [isFormFourHidden, setIsFormFourHidden] = useState(true);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    DOB: "",
    gender: "male",
    addressOne: "",
    addressTwo: "",
    currentWeight: "",
    height: "",
    goalWeight: "",
    currentJob: "",
  });

  const personalInfoDataChange = (key, value) => {
    setPersonalInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormOneSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personalInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch respone");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          return console.log("Could not submit Personal Information");
        }
        setIsFormOneHidden(true);
        setIsFormTwoHidden(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFormTwoSubmit = (e) => {
    e.preventDefault();
    setIsFormTwoHidden(true);
    setIsFormThreeHidden(false);
  };
  const handleFormTwoExit = () => {
    setIsFormOneHidden(false);
    setIsFormTwoHidden(true);
  };
  const handleFormThreeSubmit = (e) => {
    e.preventDefault();
    setIsFormThreeHidden(true);
    setIsFormFourHidden(false);
  };
  const handleFormThreeExit = () => {
    setIsFormTwoHidden(false);
    setIsFormThreeHidden(true);
  };

  return (
    <>
      <ImageSection bgMobile={bgMobile} bgDesktop={bgDesktop} />
      <section className="-mb-[8%] bg-white px-[10vw] sm:-mb-[13.5%] lg:-mb-[10%] xl:-mb-[8%] 2xl:-mb-[6%]">
        {/* -------- -------- PERSONAL INFO FORM -------- -------- */}
        <form
          onSubmit={handleFormOneSubmit}
          className={`-translate-y-[8%] bg-secondary px-4 py-2 sm:-translate-y-[13.5%] sm:px-[12%] sm:py-[5%] ${isFormOneHidden && "hidden"}`}
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
          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel text="Full name" classes="col-span-2" />
            <RegistrationInput
              type="text"
              name="firstName"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="text"
              name="lastName"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationLabel
              htmlFor="firstName"
              text="First name"
              type="sub"
            />
            <RegistrationLabel htmlFor="lastName" text="Last name" type="sub" />
          </fieldset>

          {/* Email and phone */}
          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel htmlFor="email" text="Email address" />
            <RegistrationLabel htmlFor="tel" text="Phone number" />
            <RegistrationInput
              type="email"
              id="email"
              name="email"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="tel"
              id="tel"
              name="tel"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationLabel
              htmlFor="email"
              text="example@example.com"
              type="sub"
            />
            <RegistrationLabel
              htmlFor="tel"
              text="Valid phone number"
              type="sub"
            />
          </fieldset>

          {/* DOB and gender */}
          <fieldset className="grid grid-cols-2 grid-rows-2 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel htmlFor="dob" text="Date of birth" />
            <RegistrationLabel htmlFor="gender" text="Gender" />
            <RegistrationInput
              type="date"
              id="dob"
              name="DOB"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
              classes="w-full"
            />
            <select
              id="gender"
              name="gender"
              value={personalInfo.gender}
              onChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
              className="border border-white bg-secondary px-[1ch] text-[8px] text-white outline-none md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </fieldset>

          {/* Address */}
          <fieldset className="grid grid-cols-1 grid-rows-5 pt-3">
            <RegistrationLabel htmlFor="address-one" text="Address" />
            <RegistrationInput
              type="text"
              id="address-one"
              name="addressOne"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationLabel
              htmlFor="address-one"
              text="Street address"
              type="sub"
            />
            <RegistrationInput
              type="text"
              id="address-two"
              name="addressTwo"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationLabel
              htmlFor="address-two"
              text="Street address line 2"
              type="sub"
            />
          </fieldset>

          {/* Current weight and height */}
          <fieldset className="grid grid-cols-2 grid-rows-2 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel htmlFor="current-weight" text="Current weight" />
            <RegistrationLabel htmlFor="height" text="Height" />
            <RegistrationInput
              type="number"
              id="current-weight"
              name="currentWeight"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="number"
              id="height"
              name="height"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
          </fieldset>

          {/* Goal weight and current job title */}
          <fieldset className="grid grid-cols-2 grid-rows-2 gap-x-4 pt-3 sm:gap-x-[8%]">
            <RegistrationLabel htmlFor="goal-weight" text="Goal weight" />
            <RegistrationLabel htmlFor="current-job" text="Current job title" />
            <RegistrationInput
              type="number"
              id="goal-weight"
              name="goalWeight"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="text"
              id="current-job"
              name="currentJob"
              handleChange={(e) =>
                personalInfoDataChange(e.target.name, e.target.value)
              }
            />
          </fieldset>

          <div className="flex justify-end pt-[1.4em]">
            <button
              type="submit"
              className="cursor-pointer bg-primary px-[1em] py-[0.5em] text-[10px] font-semibold capitalize leading-none text-black md:text-[12px] xl:text-[14px] 2xl:text-[16px]"
            >
              Next
            </button>
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
        {/* -------- -------- MEDICAL INFO FORM -------- -------- */}
        <form
          onSubmit={handleFormTwoSubmit}
          className={`-translate-y-[8%] bg-secondary px-4 py-2 sm:-translate-y-[13.5%] sm:px-[12%] sm:py-[5%] ${isFormTwoHidden && "hidden"}`}
        >
          <h2 className="text-[13px] font-medium capitalize leading-[2em] text-primary sm:pb-[1em] sm:text-[18px] md:text-[23px] lg:text-[28px] xl:text-[33px] 2xl:text-[38px]">
            Emergency Contact information
          </h2>

          {/* Emergency contact name */}
          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel
              htmlFor="first-em-name"
              text="Emergency contact name"
              classes="col-span-2"
            />
            <RegistrationInput type="text" name="first-em-name" />
            <RegistrationInput type="text" name="last-em-name" />
            <RegistrationLabel
              htmlFor="first-em-name"
              text="First name"
              type="sub"
            />
            <RegistrationLabel
              htmlFor="last-em-name"
              text="Last name"
              type="sub"
            />
          </fieldset>

          {/* Relationship and phone */}
          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel htmlFor="em-relationship" text="Relationship" />
            <RegistrationLabel htmlFor="em-contact" text="Phone number" />
            <RegistrationInput type="text" name="em-relationship" />
            <RegistrationInput type="tel" name="em-contact" />
            <RegistrationLabel
              htmlFor="em-relationship"
              text="Specify relationship"
              type="sub"
            />
            <RegistrationLabel
              htmlFor="em-contact"
              text="Valid phone number"
              type="sub"
            />
          </fieldset>

          <h2 className="text-[13px] font-medium capitalize leading-[2em] text-primary sm:pb-[1em] sm:text-[18px] md:text-[23px] lg:text-[28px] xl:text-[33px] 2xl:text-[38px]">
            Medical information
          </h2>

          {/* Allergies */}
          <fieldset className="pb-[50%]">
            <RegistrationLabel text="Do you have any medical conditons or allergies?" />
            <br />
            <div className="flex gap-x-[20%] py-1">
              <div className="flex items-center gap-x-[30%]">
                <input
                  type="radio"
                  name="is-allergic"
                  onClick={() => setIsTextAreaHidden(false)}
                  id="yes"
                  value="yes"
                  required
                />
                <RegistrationLabel htmlFor="yes" text="Yes" type="sub" />
              </div>
              <div className="flex items-center gap-x-[30%]">
                <input
                  type="radio"
                  name="is-allergic"
                  onClick={() => setIsTextAreaHidden(true)}
                  id="no"
                  value="no"
                  required
                />
                <RegistrationLabel htmlFor="no" text="No" type="sub" />
              </div>
            </div>
            <div className="pt-[3%]">
              <RegistrationLabel
                htmlFor="allergy-details"
                text="If yes, please provide details."
              />
              <br />
              {!isTextAreaHidden ? (
                <textarea
                  name="allergy-details"
                  id="allergy-details"
                  rows="4"
                  className="w-full origin-top border border-white bg-secondary px-[1ch] text-[8px] text-white outline-none sm:px-[2ch] sm:py-[1.3em] md:text-[10px] xl:text-[12px] 2xl:text-[14px]"
                  required
                ></textarea>
              ) : (
                <textarea
                  name="allergy-details"
                  id="allergy-details"
                  rows="4"
                  className="w-full origin-top border border-white bg-secondary px-[1ch] text-[8px] text-white outline-none sm:px-[2ch] sm:py-[1.3em] md:text-[10px] xl:text-[12px] 2xl:text-[14px]"
                ></textarea>
              )}
            </div>
          </fieldset>

          <div className="flex justify-between pt-[1.4em]">
            <button
              onClick={handleFormTwoExit}
              type="button"
              className="cursor-pointer bg-primary px-[1em] py-[0.5em] text-[10px] font-semibold capitalize leading-none text-black md:text-[12px] xl:text-[14px] 2xl:text-[16px]"
            >
              Back
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-primary px-[1em] py-[0.5em] text-[10px] font-semibold capitalize leading-none text-black md:text-[12px] xl:text-[14px] 2xl:text-[16px]"
            >
              Next
            </button>
          </div>

          <div className="mx-auto flex w-fit items-center pb-4 pt-3 sm:pt-[15%]">
            <div className="size-[12px] rounded-full border-2 border-primary bg-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
            <div className="h-[2px] w-[15px] bg-primary sm:w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]"></div>

            <div className="size-[12px] rounded-full border-2 border-primary bg-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
            <div className="h-[2px] w-[15px] bg-primary sm:w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]"></div>

            <div className="size-[12px] rounded-full border-2 border-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
            <div className="h-[2px] w-[15px] bg-primary sm:w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]"></div>

            <div className="size-[12px] rounded-full border-2 border-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
          </div>
        </form>
        {/* -------- -------- MEMBERSHIP INFO FORM -------- -------- */}
        <form
          onSubmit={handleFormThreeSubmit}
          className={`-translate-y-[8%] bg-secondary px-4 py-2 sm:-translate-y-[19%] sm:px-[12%] sm:py-[5%] ${isFormThreeHidden && "hidden"}`}
        >
          <h2 className="text-[13px] font-medium capitalize leading-[2em] text-primary sm:pb-[1em] sm:text-[18px] md:text-[23px] lg:text-[28px] xl:text-[33px] 2xl:text-[38px]">
            Membership information
          </h2>

          {/* Membership Type */}
          <fieldset>
            <RegistrationLabel text="Choose membership type" />
            <br />
            <div className="flex justify-between py-1">
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="membership-type"
                  id="monthly"
                  value="monthly"
                  required
                />
                <RegistrationLabel
                  htmlFor="monthly"
                  text="Monthly membership"
                  type="sub"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="membership-type"
                  id="annual"
                  value="annual"
                  required
                />
                <RegistrationLabel
                  htmlFor="annual"
                  text="Annual membership"
                  type="sub"
                />
              </div>
              <div></div>
            </div>
          </fieldset>

          {/* Plan */}
          <fieldset className="py-[3%]">
            <RegistrationLabel text="Choose your plan" />
            <br />
            <div className="flex justify-between py-1">
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="plan-type"
                  id="standard-plan"
                  value="standard-plan"
                  required
                />
                <RegistrationLabel
                  htmlFor="standard-plan"
                  text="Standard"
                  type="sub"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="plan-type"
                  id="premium-plan"
                  value="premium-plan"
                  required
                />
                <RegistrationLabel
                  htmlFor="premium-plan"
                  text="Premium"
                  type="sub"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="plan-type"
                  id="platinum"
                  value="platinum"
                  required
                />
                <RegistrationLabel
                  htmlFor="platinum"
                  text="Platinum"
                  type="sub"
                />
              </div>
            </div>
          </fieldset>

          {/* Total Fee */}
          <RegistrationLabel text="Total fee: $ 35" />

          {/* Trainer */}
          <fieldset className="pt-[3%]">
            <RegistrationLabel text="Choose your trainer" />
            <br />
            <div className="flex justify-between py-1">
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="trainer"
                  id="kevin-dias"
                  value="kevin-dias"
                  required
                />
                <RegistrationLabel
                  htmlFor="kevin-dias"
                  text="Kevin dias"
                  type="sub"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="trainer"
                  id="brian-domi"
                  value="brian-domi"
                  required
                />
                <RegistrationLabel
                  htmlFor="brian-domi"
                  text="Brian domi"
                  type="sub"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="trainer"
                  id="shene-lofi"
                  value="shene-lofi"
                  required
                />
                <RegistrationLabel
                  htmlFor="shene-lofi"
                  text="Shene Lofi"
                  type="sub"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="trainer"
                  id="alex-guvi"
                  value="alex-guvi"
                  required
                />
                <RegistrationLabel
                  htmlFor="alex-guvi"
                  text="Alex guvi"
                  type="sub"
                />
              </div>
            </div>
          </fieldset>

          {/* Start date */}
          <fieldset className="pt-[3%]">
            <RegistrationLabel
              htmlFor="start-date"
              text="Preferred start date"
            />
            <br />
            <RegistrationInput type="date" name="start-date" classes="w-2/5" />
            <br />
          </fieldset>

          {/* Terms and coditions */}
          <fieldset className="flex items-center gap-x-2 pb-[50%] pt-[3%]">
            <input type="checkbox" id="conditions" name="conditions" required />
            <RegistrationLabel
              htmlFor="conditions"
              text="I agree to the terms and conditons"
              type="sub"
            />
          </fieldset>

          <div className="flex justify-between pt-[1.4em]">
            <button
              type="button"
              onClick={handleFormThreeExit}
              className="cursor-pointer bg-primary px-[1em] py-[0.5em] text-[10px] font-semibold capitalize leading-none text-black md:text-[12px] xl:text-[14px] 2xl:text-[16px]"
            >
              Back
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-primary px-[1em] py-[0.5em] text-[10px] font-semibold capitalize leading-none text-black md:text-[12px] xl:text-[14px] 2xl:text-[16px]"
            >
              Next
            </button>
          </div>

          <div className="mx-auto flex w-fit items-center pb-4 pt-3 sm:pt-[15%]">
            <div className="size-[12px] rounded-full border-2 border-primary bg-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
            <div className="h-[2px] w-[15px] bg-primary sm:w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]"></div>

            <div className="size-[12px] rounded-full border-2 border-primary bg-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
            <div className="h-[2px] w-[15px] bg-primary sm:w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]"></div>

            <div className="size-[12px] rounded-full border-2 border-primary bg-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
            <div className="h-[2px] w-[15px] bg-primary sm:w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]"></div>

            <div className="size-[12px] rounded-full border-2 border-primary sm:size-[16px] md:size-[20px] lg:size-[24px] xl:size-[28px] 2xl:size-[32px]"></div>
          </div>
        </form>
        {/* -------- -------- PAYMENT FORM -------- -------- */}
        <form className={isFormFourHidden && "hidden"}>
          <h1 className="-translate-y-[30vw] text-center text-3xl">
            Payment Gateway
          </h1>
        </form>
      </section>
    </>
  );
};

export default Registration;
