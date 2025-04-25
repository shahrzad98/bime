import { serverAxiosInstance } from "@/app/http/axiosInstance";
import { AddressRs, SubmitOrderRq } from "@/app/types/order";
import axios from "axios";

export const getAllAddresses = () => axios.get<AddressRs>("api/bime");
export const submitOrderServer = (body: SubmitOrderRq) => axios.post("/api/bime", body);
export const submitOrder = (body: SubmitOrderRq) => serverAxiosInstance.post("/order/completion/", body);
