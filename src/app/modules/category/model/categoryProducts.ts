import {Category} from "./category";
import {Product} from "../../product/model/Product";
import {Page} from "../../../shared/model/page";

export interface CategoryProducts {
  category: Category,
  products: Page<Product>
}
