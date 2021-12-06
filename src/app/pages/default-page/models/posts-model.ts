import {PostsInterface} from '../../../interfaces/posts-interface';
export class PostsModel {
    posts?: PostsInterface[];

    constructor(data: PostsInterface[]) {
        this.posts = data;
    }

    public get getAllData() {
        return this.posts;
    }

    public getData(range: Array<number>) {
        let from = range[0];
        let to = range[1];

        return this.posts!.filter((post, index) => {
            return index >= from && index <= to;
        })
    }

    getDataById(id: number) {
        return this.posts!.find((post) => {
            return post.id === id;
        })
    }
}
