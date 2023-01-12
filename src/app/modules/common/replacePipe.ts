import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string, strToReplace: string, replacement: string) {
    if (!value || !strToReplace || !replacement) {
      return value;
    }
    return value.replace(new RegExp(strToReplace, 'g'), replacement);
  }
}
