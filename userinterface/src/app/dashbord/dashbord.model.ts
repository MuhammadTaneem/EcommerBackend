export interface Category {
    id: number;
    name: string;
    cat_img: string;
  }

export interface Product {
    id: number;
    name : string;
    description: string;
    weight: string;
    quantity: number;
    color: string;
    brand:string;
    model:string;
    price: number;
    size:string,
    product_img1: string;
    product_img2: string;
    product_img3: string;
    product_img4: string;
    author: number;
    product_category: number;

  }

export interface Ratting {
    id: number;
    star: number;
    comment: string;
    name: string;
    author: number;
    product: number;
  }

