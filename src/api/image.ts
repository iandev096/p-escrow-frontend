import { HttpClient } from "../utilities/http/httpClient";
import { IProduct } from "../models/product/product.interface";

const baseUrl = 'https://api.cloudinary.com/v1_1/dvyxqggv2/auto/upload';
type imageFormData = {
  uploadPreset: string,
  folder: string,
  callbackUrl: string,
  file: any
}
export class ImageApi extends HttpClient {
  public constructor() {
    super(baseUrl);
  }

  uploadProductImage(formData: FormData) {
    return this.axiosInstance.post<IProduct>(baseUrl, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }

}