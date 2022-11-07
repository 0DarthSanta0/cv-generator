import { Subject, takeUntil } from 'rxjs';
import { ChangeDetectorRef, inject, ViewRef } from '@angular/core';

export function untilDestroyed<T>() {
  const subject = new Subject<void>();

  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => {
    subject.next();
    subject.complete()
  });

  return takeUntil<T>(subject.asObservable());
}
