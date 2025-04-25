import { getAllAddresses } from "@/app/http/handler/actions";
import { AddressItem } from "@/app/types/order";
import { Button, Drawer, Radio, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

interface AddressProps {
  address: AddressItem;
  setConfirmDelete?: (address: AddressItem) => void;
}

const Address = ({ address, setConfirmDelete }: AddressProps) => {
  return (
    <>
      {setConfirmDelete && (
        <>
          <Radio size="xs" classNames={{ label: "text-lg font-semibold" }} value={address.id} label={address.name} />
          <i
            onClick={() => setConfirmDelete && setConfirmDelete(address)}
            className="relative bottom-4 left-4 float-end cursor-pointer select-none text-sm text-red-500"
          >
            ✕
          </i>
        </>
      )}
      <div className={`${!setConfirmDelete && "bg-gray-100 py-1"}`}>
        {!setConfirmDelete && <Text className="text-0 mr-6 text-lg font-semibold">{address.name}</Text>}
        <Text className="mb-4 mr-6 mt-2 text-sm text-gray-400">{address.details}</Text>
      </div>
    </>
  );
};

interface ConfirmDeleteAddressProps {
  address: AddressItem;
  setAddressList: (Addresses: AddressItem[]) => void;
}

const ConfirmDeleteAddress = ({ address, setAddressList }: ConfirmDeleteAddressProps) => (
  <>
    <Text className="mb-4 font-semibold">آیا از حذف آدرس خود، مطمئن هستید؟</Text>
    <Address address={address} />
  </>
);

interface AddressesDrawerProps {
  opened: boolean;
  close: () => void;
  getAddress: (address: AddressItem | undefined) => void;
}

const AddressesDrawer = ({ opened, close, getAddress }: AddressesDrawerProps) => {
  const formContext = useFormContext();
  const controller = useController({ name: "addressId", control: formContext.control });
  const { watch } = formContext;

  const { data: addressList, isLoading: addressListLoading } = useQuery({
    queryKey: ["AddressList"],
    queryFn: getAllAddresses,
    select: (response) => {
      return response.data;
    },
  });
  const [confirmDeleteAddress, setConfirmDeleteAddress] = useState<AddressItem | null>();
  const [addressesState, setAddressesState] = useState<AddressItem[]>();
  useEffect(() => {
    setConfirmDeleteAddress(null);
    if (addressList) {
      setAddressesState(addressList?.data);
      formContext.setValue("session", addressList.cookie);
    }
  }, [addressList]);
  useEffect(() => {
    if (addressList && watch("addressId")) {
      getAddress(addressList?.data.find((item: AddressItem) => item.id === watch("addressId")));
    }
  }, [addressList, watch("addressId")]);

  return (
    <Drawer
      classNames={{ content: "m-0 mx-auto h-min max-w-[360px] px-3 pb-[10px]", body: "p-0" }}
      className="relative max-w-[360px]"
      position="bottom"
      offset={8}
      opened={opened}
      onClose={close}
      title={`${confirmDeleteAddress ? "حذف" : "انتخاب"} آدرس`}
    >
      <hr />
      <div className="mt-4">
        <Radio.Group {...controller.field}>
          {confirmDeleteAddress ? (
            <ConfirmDeleteAddress address={confirmDeleteAddress} setAddressList={setAddressesState} />
          ) : (
            addressesState?.map((item) => (
              <Address key={item.id} address={item} setConfirmDelete={setConfirmDeleteAddress} />
            ))
          )}
        </Radio.Group>
      </div>

      <div className="pt-1 shadow-2xl">
        {confirmDeleteAddress ? (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setAddressesState((prev) => prev?.filter((address) => address.id !== confirmDeleteAddress?.id));
                setConfirmDeleteAddress(null);
              }}
              type="submit"
              className="gray-600 mt-2 h-12 w-full bg-black text-xl font-semibold text-white hover:bg-black"
            >
              تایید
            </Button>
            <Button
              onClick={() => setConfirmDeleteAddress(null)}
              type="submit"
              className="gray-600 mt-2 h-12 w-full border-black bg-transparent text-xl font-semibold text-black hover:bg-transparent hover:text-black"
            >
              بازگشت
            </Button>
          </div>
        ) : (
          <Button
            onClick={close}
            disabled={!watch("addressId")}
            type="submit"
            className="gray-600 mt-2 h-12 w-full bg-black text-xl font-semibold text-white hover:bg-black disabled:bg-gray-300 disabled:text-gray-400"
          >
            انتخاب
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default AddressesDrawer;
