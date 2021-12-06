/**
 * Created by komal on 6/12/2021.
 */
import {PostsInterface} from '../interfaces/posts-interface';
import {Injectable} from '@angular/core';
import {AddPost} from '../states/post.action';
import {Action, Selector, State, StateContext} from '@ngxs/store';

export class PostStateModel {
    post?: PostsInterface
}

@State<PostStateModel>({
    name: 'poststate',
    defaults: {
        post: undefined
    }
})

@Injectable()
export class PostState {
    @Selector()
    static getPost(state: PostStateModel) {
        return state.post;
    }

    @Action(AddPost)
    add({getState,patchState}:StateContext<PostStateModel>,{payload}:AddPost){
        const state=getState();
        patchState(({
            post:payload
        }))
    }
}

