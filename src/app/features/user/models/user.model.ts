export interface User{
  id: string;
  name: string;
  email: string;
  identity: string;
  profession: string;
  dateOfBirth: Date;
  maritalStatus: string;
  city: string;
  state: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  role: string;
  permissions: string[];
}