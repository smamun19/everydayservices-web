'use client';

import { Flex, Heading, Image, Input, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { post } from '@/api';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';
import { useRootStore } from '@/stores/store-setup';
import { userSchema } from '@/stores/user-store';

type SigninFormValues = {
  identifier: string;
  password: string;
};

export default function Signin() {
  const store = useRootStore();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await post(
        'auth/signin',
        {
          identifier: data.identifier,
          password: data.password,
        },
        userSchema
      );

      toaster.success({
        title: 'Sign in successful',
        description: 'You have successfully signed in.',
      });

      store.setUser(result);

      router.replace('/dashboard');
    } catch (error) {
      console.error(error);

      toaster.error({
        title: 'Error',
        description: 'An error occurred while signing in. Please try again.',
      });
    }
  });
  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack gap={4} w="full" maxW="md">
          <Heading fontSize="2xl">Sign in to your account</Heading>
          <Field label="Email" required invalid={!!errors.identifier} errorText={errors.identifier?.message}>
            <Input type="text" id="identifier" {...register('identifier', { required: 'This is required' })} />
          </Field>
          <Field label="Password" required invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password is too short' },
              })}
            />
          </Field>
          <Stack gap={6}>
            <Stack direction={{ base: 'column', sm: 'row' }} align="start" justify="space-between">
              <Checkbox>Remember me</Checkbox>
              <Text color="blue.500">Forgot password?</Text>
            </Stack>
            <Button
              colorPalette="blue"
              variant="solid"
              loading={isSubmitting}
              disabled={isSubmitting}
              onClick={onSubmit}
            >
              Sign in
            </Button>
            {/* <Button variant="outline">
              <FcGoogle /> Sign in with Google
            </Button>
            <Button>
              <FaFacebook /> Continue with Facebook
            </Button>
            <Button>
              <FaInstagram /> Continue with Instagram
            </Button> */}
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt="Login Image"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
        />
      </Flex>
    </Stack>
  );
}
