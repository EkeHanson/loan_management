import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChattingApp.css';
import Messaging from './Messaging';
import { XMarkIcon } from '@heroicons/react/24/outline';

import MembImg1 from './Img/memberIcon1.jpg';
import MembImg2 from './Img/memberIcon2.jpg';

const INDICATORS = 7;
const GAP = 50;
const CLOSED_GAP = 6;

const dotColors = [
  'rgba(114, 38, 255, 0.9)',
  '#BFA1FF',
  '#C38BFF',
  '#C574FF',
  '#BB5EFF',
  '#A548FF',
  '#B07DFF',
  '#A366FF',
];

const senders = [
  { name: 'Alice Johnson', initials: 'AJ' },
  { name: 'Bob Smith', initials: 'BS' },
  { name: 'Carla Gomez', initials: 'CG' },
  { name: 'David Lee', initials: 'DL' },
  { name: 'Eva Mendes', initials: 'EM' },
  { name: 'Fiona Clark', avatar: MembImg1 },
  { name: 'George Hall', avatar: MembImg2 },
];

const messageCounts = [0, 3, 1, 8, 1, 5, 3, 2]; // 0 for the close icon

const ChattingApp = () => {
  const [open, setOpen] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [selectedSender, setSelectedSender] = useState(null); // Track selected sender
  const totalMessages = messageCounts.slice(1).reduce((a, b) => a + b, 0);
  const chatRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (open && chatRef.current && !chatRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  const variants = {
    closed: (i) => ({
      y: -CLOSED_GAP * i,
      opacity: i === 0 ? 0 : 1,
      transition: { type: 'spring', stiffness: 400 },
    }),
    open: (i) => ({
      y: -GAP * (i + 1),
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, delay: 0.03 * i },
    }),
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const messagingVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
  };

  const handleIndicatorClick = (sender, isCloseIcon = false) => {
    if (isCloseIcon) {
      setOpen(false);
    } else if (open) {
      setSelectedSender(sender); // Set the selected sender
      setShowMessaging(true); // Open messaging panel
    }
  };

  const displaySenders = open
    ? [{ name: 'Close', initials: '', isCloseIcon: true }, ...senders]
    : senders;

  return (
    <div className="ChattingApp">
      {!showMessaging && (
        <div className="Chatt-IndBTns" ref={chatRef} onClick={() => setOpen((p) => !p)}>
          {displaySenders.map((sender, i) => (
            <motion.div
              key={sender.name}
              className="indicator-wrapper"
              custom={i}
              variants={variants}
              animate={open ? 'open' : 'closed'}
              initial="closed"
              onClick={() => handleIndicatorClick(sender, sender.isCloseIcon)}
            >
              <span
                className="indicator-dot"
                style={{ backgroundColor: dotColors[i], position: 'relative' }}
              >
                {sender.isCloseIcon ? (
                  <div
                    className="Clossing-OOIla"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIndicatorClick(sender, true);
                    }}
                  >
                    <XMarkIcon className="h-6 w-6" style={{ color: 'white' }} />
                  </div>
                ) : sender.avatar ? (
                  <img
                    src={sender.avatar}
                    alt={sender.name}
                    className="indicator-avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  sender.initials
                )}
                {messageCounts[i] > 0 && (open || i === INDICATORS - 1) && (
                  <motion.span
                    className="message-count-badge"
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    key={`badge-${i}-${open}`}
                    style={{
                      originX: 1,
                      originY: 0.5,
                      position: 'absolute',
                      top: -8,
                      right: -8,
                    }}
                  >
                    {i === INDICATORS - 1 && !open
                      ? totalMessages
                      : messageCounts[i]}
                  </motion.span>
                )}
              </span>
              <div className="sender-label">{sender.name}</div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showMessaging && (
          <motion.div
            variants={messagingVariants}
            key="messaging-panel"
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="ppol-Messaging-Section"
          >
            <Messaging
              closeMessaging={() => setShowMessaging(false)}
              sender={selectedSender} // Pass the selected sender
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChattingApp;