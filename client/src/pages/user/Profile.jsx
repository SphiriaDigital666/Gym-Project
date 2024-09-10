import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ImageSection from "../../components/ImageSection";
import ProfileListItem from "../../components/ProfileListItem";
import ProfileListTitle from "../../components/ProfileListTitle";

import bgMobile from "../../assets/images/Profile/bg-mobile.png";
import bgDesktop from "../../assets/images/Profile/bg-desktop.png";
import profilePic from "../../assets/images/Profile/profile-pic.png";
import editProfilePic from "../../assets/images/Profile/edit-profile-pic.png";
import logout from "../../assets/images/Profile/logout.png";

const Profile = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    tel: "not specified",
    DOB: "not specified",
    currentJob: "not specified",
    gender: "not specified",
    address: "not specified",
    currentWeight: "not specified",
    height: "not specified",
    goalWeight: "not specified",
  });
  const [emergencyInfo, setEmergencyInfo] = useState({
    emergencyFullName: "not specified",
    emergencyRelationship: "not specified",
    emergencyTel: "not specified",
  });
  const [medicalInfo, setMedicalInfo] = useState({
    allergyDetails: "not specified",
  });
  const [membershipInfo, setMembershipInfo] = useState({
    membershipType: "not specified",
    planType: "not specified",
    startDate: "not specified",
    trainer: "not specified",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
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
        setPersonalInfo((prev) => ({ ...prev, ...data.userInfo.personalInfo }));
        setEmergencyInfo((prev) => ({
          ...prev,
          ...data.userInfo.emergencyInfo,
        }));
        setMedicalInfo((prev) => ({
          ...prev,
          ...data.userInfo.medicalInfo,
        }));
        setMembershipInfo((prev) => ({
          ...prev,
          ...data.userInfo.membershipInfo,
        }));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          "We couldn't fetch your details, please try again later.",
        );
      });
  }, [navigate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <ImageSection bgMobile={bgMobile} bgDesktop={bgDesktop} />
      <section className="bg-secondary px-[10vw] pb-[8%] sm:px-[18vw]">
        {/* Profile picture */}
        <figure className="text-center">
          <div className="flex h-[40px] w-full items-end justify-center sm:h-[55px] md:h-[70px] lg:h-[85px] xl:h-[100px] 2xl:h-[115px]">
            <div className="relative w-[80px] rounded-full border-2 border-primary sm:w-[110px] md:w-[140px] lg:w-[170px] xl:w-[200px] 2xl:w-[230px]">
              <img
                src={profilePic}
                alt="Profile pic"
                className="w-full p-[6%]"
              />
              <button className="absolute bottom-0 right-0 w-[22px] rounded-full bg-[#D9D9D9CC] sm:bottom-[5%] sm:w-[24px] md:right-[5%] md:w-[26px] lg:bottom-[7%] lg:w-[28px] xl:right-[7%] xl:w-[30px] 2xl:bottom-[8%] 2xl:w-[32px]">
                <img
                  src={editProfilePic}
                  alt="Edit profile pic"
                  className="p-[20%]"
                />
              </button>
            </div>
          </div>
          <figcaption className="pt-[0.8em] text-[11px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[23px]">
            <h4>{personalInfo.fullName}</h4>
            <h4>#N5984</h4>
          </figcaption>
        </figure>
        {/* Error message */}
        {errorMessage && (
          <p className="-mb-[1em] mt-[1.4em] text-center text-[8px] text-red-300 md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">
            {errorMessage}
          </p>
        )}
        {/* Profile form */}
        <form
          onSubmit={handleFormSubmit}
          className="mt-[5%] border-2 border-primary px-[5%] pb-[5%]"
        >
          {/* Personal info*/}
          <fieldset className="pt-[7%]">
            <ProfileListTitle title="Personal information" />
            <ul className="grid grid-cols-2 leading-none">
              <ProfileListItem name="Full name" value={personalInfo.fullName} />
              <ProfileListItem name="Email" value={personalInfo.email} />
              <ProfileListItem name="Phone number" value={personalInfo.tel} />
              <ProfileListItem name="Date of birth" value={personalInfo.DOB} />
              <ProfileListItem
                name="Current job title"
                value={personalInfo.currentJob}
              />
              <ProfileListItem name="Gender" value={personalInfo.gender} />
              <ProfileListItem name="Address" value={personalInfo.address} />
              <ProfileListItem name="City" value="not specified" />
              <ProfileListItem name="Zip code" value="not specified" />
              <ProfileListItem
                name="Current weight"
                value={personalInfo.currentWeight}
              />
              <ProfileListItem name="Height" value={personalInfo.height} />
              <ProfileListItem
                name="Goal weight"
                value={personalInfo.goalWeight}
              />
            </ul>
          </fieldset>
          {/* Emergency contact info */}
          <fieldset className="pt-[7%]">
            <ProfileListTitle title="Emergency contact information" />
            <ul className="grid grid-cols-2 leading-none">
              <ProfileListItem
                name="Full name"
                value={emergencyInfo.emergencyFullName}
              />
              <ProfileListItem
                name="Contact number"
                value={emergencyInfo.emergencyTel}
              />
              <ProfileListItem
                name="Relationship"
                value={emergencyInfo.emergencyRelationship}
              />
            </ul>
          </fieldset>
          {/* Medical info */}
          <fieldset className="pt-[7%]">
            <ProfileListTitle title="Medical information" />
            <ul className="grid grid-cols-1 leading-none">
              <ProfileListItem
                name="Medical condition or allergies"
                value={medicalInfo.allergyDetails}
              />
            </ul>
          </fieldset>
          {/* Membership info */}
          <fieldset className="pt-[7%]">
            <ProfileListTitle title="Membership information" />
            <ul className="grid grid-cols-2 leading-none">
              <ProfileListItem
                name="Membership type"
                value={membershipInfo.membershipType}
              />
              <li className="pt-[1.5em] text-[10px] sm:text-[13px] md:text-[15px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">
                <p className="capitalize">Renew subscription</p>
                <button
                  type="button"
                  className="mt-[0.6em] bg-primary px-[0.8em] py-[0.4em] text-[7px] font-semibold text-black sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]"
                >
                  Click here
                </button>
              </li>
              <ProfileListItem name="My plan" value={membershipInfo.planType} />
              <div></div>
              <ProfileListItem
                name="Preferred start date"
                value={membershipInfo.startDate}
              />
              <div></div>
              <ProfileListItem
                name="Assigned trainer"
                value={membershipInfo.trainer}
              />
            </ul>
          </fieldset>
          {/* Image upload */}
          <fieldset className="mx-auto flex w-[70%] flex-col items-center pt-[7%]">
            <h4 className="text-[8px] xl:text-[20px]">Upload Your Photos</h4>
            <button className="self-end text-[8px] underline xl:text-[20px]">
              See more
            </button>
          </fieldset>
          {/* Buttons */}
          <fieldset className="mt-[7%] flex items-center justify-between leading-none">
            <div className="flex items-center">
              <img
                src={logout}
                alt="Logout"
                className="size-[10px] sm:size-[14px] md:size-[18px] lg:size-[22px] xl:size-[25px] 2xl:size-[28px]"
              />
              <button
                type="button"
                onClick={logoutUser}
                className="ms-[0.5em] text-[7px] capitalize underline sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]"
              >
                Logout
              </button>
            </div>
            <div className="flex gap-x-2">
              <button
                type="reset"
                className="border border-primary px-[0.8em] py-[0.4em] text-[7px] font-semibold capitalize sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border border-primary bg-primary px-[0.8em] py-[0.4em] text-[7px] font-semibold capitalize text-black sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]"
              >
                Save changes
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
};

export default Profile;
