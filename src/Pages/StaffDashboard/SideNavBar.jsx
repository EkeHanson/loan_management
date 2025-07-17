import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import LOGO from './Img/logo-lite.png';
import LOGOICON from './Img/logo-icon.png';

import {
  HomeIcon as HomeOutline,
  ClipboardDocumentIcon as ClipboardOutline,
  CheckCircleIcon as CheckCircleOutline,
  CalendarDaysIcon as CalendarOutline,
  UsersIcon as UsersOutline,
  ClockIcon as ClockOutline,
  BellIcon as BellOutline,
  Cog6ToothIcon as SettingsOutline,
  InboxIcon,
  UserCircleIcon,
  ArrowLongRightIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  PaperAirplaneIcon as PaperAirplaneOutline,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
  ArchiveBoxIcon as ArchiveOutline,
  QueueListIcon as TasksOutline, // 🆕 Tasks Outline Icon
} from '@heroicons/react/24/outline';

import {
  HomeIcon as HomeSolid,
  ClipboardDocumentIcon as ClipboardSolid,
  CheckCircleIcon as CheckCircleSolid,
  CalendarDaysIcon as CalendarSolid,
  UsersIcon as UsersSolid,
  ClockIcon as ClockSolid,
  BellIcon as BellSolid,
  Cog6ToothIcon as SettingsSolid,
  InboxIcon as InboxSolid,
  UserCircleIcon as UserCircleSolid,
  DocumentTextIcon as DocumentTextSolid,
  PaperAirplaneIcon as PaperAirplaneSolid,
  ArchiveBoxIcon as ArchiveSolid,
  QueueListIcon as TasksSolid, // 🆕 Tasks Solid Icon
} from '@heroicons/react/24/solid';

import { useClock } from '../../context/ClockContext';

const iconClass = 'w-5 h-5';
const basePath = '/staff';

const SideNavBar = ({ setShrinkNav }) => {
  const location = useLocation();
  const { isClockedIn, clockInTime, clockOutTime } = useClock();
  const [active, setActive] = useState('dashboard');
  const [menuToggled, setMenuToggled] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const notificationCount = 3;
  const [tasksRefreshing, setTasksRefreshing] = useState(false);
  const tasksTimerRef = useRef(null);

  useEffect(() => {
    const relPath = location.pathname.replace(basePath, '').replace(/^\//, '');
    setActive(relPath === '' ? 'dashboard' : relPath.split('/')[0]);
  }, [location]);

  const formatTime = (date) =>
    date
      ? new Intl.DateTimeFormat(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(date)
      : '--:--';

  const renderIcon = (name, Outline, Solid) =>
    active === name ? <Solid className={iconClass} /> : <Outline className={iconClass} />;

  const MenuItem = ({ name, label, OutlineIcon, SolidIcon, to, onClick, badge }) => {
    const isClockInItem = name === 'clock-in';
    const isMyTasks = name === 'my-tasks';

    let displayLabel = label;
    let timeLabel = null;

    if (isClockInItem) {
      displayLabel = isClockedIn ? 'Clocked In' : 'Clocked Out';
      timeLabel = isClockedIn ? formatTime(clockInTime) : formatTime(clockOutTime);
    }

    return (
      <li className={`${active === name ? 'active' : ''} ${isClockInItem ? 'special-clock-in' : ''}`}>
        <Link
          to={to}
          className="flex items-center justify-between"
          title={displayLabel}
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick();
            }
            if (isMyTasks) {
              if (tasksTimerRef.current) clearTimeout(tasksTimerRef.current);
              setTasksRefreshing(true);
              tasksTimerRef.current = setTimeout(() => setTasksRefreshing(false), 1000);
            }
            setActive(isClockInItem ? '' : name);
          }}
        >
          <span className="LefB-Icon">
            {isClockInItem ? (
              <ClockSolid className={iconClass} />
            ) : (
              renderIcon(name, OutlineIcon, SolidIcon)
            )}
          </span>

          <span className="LefB-label">
            <span className="fffin-OOlka">
              {displayLabel}
              {isClockInItem && <p className="clock-time">{timeLabel}</p>}
            </span>
            {isMyTasks && (
              <ArrowPathIcon className={`sppen-sppart ${tasksRefreshing ? 'animate-spin-fast' : ''}`} />
            )}
            {badge > 0 && <span className="notification-badge ml-2">{badge}</span>}
          </span>
        </Link>
      </li>
    );
  };

  const navItems = [
    {
      name: 'clock-in',
      label: 'Clock-In',
      OutlineIcon: ClockOutline,
      SolidIcon: ClockSolid,
      to: `${basePath}/clock-history`,
    },
    {
      name: 'dashboard',
      label: 'Dashboard',
      OutlineIcon: HomeOutline,
      SolidIcon: HomeSolid,
      to: `${basePath}/`,
    },
    {
      name: 'my-tasks',
      label: 'My Tasks',
      OutlineIcon: ClipboardOutline,
      SolidIcon: ClipboardSolid,
      to: `${basePath}/my-tasks`,
    },
    {
      name: 'tasks',
      label: 'Tasks',
      OutlineIcon: TasksOutline,
      SolidIcon: TasksSolid,
      to: `${basePath}/tasks`,
    },
    {
      name: 'attendance',
      label: 'Attendance',
      OutlineIcon: DocumentTextIcon,
      SolidIcon: DocumentTextSolid,
      to: `${basePath}/attendance`,
    },
    {
      name: 'messages',
      label: 'Messages',
      OutlineIcon: InboxIcon,
      SolidIcon: InboxSolid,
      to: `${basePath}/messages`,
    },
    {
      name: 'calendar',
      label: 'Calendar',
      OutlineIcon: CalendarOutline,
      SolidIcon: CalendarSolid,
      to: `${basePath}/calendar`,
    },
    {
      name: 'notifications',
      label: 'Notifications',
      OutlineIcon: BellOutline,
      SolidIcon: BellSolid,
      to: `${basePath}/notifications`,
      badge: notificationCount,
    },
    {
      name: 'team',
      label: 'Team',
      OutlineIcon: UsersOutline,
      SolidIcon: UsersSolid,
      to: `${basePath}/team`,
    },
    {
      name: 'request',
      label: 'Request',
      OutlineIcon: PaperAirplaneOutline,
      SolidIcon: PaperAirplaneSolid,
      to: `${basePath}/request`,
    },
    {
      name: 'asset',
      label: 'Asset',
      OutlineIcon: ArchiveOutline,
      SolidIcon: ArchiveSolid,
      to: `${basePath}/asset`,
    },
    {
      name: 'profile',
      label: 'Profile',
      OutlineIcon: UserCircleIcon,
      SolidIcon: UserCircleSolid,
      to: `${basePath}/profile`,
    },
    {
      name: 'settings',
      label: 'Settings',
      OutlineIcon: SettingsOutline,
      SolidIcon: SettingsSolid,
      to: `${basePath}/settings`,
    },
  ];

  const itemsToShow = viewMore ? navItems : navItems.slice(0, 10);

  return (
    <motion.div
      className="SideNavBar Gen-Boxshadow"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="SideNavBar-Main custom-scroll-bar">
        <div className="Side-Logogos">
          <Link to="/" className="Nav-Brand">
            <img src={LOGOICON} alt="logo" className="sside-LOgo-Iocn" />
            <img src={LOGO} alt="logo" className="sside-LOgo-Main" />
            <span>crm</span>
          </Link>
        </div>

        <p className="LeftnavBr-Title">
          <span className="Leffft-SOpan">Menu</span>
          <span
            onClick={() => {
              setMenuToggled(!menuToggled);
              setShrinkNav?.(!menuToggled);
            }}
            className="shrinkToggle"
          >
            {menuToggled ? (
              <ArrowLongRightIcon className="w-6 h-6 text-gray-700" />
            ) : (
              <Squares2X2Icon className="w-6 h-6 text-gray-700" />
            )}
          </span>
        </p>

        <ul className="LeftnavBr-Icons">
          {itemsToShow.map(({ name, label, OutlineIcon, SolidIcon, to, onClick, badge }) => (
            <MenuItem
              key={name}
              name={name}
              label={label}
              OutlineIcon={OutlineIcon}
              SolidIcon={SolidIcon}
              to={to}
              onClick={onClick}
              badge={badge}
            />
          ))}
        </ul>

        {navItems.length > 10 && (
          <button
            className="MMk-Vieww-Mahns spaciila-BNtna"
            onClick={() => setViewMore((prev) => !prev)}
          >
            {viewMore ? (
              <div>
                <span>View Less Menu</span>
                <ChevronUpIcon className="w-4 h-4" />
              </div>
            ) : (
              <div>
                <span>View More Menu</span>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SideNavBar;
