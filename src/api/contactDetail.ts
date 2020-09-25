import { HttpClientWithJWT } from "../utilities/http/httpClient";
import { CreateContactDetailDto, UpdateContactDetailDto } from "../models/contactDetail/contactDetail.dto";
import { IContactDetail } from "../models/contactDetail/contactDetail.interface";

const baseUrl = process.env.baseApiUrl + '/user/contact-detail';

export class ContactDetailApi extends HttpClientWithJWT {
  public constructor() {
    super(baseUrl);
  }

  getContactDetail(userId: string) {
    return this.axiosInstance.get<IContactDetail>(
      ``,
      {
        params: {
          id: userId
        }
      }
    );
  }

  createContactDetail(createContactDetailDto: CreateContactDetailDto) {
    return this.axiosInstance.post<IContactDetail>(
      ``,
      { ...createContactDetailDto }
    );
  }

  updateContactDetail(updateContactDetailDto: UpdateContactDetailDto) {
  return this.axiosInstance.patch<IContactDetail>(
    ``,
    { ...updateContactDetailDto }
  );
  }
}
