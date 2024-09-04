const ProfileListItem = ({ name, value }) => {
  return (
    <li className="pt-[1.5em] text-[10px] sm:text-[13px] md:text-[15px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">
      <p className="capitalize">{name}</p>
      <p className="pt-[0.6em] text-[7px] text-[#808080] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
        {value}
      </p>
    </li>
  );
};

export default ProfileListItem;
