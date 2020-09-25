import faker from 'faker';

export const fakeProductImages = [
  "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/47856/rolex-wrist-watch-clock-gmt-47856.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",

  "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://cdn.vox-cdn.com/thumbor/SJcmPEheS_cbdujd4zbIPTpuXfg=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13315959/akrales_181019_3014_0770.jpg",
  "https://media.4rgos.it/i/Argos/8816155_R_Z001A?w=750&h=440&qlt=70",
  "https://i.pcmag.com/imagery/reviews/05PEXoDoiSN5HXomKOYFTJ7-18.fit_lpad.size_624x364.v_1574731239.jpg",

  "https://images-na.ssl-images-amazon.com/images/I/714KQOwBovL._SX679_.jpg",
  "https://i.dell.com/sites/csimages/Video_Imagery/all/xps_7590_touch.png",
  "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE3oYj5?ver=0b43&w=498&h=408&q=90&m=6&b=%23FFF0F0F0&f=jpg&o=f&p=0&aim=true",
  "https://www.lg.com/us/images/laptops/md06060216/gallery/01-1100-v1.jpg",
  "https://media.officedepot.com/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,h_666,q_auto,w_500/c_pad,h_666,w_500/v1/products/9304611/9304611_o01_asus_f512da_db34_vivobook_laptop_011020?pgw=1",
  "https://www.lenovo.com/medias/lenovo-laptop-legion-y7000p-hero-rtx-gtx.jpg?context=bWFzdGVyfHJvb3R8MzEzNTh8aW1hZ2UvanBlZ3xoY2YvaDY0LzEwODE0ODg1ODU1MjYyLmpwZ3xmZTRkMDk4ZjNiZmQ4ZjA1MjAwOGU2ZWJlOWIxYzk4NmRmNTYxMmM3MGRiODIyMzU5OGY5NzU5ZDEyY2IzNTZk",

  "https://www.emptyops.com/demo/above/wp-content/uploads/2019/07/Gildan_t-shirts_1.jpg",
  "https://www.uberprints.com/assets/images/catalog/category-tshirts.jpg",
  "https://contents.mediadecathlon.com/p140198/k$6dac7022ce6425dd189b429af3f2b905/men-s-long-sleeved-t-shirt-100-black.jpg?&f=800x800",
  "https://i.pinimg.com/736x/db/ce/da/dbcedabbe5cd5c763503291790482d41.jpg",
  "https://gh.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/34/83228/1.jpg?7001",
  "https://global2019-static-cdn.kikuu.com/upload-productImg-38341330401260495_320_234.jpg?",
  "https://global2019-static-cdn.kikuu.com/upload-productImg-1538704644289.jpeg",
];

const randomized = faker.helpers.shuffle(fakeProductImages);

export const products = Array(fakeProductImages.length).fill('').map((_, idx) => ({
  productId: idx,
  imageUrl: randomized[idx],
  imageAlt: 'Product Image',
  title: faker.commerce.product(),
  formattedPrice: faker.commerce.price(1000, 50, 0, 'GH₵'),
  inCart: faker.random.boolean(),
  inWishlist: faker.random.boolean(),
}));