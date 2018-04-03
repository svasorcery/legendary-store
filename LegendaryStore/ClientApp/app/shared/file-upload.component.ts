import { Component } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'

@Component({
    selector: 'file-upload',
    template: `
        <input #file type="file" multiple (change)="upload(file.files)" />
        <br/>
        <span style="font-weight:bold;color:green;" *ngIf="progress > 0 && progress < 100">
            {{progress}}%
        </span>
        <span style="font-weight:bold;color:green;" *ngIf="message">
            {{message}}
        </span>
    `
})
export class FileUploadComponent {
    public progress: number;
    public message: string;

    constructor(private _http: HttpClient) { }

    public upload(files): void {
        if (files.length === 0)
            return;

        const formData = new FormData();

        for (let file of files)
            formData.append(file.name, file);

        const uploadReq = new HttpRequest('POST', `api/files`, formData, {
            reportProgress: true,
        });

        this._http.request(uploadReq).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress)
                this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response)
                this.message = event.body.toString();
        });
    }
}
