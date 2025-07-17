import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const attendanceData = [
  { day: 'Sunday', date: '2025-01-05', clockIn: '7:30 AM', clockInStatus: 'early-entry', clockOut: '5:45 PM', clockOutStatus: 'late-exit', remark: 'Clocked in early, stayed late' },
  { day: 'Friday', date: '2025-01-10', clockIn: '8:00 AM', clockInStatus: 'late-entry', clockOut: '5:00 PM', clockOutStatus: 'early-exit', remark: 'Late due to traffic' },
  { day: 'Wednesday', date: '2025-01-15', clockIn: '7:45 AM', clockInStatus: 'early-entry', clockOut: '6:00 PM', clockOutStatus: 'late-exit', remark: 'Extended meeting' },
  { day: 'Monday', date: '2025-01-20', clockIn: '8:15 AM', clockInStatus: 'late-entry', clockOut: '4:45 PM', clockOutStatus: 'early-exit', remark: 'Personal appointment' },
  { day: 'Sunday', date: '2025-06-01', clockIn: '7:50 AM', clockInStatus: 'early-entry', clockOut: '5:30 PM', clockOutStatus: 'late-exit', remark: 'Weekend task' },
  { day: 'Thursday', date: '2025-06-05', clockIn: '8:00 AM', clockInStatus: 'late-entry', clockOut: '5:15 PM', clockOutStatus: 'early-exit', remark: 'Client meeting' },
  { day: 'Tuesday', date: '2025-06-10', clockIn: '7:40 AM', clockInStatus: 'early-entry', clockOut: '5:50 PM', clockOutStatus: 'late-exit', remark: 'Prepared reports' },
  { day: 'Sunday', date: '2025-06-15', clockIn: '8:10 AM', clockInStatus: 'late-entry', clockOut: '5:00 PM', clockOutStatus: 'early-exit', remark: 'Weekend shift' },
  { day: 'Tuesday', date: '2025-07-01', clockIn: '7:30 AM', clockInStatus: 'early-entry', clockOut: '5:45 PM', clockOutStatus: 'late-exit', remark: 'Clocked in early, stayed late' },
  { day: 'Wednesday', date: '2025-07-02', clockIn: '8:00 AM', clockInStatus: 'late-entry', clockOut: '5:00 PM', clockOutStatus: 'early-exit', remark: 'Late due to traffic' },
  { day: 'Thursday', date: '2025-07-03', clockIn: '7:45 AM', clockInStatus: 'early-entry', clockOut: '6:00 PM', clockOutStatus: 'late-exit', remark: 'Extended meeting' },
  { day: 'Friday', date: '2025-07-04', clockIn: '8:15 AM', clockInStatus: 'late-entry', clockOut: '4:45 PM', clockOutStatus: 'early-exit', remark: 'Personal appointment' },
  { day: 'Saturday', date: '2025-07-05', clockIn: '7:50 AM', clockInStatus: 'early-entry', clockOut: '5:30 PM', clockOutStatus: 'late-exit', remark: 'Worked on weekend task' },
  { day: 'Sunday', date: '2025-07-13', clockIn: '7:30 AM', clockInStatus: 'early-entry', clockOut: '5:45 PM', clockOutStatus: 'late-exit', remark: 'Clocked in early and clocked out late' },
  { day: 'Wednesday', date: '2026-07-01', clockIn: '7:40 AM', clockInStatus: 'early-entry', clockOut: '5:50 PM', clockOutStatus: 'late-exit', remark: 'Prepared reports' },
  { day: 'Sunday', date: '2026-07-05', clockIn: '8:10 AM', clockInStatus: 'late-entry', clockOut: '5:00 PM', clockOutStatus: 'early-exit', remark: 'Weekend shift' },
  { day: 'Tuesday', date: '2026-07-10', clockIn: '7:55 AM', clockInStatus: 'early-entry', clockOut: '6:15 PM', clockOutStatus: 'late-exit', remark: 'Overtime for project' },
  { day: 'Saturday', date: '2026-08-01', clockIn: '8:05 AM', clockInStatus: 'late-entry', clockOut: '4:50 PM', clockOutStatus: 'early-exit', remark: 'Early departure approved' },
  { day: 'Wednesday', date: '2026-08-05', clockIn: '7:45 AM', clockInStatus: 'early-entry', clockOut: '5:40 PM', clockOutStatus: 'late-exit', remark: 'Team collaboration session' },
  { day: 'Monday', date: '2026-08-10', clockIn: '7:30 AM', clockInStatus: 'early-entry', clockOut: '5:45 PM', clockOutStatus: 'late-exit', remark: 'Weekend support' },
];

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const CalendarDropdown = ({ selectedDate, onSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const calendarRef = useRef(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

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
        <button onClick={prevMonth} aria-label="Previous month">&lt;</button>
        <h4>
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h4>
        <button onClick={nextMonth} aria-label="Next month">&gt;</button>
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
            <div key={`empty-${i}`} className="calendar-day empty" />
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
              aria-label={`Select date ${day}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ActionDropdown = ({ index, isLastRow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-label="More options"
        title="More options"
        className="mmmo-BBTH-Drop"
        onClick={() => setIsOpen(!isOpen)}
      >
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </button>
      {isOpen && (
        <motion.div
          className={`dropdown-menu ${isLastRow ? 'last-row-dropdown' : 'not-last-row-dropdown'}`}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Link to={`/attendance-report/${index}`} onClick={() => setIsOpen(false)}>
           Report
          </Link>
        </motion.div>
      )}
    </div>
  );
};

const PaginationControls = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onRowsPerPageChange,
  onPrevPage,
  onNextPage,
}) => (
  <div className="pagination-controls">
    <div className="Dash-OO-Boas-foot">
      <div className="Dash-OO-Boas-foot-1">
        <div className="items-per-page">
          <p>Number of rows:</p>
          <select
            className="form-select"
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            aria-label="Select number of rows per page"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
    <div className="page-navigation">
      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
      <div className="page-navigation-Btns">
        <button
          className="page-button"
          onClick={onPrevPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          className="page-button"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
);

const AttendanceSection = () => {
  const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('Month');
  const [selectedYear, setSelectedYear] = useState('Year');
  const [activePeriod, setActivePeriod] = useState('All Dates');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState(attendanceData);

  const totalPages = Math.ceil(filteredAttendanceData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredAttendanceData.slice(startIndex, endIndex);

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1;
    startOfWeek.setDate(startOfWeek.getDate() - diffToMonday);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return { start: startOfWeek, end: endOfWeek };
  };

  useEffect(() => {
    let filtered = attendanceData;

    if (attendanceDate) {
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getFullYear() === attendanceDate.getFullYear() &&
          entryDate.getMonth() === attendanceDate.getMonth() &&
          entryDate.getDate() === attendanceDate.getDate()
        );
      });
    } else if (activePeriod === 'This Week') {
      const { start, end } = getWeekRange(new Date('2025-07-13'));
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= start && entryDate <= end;
      });
    } else if (selectedMonth !== 'Month' && selectedYear !== 'Year') {
      const monthIndex = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].indexOf(selectedMonth);
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getMonth() === monthIndex &&
          entryDate.getFullYear() === Number(selectedYear)
        );
      });
    } else if (selectedMonth !== 'Month') {
      const monthIndex = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].indexOf(selectedMonth);
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === monthIndex;
      });
    } else if (selectedYear !== 'Year') {
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate.getFullYear() === Number(selectedYear);
      });
    } else if (activePeriod === 'Allansett Dates') {
      filtered = attendanceData;
    }

    setFilteredAttendanceData(filtered);
    setCurrentPage(1);
  }, [attendanceDate, selectedMonth, selectedYear, activePeriod]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handleAttendanceDateSelect = (date) => {
    setAttendanceDate(date);
    setSelectedMonth('Month');
    setSelectedYear('Year');
    setActivePeriod(null);
    setShowAttendanceCalendar(false);
  };

  const handleMonthSelect = (e) => {
    setSelectedMonth(e.target.value);
    setAttendanceDate(null);
    setActivePeriod(null);
  };

  const handleYearSelect = (e) => {
    setSelectedYear(e.target.value);
    setAttendanceDate(null);
    setActivePeriod(null);
  };

  const handlePeriodSelect = (period) => {
    setActivePeriod(period);
    setAttendanceDate(null);
    setSelectedMonth('Month');
    setSelectedYear('Year');
  };

  const handleResetFilters = () => {
    setAttendanceDate(null);
    setSelectedMonth('Month');
    setSelectedYear('Year');
    setActivePeriod('All Dates');
    setShowAttendanceCalendar(false);
  };

  return (
    <div className="Attendd-Sec Simp-Boxshadow">
      <div className="GHGb-MMIn-DDahs-Top">
        <div className="olikk-IOkiks">
          <h3>
            Attendance -{' '}
            {attendanceDate
              ? formatDate(attendanceDate)
              : activePeriod
              ? activePeriod
              : selectedMonth !== 'Month' && selectedYear !== 'Year'
              ? `${selectedMonth} ${selectedYear}`
              : selectedMonth !== 'Month'
              ? selectedMonth
              : selectedYear !== 'Year'
              ? selectedYear
              : 'All Dates'}
          </h3>
        </div>
        <div className="olikk-IOkiks olkk-Hnn">
          <select value={selectedMonth} onChange={handleMonthSelect} className="form-select" aria-label="Select month">
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
          <select value={selectedYear} onChange={handleYearSelect} className="form-select" aria-label="Select year">
            <option value="Year">Year</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
          <ul className="period-controls">
            <li
              className={activePeriod === 'This Week' ? 'active-GGTba-LI' : ''}
              onClick={() => handlePeriodSelect('This Week')}
              aria-label="Filter by this week"
            >
              This Week
            </li>
            <li
              className={activePeriod === 'All Dates' ? 'active-GGTba-LI' : ''}
              onClick={() => handlePeriodSelect('All Dates')}
              aria-label="Show all dates"
            >
              All Dates
            </li>
            <li
              style={{ position: 'relative' }}
              onClick={() => setShowAttendanceCalendar(!showAttendanceCalendar)}
              aria-label="Open calendar"
            >
              <CalendarDaysIcon className="h-6 w-6" />
              Calendar
              {showAttendanceCalendar && (
                <div
                  className="OOcalendar-container"
                  style={{ position: 'absolute', top: '100%', right: 0, zIndex: 100 }}
                >
                  <CalendarDropdown
                    selectedDate={attendanceDate || new Date()}
                    onSelect={handleAttendanceDateSelect}
                    onClose={() => setShowAttendanceCalendar(false)}
                  />
                </div>
              )}
            </li>
            <li
              onClick={handleResetFilters}
              aria-label="Reset filters"
              style={{ cursor: 'pointer' }}
              title='Reset'
            >
             <ArrowPathIcon />
            </li>
          </ul>
        </div>
      </div>

      <div className="table-container">
        <table className="Gen-Sys-table OIk-TTTatgs">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Date</th>
              <th>Day</th>
              <th>Clock In Time</th>
              <th>Clock Out Time</th>
              <th>Remark</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((entry, index) => (
              <tr key={`${entry.date}-${startIndex + index}`}>
                <td>{startIndex + index + 1}</td>
                <td>
                  <Link to={`/attendance-report/${startIndex + index}`} className="Proliks-Seec">
                    <div className="Proliks-2">
                      <h4>{formatDate(entry.date)}</h4>
                    </div>
                  </Link>
                </td>
                <td>{entry.day}</td>
                <td>
                  <div className="DDa-Statuss">
                    <p>{entry.clockIn}</p>
                    <span className={entry.clockInStatus}>
                      {entry.clockInStatus.replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="DDa-Statuss">
                    <p>{entry.clockOut}</p>
                    <span className={entry.clockOutStatus}>
                      {entry.clockOutStatus.replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td className="remack-SmmmnRy">
                  <span>{entry.remark}</span>
                </td>
                <td>
                  <ActionDropdown
                    index={startIndex + index}
                    isLastRow={index === paginatedData.length - 1}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-section">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;