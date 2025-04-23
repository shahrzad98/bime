import HeaderTitle from "@/app/components/HeaderTitle";
import { Text } from "@mantine/core";

const Insurance = () => {
  return (
    <>
      <HeaderTitle title="مشخصات بیمه نامه" />
      <div className="mx-auto items-center bg-white px-10 pb-8 pt-6">
        {/*licence*/}
        <div className="flex h-[50px] w-[280px] rounded-md border-2 border-black text-center text-xxl font-semibold">
          <div className="h-full w-12 place-content-center border-l-2 border-black">60</div>
          <div className="flex h-full flex-grow items-center justify-center">
            <div>988</div>
            <div className="mx-6">ک</div>
            <div>64</div>
          </div>
          <div className="place-content-l bg-main-blue h-full w-[55px] border-r-2 border-black text-xs text-white">
            <div className="p-2 text-right">
              <img src="/flag.png" alt="flag" className="h-[15px] w-[32px]" />
              .I.R
            </div>
          </div>
        </div>
        {/* end of licence*/}
        <div className="mt-6">
          <div className="my-2 flex justify-between text-lg">
            <Text className="text-gray-400">شرکت بیمه گر</Text>
            <hr className="dashed mt-[14px]" />
            <Text>پارسیان</Text>
          </div>
          <div className="my-2 flex justify-between text-lg">
            <Text className="text-gray-400">برند خودرو</Text>
            <hr className="dashed mt-[14px]" />
            <Text>پارسیان</Text>
          </div>
          <div className="my-2 flex justify-between text-lg">
            <Text className="text-gray-400">مدل خودرو</Text>
            <hr className="dashed mt-[14px]" />
            <Text>
              <span>206</span> تیپ 6
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insurance;
