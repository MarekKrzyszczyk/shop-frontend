import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

  messages: Array<string> = [];
  subject = new Subject<Array<string>>();

  clear(): void {
    this.messages = [];
  }

  addSpringError(error: any): void {
    this.clear();
    console.log(error);
    this.extractMessages(error);
    this.subject.next(this.messages);
  }

  private extractMessages(error: any) {
    if (error.errors?.length > 0) {
      for (let message of error.errors) {
        this.messages.push("Field: " + message.field + " -> " + message.defaultMessage)
      }
    } else {
      this.messages.push(error.message);
    }
  }
}
