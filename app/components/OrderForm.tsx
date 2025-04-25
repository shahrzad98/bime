"use client";
import AddressesDrawer from "@/app/components/AddressesDrawer";
import ButtonComponent from "@/app/components/core/ButtonComponent";
import HeaderTitle from "@/app/components/core/HeaderTitle";
import ErrorHandlingDrawer from "@/app/components/ErrorHandlingDrawer";
import { submitOrder, submitOrderServer } from "@/app/http/handler/actions";
import { AddressItem, SubmitOrderRq } from "@/app/types/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
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
  addressId: z.string().min(1),
  session: z.string().min(1),
});

type InsuranceFormData = z.infer<typeof ownerSchema>;

interface OrderFormProps {
  getOrderSuccess: (value: boolean) => void;
  setOrderSucceed: (value: boolean) => void;
}

const OrderForm = ({ getOrderSuccess, setOrderSucceed }: OrderFormProps) => {
  const [addressDrawerOpened, { open: openAddressDrawer, close: closeAddressDrawer }] = useDisclosure(false);
  const [errorDrawerOpened, { open: openErrorDrawer, close: closeErrorDrawer }] = useDisclosure(false);

  const form = useForm<InsuranceFormData>({
    resolver: zodResolver(ownerSchema),
    mode: "onSubmit",
    defaultValues: {
      nationalId: "",
      phoneNumber: "",
      addressId: "",
      session: "",
    },
  });
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = form;

  const createOrder = useMutation({
    mutationFn: (body: SubmitOrderRq) => submitOrder(body),
    onError: () => {
      openErrorDrawer();
    },
  });

  const createOrderServer = useMutation({
    mutationFn: (body: SubmitOrderRq) => submitOrderServer(body),
    onSuccess: () => {
      closeErrorDrawer();
      getOrderSuccess(true);
      setOrderSucceed(true);
    },
    onError: () => {
      openErrorDrawer();
    },
  });

  const onSubmit = (data: InsuranceFormData) => {
    createOrder.mutate(data);
  };

  const onRetry = () => {
    createOrderServer.mutate(getValues());
  };
  const [selectedAddress, setSelectedAddress] = useState<AddressItem>();

  function getAddress(data: AddressItem | undefined) {
    setSelectedAddress(data);
  }

  return (
    <>
      <HeaderTitle title="مشخصات مالک خودرو" />
      <div className="bg-white px-[19px] py-6">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text className="mb-2 text-xl font-semibold">لطفا اطلاعات شخصی مالک خودرو را وارد کنید:</Text>
            <div className="relative">
              <Input
                // value={"0440098300"}
                {...register("nationalId")}
                error={errors.nationalId?.message}
                type="number"
                classNames={{ input: "mb-7 h-12 border-gray-400 placeholder:font-semibold placeholder:text-gray-500" }}
                placeholder="کد ملی"
              />
              {errors.nationalId && (
                <Text className="absolute -bottom-8 mb-2 text-sm text-red-500">{errors.nationalId.message}</Text>
              )}
            </div>
            <div className="relative">
              <Input
                // value={"09127766194"}
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
                type="number"
                classNames={{
                  input: "mb-12 h-12 border-gray-400 placeholder:font-semibold placeholder:text-gray-500",
                }}
                placeholder="شماره تلفن همراه"
              />
              {errors.phoneNumber && (
                <Text className="absolute -bottom-8 mb-2 text-sm text-red-500">{errors.phoneNumber.message}</Text>
              )}
            </div>
            <Text className="mb-[6px] text-xl font-semibold">آدرس جهت درج روی بیمه نامه</Text>
            {selectedAddress ? (
              <Text className="mb-20 mt-[15px] text-sm text-gray-400">{selectedAddress?.details}</Text>
            ) : (
              <Text className={`mb-[6px] text-lg ${errors.addressId && "text-red-500"}`}>
                لطفا آدرسی را که می خواهید روی بیمه نامه درج شود، وارد کنید.
              </Text>
            )}
            <div className="flex flex-col items-end">
              {!selectedAddress && (
                <Button
                  onClick={openAddressDrawer}
                  className="mb-6 h-12 w-full bg-main-yellow text-xl font-semibold text-black hover:bg-main-yellow"
                >
                  انتخاب از آدرس های من
                </Button>
              )}

              <ButtonComponent
                disabledState={!watch("nationalId") || !watch("phoneNumber")}
                variant="primary"
                loadingState={createOrder.isPending}
              >
                تایید و ادامه
              </ButtonComponent>
            </div>
            <AddressesDrawer opened={addressDrawerOpened} close={closeAddressDrawer} getAddress={getAddress} />
            <ErrorHandlingDrawer
              opened={errorDrawerOpened}
              loading={createOrderServer.isPending}
              close={closeErrorDrawer}
              onTryAgain={onRetry}
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default OrderForm;
