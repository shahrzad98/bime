import { cn } from "@/app/utils/style";
import { Button, ButtonProps, Loader } from "@mantine/core";

interface ButtonComponentProps extends ButtonProps {
  variant?: "primary" | "secondary";
  loadingState?: boolean;
  disabledState?: boolean;
  onClick?: () => void;
}

const ButtonComponent = ({
  disabledState,
  loadingState,
  variant,
  children,
  className,
  ...props
}: ButtonComponentProps) => {
  const primary = variant === "primary";
  const secondary = variant === "secondary";

  return (
    <Button
      {...props}
      disabled={disabledState}
      className={cn(
        "h-12 w-[140px] text-xl disabled:bg-[#DAD8D8] disabled:text-[#858484]",
        {
          "border-black bg-transparent text-black hover:bg-transparent hover:text-black": secondary,
        },
        {
          "bg-black text-white hover:bg-black": primary,
        },

        { "bg-[#ACACAC] text-[#525252]": !!loadingState },
        className,
      )}
      type="submit"
    >
      {loadingState && <Loader size={18} color="#fff" className="ml-2" />}
      {children}
    </Button>
  );
};

export default ButtonComponent;
