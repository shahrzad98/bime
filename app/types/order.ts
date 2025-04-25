export type AddressRs = {
  data: {
    id: string;
    name: string;
    details: string;
  }[];
  cookie: string;
};
export type AddressItem = {
  id: string;
  name: string;
  details: string;
};
export type SubmitOrderRq = {
  nationalId: string;
  phoneNumber: string;
  addressId: string;
  session: string;
};
