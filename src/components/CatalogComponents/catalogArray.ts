interface CatalogArray {
  post_id: number;
  post_car_title: string;
  post_image_src_Link: string;
  post_description: string;
  post_posted_by: string;
  post_car_price: string;
}
const catalogArrayExample = [
  {
    post_id: 999,
    post_car_title: "",
    post_image_src_link: "",
    post_description: "",
    post_posted_by: "",
    post_car_price: "",
  },
];

const catalogArray: CatalogArray[] = [
  {
    post_id: 3,
    post_car_title: "Mercedes Benz E63s AMG 4matic",
    post_image_src_Link: "https://i.imgur.com/bc7IsSE.jpg",
    post_description: `Year made 2021 Mercedes Benz AMG E63s 4matic. 
    Horsepower: 603HP @ 5,750 - 6,500 RPM. 
    Standard tires: Front - 265/35 ZR20; Rear - 295/30 ZR20. 
    Top speed 186mph / 300km/h. 
    Acceleration time 0-60mph / 0-100km/h in 2.8 seconds.
    `,
    post_posted_by: "Cars Club",
    post_car_price: "MSRP $108,550 / 100,000€",
  },
];
export default catalogArray;
