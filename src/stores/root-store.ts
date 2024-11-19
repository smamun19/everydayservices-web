import { cast, Instance, types } from 'mobx-state-tree';

import { UserSchema, userStore } from './user-store';

const rootStore = types
  .model('RootStore', {
    hydrating: types.optional(types.boolean, true),
    user: types.maybe(userStore),
  })
  .actions((self) => ({
    onHydrationFinish() {
      self.hydrating = false;
    },
    setUser(user: UserSchema) {
      self.user = cast(user);
    },
    clearUser() {
      self.user = undefined;
    },
  }))
  .views((self) => ({
    get isAuthenticated() {
      return !!self.user;
    },
    get bearerToken() {
      if (self.user) {
        return `Bearer ${self.user.token}`;
      }
      return '';
    },
    // get refreshToken() {
    //   if (self.user) {
    //     return self.user.refreshToken;
    //   }
    //   return '';
    // },
  }));

type RootStoreInstance = Instance<typeof rootStore>;

export interface RootStoreInstanceWithUser extends RootStoreInstance {
  user: Instance<typeof userStore>;
}

export default rootStore;
