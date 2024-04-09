import Address from "./address";
import Phone from "./phone";

export default interface People {
  id: number;
  first_name: string;
  last_name: string;
  dni_type_id: number;
  dni_type: string;
  abbreviation: string;
  dni: string;
  birthdate: string;
  email: string;
  type_id: number;
  user_type: string;
  phones: Phone[];
  addresses: Address[];
};
