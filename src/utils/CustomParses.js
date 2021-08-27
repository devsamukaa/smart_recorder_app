
import { parse, isDate, format, addDays } from "date-fns";
import { MaskService } from 'react-native-masked-text';

export class CustomParses {

    static parseDoubleToCurrency = (value) => {

        value = MaskService.toMask('money', value, {
            unit: 'R$ ',
            separator: ',',
            delimiter: '.'
        });

        return value;
    }

    static parseCurrencyString = (value, originalValue) => {

        let parsedCurrency = originalValue.toString().replace('R$ ', '').replace(/[,.]/g, '');
        let cents = parsedCurrency.substring(parsedCurrency.length - 2, parsedCurrency.length);
        let realValue = parsedCurrency.substring(0, parsedCurrency.length-2);

        console.log(originalValue);
        console.log(realValue + '.' + cents);

        return parseFloat(realValue + '.' + cents);
    }

    static parseDateString = (value, originalValue) => {

        const parsedDate = isDate(originalValue)
            ? parse(originalValue, "dd/MM/yyyy", new Date())
            : originalValue.length == 10 ? parse(originalValue, "dd/MM/yyyy", new Date()) : -1;
        
        return parsedDate;
    }

    static parseDateWithZeroHoursToString = (dateInTFormat) => {

        return format(addDays(new Date(dateInTFormat), 1), 'dd/MM/yyyy');
        
    } 

}