import Insurance from "@/app/components/Insurance";
import Owner from "@/app/components/Owner";

export default function Home() {
  return (
    <div className="mx-auto w-[360px] overflow-y-hidden">
      <Insurance />
      <Owner />
    </div>
  );
}
