import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'notes-list',
  templateUrl: '../views/notes-list.component.html',
  providers: [ApiService]
})
export class NotesListComponent implements OnInit {

  @ViewChild('post') postElement: ElementRef;
  posts = new Array<string>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.posts = [];
    this.postElement.nativeElement.value = '';
    this.apiService.getNotes().then(res => {
      if (res.error == null) {
        this.posts = res.result.data;

      }
    });


  }

  onClickSave(element) {
    if (element.value !== '') {
      const date = new Date();
      let req: any = {};
      req.text = element.value;
      req.dateTime = date.getTime();


      this.apiService.saveNote(req).then(res => {
        if (!res.error) {

          this.posts.unshift(req);
          element.value = '';
        }
      });

    }
  }


  onClickReset(element) {
    element.value = '';

  }

}
