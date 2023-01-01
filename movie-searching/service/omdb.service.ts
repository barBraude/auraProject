import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) { }


  getMovies(movieName: string,pageIndex:number) {

    return this.http.get(`https://www.omdbapi.com/?s=${movieName}&type=movie&page=${pageIndex + 1}&apikey=618ab31b`).pipe(
			map((response: any) => {
				return response;
			})
		);
  }
}
