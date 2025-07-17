import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckIcon,
  UserIcon,
  BellIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  Cog6ToothIcon as SettingsIconOutline,
  XMarkIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  StarIcon

} from '@heroicons/react/24/outline';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';
import { useClock } from '../../context/ClockContext';
import Messaging from './Messaging';


import MembImg1 from './Img/memberIcon1.jpg';
import MembImg2 from './Img/memberIcon2.jpg';

import RecruitmentIcon from './Img/CRMPack/Recruitment.svg';
import ComplianceIcon from './Img/CRMPack/Compliance.svg';
import TrainingIcon from './Img/CRMPack/Training.svg';
import AssetmanagementIcon from './Img/CRMPack/Assetmanagement.svg';
import RosteringIcon from './Img/CRMPack/Rostering.svg';
import HRIcon from './Img/CRMPack/HR.svg';
import PayrollIcon from './Img/CRMPack/Payroll.svg';


const DashboardNavBar = () => {
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);
  const buttonRef = useRef(null);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notificationsCount] = useState(3);
  const [isSwitching, setIsSwitching] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingClockState, setPendingClockState] = useState(null);
  const { isClockedIn, clockIn, clockOut, clockInTime, clockOutTime } = useClock();
  const [taskCount, setTaskCount] = useState(1);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
  

    // Handle click outside to close dropdowns
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setShowFeaturesDropdown(false);
        }
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setShowProfileDropdown(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


      const handleFeatureClick = () => setShowFeaturesDropdown(false);
  const handleProfileClick = () => setShowProfileDropdown(!showProfileDropdown);
  const closeProfileDropdown = () => setShowProfileDropdown(false);

  const handleButtonClick = (button) => {
    setActiveButton((prev) => (prev === button ? null : button));
  };


    const featureLinks = [
      { name: 'Recruitment', icon: RecruitmentIcon, path: '/staff/recruitment' },
      { name: 'Compliance', icon: ComplianceIcon, path: '/staff/compliance' },
      { name: 'Training', icon: TrainingIcon, path: '/staff/training' },
      { name: 'Assets management', icon: AssetmanagementIcon, path: '/staff/assets' },
      { name: 'Rostering', icon: RosteringIcon, path: '/staff/rostering' },
      { name: 'HR', icon: HRIcon, path: '/staff/hr' },
      { name: 'Payroll', icon: PayrollIcon, path: '/staff/payroll' },
    ];
  


// Add these state variables at the top of DashboardNavBar component
const [showMessaging, setShowMessaging] = useState(false);
const [selectedSender, setSelectedSender] = useState(null);

// Add this animation variant configuration
const messagingVariants = {
  hidden: { y: 100, opacity: 0, scale: 0.9 },
  visible: { y: 0, opacity: 1, scale: 1 },
  exit: { y: 100, opacity: 0, scale: 0.9 }
};


  // Team data with designated Lead
  const [initialTeam] = useState([
    { 
      name: 'Emma Wilson', 
      role: 'Product Manager', 
      active: true,
      isLead: true  // Designated as team lead
    },
    { name: 'James Thompson', role: 'Software Engineer', active: true, isLead: false },
    { name: 'Oliver Harris', role: 'UI/UX Designer', active: true, isLead: false },
    { name: 'Sophie Clark', role: 'Data Analyst', active: true, isLead: false },
    { name: 'Thomas Lewis', role: 'DevOps Engineer', active: true, isLead: false },
    { name: 'Charlotte Walker', role: 'Quality Assurance', active: false, isLead: false },
    { name: 'Henry Turner', role: 'Scrum Master', active: true, isLead: false },
    { name: 'Amelia Brown', role: 'Business Analyst', active: false, isLead: false },
  ]);

  // Sort team: 
  // 1. Active members first
  // 2. Lead at the top of active members
  // 3. Then inactive members
  const team = useMemo(() => {
    return [...initialTeam].sort((a, b) => {
      // Both active: sort by lead status
      if (a.active && b.active) {
        if (a.isLead) return -1;
        if (b.isLead) return 1;
        return 0;
      }
      // Active comes before inactive
      if (a.active && !b.active) return -1;
      if (!a.active && b.active) return 1;
      // Both inactive: maintain original order
      return 0;
    });
  }, [initialTeam]);

  // Calculate total active team members count
  const activeTeamCount = useMemo(() => {
    return team.filter(member => member.active).length;
  }, [team]);

  // Filter active members for display and maintain lead-first order
  const displayTeam = useMemo(() => {
    return team
      .filter(member => member.active)
      .slice(0, 5); // Only show first 5 active members
  }, [team]);

  const [chatNotifications] = useState({
    'Emma Wilson': true,
    'Thomas Lewis': true,
    'Oliver Harris': false,
    'James Thompson': true,
    'Sophie Clark': false,
    'Charlotte Walker': false,
    'Henry Turner': false,
    'Amelia Brown': false,
  });

  const memberImages = {
    'Emma Wilson': MembImg2,
    'Oliver Harris': MembImg1,
    // Add more members with images here as needed
  };

  const formatTime = (date) =>
    date
      ? date.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : '--:--:--';

  const requestClockToggle = (state) => {
    setPendingClockState(state);
    setConfirmModalOpen(true);
  };

  const handleConfirmedToggle = async () => {
    setConfirmModalOpen(false);
    setIsSwitching(true);
    await new Promise((r) => setTimeout(r, 800));
    pendingClockState ? clockIn() : clockOut();
    setIsSwitching(false);
  };

  // Close dropdowns/modals on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
      if (confirmModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        setConfirmModalOpen(false);
      }
      if (
        showTeamDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setShowTeamDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [confirmModalOpen, showTeamDropdown]);

  const ClockToggle = () => (
    <div className="clock-toggle">
      <motion.button
        onClick={() => !isSwitching && requestClockToggle(false)}
        className={`clock-btn ${!isClockedIn ? 'active' : ''}`}
        initial={false}
        animate={
          isSwitching
            ? { opacity: 0.7 }
            : isClockedIn
            ? { scale: 1 }
            : { scale: [1, 1.05, 1], transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' } }
        }
        whileHover={!isSwitching ? { scale: 1.03 } : {}}
        whileTap={!isSwitching ? { scale: 0.98 } : {}}
      >
        {isSwitching && !isClockedIn ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="spinner"
          />
        ) : (
          <>
            <span>Clock Out</span>
            <small>{formatTime(clockOutTime)}</small>
          </>
        )}
      </motion.button>

      <motion.button
        onClick={() => !isSwitching && requestClockToggle(true)}
        className={`clock-btn ${isClockedIn ? 'active' : ''}`}
        initial={false}
        animate={
          isSwitching
            ? { opacity: 0.7 }
            : isClockedIn
            ? { scale: [1, 1.05, 1], transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' } }
            : { scale: 1 }
        }
        whileHover={!isSwitching ? { scale: 1.03 } : {}}
        whileTap={!isSwitching ? { scale: 0.98 } : {}}
      >
        {isSwitching && isClockedIn ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="spinner"
          />
        ) : (
          <>
            <span>Clock In</span>
            <small>{formatTime(clockInTime)}</small>
          </>
        )}
      </motion.button>

      <motion.span
        layout
        className={`sliding-knob ${isClockedIn ? 'in' : 'out'}`}
        initial={false}
        animate={{
          left: isClockedIn ? '50%' : '0%',
          scale: isSwitching ? [1, 0.95, 1] : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          scale: { duration: 0.3, repeat: isSwitching ? Infinity : 0, repeatType: 'reverse' },
        }}
      />
    </div>
  );

  const user = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    role_Id: 'ID: PROL-0001',
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.length > 1
      ? names[0][0].toUpperCase() + names[1][0].toUpperCase()
      : names[0][0].toUpperCase();
  };

  return (
    <div className="DashboardNavBar">
      <nav className="Top-NaV">
        <div className="NaV-1 All-STtr-NavBA">

             <button
            ref={buttonRef}
            className={`genn-Drop-Togler ${showFeaturesDropdown ? 'active-Gent-Trangl' : ''}`}
            title="Features Launcher"
            onClick={() => setShowFeaturesDropdown(!showFeaturesDropdown)}
          >
            <svg viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.61963 4.65527C10.8288 4.65527 12.6196 6.44613 12.6196 8.65527C12.6196 10.8644 10.8288 12.6553 8.61963 12.6553C6.41049 12.6553 4.61963 10.8644 4.61963 8.65527C4.61963 6.44613 6.41049 4.65527 8.61963 4.65527ZM24.6196 4.65527C26.8288 4.65527 28.6196 6.44613 28.6196 8.65527C28.6196 10.8644 26.8288 12.6553 24.6196 12.6553C22.4104 12.6553 20.6196 10.8644 20.6196 8.65527C20.6196 6.44613 22.4104 4.65527 24.6196 4.65527ZM44.6196 8.65527C44.6196 6.44613 42.8288 4.65527 40.6196 4.65527C38.4104 4.65527 36.6196 6.44613 36.6196 8.65527C36.6196 10.8644 38.4104 12.6553 40.6196 12.6553C42.8288 12.6553 44.6196 10.8644 44.6196 8.65527ZM8.61963 20.6553C10.8288 20.6553 12.6196 22.4461 12.6196 24.6553C12.6196 26.8645 10.8288 28.6553 8.61963 28.6553C6.41049 28.6553 4.61963 26.8645 4.61963 24.6553C4.61963 22.4461 6.41049 20.6553 8.61963 20.6553ZM28.6196 24.6553C28.6196 22.4461 26.8288 20.6553 24.6196 20.6553C22.4104 20.6553 20.6196 22.4461 20.6196 24.6553C20.6196 26.8645 22.4104 28.6553 24.6196 28.6553C26.8288 28.6553 28.6196 26.8645 28.6196 24.6553ZM40.6196 20.6553C42.8288 20.6553 44.6196 22.4461 44.6196 24.6553C44.6196 26.8645 42.8288 28.6553 40.6196 28.6553C38.4104 28.6553 36.6196 26.8645 36.6196 24.6553C36.6196 22.4461 38.4104 20.6553 40.6196 20.6553ZM12.6196 40.6553C12.6196 38.4461 10.8288 36.6553 8.61963 36.6553C6.41049 36.6553 4.61963 38.4461 4.61963 40.6553C4.61963 42.8645 6.41049 44.6553 8.61963 44.6553C10.8288 44.6553 12.6196 42.8645 12.6196 40.6553ZM24.6196 36.6553C26.8288 36.6553 28.6196 38.4461 28.6196 40.6553C28.6196 42.8645 26.8288 44.6553 24.6196 44.6553C22.4104 44.6553 20.6196 42.8645 20.6196 40.6553C20.6196 38.4461 22.4104 36.6553 24.6196 36.6553ZM44.6196 40.6553C44.6196 38.4461 42.8288 36.6553 40.6196 36.6553C38.4104 36.6553 36.6196 38.4461 36.6196 40.6553C36.6196 42.8645 38.4104 44.6553 40.6196 44.6553C42.8288 44.6553 44.6196 42.8645 44.6196 40.6553Z"
              />
            </svg>
          </button>


          <ClockToggle />
          <h4>{isClockedIn ? 'Welcome back, John!' : 'Good Bye John!'}</h4>


                 <AnimatePresence>
            {showFeaturesDropdown && (
              <motion.div
                ref={dropdownRef}
                className="genn-Drop-Sec Gen-Boxshadow"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="genn-Drop-Search">
                  <span>
                    <MagnifyingGlassIcon />
                  </span>
                  <input type="text" placeholder="Find CRM Features" />
                </div>
                <div className="feat-Main">
                  {featureLinks.map(({ name, icon, path }, idx) => (
                    <Link to={path} onClick={handleFeatureClick} key={idx}>
                      <img src={icon} alt={name} />
                      <p>{name}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>


        </div>

        <div className="NaV-2">
          <div className="NaV-2-Icons">
            <Link to="/staff/notifications">
              {notificationsCount > 0 && <i className="nottti-Inddi" />}
              <BellIcon />
            </Link>
          </div>

          <div className="NaV-2-Icons">
            <Link to="/staff/settings">
              <SettingsIconOutline />
            </Link>
          </div>

          <div
            className={`NaV-2-Prof ${showProfileDropdown ? 'active-NavProfa' : ''}`}
            onClick={() => setShowProfileDropdown((s) => !s)}
            ref={profileRef}
          >
            <div className="NaV-2-Prof-2 oikaj-PPl">
              <div>
                <h4>
                  {user.first_name} {user.last_name}
                </h4>
                <p>{user.role_Id}</p>
              </div>
            </div>
            <div className="NaV-2-Prof-1">
              <span>
                {user.first_name[0]}
                {user.last_name[0]}
              </span>
            </div>

            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  className="All_Drop_Down kjuj-ddrop Gen-Boxshadow"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="All-TTo-Nagbs-main ouj-pia">
                    <div className="All-TTo-Nagbs-1">
                      <span>
                        {user.first_name[0]}
                        {user.last_name[0]}
                      </span>
                    </div>
                    <div className="All-TTo-Nagbs-2 oujah-osi">
                      <p>
                        {user.first_name} {user.last_name}
                      </p>
                      <span>{user.role_Id}</span>
                    </div>
                    <div className="All-TTo-Nagbs-3 ouajjs-sua">
                      <CheckIcon />
                    </div>
                  </div>
                  <Link to="/staff/profile">
                    <UserIcon /> Profile
                  </Link>
                  <button className="logout-btn btn-primary-bg" onClick={() => navigate('/login')}>
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {confirmModalOpen && (
          <motion.div className="clock-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="clock-modal-content"
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              ref={modalRef}
            >
              <h3>Confirm Action</h3>
              <p>
                Are you sure you want to <strong>{pendingClockState ? 'Clock In' : 'Clock Out'}</strong>?
              </p>
              <div className="clock-modal-buttons">
                <button className="btn-secondary" onClick={() => setConfirmModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn-primary btn-primary-bg" onClick={handleConfirmedToggle}>
                  Yes, Proceed
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="Team-MMen-Sec">
        <div className="Team-MMen-Sec-Container">
          <div className="Team-MMen-PPart-1">
            <h3>
              New Task
              <span>
                <ArrowPathRoundedSquareIcon />
                {taskCount > 0 && <b>{taskCount}</b>}
              </span>
            </h3>
            {taskCount > 0 && <Link to="">See Task</Link>}
          </div>

          <div className="Team-MMen-PPart-2">
            <AnimatePresence>
              {showTeamDropdown && (
                <motion.div
                  ref={dropdownRef}
                  className="Team-MMen-DropDown Simp-Boxshadow"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15,
                      bounce: 0.6
                    } 
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    y: -20,
                    transition: { 
                      duration: 0.2 
                    } 
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="Team-MMen-DropDown-Toop">
                    <h3>
                      Your Team Members <span>{team.length}</span>
                    </h3>
                    <button onClick={() => setShowTeamDropdown(false)}>
                      <XMarkIcon />
                    </button>
                  </div>

                  <ul className="temam-MM-Crrda custom-scroll-bar">
                    {team.map((member) => (
                      <li 
                        key={member.name} 
                        className={`${member.active ? 'active-TeamMeM' : 'inactive-TeamMeM'} ${member.isLead ? 'lead-member' : ''}`}
                      >
                        <span className="Teem-NNm-Labell">
                          {memberImages[member.name] ? (
                            <img 
                              src={memberImages[member.name]} 
                              alt={member.name} 
                              className="member-avatar"
                            />
                          ) : (
                            <span>{getInitials(member.name)}</span>
                          )}
                          {member.isLead && 
                          <span className="lead-tag">
                            Lead
                            <StarIcon />
                            </span>
                            }
                          <i></i>
                        </span>
                        <h5>
                          {member.name}
                        </h5>
                        <p>{member.role}</p>
                        <div className="oolok-Btns">
                            <span 
                              title={`Chat with ${member.name.split(' ')[0]}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSender({
                                  name: member.name,
                                  role: member.role,
                                  avatar: memberImages[member.name] || null,
                                  initials: getInitials(member.name),
                                  isLead: member.isLead
                                });
                                setShowMessaging(true);
                                setShowTeamDropdown(false);
                              }}
                            >
                              <ChatBubbleLeftRightIcon />
                              {chatNotifications[member.name] && <i className="nottti-Inddi"></i>}
                            </span>
                          <span title={`Call ${member.name.split(' ')[0]}`}>
                            <PhoneIcon />
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="Team-MMen-DropDown-Foot">
                    <h4>Group Task:</h4>
                    <div className="Team-MMen-DropDown-Foot-Statuss">
                      <span>
                        <UserIcon /> Total: 0
                      </span>
                      <span>
                        <CheckCircleIcon /> Completed: 0
                      </span>
                      <span>
                        <ClockIcon /> Pending: 0
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              ref={toggleRef}
              className="SlomTTeam-Cont"
              title="My Team"
              onClick={() => setShowTeamDropdown((show) => !show)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <h4>Team</h4>
              <ul>
                <AnimatePresence>
                  {displayTeam.map((member) => (
                    <motion.li
                      key={member.name}
                      layout
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 50 - 25,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        transition: {
                          duration: 1.2,
                          type: 'spring',
                          stiffness: 100,
                          damping: 20,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 50 - 25,
                        transition: {
                          duration: 0.8,
                        },
                      }}
                      className={member.isLead ? 'lead-member' : ''}
                    >
                      {memberImages[member.name] ? (
                        <>
                          <img src={memberImages[member.name]} alt={member.name} className="member-image" />
                          {member.isLead && <StarIcon className="lead-badge-small" />}
                        </>
                      ) : (
                        <>
                          <span>{getInitials(member.name)}</span>
                          {member.isLead && <StarIcon className="lead-badge-small" />}
                        </>
                      )}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <p>
                <UsersIcon /> 
                <span>
                  {activeTeamCount > 5 ? '5+' : activeTeamCount}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>


      <AnimatePresence>
  {showMessaging && (
    <motion.div
      variants={messagingVariants}
      key="messaging-panel"
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="ppol-Messaging-Section"
    >
      <Messaging
        closeMessaging={() => setShowMessaging(false)}
        sender={selectedSender}
      />
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default DashboardNavBar;