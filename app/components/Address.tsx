import { Button, Drawer, Radio, Text } from "@mantine/core";
import { useController, useFormContext } from "react-hook-form";

interface AddressProps {
  opened: boolean;
  close: () => void;
}

const Address = ({ opened, close }: AddressProps) => {
  const formContext = useFormContext();
  const controller = useController({ name: "address", control: formContext.control });
  const { watch } = formContext;
  return (
    <Drawer
      classNames={{ content: "m-0 mx-auto h-min max-w-[360px] rounded-none px-3 pb-[10px]", body: "p-0" }}
      className="relative max-w-[360px]"
      position="bottom"
      offset={8}
      radius="md"
      opened={opened}
      onClose={close}
      title="انتخاب آدرس"
    >
      <hr />
      <div className="mt-4">
        <Radio.Group {...controller.field}>
          <Radio
            size="xs"
            classNames={{ label: "text-lg font-semibold" }}
            value="626f9f13-fa2b-4cb6-884e-6eacafad1346"
            label="آدرس شماره 1"
          />
          <Text className="mb-4 mr-6 mt-2 text-sm text-gray-400">
            تهران، شهرک غرب، بلوار دریا، کوچه فخار مقدم،ِ پلاک ۲۶، زنگ{" "}
          </Text>
          <Radio
            size="xs"
            classNames={{ label: "text-lg font-semibold" }}
            value="afc599cf-a072-4668-8936-6680986db0f4"
            label="آدرس شماره 2"
          />
          <Text className="mb-4 mr-6 mt-2 text-sm text-gray-400">
            تهران، بلوار کشاورز، خیابان فلسطین، نرسیده به خیابان انقلاب،
          </Text>
          <Radio
            size="xs"
            classNames={{ label: "text-lg font-semibold" }}
            value="bb6ca521-187e-4458-993c-75d7f4fe30c1"
            label="آدرس شماره 3"
          />
          <Text className="mb-4 mr-6 mt-2 text-sm text-gray-400">
            تهران، خیابان ولیعصر، بعد از تقاطع میرداماد، خیابان سرو
          </Text>
        </Radio.Group>
      </div>

      <div className="pt-1 shadow-2xl">
        <Button
          onClick={close}
          disabled={!watch("address")}
          type="submit"
          className="gray-600 mt-2 h-12 w-full bg-black text-xl font-semibold text-white hover:bg-black disabled:bg-gray-300 disabled:text-gray-400"
        >
          انتخاب
        </Button>
      </div>
    </Drawer>
  );
};

export default Address;
