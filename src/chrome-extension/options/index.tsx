import { useEffect, useState } from "react";
import WaterMark from "@/components/WaterMark";
import "../global.css";

const Options = () => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className='relative h-screen'>
      <img
        src='/assets/bg.jpg'
        alt='Background'
        className='absolute inset-0 h-full w-full object-cover z-0'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white'>
        {loading ? (
          <WaterMark
            height={100}
            width={100}
            spinner={true}
            text='Welcome to your dashboard'
          />
        ) : (
          <p>Search component goes here</p>
        )}
      </div>
    </div>
  );
};

export default Options;
