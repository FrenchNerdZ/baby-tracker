import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: false,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null): string {
    if (!value) return 'No bottle';

    const now = new Date();
    const date = typeof value === 'string' ? new Date(value) : value;
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return 'a few seconds ago';

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return ` ${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;

    const diffH = Math.floor(diffMin / 60);
    const remMin = diffMin % 60;

    if (diffH < 24) {
      if (remMin === 0) return `${diffH} hour${diffH > 1 ? 's' : ''} ago`;
      return `${diffH} hour${diffH > 1 ? 's' : ''} ${remMin} minute${remMin > 1 ? 's' : ''} ago`;
    }

    const diffD = Math.floor(diffH / 24);
    if (diffD < 30) return `${diffD} day${diffD > 1 ? 's' : ''} ago`;
    const diffM = Math.floor(diffD / 30);
    if (diffM < 12) return `${diffM} month${diffM > 1 ? 's' : ''} ago`;
    const diffY = Math.floor(diffD / 365);
    return `${diffY} year${diffY > 1 ? 's' : ''} ago`;
  }
}
