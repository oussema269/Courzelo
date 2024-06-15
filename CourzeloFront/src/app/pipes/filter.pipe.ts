import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filters: { [key: string]: any }): any[] {
    if (!items) return [];
    if (!filters) return items;

    const filteredItems = items.filter(item => {
      for (let key in filters) {
        let searchTerm = filters[key];
        if (searchTerm && item[key]) {
          // Ensure we're comparing strings
          if (!item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }
        }
      }
      return true;
    });

    console.log("Filter criteria:", filters);
    console.log("Filtered items:", filteredItems);

    return filteredItems;
  }
}
