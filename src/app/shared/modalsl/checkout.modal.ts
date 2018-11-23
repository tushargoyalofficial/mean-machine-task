export interface Checkout {
  id: string;
  client_ip: string;
  created: number;
  livemode: boolean;
  object: string;
  type: string;
  used: boolean;
  card: {
    id: string,
    object: string,
    address_city: string,
    address_country: string,
    address_line1: string,
    address_line2: string,
    address_state: string,
    address_zip: string,
    address_zip_check: string,
    brand: string,
    country: string,
    cvc_check: string,
    dynamic_last4: string,
    exp_month: number,
    exp_year: number,
    funding: string,
    last4: string,
  };
}
