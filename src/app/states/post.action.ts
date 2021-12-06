/**
 * Created by komal on 6/12/2021.
 */
import {PostsInterface} from '../interfaces/posts-interface';
//Create
export class AddPost {
    static readonly type = '[Post] Add';

    constructor(public payload: PostsInterface) {
    }
}