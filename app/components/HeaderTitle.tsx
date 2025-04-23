import { Paper, Text } from "@mantine/core";
import { Car } from "iconsax-react";

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle = ({ title }: HeaderTitleProps) => {
  return (
    <Paper className="mb-1 flex items-center bg-white p-2" shadow="xs">
      <div className="ml-2 rounded-md bg-main-yellow p-2">
        <Car variant="Outline" size={20} className="fill-white" />
      </div>
      <Text className="text-xxl font-semibold">{title}</Text>
    </Paper>
  );
};

export default HeaderTitle;
