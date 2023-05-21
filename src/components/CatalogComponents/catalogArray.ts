interface CatalogArray {
  post_id: number;
  post_car_title: string;
  post_image_src_Link: string;
  post_image_alt: string;
  post_description: string;
  post_posted_by: string;
  post_car_price: string;
}
const catalogArrayExample = [
  {
    post_id: 999,
    post_car_title: "",
    post_image_src_link: "",
    post_image_alt: "",
    post_description: "",
    post_posted_by: "",
    post_car_price: "MSRP $0,0 / 0,0€",
  },
];

const catalogArray: CatalogArray[] = [
  {
    post_id: 46,
    post_car_title: "Lamborghini Aventador SVJ",
    post_image_src_Link: "https://i.imgur.com/VJON6DP.jpg",
    post_image_alt: "Lamborghini Aventador SVJ purple",
    post_description: `
    Lamborghini Aventador SVJ purple color. Model year 2019. 
    Specifications: engine V12 ; displacement: 6,498 cm³ ; 
    max power 770 CV/PS or 759 HP (566 Kw) @ 8,500 RPM. 
    Top speed 350 km/h / 218mph. 
    Acceleration 0-100 km/h / 0-60 mph in 2.8 seconds.
    `,
    post_posted_by: "Cars Club",
    post_car_price: "MSRP $625,000 / 580,000€",
  },
  {
    post_id: 47,
    post_car_title: "2023 Mercedes E63S AMG 4matic",
    post_image_src_Link: "https://i.imgur.com/XxfS16w.jpg",
    post_image_alt: "2023 Mercedes E63S AMG photo by Alaatin61",
    post_description: `
    2023 Mercedes E63S AMG photo by Alaatin61.
    Specifications: V8 twin-turbo engine; 
    max power 603 hp @ 5,750-6,500 RPM
    with 627 pound-feet of torque or 850 N·m ;
    with multi-clutch nine-speed automatic
    transmission
    delivering power to all four wheels (4matic).
    `,
    post_posted_by: "Cars Club",
    post_car_price: "MSRP $114,000 / 105,000€",
  },
  {
    post_id: 48,
    post_car_title: "Lamborghini Huracan Tecnica 2023 Green",
    post_image_src_Link: "https://i.imgur.com/oPh3W5a.jpg",
    post_image_alt: "Lamborghini Huracan Tecnica 2023 Green",
    post_description: `
    Lamborghini Huracan Tecnica 2023 - color green.
    Specifications: V10 engine
    max power 640cv/ps (470 kW)
    or 630HP @ 8,000 RPM ; top speed 325 km/h
    or 202 mph ; acceleration 0-100 km/h or
    0-60 mph in 3.2 seconds.
    Fuel economy combined 15 mpg or 
    18.8 l/100km.
    Price for the higher-end Huracán STO 
    has a starting price of $333,000
    or 307,000€.
    `,
    post_posted_by: "Cars Club",
    post_car_price: "MSRP $244,000 / 225,000€",
  },
  {
    post_id: 49,
    post_car_title: "Ferrari 488 GTB",
    post_image_src_Link: "https://i.imgur.com/N9oJRyp.jpg",
    post_image_alt: "Ferrari 488 GTB",
    post_description: `
    Ferrari 488 GTB - ferrari red color.
    Specifications: turbocharged
    V8 cylinder engine with
    660 bhp @ 8,000 RPM ;
    max torque 760 N·m or
    560 pound-feet of torque
    @ 3,000 RPM.
    Transmission automatic 7 gears
    with paddle shifters.
    Acceleration 0-100 km/h
    or 0-60 mph in 3.0 seconds
    flat.
    Weight 1475 kg or
    3252 lbs.
    Fuel economy combined
    11.5 l/100km
    or 20 mpg (USA)
    or 25 mpg (UK).
    `,
    post_posted_by: "Cars Club",
    post_car_price: "MSRP $250,000 / 230,000€",
  },
  {
    post_id: 50,
    post_car_title: "Mercedes Benz E63s AMG 4matic",
    post_image_src_Link: "https://i.imgur.com/bc7IsSE.jpg",
    post_image_alt: "Mercedes Benz E63s AMG 4matic",
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
