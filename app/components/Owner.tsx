"use client";
import Address from "@/app/components/Address";
import HeaderTitle from "@/app/components/HeaderTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const mobileRegex = new RegExp("^(\\+98|0)?9\\d{9}$");

const ownerSchema = z.object({
  nationalId: z
    .string()
    .min(1, { message: "کد ملی الزامی است" })
    .regex(/^\d{10}$/, { message: "کد ملی باید ۱۰ رقم باشد" })
    .refine(
      (value) => {
        if (!/^\d{10}$/.test(value)) return false;

        const check = parseInt(value[9], 10);
        let sum = 0;

        for (let i = 0; i < 9; i++) {
          sum += parseInt(value[i], 10) * (10 - i);
        }

        sum %= 11;

        return (sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum);
      },
      { message: "کد ملی وارد شده معتبر نیست" },
    ),
  phoneNumber: z
    .string()
    .min(1, { message: "شماره موبایل الزامی است" })
    .min(11, { message: "شماره موبایل باید 11 رقم باشد" })
    .max(11, { message: "شماره موبایل باید 11 رقم باشد" })
    .regex(mobileRegex, {
      message: "شماره موبایل معتبر نیست (باید با 09 شروع شود)",
    }),
  address: z.string(),
});

type OwnerFormData = z.infer<typeof ownerSchema>;

const Owner = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<OwnerFormData>({
    resolver: zodResolver(ownerSchema),
    mode: "onSubmit",
    defaultValues: {
      nationalId: "",
      phoneNumber: "",
      address: "",
    },
  });
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = form;
  const onSubmit = (data: OwnerFormData) => {
    console.log("Form submitted:", data);
  };
  return (
    <>
      <HeaderTitle title="مشخصات مالک خودرو" />
      <div className="bg-white px-[19px] py-6">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text className="mb-2 text-xl font-semibold">لطفا اطلاعات شخصی مالک خودرو را وارد کنید:</Text>
            <div className="relative">
              <Input
                {...register("nationalId")}
                error={errors.nationalId?.message}
                type="number"
                classNames={{ input: "mb-7 h-12" }}
                placeholder="کد ملی"
              />
              {errors.nationalId && (
                <Text className="absolute -bottom-8 mb-2 text-sm text-red-500">{errors.nationalId.message}</Text>
              )}
            </div>
            <div className="relative">
              <Input
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
                type="number"
                classNames={{ input: "mb-12 h-12" }}
                placeholder="شماره تلفن همراه"
              />
              {errors.phoneNumber && (
                <Text className="absolute -bottom-8 mb-2 text-sm text-red-500">{errors.phoneNumber.message}</Text>
              )}
            </div>
            <Text className="mb-[6px] text-xl font-semibold">آدرس جهت درج روی بیمه نامه</Text>
            <Text className="mb-[6px] text-lg">لطفا آدرسی را که می خواهید روی بیمه نامه درج شود، وارد کنید.</Text>
            <div className="flex flex-col items-end">
              <Button
                onClick={open}
                className="mb-6 h-12 w-full bg-main-yellow text-xl font-semibold text-black hover:bg-main-yellow"
              >
                انتخاب از آدرس های من
              </Button>
              <Button
                type="submit"
                disabled={!watch("nationalId") || !watch("phoneNumber")}
                className="gray-600 h-12 w-[131px] bg-black text-xl font-semibold text-white hover:bg-black disabled:bg-gray-300 disabled:text-gray-400"
              >
                تایید و ادامه
              </Button>
            </div>
            <Address opened={opened} close={close} />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Owner;
