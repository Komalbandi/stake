import {Component, OnInit,} from '@angular/core';
import {BackEndServiceService} from '../../services/back-end-service/back-end-service.service';
import {PostsInterface} from '../../interfaces/posts-interface';
import {PostsModel} from './models/posts-model';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {AddPost} from '../../states/post.action';

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent implements OnInit {

    posts?: PostsModel;
    currentPage: number = 1;
    totalPostsPerPage: number = 10;
    results?: PostsInterface[];

    constructor(private service: BackEndServiceService, private router: Router, private store: Store) {
    }

    ngOnInit(): void {
        this.service.request('get', 'https://jsonplaceholder.typicode.com/posts').subscribe({
            next: (data: PostsInterface[]) => {
                this.posts = new PostsModel(data);
                this.getPostsPerPage();
            }
        });
    }

    seePostsDetails(id: number) {
        if (this.posts!.getDataById(id)) {
            this.store.dispatch(new AddPost(this.posts!.getDataById(id) as PostsInterface));
            this.router.navigateByUrl('/details');
        }
    }

    goToNextPage() {
        if (this.canGoToNextPage()) {
            this.currentPage++;
            this.getPostsPerPage();
        }
    }

    goToPreviousPage() {
        if (this.canGoToPreviousPage()) {
            this.currentPage--;
            this.getPostsPerPage();
        }
    }

    canGoToPreviousPage() {
        return this.currentPage > 1 ? true : false;
    }

    canGoToNextPage() {
        return this.posts!.getAllData!.length > this.currentPage * this.totalPostsPerPage ? true : false;
    }

    getPostsPerPage() {
        let range: Array<number> = [this.currentPage * this.totalPostsPerPage - 11, this.currentPage * this.totalPostsPerPage - 1];
        this.results = this.posts!.getData(range);
    }
}
