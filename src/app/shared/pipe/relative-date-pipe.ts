import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
  pure: true,
})
export class RelativeDatePipe implements PipeTransform {
  private translations: Record<string, string> = {
    today: 'Today',
    yesterday: 'Yesterday',
    dayBeforeYesterday: 'Day before yesterday',
  };

  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    switch (diffDays) {
      case 0: {
        return this.translations['today'];
      }
      case -1: {
        return this.translations['yesterday'];
      }
      case -2: {
        return this.translations['dayBeforeYesterday'];
      }
      default: {
        // Dates older or further in the future
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
        if (date.getFullYear() !== now.getFullYear()) {
          options.year = 'numeric';
        }

        const locale = navigator.language || 'en-US';
        return date.toLocaleDateString(locale, options);
      }
    }
  }
}
