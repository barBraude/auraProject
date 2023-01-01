import { Component, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OmdbService } from 'service/omdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchText: string = '' //for the user input
  movies: any = []; // array to collect the movies
  ErrorText: string = ''; // error text from the object that return from api
  isError: boolean = false; // to check if there is an error or not
  totalResults: number = 0; // amount of movies from the search from the object that return from api
  pageSize: number = 0;
  constructor(private ombdService: OmdbService) { }

  ngOnInit() {

  }

  //when user click on search button to search a movie
  onSubmit() {
    let page: PageEvent = new PageEvent();
    page.pageIndex = 0  //set page index to 0;
    this.getPageIndex(page)
  }

  //Get page index and call to api get more movies
  getPageIndex(event: PageEvent) {
    this.ombdService.getMovies(this.searchText, event.pageIndex).subscribe((data: any) => {
        if (data.Response == 'True') {
          this.isError = false
          this.movies = data.Search;
          console.log(data);
          this.totalResults = parseInt(data.totalResults);
          this.pageSize = this.movies.length;
        } else {
          this.movies = [];
          this.ErrorText = data.Error;
          this.isError = true
        }
    })
  }
}
