import ImageSection from "../../components/ImageSection";
import ProfileListItem from "../../components/ProfileListItem";
import ProfileListTitle from "../../components/ProfileListTitle";

import bgMobile from "../../assets/images/Profile/bg-mobile.png";
import bgDesktop from "../../assets/images/Profile/bg-desktop.png";
import profilePic from "../../assets/images/Profile/profile-pic.png";
import editProfilePic from "../../assets/images/Profile/edit-profile-pic.png";
import logout from "../../assets/images/Profile/logout.png";

const personalInfo = {
  fullName: "Dominic Brian",
  email: "dominicbrian@gmail.com",
  phone: "+94 567 3478",
  DOB: "10/06/2001",
  jobTitle: "Gender",
  gender: "Male",
  address: "Colombo Road, 34/7, Peradeniya",
  city: "Kandy",
  zip: "20145",
  currentWeight: "87kg",
  height: "45cm",
  goalWeight: "70kg",
};

const emergencyContactInfo = {
  fullName: "Dominic Brian",
  phone: "+94 567 3478",
  relationship: "Brother",
};

const medicalInfo = {
  isAllergic: "No",
};

const membershipInfo = {
  type: "Monthly Membership",
  plan: "Standard",
  startDate: "26/08/2024",
  trainer: "Kevin Dias",
};

const Profile = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
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
            <h4>Dominic Brian</h4>
            <h4>#N5984</h4>
          </figcaption>
        </figure>
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
              <ProfileListItem name="Phone number" value={personalInfo.phone} />
              <ProfileListItem name="Date of birth" value={personalInfo.DOB} />
              <ProfileListItem
                name="Current job title"
                value={personalInfo.jobTitle}
              />
              <ProfileListItem name="Gender" value={personalInfo.gender} />
              <ProfileListItem name="Address" value={personalInfo.address} />
              <ProfileListItem name="City" value={personalInfo.city} />
              <ProfileListItem name="Zip code" value={personalInfo.zip} />
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
                value={emergencyContactInfo.fullName}
              />
              <ProfileListItem
                name="Contact number"
                value={emergencyContactInfo.phone}
              />
              <ProfileListItem
                name="Relationship"
                value={emergencyContactInfo.relationship}
              />
            </ul>
          </fieldset>
          {/* Medical info */}
          <fieldset className="pt-[7%]">
            <ProfileListTitle title="Medical information" />
            <ul className="grid grid-cols-1 leading-none">
              <ProfileListItem
                name="Medical condition or allergies"
                value={medicalInfo.isAllergic}
              />
            </ul>
          </fieldset>
          {/* Membership info */}
          <fieldset className="pt-[7%]">
            <ProfileListTitle title="Membership information" />
            <ul className="grid grid-cols-2 leading-none">
              <ProfileListItem
                name="Membership type"
                value={membershipInfo.type}
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
              <ProfileListItem name="My plan" value={membershipInfo.plan} />
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
