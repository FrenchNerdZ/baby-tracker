import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import * as auth from '@angular/fire/auth';
import { vi } from 'vitest';

setupTestBed();

vi.mock('@angular/fire/auth', () => {
  class MockGoogleAuthProvider {}
  const signInWithEmailAndPassword = vi.fn(() => Promise.resolve({ user: { uid: '123' } }));
  const signInWithPopup = vi.fn(() => Promise.resolve({ user: { uid: 'google-uid' } }));

  return {
    getAuth: vi.fn(),
    GoogleAuthProvider: MockGoogleAuthProvider,
    onAuthStateChanged: vi.fn((_auth: auth.Auth, callback: (user: auth.User | null) => void) =>
      callback({ uid: '123' } as auth.User),
    ),
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut: vi.fn(() => Promise.resolve()),
  };
});
