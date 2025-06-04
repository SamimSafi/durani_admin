
import { uniqueId } from 'lodash';

import {
  IconLayoutDashboard,
  IconUsers,
  IconHistory,
  IconAward,
  IconRocket,
  IconHeartHandshake,
  IconBriefcase,
  IconSlideshow,
  IconTrophy,
  IconBox,
  IconCategory,
  IconUser,
  IconBuilding,
  IconUsersGroup,
  IconFileCv,
  IconHandClick,
  IconEdit,
  IconBrandProducthunt,
  IconMenuDeep
} from '@tabler/icons-react';
import { IconAddressBook } from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
    {
    id: uniqueId(),
    title: 'Slogan',
    icon: IconMenuDeep,
    href: '/slogan', 
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUsers,
    href: '/users',
  },
  {
    id: uniqueId(),
    title: 'History',
    icon: IconHistory,
    href: '/history',
  },
  {
    id: uniqueId(),
    title: 'Contents',
    icon: IconEdit,
    href: '/content',
  },
  {
    id: uniqueId(),
    title: 'Product',
    icon: IconBrandProducthunt,
    href: '/product',
  },
  {
    id: uniqueId(),
    title: 'Product Category',
    icon: IconCategory,
    href: '/productCategory',
  },
  {
    id: uniqueId(),
    title: 'Leadership',
    icon: IconAward,
    href: '/leadership',
  },
  {
    id: uniqueId(),
    title: 'Mission',
    icon: IconRocket,
    href: '/mission',
  },
  {
    id: uniqueId(),
    title: 'Partnership',
    icon: IconHeartHandshake,
    href: '/partnership',
  },
  {
    id: uniqueId(),
    title: 'Services',
    icon: IconBriefcase,
    href: '/services',
  },
  {
    id: uniqueId(),
    title: 'Sliders',
    icon: IconSlideshow,
    href: '/sliders',
  },
  {
    id: uniqueId(),
    title: 'Success Snapshots',
    icon: IconTrophy,
    href: '/successSnapshots',
  },
  {
    id: uniqueId(),
    title: 'Projects',
    icon: IconBox,
    href: '/projects',
  },
  {
    id: uniqueId(),
    title: 'Project Categories',
    icon: IconCategory,
    href: '/projectCategories',
  },
  {
    id: uniqueId(),
    title: 'Job Posting',
    icon: IconFileCv,
    href: '/jobposting',
  },
  {
    id: uniqueId(),
    title: 'Bio',
    icon: IconUser,
    href: '/bio',
  },
  {
    id: uniqueId(),
    title: 'Company Info',
    icon: IconBuilding,
    href: '/companyInfo',
  },
  {
    id: uniqueId(),
    title: 'Team',
    icon: IconUsersGroup,
    href: '/team',
  },
  {
    id: uniqueId(),
    title: 'Contact',
    icon: IconAddressBook,
    href: '/contact',
  },
  {
    id: uniqueId(),
    title: 'Why Choose Us',
    icon: IconHandClick,
    href: '/whyChooseUs', 
  },

];

export default Menuitems;
