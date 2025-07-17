import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TaskCalendar.css';
import MembImg1 from './Img/memberIcon1.jpg';
import MembImg2 from './Img/memberIcon2.jpg';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

/* ------------- CONFIG + DATA ------------- */
const startHour = 6;
const endHour = 23;
const DESK_ROW = 64;
const GAP = 8;

const shifts = [
  { label: 'Morning', range: '6 AM ‑ 12 PM', color: '#5C54FF', isIn: h => h >= 6 && h < 12 },
  { label: 'Afternoon', range: '12 PM ‑ 6 PM', color: '#9B26FF', isIn: h => h >= 12 && h < 18 },
  { label: 'Night', range: '6 PM ‑ 12 AM', color: '#4A2AB7', isIn: h => h >= 18 || h < 6 },
];

const tasks = [
  { id: 1, title: 'Routine Check‑Up', client: 'Mrs. Evelyn Carter', start: '8:00 AM', end: '9:00 AM', color: shifts[0].color, image: MembImg1 },
  { id: 2, title: 'Physical Therapy Session', client: 'Mr. Daniel Smith', start: '1:00 PM', end: '2:00 PM', color: shifts[1].color },
  { id: 3, title: 'Surgical Equipment Audit', client: 'Westside General Hospital', start: '2:15 PM', end: '3:00 PM', color: shifts[1].color, image: MembImg2 },
  { id: 4, title: 'Medical Records Backup', client: 'Greenfield Hospital', start: '6:30 PM', end: '7:15 PM', color: shifts[2].color },
];

/* ------------- HELPERS ------------- */
const getInitials = n => n.trim().split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const toMins = t => {
  const [time, per] = t.split(' ');
  const [h, m] = time.split(':').map(Number);
  const h24 = per === 'PM' && h !== 12 ? h + 12 : per === 'AM' && h === 12 ? 0 : h;
  return h24 * 60 + m;
};

/* ------------- MAIN COMPONENT ------------- */
export default function TaskCalendar() {
  /* grid prep */
  const hours = useMemo(() =>
    Array.from({ length: endHour - startHour + 1 }, (_, i) => {
      const h = startHour + i;
      return { h, txt: h === 12 ? '12 PM' : h > 12 ? `${h - 12} PM` : h === 0 ? '12 AM' : `${h} AM` };
    }), []);

  /* dynamic height measurement */
  const [heights, setHeights] = useState({});
  const refs = useRef({});
  useEffect(() => {
    const next = {};
    Object.entries(refs.current).forEach(([id, el]) => el && (next[id] = el.offsetHeight));
    if (Object.keys(next).some(id => next[id] !== heights[id])) setHeights(next);
  }, [heights]);

  /* modal state */
  const [selected, setSelected] = useState(null);

  /* calendar dropdown state */
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateSelect = date => setSelectedDate(date);
  const toggleRef = useRef(null); // Ref for the toggle <li>

  /* card animation */
  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    show: i => ({ opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.06 } })
  };

  return (
    <>
      <div className="Tsssk-Secc Simp-Boxshadow">
        <div className="Tsssk-Box">
          {/* ------------ HEADER ------------- */}
          <header className="Tsssk-Box-Header">
            <div className="GHGb-MMIn-DDahs-Top">
              <div className="olikk-IOkiks"><h3>My Task Calendar</h3></div>
              <h2 className="OOlik-HHt2">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                {isToday(selectedDate) ? <span> Today</span> : null}
              </h2>

              {/* Calendar trigger */}
              <ul className="period-controls">
                <li
                  ref={toggleRef} // Attach ref to the toggle
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent bubbling to document
                    setShowCalendar(o => !o);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Calendar <ArrowDownIcon />
                </li>
                {/* Dropdown - absolutely positioned below the li */}
                <AnimatePresence>
                  {showCalendar && (
                    <motion.div
                      className="OOcalendar-container"
                      style={{ position: 'absolute', top: '100%',  zIndex: 100 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <CalendarDropdown
                        selectedDate={selectedDate}
                        onSelect={handleDateSelect}
                        onClose={() => setShowCalendar(false)}
                        toggleRef={toggleRef} // Pass toggleRef to CalendarDropdown
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </ul>
            </div>
          </header>

          {/* ------------ MAIN GRID ------------- */}
          <div className="Tsssk-Box-Main custom-scroll-bar">
            {/* header row */}
            <div className="tsk-header-wrap">
              <div className="tsk-time-col dummy" />
              {shifts.map(s => (
                <div key={s.label} className="tsk-header-cell">
                  <span className="tsk-header-title">{s.label}</span>
                  <span className="tsk-header-range">{s.range}</span>
                </div>
              ))}
            </div>

            {/* grid */}
            <div className="tsk-scroll-x">
              <div className="tsk-main-grid">
                {/* times */}
                <div className="tsk-time-col">
                  {hours.map(({ h, txt }) => (
                    <div key={h} className="tsk-time-label" data-hour={h}>{txt}</div>
                  ))}
                </div>

                {/* shift cols */}
                {shifts.map(s => {
                  const colTasks = tasks.filter(t => s.isIn(toMins(t.start) / 60)).sort((a, b) => toMins(a.start) - toMins(b.start));
                  let cum = 0;
                  const pos = colTasks.map((t, i) => {
                    const ideal = ((toMins(t.start) - startHour * 60) / 60) * DESK_ROW;
                    const top = Math.max(i ? cum : 0, ideal);
                    cum = top + (heights[t.id] || 0) + GAP;
                    return { id: t.id, top };
                  });

                  return (
                    <div key={s.label} className="tsk-shift-col" style={{ position: 'relative' }}>
                      {hours.map(({ h }) => <div key={h} className="tsk-time-slot" />)}
                      {colTasks.map((t, i) => {
                        const { top } = pos.find(p => p.id === t.id) || { top: 0 };
                        return (
                          <motion.div
                            key={t.id}
                            ref={el => refs.current[t.id] = el}
                            className="tsk-event"
                            style={{
                              position: 'absolute',
                              top,
                              left: 4,
                              right: 4,
                              borderLeftColor: t.color,
                              background: `${t.color}22`,
                              cursor: 'pointer',
                              zIndex: 5
                            }}
                            variants={cardVariants}
                            initial="hidden"
                            animate="show"
                            custom={i}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelected(t)}
                          >
                            {/* card content */}
                            <div className="Tahah-Dells">
                              <div className="Tahah-Dells-Top">
                                <h3>{t.title}</h3><p>{t.start} – {t.end}</p>
                              </div>
                              <div className="Tahah-Dells-Main">
                                <div className="CLllka-1">
                                  {t.image ? <img src={t.image} alt={t.client} className="tsk-client-img" />
                                    : <span>{getInitials(t.client)}</span>}
                                </div>
                                <div className="CLllka-2"><p>{t.client}</p></div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------ TASK MODAL ------------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="tsk-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="tsk-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="tsk-modal-close" onClick={() => setSelected(null)}>×</button>
              <h2>{selected.title}</h2>
              <ul className="tsk-modal-details">
                <li><strong>Client:</strong> {selected.client}</li>
                <li><strong>Start:</strong> {selected.start}</li>
                <li><strong>End:</strong> {selected.end}</li>
                <li><strong>Shift:</strong> {shifts.find(s => s.color === selected.color)?.label}</li>
                <li><strong>ID:</strong> #{selected.id}</li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- helper to label 'Today' ---------- */
const isToday = d => {
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

/* ========== CalendarDropdown ========== */
const CalendarDropdown = ({ selectedDate, onSelect, onClose, toggleRef }) => {
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [year, setYear] = useState(selectedDate.getFullYear());
  const ref = useRef(null);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    const out = e => {
      // Only close if click is outside both the calendar and the toggle
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', out);
    return () => document.removeEventListener('mousedown', out);
  }, [onClose, toggleRef]);

  const prev = () => month === 0 ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1);
  const next = () => month === 11 ? (setMonth(0), setYear(y => y + 1)) : setMonth(m => m + 1);

  return (
    <div className="OOcalendar-dropdown" ref={ref}>
      <div className="OOcalendar-header">
        <button onClick={prev}>‹</button>
        <h4>{new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
        <button onClick={next}>›</button>
      </div>
      <div className="OOcalendar-weekdays">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
          <div key={i} className="weekday">{d}</div>
        ))}
      </div>
      <div className="OOcalendar-days">
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={'e' + i} className="calendar-day empty" />
        ))}
        {days.map(day => {
          const sel =
            day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear();
          const today =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();
          return (
            <div
              key={day}
              className={`OOcalendar-day ${sel ? 'selected' : ''} ${today ? 'today' : ''}`}
              onClick={() => {
                onSelect(new Date(year, month, day));
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