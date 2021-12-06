import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DefaultPageComponent} from './pages/default-page/default-page.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {PostState} from './states/post.state';

//Services
import {BackEndServiceService} from './services/back-end-service/back-end-service.service';
import {PostDetailsPageComponent} from './pages/post-details-page/post-details-page.component';

@NgModule({
    declarations: [
        AppComponent,
        DefaultPageComponent,
        PostDetailsPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxsModule.forRoot([
            PostState
        ])
    ],
    providers: [BackEndServiceService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
