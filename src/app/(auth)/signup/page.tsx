'use client';

import { Box, Center, Flex, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { post } from '@/api';
import { ChakraNextLink } from '@/components/chakra-next-link';
import { Button } from '@/components/ui/button';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Field } from '@/components/ui/field';
import { PasswordInput, PasswordStrengthMeter } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';

type SignupFormValues = {
  name: string;
  email: string;
  contactInfo: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupFormValues>();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      toaster.error({
        title: 'Error',
        description: 'Passwords do not match',
      });
      return;
    }

    try {
      await post('auth/signup', {
        name: data.name,
        email: data.email,
        contactInfo: data.contactInfo,
        address: data.address,
        password: data.password,
      });

      toaster.success({
        title: 'Sign up successful',
        description: 'You have successfully signed up.',
      });

      router.replace('/signin');
    } catch (error) {
      console.error(error);

      toaster.error({
        title: 'Error',
        description: 'An error occurred while signing up.',
      });
    }
  });

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack gap={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Sign up
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Create an account to get started.
          </Text>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack gap={4}>
            <Field label="Name" required invalid={!!errors.name} errorText={errors.name?.message}>
              <Input type="text" id="name" {...register('name', { required: 'Name is required' })} />
            </Field>
            <Field label="Email address" required invalid={!!errors.email} errorText={errors.email?.message}>
              <Input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
              />
            </Field>
            <HStack>
              <Box>
                <Field
                  label="Contact Info"
                  required
                  invalid={!!errors.contactInfo}
                  errorText={errors.contactInfo?.message}
                >
                  <Input
                    type="text"
                    id="contactInfo"
                    {...register('contactInfo', { required: 'Contact Info is required' })}
                  />
                </Field>
              </Box>
              <Box>
                <Field label="Address">
                  <Input type="text" id="address" {...register('address')} />
                </Field>
              </Box>
            </HStack>
            <Field label="Password" required invalid={!!errors.password} errorText={errors.password?.message}>
              <PasswordInput
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password is too short' },
                })}
              />
            </Field>
            <PasswordStrengthMeter value={watch('password')?.length} max={8} />
            <Field
              label="Confirm Password"
              required
              invalid={!!errors.confirmPassword}
              errorText={errors.confirmPassword?.message}
            >
              <PasswordInput
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                })}
              />
            </Field>
            <Stack gap={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Center>
                <Text>
                  Already a user?{' '}
                  <ChakraNextLink href="/signin" color="blue.400">
                    Sign in instead!
                  </ChakraNextLink>
                </Text>
              </Center>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
