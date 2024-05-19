import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToString'
})
export class EnumToStringPipe implements PipeTransform {
  transform(value: any, enumType: any): string {
    // Check if the value is defined in the enum
    if (enumType[value] != null) {
      return enumType[value];
    }
    // Return the original value if not found in the enum
    return value;
  }
}