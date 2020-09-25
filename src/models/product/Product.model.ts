import { Transform } from "class-transformer";
import { ICartProduct, IProductCategory, IProductImage, IUserRating } from './product.interface';
import { IBaseUser } from "../auth/auth.interface";


type ratings = { numOfReviews: number, value: number }
const defaultProfileAvatar = 'assets/profile-avatar.png';
export class Product {
  @Transform(value => Number(value))
  readonly price: number;

  @Transform(value => Number(value))
  readonly priceDiscount: number;

  @Transform(value => Number(value))
  readonly priceTobePaid: number;

  @Transform(value => {
    if (value !== null) return Number(value)
    return value
  })
  readonly lat: number | null;

  @Transform(value => {
    if (value !== null) return Number(value)
    return value
  })
  readonly lng: number | null;

  @Transform((value) => {
    if (!value.profilePicture) {
      value.profilePicture = defaultProfileAvatar;
    }
    return value;
  })
  readonly user: IBaseUser;

  private _carts: string[];
  get carts() {
    return this._carts;
  }
  set carts(cartIds: string[]) {
    this._carts = cartIds;
  }

  private _thumbnailUrl: string;
  get thumbnailUrl() {
    return this._thumbnailUrl;
  }
  set thumbnailUrl(url: string) {
    this._thumbnailUrl = url;
  }

  private _otherImagesUrl: string[];
  get otherImagesUrl() {
    return this._otherImagesUrl;
  }
  set otherImagesUrl(urls: string[]) {
    this._otherImagesUrl = urls;
  }

  private _categories: string[];
  get categories() {
    return this._categories;
  }
  set categories(categories: string[]) {
    this._categories = categories;
  }

  private _ratings: ratings;
  get userRatings () {
    return this._ratings;
  }
  set userRatings (value: ratings) {
    this._ratings = value;
  }

  addedToCart: boolean;
  liked: boolean;

  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly displayname: string,
    public readonly description: string,
    price: number,
    priceDiscount: number,
    priceTobePaid: number,
    public readonly currency: string,
    lat: number | null,
    lng: number | null,
    public readonly location: string,
    public readonly status: string,
    readonly cartProducts: ICartProduct[],
    readonly productImages: IProductImage[],
    user: IBaseUser,
    readonly productCategories: IProductCategory[],
    readonly productUserRatings: IUserRating[],
    addedToCart?: boolean,
    liked?: boolean
  ) {
    this.price = price;
    this.priceDiscount = priceDiscount;
    this.priceTobePaid = priceTobePaid;
    this.lat = lat;
    this.lng = lng;
    this.carts = this.transformICartProductsToCarts(cartProducts);
    const transformedImages = this.transformProductImages(productImages);
    this.thumbnailUrl = transformedImages.thumbnailUrl;
    this.otherImagesUrl = transformedImages.otherImagesUrl;
    this.categories = this.transformProductCategories(productCategories);
    this.userRatings = this.transformUserRatings(productUserRatings);
    this.user = user;
    this.addedToCart = addedToCart;
    this.liked = liked;
  }

  transformICartProductsToCarts(list: ICartProduct[]) {
    return list.map(cartProduct => cartProduct.cartId);
  }

  transformLikingUsersToWishList(list: IBaseUser[]) {
    return list.map(likingUser => likingUser.id);
  }

  transformProductImages(list: IProductImage[]) {
    const base = {
      thumbnailUrl: '',
      otherImagesUrl: []
    }
    return list.reduce<{thumbnailUrl: string, otherImagesUrl: string[]}>((acc, cur) => {
      if (cur.type === 'thumbnail') {
        acc.thumbnailUrl = cur.url;
      } else {
        acc.otherImagesUrl.push(cur.url);
      }
      return acc;
    }, base);
  }

  transformProductCategories(list: IProductCategory[]) {
    return list.map(category => category.name)
  }

  transformUserRatings(list: IUserRating[]): ratings {

    const numOfReviews = list.length;
    const totalRatings = list.reduce((acc, cur) => {
      acc += +cur.rating;
      return acc;
    }, 0);

    return {
      numOfReviews,
      value: totalRatings / numOfReviews
    }
  }

  // UTILITIES
  doesExistIn<T>(item: T, list: T[]) {
    for (const listItem of list) {
      if (listItem === item) return true;
    }
    return false;
  }
}
