import { useRouteError } from "react-router-dom";
import ErrorImage from "../assets/images/Error/GYMError.png";


const Error = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white ">
      <img
        src={ErrorImage}
        className="w-1/4 mb-3"
      />
      <p className="text-center text-5xl text-black mb-2 font-bold text-[20px] sm:text-[25px] md:text-[30px] lg:text-[36px] xl:text-[44px] 2xl:text-[48px]">
        404 Page!
      </p>
      <p className="text-center  font-semibold mb-2 text-black text-[14px] sm:text-[18px] md:text-[21px] lg:text-[25px] xl:text-[30px] 2xl:text-[32px]">
        Oops! You ran into a wrong URL
      </p>
      <p className="text-center  font-medium text-black mb-2 text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[21px]">
      It looks like the page doesn't exist - please check the URL and try again.      </p>
      <a href="/" className="text-center text-black underline mt-3 hover:text-yellow-300 font-normal text-[12px] sm:text-[15px] md:text-[17px] lg:text-[18px] xl:text-[20px] 2xl:text-[23px]">
      BACK TO HOME
      </a>
      
    </div>
  );
};

export default Error;