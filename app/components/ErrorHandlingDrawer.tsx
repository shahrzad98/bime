import ButtonComponent from "@/app/components/core/ButtonComponent";
import { Button, Drawer, Text } from "@mantine/core";

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

        <Button
          disabled={loading}
          onClick={close}
          type="submit"
          className="gray-600 h-12 w-full border-black bg-transparent text-xl font-semibold text-black hover:bg-transparent hover:text-black disabled:border-0 disabled:bg-gray-200 disabled:text-gray-400"
        >
          بازگشت
        </Button>
      </div>
    </Drawer>
  );
};

export default ErrorHandlingDrawer;
