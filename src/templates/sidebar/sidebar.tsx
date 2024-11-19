'use client';

import { Bleed, Separator, Stack, Text } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { LuImage, LuLayoutDashboard, LuSettings } from 'react-icons/lu';

import { useRootStoreWithUser } from '@/stores/store-setup';
import { SidebarLink } from './sidebar-link';
import { UserProfile } from './user-profile';

import type { StackProps } from '@chakra-ui/react';

interface Group {
  title: string;
  links: Array<{
    icon: IconType;
    label: string;
    slug: string;
  }>;
}

type Groups = Group[];

const groups: Groups = [
  {
    title: 'Dashboard',
    links: [
      {
        icon: LuLayoutDashboard,
        label: 'Overview',
        slug: '',
      },
      {
        icon: LuImage,
        label: 'Profile',
        slug: 'profile',
      },
    ],
  },
];

const adminGroups: Groups = [
  {
    title: 'Management',
    links: [
      {
        icon: LuSettings,
        label: 'Settings',
        slug: 'settings',
      },
    ],
  },
];

const dashboardBasePath = '/dashboard';

export const Sidebar = (props: StackProps) => {
  const store = useRootStoreWithUser();
  const pathName = usePathname();
  const currentSlug = pathName.replace(dashboardBasePath, '').replace('/', '');
  console.log(pathName);
  return (
    <Stack
      flex="1"
      p={{ base: '4', md: '6' }}
      bg="bg.panel"
      borderRightWidth="1px"
      justifyContent="space-between"
      maxW="xs"
      {...props}
    >
      <Stack gap="6">
        <Stack gap="6">
          {groups.map((group, index) => (
            <Stack key={index} gap="2">
              <Text fontWeight="medium" textStyle="sm">
                {group.title}
              </Text>
              <Stack gap="1">
                {group.links.map((link, index) => (
                  <Bleed key={index} inline="4">
                    <SidebarLink
                      href={`${dashboardBasePath}/${link.slug}`}
                      aria-current={link.slug === currentSlug ? 'page' : undefined}
                    >
                      <link.icon /> {link.label}
                    </SidebarLink>
                  </Bleed>
                ))}
              </Stack>
            </Stack>
          ))}
          {store.user.roles.includes('ADMIN') &&
            adminGroups.map((group, index) => (
              <Stack key={index} gap="2">
                <Text fontWeight="medium" textStyle="sm">
                  {group.title}
                </Text>
                <Stack gap="1">
                  {group.links.map((link, index) => (
                    <Bleed key={index} inline="4">
                      <SidebarLink
                        href={`${dashboardBasePath}/${link.slug}`}
                        aria-current={link.slug === currentSlug ? 'page' : undefined}
                      >
                        <link.icon /> {link.label}
                      </SidebarLink>
                    </Bleed>
                  ))}
                </Stack>
              </Stack>
            ))}
        </Stack>
      </Stack>
      <Separator />
      <UserProfile />
    </Stack>
  );
};
