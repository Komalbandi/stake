import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostState} from '../../states/post.state';
import {Select} from '@ngxs/store';
import {PostsInterface} from '../../interfaces/posts-interface';
import {Observable} from "rxjs/index";

@Component({
    selector: 'app-post-details-page',
    templateUrl: './post-details-page.component.html',
    styleUrls: ['./post-details-page.component.scss']
})
export class PostDetailsPageComponent implements OnInit {

    @Select(PostState.getPost) postState?: Observable<PostsInterface>;

    post?: PostsInterface;


    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.postState!.subscribe((data: PostsInterface) => {
            this.post = data;
            console.log(this.post);
        });
    }

    goBack() {
        this.router.navigateByUrl('/');
    }

}
