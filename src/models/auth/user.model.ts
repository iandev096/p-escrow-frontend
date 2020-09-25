import { IContactDetail } from "../contactDetail/contactDetail.interface";

export class User {
  constructor(
    public id: string,
    public email: string,
    public contactNumber: string,
    public fullName: string,
    public emailVerified: boolean,
    public contactNumberVerified: boolean,
    public contactDetail: IContactDetail
  ) {
  }

  getFirstName() {
    return this.fullName.split(' ', 1);
  }
}
