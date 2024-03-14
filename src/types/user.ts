import { UserType } from "./enum";


interface ResolvedUserType {
  id: number;
  avatarUrl: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  userType: UserType;
}

export default ResolvedUserType