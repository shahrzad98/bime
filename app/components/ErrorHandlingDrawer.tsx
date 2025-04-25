import ButtonComponent from "@/app/components/core/ButtonComponent";
import { Drawer, Text } from "@mantine/core";

interface ErrorHandlingDrawerProps {
  opened: boolean;
  loading: boolean;
  close: () => void;
  onTryAgain: () => void;
}

const ErrorHandlingDrawer = ({ opened, loading, close, onTryAgain }: ErrorHandlingDrawerProps) => {
  return (
    <Drawer
      classNames={{ content: "m-0 mx-auto h-min max-w-[360px] p-[10px] px-3", body: "p-0" }}
      className="relative max-w-[360px]"
      position="bottom"
      withCloseButton={false}
      offset={8}
      opened={opened}
      onClose={close}
    >
      <div className="mb-4 px-1">
        <Text className="mb-1 mt-1 text-lg font-semibold">متاسفانه در ثبت اطلاعات شما، خطایی رخ داده است.</Text>
        <Text className="text-lg font-semibold">مجددا، تلاش کنید.</Text>
      </div>
      <div className="mt-2 flex gap-2">
        <ButtonComponent className="w-full" onClick={onTryAgain} variant="primary" loadingState={loading}>
          تلاش مجدد
        </ButtonComponent>

        <ButtonComponent className="w-full" variant="secondary" disabledState={loading} onClick={close}>
          بازگشت
        </ButtonComponent>
      </div>
    </Drawer>
  );
};

export default ErrorHandlingDrawer;
