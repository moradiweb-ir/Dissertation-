export interface IUser {
  _id : string;
  name: string;
  email: string;
  clerkUserId: string;
  isApproved: boolean;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
