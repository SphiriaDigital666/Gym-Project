import { useRouteError } from "react-router-dom";
import ErrorImage from "../assets/images/Error/GYMError.png";

const Error = () => {
  const error = useRouteError();
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <img src={ErrorImage} className="mb-3 w-1/4" />
      <p className="mb-2 text-center text-5xl text-[20px] font-bold text-black sm:text-[25px] md:text-[30px] lg:text-[36px] xl:text-[44px] 2xl:text-[48px]">
        404 Page!
      </p>
      <p className="mb-2 text-center text-[14px] font-semibold text-black sm:text-[18px] md:text-[21px] lg:text-[25px] xl:text-[30px] 2xl:text-[32px]">
        Oops! You ran into a wrong URL
      </p>
      <p className="mb-2 text-center text-[11px] font-medium text-black sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[21px]">
        It looks like the page doesn't exist - please check the URL and try
        again.{" "}
      </p>
      <a
        href="/"
        className="mt-3 text-center text-[12px] font-normal text-black underline hover:text-yellow-300 sm:text-[15px] md:text-[17px] lg:text-[18px] xl:text-[20px] 2xl:text-[23px]"
      >
        BACK TO HOME
      </a>
    </div>
  );
};

export default Error;
