import createPersistentStore from 'mst-persistent-store';
import defaultStorage from 'mst-persistent-store/dist/storage';

import rootStore, { RootStoreInstanceWithUser } from './root-store';

export const [RootStoreProvider, useRootStore] = createPersistentStore(
  rootStore,
  defaultStorage,
  {},
  { hydrating: true },
  {
    onHydrate(storeInstance) {
      storeInstance.onHydrationFinish();
    },
  }
);

/**
 * This should be used inside `/dashboard` tree, where user is guaranteed to be present and is guarded by layout component check.
 */
export const useRootStoreWithUser: () => RootStoreInstanceWithUser =
  useRootStore as unknown as () => RootStoreInstanceWithUser;
