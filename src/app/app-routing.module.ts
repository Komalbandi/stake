import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultPageComponent} from './pages/default-page/default-page.component';
import {PostDetailsPageComponent} from './pages/post-details-page/post-details-page.component';

const routes: Routes = [
        {
            path: '', component: DefaultPageComponent
        },
        {
            path: 'details', component: PostDetailsPageComponent
        }
    ]
;

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
