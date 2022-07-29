export class DateUtil{
    static getCurrentFormatted(){
        const date = Intl.DateTimeFormat('fr-FR', {
            hour: 'numeric',
            minute: 'numeric',
        });
        return date.format();
    }
}
