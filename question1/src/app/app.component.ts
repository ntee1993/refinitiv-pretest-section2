import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Section 2 : pretest';
  inputNum: number | undefined;
  selectedCalType: string = 'isPrime';
  result: string = '';

  changeHandle() {
    if (this.inputNum) {
      if (this.inputNum >= 0) {
        this.inputNum = Math.round(this.inputNum);
      } else {
        this.inputNum = 1;
      }

      switch (this.selectedCalType) {
        case 'isPrime':
          this.result = String(this.isPrime(this.inputNum));
          break;
        case 'isFibanacci':
          this.result = String(this.isFibanacci(this.inputNum));
          break;
        default:
          this.result = '';
          break;
      }
    }
  }

  isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num === 2) return true;

    const sqrt = Math.sqrt(num);
    for (let i = 2; i <= sqrt; i++) if (num % i === 0) return false;

    return true;
  }

  isFibanacci(num: number): boolean {
    if (
      this.isPerfectSquare(5 * Math.pow(num, 2) - 4) ||
      this.isPerfectSquare(5 * Math.pow(num, 2) + 4)
    ) {
      return true;
    } else {
      return false;
    }
  }

  isPerfectSquare(num: number): boolean {
    const sqrt = Math.floor(Math.sqrt(num));
    return Math.pow(sqrt, 2) === num;
  }
}
