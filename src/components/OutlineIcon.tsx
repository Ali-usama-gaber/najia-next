import type { SVGProps } from 'react';

export type IconName = 'clock' | 'lock' | 'users' | 'check' | 'flower' | 'shield' | 'heart' | 'book' | 'spark' | 'mail' | 'pin' | 'calendar' | 'message';

type Props = SVGProps<SVGSVGElement> & { name: IconName };

const paths: Record<IconName, React.ReactNode> = {
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2.2" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3.5 20c.5-3.2 2.3-5 5.5-5s5 1.8 5.5 5M16 5.5a3 3 0 0 1 0 5.7M17 15c2.1.3 3.4 1.9 3.8 4.5" /></>,
  check: <path d="m5 12 4.2 4.2L19.5 6" />,
  flower: <><path d="M12 20c-1.6-2.2-1.7-4.6-.5-6.7M12 13.3C8 13.8 5 12 4.5 8.5 8 8 11 9.8 12 13.3ZM12 13.3c4-.5 7-2.3 7.5-4.8-3.5-.5-6.5 1.3-7.5 4.8Z" /><path d="M12 13.3c-1.7-3.6-.9-6.9 1.7-8.8 1.8 3 1 6.5-1.7 8.8Z" /></>,
  shield: <path d="M12 3.5 19 6v5.3c0 4.2-2.8 7.7-7 9.2-4.2-1.5-7-5-7-9.2V6l7-2.5Zm-3 8.2 2 2 4.2-4.2" />,
  heart: <path d="M20 8.7c0 5-8 10.3-8 10.3S4 13.7 4 8.7C4 6.6 5.7 5 7.8 5c1.6 0 3.1.8 4.2 2.2C13.1 5.8 14.6 5 16.2 5 18.3 5 20 6.6 20 8.7Z" />,
  book: <><path d="M5 4.5h9a3 3 0 0 1 3 3V20H8a3 3 0 0 0-3 3V4.5Z" /><path d="M5 20h9a3 3 0 0 1 3 3M9 9h5M9 13h4" /></>,
  spark: <path d="m12 3 1.5 5.8L19 10.5l-5.5 1.7L12 18l-1.5-5.8L5 10.5l5.5-1.7L12 3Zm7 14 .6 2.4L22 20l-2.4.6L19 23l-.6-2.4L16 20l2.4-.6L19 17Z" />,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 5.5L19.5 7" /></>,
  pin: <><path d="M19 10c0 5-7 10.5-7 10.5S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.3" /></>,
  calendar: <><rect x="4" y="5.5" width="16" height="15" rx="2" /><path d="M8 3.5v4M16 3.5v4M4 10h16M8 14h3M8 17h6" /></>,
  message: <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8 8 0 0 1-3.4-.8L4 20l1.5-4a7.4 7.4 0 0 1-1-3.8 7.5 7.5 0 0 1 8-7.5 7.5 7.5 0 0 1 7.5 7.5ZM8.5 12h.01M12 12h.01M15.5 12h.01" />,
};

export default function OutlineIcon({ name, className = 'w-6 h-6', ...props }: Props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>{paths[name]}</svg>;
}
