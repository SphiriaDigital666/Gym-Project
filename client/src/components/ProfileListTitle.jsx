import edit from "../assets/images/Profile/edit.png";

const ProfileListTitle = ({ title }) => {
  return (
    <div className="flex items-end gap-x-1 text-[10px] leading-none sm:text-[14px] md:text-[18px] lg:text-[21px] xl:text-[24px] 2xl:text-[27px]">
      <h4>
        {title}
        <hr className="border border-primary" />
      </h4>
      <button className="cursor-pointer">
        <img
          src={edit}
          alt="Edit information"
          className="size-[12px] sm:size-[16px] md:size-[19px] lg:size-[22px] xl:size-[25px] 2xl:size-[28px]"
        />
      </button>
    </div>
  );
};

export default ProfileListTitle;
