# Simple Date Picker

A simple calendar based datepicker component for Angular

## NOTE: This is no longer maintained and may contain vulnerabilities. 

### Basic usage:
```ts
import { SimpleDatePickerModule } from 'angular-simple-date-picker';

@NgModule({
  imports: [
    SimpleDatePickerModule
  ]
})

```

```html
<simple-date-picker [(date)]="dateSelected"></simple-date-picker>
```

### Inputs:
```js
importantDates: Array // An array of dates in YYYY-MM-DD format to be highlighted on the calendar
```

### Contribute
Like most libraries, this one could use some improvements.

https://github.com/KennyGScott/simple-date-picker
