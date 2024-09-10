import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ImageSection from "../../components/ImageSection";
import RegistrationLabel from "../../components/RegistrationLabel";
import RegistrationInput from "../../components/RegistrationInput";
import bgMobile from "../../assets/images/Registration/bgMobile.png";
import bgDesktop from "../../assets/images/Registration/bgDesktop.png";
import "../../assets/styles/Registration.css";

const Registration = () => {
  const navigate = useNavigate();
  const [isFormOneHidden, setIsFormOneHidden] = useState(true);
  const [isFormTwoHidden, setIsFormTwoHidden] = useState(true);
  const [isFormThreeHidden, setIsFormThreeHidden] = useState(true);
  const [isFormFourHidden, setIsFormFourHidden] = useState(true);
  const [isTextAreaRequired, setIsTextAreaRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

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
  const [emergencyInfo, setEmergencyInfo] = useState({
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyRelationship: "",
    emergencyTel: "",
  });
  const [medicalInfo, setMedicalInfo] = useState({
    isAllergic: "",
    allergyDetails: "",
  });
  const [membershipInfo, setMembershipInfo] = useState({
    membershipType: "",
    planType: "",
    trainer: "",
    startDate: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/registration", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setIsFormOneHidden(false);
          return setErrorMessage(
            "We couldn't fetch your details, please try again later.",
          );
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          localStorage.removeItem("token");
          return navigate("/login");
        }
        setPersonalInfo((prev) => ({
          ...prev,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        }));
        setIsFormOneHidden(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          "We couldn't fetch your details, please try again later.",
        );
      });
  }, [navigate]);

  const handlePersonalInfoDataChange = (key, value) =>
    setPersonalInfo((prev) => ({ ...prev, [key]: value }));

  const handleEmergencyInfoDataChange = (key, value) =>
    setEmergencyInfo((prev) => ({ ...prev, [key]: value }));

  const handleMedicalInfoDataChange = (key, value) =>
    setMedicalInfo((prev) => ({ ...prev, [key]: value }));

  const handleMembershipInfoDataChange = (key, value) =>
    setMembershipInfo((prev) => ({ ...prev, [key]: value }));

  const handleFormOneSubmit = (e) => {
    e.preventDefault();
    setIsFormOneHidden(true);
    setIsFormTwoHidden(false);
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
    fetch("http://localhost:8080/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalInfo: personalInfo,
        emergencyInfo: emergencyInfo,
        medicalInfo: medicalInfo,
        membershipInfo: membershipInfo,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return setErrorMessage(
            "Couldn't complete registration. Please try again later.",
          );
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          setErrorMessage(data.error);
          setIsFormThreeHidden(true);
          return setIsFormOneHidden(false);
        }
        setPersonalInfo({
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
        setEmergencyInfo({
          emergencyFirstName: "",
          emergencyLastName: "",
          emergencyRelationship: "",
          emergencyTel: "",
        });
        setMedicalInfo({
          isAllergic: "",
          allergyDetails: "",
        });
        setMembershipInfo({
          membershipType: "",
          planType: "",
          trainer: "",
          startDate: "",
        });
        setIsFormThreeHidden(true);
        setIsFormFourHidden(false);
      })
      .catch((err) => {
        setErrorMessage(
          "Couldn't complete registration. Please try again later.",
        );
        console.log(err);
      });
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

          {/* Error message */}
          {errorMessage && (
            <p className="mt-[1.4em] text-[8px] text-red-300 md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">
              {errorMessage}
            </p>
          )}

          {/* Full name */}
          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel text="Full name" classes="col-span-2" />
            <RegistrationInput
              type="text"
              id="first-name"
              name="firstName"
              value={personalInfo.firstName}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="text"
              id="last-name"
              name="lastName"
              value={personalInfo.lastName}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
              }
            />
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
          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel htmlFor="email" text="Email address" />
            <RegistrationLabel htmlFor="tel" text="Phone number" />
            <RegistrationInput
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="tel"
              id="tel"
              name="tel"
              value={personalInfo.tel}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
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
              value={personalInfo.DOB}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
              }
              classes="w-full"
            />
            <select
              id="gender"
              name="gender"
              value={personalInfo.gender}
              onChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
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
              value={personalInfo.addressOne}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
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
              value={personalInfo.addressTwo}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
              }
              required={false}
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
              value={personalInfo.currentWeight}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="number"
              id="height"
              name="height"
              value={personalInfo.height}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
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
              value={personalInfo.goalWeight}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="text"
              id="current-job"
              name="currentJob"
              value={personalInfo.currentJob}
              handleChange={(e) =>
                handlePersonalInfoDataChange(e.target.name, e.target.value)
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
          className={`-translate-y-[8%] bg-secondary px-4 py-2 sm:-translate-y-[13.5%] sm:px-[12%] sm:py-[5%] ${
            isFormTwoHidden && "hidden"
          }`}
        >
          <h2 className="text-[13px] font-medium capitalize leading-[2em] text-primary sm:pb-[1em] sm:text-[18px] md:text-[23px] lg:text-[28px] xl:text-[33px] 2xl:text-[38px]">
            Emergency Contact information
          </h2>

          {/* Emergency contact name */}
          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel
              text="Emergency contact name"
              classes="col-span-2"
            />
            <RegistrationInput
              type="text"
              id="emergency-first-name"
              name="emergencyFirstName"
              value={emergencyInfo.emergencyFirstName}
              handleChange={(e) =>
                handleEmergencyInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="text"
              id="emergency-last-name"
              name="emergencyLastName"
              value={emergencyInfo.emergencyLastName}
              handleChange={(e) =>
                handleEmergencyInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationLabel
              htmlFor="emergency-first-name"
              text="First name"
              type="sub"
            />
            <RegistrationLabel
              htmlFor="emergency-last-name"
              text="Last name"
              type="sub"
            />
          </fieldset>

          {/* Relationship and phone */}
          <fieldset className="grid grid-cols-2 grid-rows-3 gap-x-4 sm:gap-x-[8%]">
            <RegistrationLabel
              htmlFor="emergency-relationship"
              text="Relationship"
            />
            <RegistrationLabel htmlFor="emergency-tel" text="Phone number" />
            <RegistrationInput
              type="text"
              id="emergency-relationship"
              name="emergencyRelationship"
              value={emergencyInfo.emergencyRelationship}
              handleChange={(e) =>
                handleEmergencyInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationInput
              type="tel"
              id="emergency-tel"
              name="emergencyTel"
              value={emergencyInfo.emergencyTel}
              handleChange={(e) =>
                handleEmergencyInfoDataChange(e.target.name, e.target.value)
              }
            />
            <RegistrationLabel
              htmlFor="emergency-relationship"
              text="Specify relationship"
              type="sub"
            />
            <RegistrationLabel
              htmlFor="emergency-tel"
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
                  name="isAllergic"
                  onClick={() => setIsTextAreaRequired(true)}
                  onChange={(e) =>
                    handleMedicalInfoDataChange(e.target.name, e.target.value)
                  }
                  id="yes"
                  value="true"
                  required
                />
                <RegistrationLabel htmlFor="yes" text="Yes" type="sub" />
              </div>
              <div className="flex items-center gap-x-[30%]">
                <input
                  type="radio"
                  name="isAllergic"
                  onClick={() => {
                    setIsTextAreaRequired(false);
                    handleMedicalInfoDataChange("allergyDetails", "");
                  }}
                  onChange={(e) =>
                    handleMedicalInfoDataChange(e.target.name, e.target.value)
                  }
                  id="no"
                  value="false"
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
              {isTextAreaRequired ? (
                <textarea
                  id="allergy-details"
                  name="allergyDetails"
                  rows="4"
                  onChange={(e) =>
                    handleMedicalInfoDataChange(e.target.name, e.target.value)
                  }
                  className="w-full origin-top border border-white bg-secondary px-[1ch] text-[8px] text-white outline-none sm:px-[2ch] sm:py-[1.3em] md:text-[10px] xl:text-[12px] 2xl:text-[14px]"
                  required
                ></textarea>
              ) : (
                <textarea
                  name="allergyDetails"
                  id="allergy-details"
                  rows="4"
                  value=""
                  className="w-full origin-top border border-white bg-secondary px-[1ch] text-[8px] text-white outline-none sm:px-[2ch] sm:py-[1.3em] md:text-[10px] xl:text-[12px] 2xl:text-[14px]"
                  readOnly
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
          className={`-translate-y-[8%] bg-secondary px-4 py-2 sm:-translate-y-[19%] sm:px-[12%] sm:py-[5%] ${
            isFormThreeHidden ? "hidden" : ""
          }`}
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
                  name="membershipType"
                  id="monthly"
                  value="monthly"
                  onChange={(e) =>
                    handleMembershipInfoDataChange(
                      e.target.name,
                      e.target.value,
                    )
                  }
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
                  name="membershipType"
                  id="annual"
                  value="annual"
                  onChange={(e) =>
                    handleMembershipInfoDataChange(
                      e.target.name,
                      e.target.value,
                    )
                  }
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
                  name="planType"
                  id="standard-plan"
                  value="standard"
                  onChange={(e) =>
                    handleMembershipInfoDataChange(
                      e.target.name,
                      e.target.value,
                    )
                  }
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
                  name="planType"
                  id="premium-plan"
                  value="premium"
                  onChange={(e) =>
                    handleMembershipInfoDataChange(
                      e.target.name,
                      e.target.value,
                    )
                  }
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
                  name="planType"
                  id="platinum-plan"
                  value="platinum"
                  onChange={(e) =>
                    handleMembershipInfoDataChange(
                      e.target.name,
                      e.target.value,
                    )
                  }
                  required
                />
                <RegistrationLabel
                  htmlFor="platinum-plan"
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
                  value="Kevin Dias"
                  onChange={(e) =>
                    handleMembershipInfoDataChange(
                      e.target.name,
                      e.target.value,
                    )
                  }
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
                  value="Brian Domi"
                  onChange={(e) =>
                    handleMembershipInfoDataChange(
                      e.target.name,
                      e.target.value,
                    )
                  }
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
                  value="Shene Lofi"
                  onChange={(e) =>
                    handleMembershipInfoDataChange(
                      e.target.name,
                      e.target.value,
                    )
                  }
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
                  value="Alex Guvi"
                  onChange={(e) =>
                    handleMembershipInfoDataChange(
                      e.target.name,
                      e.target.value,
                    )
                  }
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
            <RegistrationInput
              type="date"
              id="start-date"
              name="startDate"
              handleChange={(e) =>
                handleMembershipInfoDataChange(e.target.name, e.target.value)
              }
              classes="w-2/5"
            />
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
        <form className={isFormFourHidden ? "hidden" : ""}>
          <h1 className="mb-[6%] -translate-y-[30vw] text-center text-3xl">
            Payment Gateway
          </h1>
        </form>
      </section>
    </>
  );
};

export default Registration;
