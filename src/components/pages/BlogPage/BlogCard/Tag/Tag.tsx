import React from 'react';
import TagIcon from '@/assets/icons/TagIcon.svg';

interface TagProps {
    theme: 'AI Updates' | 'Health Innovations' | 'Sustainability News' | 'Tech Trends';
}

const themeClasses = {
  'AI Updates': {
    bg: 'bg-purple-200',
    text: 'text-purple-800',
    icon: 'text-purple-800',
  },
  'Health Innovations': {
    bg: 'bg-pink-200',
    text: 'text-pink-800',
    icon: 'text-pink-800',
  },
  'Sustainability News': {
    bg: 'bg-lime-200',
    text: 'text-lime-800',
    icon: 'text-lime-800',
  },
  'Tech Trends': {
    bg: 'bg-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-800',
  },
};

export const Tag: React.FC<TagProps> = ({ theme }) => {
  const classes = themeClasses[theme];
  return (
    <span
        className={`flex flex-row items-center gap-2 rounded-full px-2 py-2 h-[32px] font-medium text-[12px] w-fit ${classes.bg} ${classes.text}`}
        >
        <TagIcon className={`${classes.icon}`} />
        {theme}
    </span>

  );
};

export default Tag;
