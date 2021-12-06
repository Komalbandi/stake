import {Component, OnInit,} from '@angular/core';
import {BackEndServiceService} from '../../services/back-end-service/back-end-service.service';
import {PostsModel, UsersModel} from './models';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {AddPost} from '../../states/post.action';
import {PostsInterface, UsersInterface} from '../../interfaces';

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent implements OnInit {

    posts?: PostsModel;
    filteredPosts?: PostsModel;
    currentPage: number = 1;
    totalPostsPerPage: number = 10;
    results?: PostsInterface[];
    users?: UsersModel;
    userIdSelected?: number;

    constructor(private service: BackEndServiceService, private router: Router, private store: Store) {
    }

    ngOnInit(): void {
        this.service.request('get', 'https://jsonplaceholder.typicode.com/posts').subscribe({
            next: (data: PostsInterface[]) => {
                this.posts = new PostsModel(data);
                this.filteredPosts = this.posts;
                this.getPostsPerPage();
            }
        });

        this.service.request('get', 'https://jsonplaceholder.typicode.com/users').subscribe({
            next: (data: UsersInterface[]) => {
                this.users = new UsersModel(data);
            }
        })
    }

    seePostsDetails(id: number) {
        if (this.filteredPosts!.getDataById(id)) {
            this.store.dispatch(new AddPost(this.filteredPosts!.getDataById(id) as PostsInterface));
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
        return this.filteredPosts!.getAllData!.length > this.currentPage * this.totalPostsPerPage ? true : false;
    }

    getPostsPerPage() {
        let range: Array<number> = [this.currentPage * this.totalPostsPerPage - 11, this.currentPage * this.totalPostsPerPage - 1];
        this.results = this.filteredPosts!.getData(range);
    }

    userSelected(event: any) {
        this.userIdSelected = Number(event.target.value);
    }

    searchByUser() {
        this.filteredPosts!.resetWithNewData(this.posts!.getAllData);
        this.filteredPosts!.resetWithNewData(this.filteredPosts!.getDataByUserId(this.userIdSelected!));
        this.getPostsPerPage();
    }
}
