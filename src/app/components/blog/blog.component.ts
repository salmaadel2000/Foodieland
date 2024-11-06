import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article } from '../../shared/interfaces/Article.model';
import { InboxComponent } from '../home/subcomponents/inbox/inbox.component';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule,InboxComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']  // Fixed typo
})
export class BlogComponent implements OnInit {
  articles: Article[] = [
    { title: 'Crochet Projects for Noodle Lovers', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Wade Warren', date: '12 November 2021', image: '/assets/images/image 26.png' , profile: '/assets/images/Ellipse 2.png' },
    { title: '10 Vegetarian Recipes To Eat This Month', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Robert Fox', date: '12 November 2021', image: '/assets/images/image 27.png' , profile: '/assets/images/Ellipse 3.png'},
    { title: 'Full Guide to Becoming a Professional Chef', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Dianne Russell', date: '12 November 2021', image: '/assets/images/image 28.png', profile: '/assets/images/Ellipse 4.png' },
    { title: 'Simple & Delicious Vegetarian Lasagna', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Leslie Alexander', date: '12 November 2021', image: '/assets/images/image 29.png' , profile: '/assets/images/Ellipse 5.png'},
    { title: 'Plantain and Pinto Stew with Aji Verde', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Courtney Henry', date: '12 November 2021', image: '/assets/images/image 30.png' , profile: '/assets/images/Ellipse 6.png'},
    { title: 'We’re Hiring a Communications Assistant!', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Albert Flores', date: '12 November 2021', image: '/assets/images/image 31.png' , profile: '/assets/images/Ellipse 7.png'},
    { title: 'Crochet Projects for Noodle Lovers', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Wade Warren', date: '12 November 2021', image: '/assets/images/food1.png' , profile: '/assets/images/Ellipse 8.png'},
    { title: '10 Vegetarian Recipes To Eat This Month', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Robert Fox', date: '12 November 2021', image: '/assets/images/food2.png', profile: '/assets/images/Ellipse 2.png' },
    { title: 'Full Guide to Becoming a Professional Chef', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Dianne Russell', date: '12 November 2021', image: '/assets/images/food3.png' , profile: '/assets/images/Ellipse 3.png'},
    { title: 'Simple & Delicious Vegetarian Lasagna', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Leslie Alexander', date: '12 November 2021', image: '/assets/images/food3.png' , profile: '/assets/images/Ellipse 4.png'},
    { title: 'Plantain and Pinto Stew with Aji Verde', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Courtney Henry', date: '12 November 2021', image: '/assets/images/food4.png' , profile: '/assets/images/Ellipse 5.png'},
    { title: 'We’re Hiring a Communications Assistant!', description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ', author: 'Albert Flores', date: '12 November 2021', image: '/assets/images/food5.png' , profile: '/assets/images/Ellipse 6.png'}
  ];
  searchTerm: string = '';
  filteredArticles: Article[] = [];
  currentPage = 1;
  pageSize = 6;
  pages: number[] = [];
  noResults: boolean = false; 

  ngOnInit(): void {
    this.filteredArticles = this.articles;  
    this.setPagination();
  }

  filterArticles(): void {
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
    this.setPagination();  
    this.noResults = this.filteredArticles.length === 0 && this.searchTerm !== '';
  }

  setPagination(): void {
    const totalItems = this.filteredArticles.length;
    const totalPages = Math.ceil(totalItems / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.currentPage = 1;
  }

  getCurrentPageArticles() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredArticles.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
    }
  }
}
