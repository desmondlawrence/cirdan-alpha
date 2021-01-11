export class Utils {
    static convertYYYYMMDDToDate(dateStr: string): Date {
        if (dateStr.length !== 8) {
            throw new Error('Invalid date string');
        }
        const issueYear = parseInt(dateStr.slice(0, 4), 10);
        const issueMonth = parseInt(dateStr.slice(4, 6), 10) - 1;
        const issueDate = parseInt(dateStr.slice(6, 8), 10);
        if (isNaN(issueYear) || isNaN(issueMonth) || isNaN(issueDate)) {
            throw new Error('Invalid date string');
        }
        const date = new Date(issueYear, issueMonth, issueDate);
        return date;
    }

    static convertDateToYYYYMMDD(date: Date): string {
        return '' +
            date.getFullYear() +
            Utils.precedingZeroes((date.getMonth() + 1), 2) +
            Utils.precedingZeroes(date.getDate(), 2);
    }

    static precedingZeroes(num: number, len: number): string {
        let numberStr = '' + num;
        const numLength = numberStr.length;
        for (let counter = 0; counter < len - numLength; counter++) {
            numberStr = '' + 0 + numberStr;
        }
        return numberStr;
    }
}
