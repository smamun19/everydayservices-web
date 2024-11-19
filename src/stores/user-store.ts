import { types } from 'mobx-state-tree';
import { z } from 'zod';

export const userSchema = z.object({
  token: z.string(),
  //refreshToken: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  email: z.string(),
  contactInfo: z.string(),
  address: z.string().nullable(),
  roles: z.array(z.union([z.literal('USER'), z.literal('ADMIN')])),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;

export const userStore = types
  .model('UserStore', {
    token: types.string,
    //refreshToken: types.maybe.string,
    id: types.string,
    name: types.string,
    email: types.string,
    contactInfo: types.string,
    address: types.maybeNull(types.string),
    roles: types.array(types.union(types.literal('USER'), types.literal('ADMIN'))),
    updatedAt: types.string,
    createdAt: types.string,
  })
  .views((self) => ({
    get fullName() {
      return self.name;
    },
  }));
