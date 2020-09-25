
export class CreateContactDetailDto {
    country: string;
    city: string;
    street?: string;
    landMark?: string;
    residentialAddress?: string;
    lat?: number;
    lng?: number;
}


export class UpdateContactDetailDto {
    country?: string;
    city?: string;
    street?: string;
    landMark?: string;
    residentialAddress?: string;
    lat?: number;
    lng?: number;
}
