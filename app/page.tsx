"use client";
import InsuranceInfo from "@/app/components/InsuranceInfo";
import OrderForm from "@/app/components/OrderForm";
import { useState } from "react";

export default function Home() {
  const [orderSucceed, setOrderSucceed] = useState(false);
  function getOrderSuccess(isSucceed: boolean) {
    setOrderSucceed(isSucceed);
  }

  return (
    <div className="mx-auto w-[360px] overflow-y-hidden">
      <InsuranceInfo orderSucceed={orderSucceed} setOrderSucceed={setOrderSucceed} />
      {!orderSucceed && <OrderForm getOrderSuccess={getOrderSuccess} setOrderSucceed={setOrderSucceed} />}
    </div>
  );
}
