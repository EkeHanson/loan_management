import React, { useEffect, useRef, useState } from 'react';
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductivityGraph from './ProductivityGraph';
import AttendanceSection from './AttendanceSection';

// Animated Counter Component
const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const ref = useRef(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.4, stiffness: 70, damping: 20 });
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) mv.set(value);
    const unsub = spring.on('change', v => setDisplay(Math.floor(v)));
    return () => unsub();
  }, [isInView, value]);

  const formattedDisplay = prefix === '£' ? display.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : display;

  return (
    <h3 ref={ref}>
      {prefix}
      {formattedDisplay}
      {suffix}
    </h3>
  );
};

// Cards Data per branch type and period
const cardsData = {
  workforce: {
    'All Branches': {
      Today: [
        { title: 'Total tasks', icon: <ClipboardDocumentListIcon />, value: 156, subtitle: '25 new tasks created', bg: '#E0F7FA', color: '#00796B' },
        { title: 'Completed tasks', icon: <CheckCircleIcon />, value: 120, subtitle: '85% task completion rate', bg: '#E8F5E9', color: '#388E3C' },
        { title: 'Pending tasks', icon: <ClockIcon />, value: 36, subtitle: '12 tasks overdue', bg: '#FFF3E0', color: '#F57C00' },
        { title: 'Productivity', icon: <ChartBarIcon />, value: 85, suffix: '%', subtitle: 'Completed vs assigned', bg: '#F0E9FF', color: '#7226FF' },
      ],
      'This Week': [
        { title: 'Total tasks', icon: <ClipboardDocumentListIcon />, value: 1092, subtitle: '175 new tasks created', bg: '#E0F7FA', color: '#00796B' },
        { title: 'Completed tasks', icon: <CheckCircleIcon />, value: 840, subtitle: '77% task completion rate', bg: '#E8F5E9', color: '#388E3C' },
        { title: 'Pending tasks', icon: <ClockIcon />, value: 252, subtitle: '84 tasks overdue', bg: '#FFF3E0', color: '#F57C00' },
        { title: 'Productivity', icon: <ChartBarIcon />, value: 85, suffix: '%', subtitle: 'Completed vs assigned', bg: '#F0E9FF', color: '#7226FF' },
      ],
      Month: [
        { title: 'Total tasks', icon: <ClipboardDocumentListIcon />, value: 4680, subtitle: '750 new tasks created', bg: '#E0F7FA', color: '#00796B' },
        { title: 'Completed tasks', icon: <CheckCircleIcon />, value: 3600, subtitle: '77% task completion rate', bg: '#E8F5E9', color: '#388E3C' },
        { title: 'Pending tasks', icon: <ClockIcon />, value: 1080, subtitle: '360 tasks overdue', bg: '#FFF3E0', color: '#F57C00' },
        { title: 'Productivity', icon: <ChartBarIcon />, value: 85, suffix: '%', subtitle: 'Completed vs assigned', bg: '#F0E9FF', color: '#7226FF' },
      ],
      Year: [
        { title: 'Total tasks', icon: <ClipboardDocumentListIcon />, value: 56940, subtitle: '9125 new tasks created', bg: '#E0F7FA', color: '#00796B' },
        { title: 'Completed tasks', icon: <CheckCircleIcon />, value: 43800, subtitle: '77% task completion rate', bg: '#E8F5E9', color: '#388E3C' },
        { title: 'Pending tasks', icon: <ClockIcon />, value: 13140, subtitle: '4380 tasks overdue', bg: '#FFF3E0', color: '#F57C00' },
        { title: 'Productivity', icon: <ChartBarIcon />, value: 85, suffix: '%', subtitle: 'Completed vs assigned', bg: '#F0E9FF', color: '#7226FF' },
      ],
    },
    'Main Branch': {
      Today: [
        { title: 'Total tasks', icon: <ClipboardDocumentListIcon />, value: 54, subtitle: '8 new tasks created', bg: '#E0F7FA', color: '#00796B' },
        { title: 'Completed tasks', icon: <CheckCircleIcon />, value: 42, subtitle: '78% task completion rate', bg: '#E8F5E9', color: '#388E3C' },
        { title: 'Pending tasks', icon: <ClockIcon />, value: 12, subtitle: '4 tasks overdue', bg: '#FFF3E0', color: '#F57C00' },
        { title: 'Productivity', icon: <ChartBarIcon />, value: 81, suffix: '%', subtitle: 'Main branch progress', bg: '#F0E9FF', color: '#7226FF' },
      ],
      'This Week': [
        { title: 'Total tasks', icon: <ClipboardDocumentListIcon />, value: 378, subtitle: '56 new tasks created', bg: '#E0F7FA', color: '#00796B' },
        { title: 'Completed tasks', icon: <CheckCircleIcon />, value: 294, subtitle: '78% task completion rate', bg: '#E8F5E9', color: '#388E3C' },
        { title: 'Pending tasks', icon: <ClockIcon />, value: 84, subtitle: '28 tasks overdue', bg: '#FFF3E0', color: '#F57C00' },
        { title: 'Productivity', icon: <ChartBarIcon />, value: 81, suffix: '%', subtitle: 'Main branch progress', bg: '#F0E9FF', color: '#7226FF' },
      ],
      Month: [
        { title: 'Total tasks', icon: <ClipboardDocumentListIcon />, value: 1620, subtitle: '240 new tasks created', bg: '#E0F7FA', color: '#00796B' },
        { title: 'Completed tasks', icon: <CheckCircleIcon />, value: 1260, subtitle: '78% task completion rate', bg: '#E8F5E9', color: '#388E3C' },
        { title: 'Pending tasks', icon: <ClockIcon />, value: 360, subtitle: '120 tasks overdue', bg: '#FFF3E0', color: '#F57C00' },
        { title: 'Productivity', icon: <ChartBarIcon />, value: 81, suffix: '%', subtitle: 'Main branch progress', bg: '#F0E9FF', color: '#7226FF' },
      ],
      Year: [
        { title: 'Total tasks', icon: <ClipboardDocumentListIcon />, value: 19710, subtitle: '2920 new tasks created', bg: '#E0F7FA', color: '#00796B' },
        { title: 'Completed tasks', icon: <CheckCircleIcon />, value: 15330, subtitle: '78% task completion rate', bg: '#E8F5E9', color: '#388E3C' },
        { title: 'Pending tasks', icon: <ClockIcon />, value: 4380, subtitle: '1460 tasks overdue', bg: '#FFF3E0', color: '#F57C00' },
        { title: 'Productivity', icon: <ChartBarIcon />, value: 81, suffix: '%', subtitle: 'Main branch progress', bg: '#F0E9FF', color: '#7226FF' },
      ],
    },
  },
};

// Helper function to format dates
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Calendar Dropdown Component
const CalendarDropdown = ({ selectedDate, onSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const calendarRef = useRef(null);

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Generate days array
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  

  return (
    <div className="OOcalendar-dropdown" ref={calendarRef}>
      <div className="OOcalendar-header">
        <button onClick={prevMonth}>{"<"}</button>
        <h4>
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h4>
        <button onClick={nextMonth}>{">"}</button>
      </div>
      <div className="OOcalendar-weekdays">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
          <div key={i} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="OOcalendar-days">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty"></div>
          ))}
        {days.map((day) => {
          const isSelected =
            day === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear();
          const isToday =
            day === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear();
          return (
            <div
              key={day}
              className={`OOcalendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => {
                const newDate = new Date(currentYear, currentMonth, day);
                onSelect(newDate);
                onClose();
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Component
const Home = () => {
  const [activeTab] = useState('workforce');
  const [branchView] = useState('All Branches');
  const [activePeriod, setActivePeriod] = useState('Today');
  const [selectedMonth, setSelectedMonth] = useState('Month');
  const [selectedYear, setSelectedYear] = useState('Year');
  const [periodText, setPeriodText] = useState('Today');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tabTitles = {
    workforce: 'Task Overview',
  };

  const getCurrentPeriodType = () => {
    if (activePeriod === 'Today' || activePeriod === 'This Week') {
      return activePeriod;
    } else if (selectedMonth !== 'Month') {
      return 'Month';
    } else if (selectedYear !== 'Year') {
      return 'Year';
    }
    return 'Today';
  };

  const currentPeriod = getCurrentPeriodType();

  const handlePeriodSelect = (period) => {
    setActivePeriod(period);
    setPeriodText(period);
    setSelectedMonth('Month');
    setSelectedYear('Year');
    setShowCalendar(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setPeriodText(formatDate(date));
    setActivePeriod('Today');
    setShowCalendar(false);
  };

  const handleMonthSelect = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    setActivePeriod(null);
    setPeriodText(`Month: ${month}`);
    setShowCalendar(false);
  };

  const handleYearSelect = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setActivePeriod(null);
    setPeriodText(`Year: ${year}`);
    setShowCalendar(false);
  };

  return (
    <div className="MM-Dash-HOoma">

      <div className="GHGb-MMIn-DDahs-Sec unttoop-POPa">
        <div className="GHGb-MMIn-DDahs-Top">
          <div className="olikk-IOkiks">
            <h3>{tabTitles[activeTab]}</h3>
            <p>{periodText}</p>
          </div>
          <ul className="period-controls">
            <li
              className={activePeriod === 'Today' ? 'active-GGTba-LI' : ''}
              onClick={() => handlePeriodSelect('Today')}
            >
              Today
            </li>
            <li
              className={activePeriod === 'This Week' ? 'active-GGTba-LI' : ''}
              onClick={() => handlePeriodSelect('This Week')}
            >
              This Week
            </li>
            <li
              className={activePeriod === 'Calendar' ? 'active-GGTba-LI' : ''}
              onClick={() => setShowCalendar(!showCalendar)}
              style={{ position: 'relative' }}
            >
              <CalendarDaysIcon /> Calendar
              {showCalendar && (
                <div
                  className="OOcalendar-container"
                  style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100 }}
                >
                  <CalendarDropdown
                    selectedDate={selectedDate}
                    onSelect={handleDateSelect}
                    onClose={() => setShowCalendar(false)}
                  />
                </div>
              )}
            </li>
            <select value={selectedMonth} onChange={handleMonthSelect}>
              <option value="Month">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select value={selectedYear} onChange={handleYearSelect}>
              <option value="Year">Year</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </ul>
        </div>

        <div className="ooilaui-Cards">
          {cardsData[activeTab][branchView][currentPeriod].filter(card => 
            ['Total tasks', 'Completed tasks', 'Pending tasks', 'Productivity'].includes(card.title)
          ).map((card, index) => (
            <Link
              key={index}
              to={`/company/${card.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="ooilaui-Card  Simp-Boxshadow"
            >
              <h4>
                {card.title}
                <span style={{ backgroundColor: card.bg, color: card.color }}>{card.icon}</span>
              </h4>
              <AnimatedCounter value={card.value} prefix={card.prefix} suffix={card.suffix} />
              <p>
                <ArrowUpIcon /> {card.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
             <ProductivityGraph />
            <AttendanceSection />
    </div>
  );
};

export default Home;