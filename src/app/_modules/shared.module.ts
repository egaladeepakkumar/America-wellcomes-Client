import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            progressBar: true
        }),
        NgxSpinnerModule.forRoot({
            type: 'line-scale-party'
        })
    ],
    exports: [
        ToastrModule,
        NgxSpinnerModule
    ]
})
export class SharedModule {}