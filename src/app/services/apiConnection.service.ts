import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ProductCategory {
    categoryId: number,
    name: string,
};

export interface Product {
    id: number,
    categoryId: number,
    name: string,
    brand_name: string,
    price: number
};

const base_url = 'http://localhost:3000';

@Injectable({
    providedIn: 'root',
})
export class ApiConnectionService {


    constructor(private httpClient: HttpClient) { }

    getProductCategory(): Observable<ProductCategory[]> {
        return this.httpClient.get<ProductCategory[]>(`${base_url}/productCategory`)
    }

    getProductList(categoryId: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${base_url}/productsList`)
            .pipe(map((products: Product[]) => {
                return products.filter((p: Product) => p.categoryId === categoryId)
            }))
    }


}