import { Component, OnInit } from '@angular/core';
import { ApiConnectionService, Product, ProductCategory } from './services/apiConnection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Search Product';
  searchText: any;
  public productCategories: ProductCategory[] = [];
  public products: Product[] = []
  constructor(private apiConnectionService: ApiConnectionService) {

  }

  ngOnInit() {
    this.apiConnectionService.getProductCategory().subscribe((categories: ProductCategory[]) => {
      this.productCategories = categories;
      if (this.productCategories.length > 0) {
        this.fetchProductsList(categories[0].categoryId);
      }
      console.log(this.products.filter(pro => pro.categoryId == 4))
    })

  }

  fetchProductsList(categoryId: number) {
    this.apiConnectionService.getProductList(categoryId).subscribe(
      (products: any) => {
        this.products = products;
      }
    )
  }

}
