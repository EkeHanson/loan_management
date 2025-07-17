import React, { useRef, useState, useEffect } from 'react';
import './Messaging.css';
import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  FaceSmileIcon,
  PaperClipIcon,
  XMarkIcon,
  PhoneIcon,
  TrashIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

import {
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/24/solid';

import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import FileIcon from './icons/new-document.png';




const formatDisplayDate = (date) => {
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return 'Today';
  }
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
    if (justToggledRef.current) return; // Skip closing if just toggled

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



const Messaging = ({ closeMessaging, sender }) => {
  const textareaRef = useRef(null);
  const chatBodyRef   = useRef(null);
  const mediaRecorderRef     = useRef(null);
  const recordingIntervalRef = useRef(null);

  const [messages, setMessages]         = useState([]);
  const [isTyping, setIsTyping]         = useState(true);
  const [messageText, setMessageText]   = useState('');
  const [wordCount, setWordCount]       = useState(0);
  const [isRecording, setIsRecording]   = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [previewDuration, setPreviewDuration]     = useState(0);
  const [previewCurrentTime, setPreviewCurrentTime] = useState(0);
  const [previewIsPlaying, setPreviewIsPlaying]     = useState(false);
  const [messageStatus, setMessageStatus] = useState({}); // { [msgId]: 'sent' | 'delivered' }
  const [showDelete, setShowDelete]       = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const pendingSendRef = useRef(false);
  const defaultSender  = { name: 'Sophia Eleto', initials: 'SE' };
  const currentSender  = sender || defaultSender;
  const audioRefs      = useRef({});
  const playbackStates = useRef({});     // { [msgId]: { isPlaying, currentTime, duration } }

  const [attachedFile, setAttachedFile] = useState(null);
const fileInputRef = useRef(null);

const [playbackTick, setPlaybackTick] = useState(0);


const [showCalendar, setShowCalendar] = useState(false);
const [selectedDate, setSelectedDate] = useState(new Date());
const calendarToggleRef = useRef(null);
const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
const calendarButtonRef = useRef(null);

const justToggledRef = useRef(false);

const [showDateSpan, setShowDateSpan] = useState(false);


useEffect(() => {
  const chatEl = chatBodyRef.current;
  if (!chatEl) return;

  const handleScroll = () => {
    if (chatEl.scrollTop > 50) {
      setShowDateSpan(true);
    } else {
      setShowDateSpan(false);
    }
  };

  chatEl.addEventListener('scroll', handleScroll);
  return () => chatEl.removeEventListener('scroll', handleScroll);
}, []);





function handleFileUpload(file) {
  const isImage = file.type.startsWith('image/');
  const newMsg = {
    id: generateUniqueId(),
    type: 'file',
    fileName: file.name,
    fileSize: file.size,
    previewUrl: isImage ? URL.createObjectURL(file) : null,
    timestamp: new Date().toLocaleTimeString(),
    direction: 'sent',
  };
  setMessages(prev => [...prev, newMsg]);
}


useEffect(() => {
  return () => {
    messages.forEach(msg => {
      if (msg.previewUrl) URL.revokeObjectURL(msg.previewUrl);
    });
  };
}, []);





const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setAttachedFile(file);

    // Simulate sending it as a message
    const id = Date.now();
  const isImage = file.type.startsWith('image/');
const previewUrl = isImage ? URL.createObjectURL(file) : null;

const fileMsg = {
  id,
  type: 'file',
  fileName: file.name,
  fileSize: file.size,
  previewUrl,        // add this
  direction: 'sent',
  timestamp: getTimestamp(),
};
    setMessages((prev) => [...prev, fileMsg]);
    setMessageStatus((p) => ({ ...p, [id]: 'sent' }));
    setTimeout(() => setMessageStatus((p) => ({ ...p, [id]: 'delivered' })), 2000);
  }
};




  const addEmoji = (emoji) => {
  const cursorPosition = textareaRef.current.selectionStart;
  const text = messageText;
  const updatedText =
    text.slice(0, cursorPosition) + emoji.native + text.slice(cursorPosition);
  setMessageText(updatedText);

  // update textarea manually
  if (textareaRef.current) {
    textareaRef.current.value = updatedText;
    textareaRef.current.focus();
    textareaRef.current.selectionEnd = cursorPosition + emoji.native.length;
    handleInput();
  }
};




useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target) &&
      textareaRef.current &&
      !textareaRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


  /* ------------------------------------------------------------------ */
  /*                       INITIAL TYPING PLACEHOLDER                   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: 1,
          text: `Hello, this is ${currentSender.name}. I'm currently unavailable but will respond as soon as possible.`,
          type: 'text',
          direction: 'received',
          timestamp: '01:03 AM',
        },
      ]);
    }, 2000);
    return () => clearTimeout(typingTimeout);
  }, [currentSender.name]);

  /* auto‑scroll ------------------------------------------------------ */
useEffect(() => {
  if (!chatBodyRef.current) return;

  const chatEl = chatBodyRef.current;
  const isNearBottom =
    chatEl.scrollHeight - chatEl.scrollTop - chatEl.clientHeight < 80;

  if (isNearBottom) {
    chatEl.scrollTop = chatEl.scrollHeight;
  }
}, [messages, isTyping]);

  /* ------------------------------------------------------------------ */
  /*                   UTILS (decode, timestamp, format)                */
  /* ------------------------------------------------------------------ */
  const decodeBlobDuration = async (blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      return decoded.duration;
    } catch (e) {
      console.error('decode failed', e);
      return 0;
    }
  };

  const getTimestamp = () =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const formatTime = (sec) => {
    if (!sec || !isFinite(sec)) return '00:00';
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(Math.round(sec % 60)).padStart(2, '0');
    return `${m}:${s}`;
  };

  /* ------------------------------------------------------------------ */
  /*                        RECORD / PREVIEW LOGIC                      */
  /* ------------------------------------------------------------------ */
  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
      setRecordingTime('00:00');
      return;
    }

    if (!navigator.mediaDevices || !MediaRecorder) {
      console.error('MediaRecorder not supported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks   = [];
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url  = URL.createObjectURL(blob);
        setRecordedBlob(blob);
        setRecordedAudioUrl(url);

        const dur = await decodeBlobDuration(blob);
        setPreviewDuration(dur);

        stream.getTracks().forEach(t => t.stop());

        if (pendingSendRef.current) {
          addAudioMessage(url, dur);
          resetPreviewState();
          pendingSendRef.current = false;
        }
      };

      recorder.start();
      setIsRecording(true);
      setRecordingTime('00:00');
      const started = Date.now();
      recordingIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - started;
        const m = String(Math.floor(elapsed / 60000)).padStart(2, '0');
        const s = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
        setRecordingTime(`${m}:${s}`);
      }, 1000);
    } catch (e) {
      console.error('mic error', e);
      setIsRecording(false);
    }
  };

  const resetPreviewState = () => {
    setRecordedBlob(null);
    setRecordedAudioUrl(null);
    setPreviewDuration(0);
    setPreviewCurrentTime(0);
    setPreviewIsPlaying(false);
  };

  /* ------------------------------------------------------------------ */
  /*                         SENDING MESSAGES                           */
  /* ------------------------------------------------------------------ */
  const sendMessage = () => {
    if (isRecording) {
      pendingSendRef.current = true;
      toggleRecording();
      return;
    }

    if (recordedAudioUrl) {
      addAudioMessage(recordedAudioUrl, previewDuration);
      resetPreviewState();
      return;
    }

    if (!messageText.trim()) return;

    const id = Date.now();
    setMessages((p) => [...p, { id, type: 'text', direction: 'sent', text: messageText.trim(), timestamp: getTimestamp() }]);
    setMessageStatus((p) => ({ ...p, [id]: 'sent' }));
    setTimeout(() => setMessageStatus((p) => ({ ...p, [id]: 'delivered' })), 2000);

    setMessageText('');
    setWordCount(0);
    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.style.height = 'auto';
    }
  };

  /* NEW – add direction: 'sent' so UI knows it’s ours ---------------- */
  const addAudioMessage = (audioUrl, duration) => {
    const id = Date.now();
    setMessages(p => [...p, { id, type: 'audio', direction: 'sent', audioUrl, duration, timestamp: getTimestamp() }]);
    setMessageStatus(p => ({ ...p, [id]: 'sent' }));
    playbackStates.current[id] = { isPlaying: false, currentTime: 0, duration: duration || 0 };
    setTimeout(() => setMessageStatus(p => ({ ...p, [id]: 'delivered' })), 2000);
  };

  /* ------------------------------------------------------------------ */
  /*                            PLAYBACK                                */
  /* ------------------------------------------------------------------ */
  const toggleAudioPlayback = (id) => {
    const audio = audioRefs.current[id];
    const st    = playbackStates.current[id];
    if (!audio || !st) return;

    if (st.isPlaying) {
      audio.pause();
      playbackStates.current[id] = { ...st, isPlaying: false };
    } else {
      /* pause any other playing note */
      Object.keys(audioRefs.current).forEach(k => {
        if (k !== id.toString() && playbackStates.current[k]?.isPlaying) {
          audioRefs.current[k].pause();
          playbackStates.current[k] = { ...playbackStates.current[k], isPlaying: false, currentTime: 0 };
        }
      });
      audio.currentTime = 0;
      playbackStates.current[id] = { ...st, isPlaying: true, currentTime: 0 };
      audio.play().catch(console.error);
    }
    setMessages(p => [...p]); // force re‑render
  };

  const togglePreviewPlayback = () => {
    const audio = audioRefs.current.preview;
    if (!audio) return;
    if (previewIsPlaying) {
      audio.pause();
      setPreviewIsPlaying(false);
    } else {
      audio.currentTime = 0;
      setPreviewCurrentTime(0);
      audio.play().catch(console.error);
      setPreviewIsPlaying(true);
    }
  };

  /* ------------------------------------------------------------------ */
  /*                        DELETE MESSAGE                              */
  /* ------------------------------------------------------------------ */
  const deleteMessage = (id) => {
    if (audioRefs.current[id] && playbackStates.current[id]?.isPlaying) {
      audioRefs.current[id].pause();
      playbackStates.current[id].isPlaying = false;
    }
    const msg = messages.find(m => m.id === id);
    if (msg?.type === 'audio') URL.revokeObjectURL(msg.audioUrl);

    setMessages(p => p.filter(m => m.id !== id));
    setMessageStatus(p => { const n={...p}; delete n[id]; return n; });
    delete audioRefs.current[id];
    delete playbackStates.current[id];
    setShowDelete(null);
  };

  /* ------------------------------------------------------------------ */
  /*                    INPUT (textarea) HANDLERS                       */
  /* ------------------------------------------------------------------ */
  const handleInput = () => {
    const t = textareaRef.current;
    if (!t) return;
    t.style.height = 'auto';
    t.style.height = `${Math.min(t.scrollHeight, 150)}px`;
    const txt = t.value.trim();
    const words = txt ? txt.split(/\s+/).length : 0;
    if (words <= 100) {
      setWordCount(words);
      setMessageText(t.value);
    } else {
      const valid = txt.split(/\s+/).slice(0, 100).join(' ');
      t.value = valid;
      setWordCount(100);
      setMessageText(valid);
    }
  };

  const handleKeyDown = (e) => {
    if (wordCount >= 100 && !['Backspace', 'Delete'].includes(e.key)) e.preventDefault();
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  /* ------------------------------------------------------------------ */
  /*                        ANIMATION VARIANTS                          */
  /* ------------------------------------------------------------------ */
  const msgVariants = {
    hidden:{ opacity:0, y:20 },
    visible:{ opacity:1, y:0, transition:{ duration:0.5 }},
    exit:{ opacity:0, y:20, transition:{ duration:0.3 }},
  };

  /* ------------------------------------------------------------------ */
  /*                              RENDER                                */
  /* ------------------------------------------------------------------ */
  return (
    <div className="ppol-Messaging-Apss Simp-Boxshadow">
      {/* ---------- HEADER ---------- */}
      <div className="MMApss-Top">
        <div className="MMApss-Top-1">
          <div className="MMApss-Top-10">
            {currentSender.avatar ? <img src={currentSender.avatar} alt={currentSender.name} /> : <span>{currentSender.initials}</span>}
          </div>
          <div className="MMApss-Top-11">
            <h5>{currentSender.name}</h5><p>Online</p>
          </div>
        </div>
        <div className="MMApss-Top-2">
          <a href='#'><PhoneIcon /></a>
          <span onClick={closeMessaging} className="cursor-pointer"><XMarkIcon /></span>
        </div>
      </div>

      {/* ---------- BODY ---------- */}
      <div className="MMApss-Body custom-scroll-bar" ref={chatBodyRef}>
        <div className="Datgg-Puks-Cha">
      <AnimatePresence>
              {showDateSpan && (
                <motion.span
                  ref={calendarToggleRef}
                  className="today-link"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => {
                    justToggledRef.current = true;
                    setTimeout(() => (justToggledRef.current = false), 150);

                    if (showCalendar) {
                      setShowCalendar(false);
                    } else {
                      const r = e.target.getBoundingClientRect();
                      setCalendarPosition({
                        top: r.bottom + window.scrollY,
                        left: r.left + window.scrollX,
                      });
                      setShowCalendar(true);
                    }
                  }}
                >
                  {formatDisplayDate(selectedDate)}
                </motion.span>
              )}
            </AnimatePresence>


          {showCalendar && (
            <div
              className="OK-CChtt-Callenad"
            >
               <CalendarDropdown
                selectedDate={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }}
                onClose={() => setShowCalendar(false)}
              />
            </div>
          )}


        </div>

        {isTyping ? (
          <div className="Chatt-Box typing-indicator"><p>{currentSender.name} is typing...</p></div>
        ) : (
          <AnimatePresence>
{messages.map((msg) => (
  <motion.div
    key={msg.id}
    className={`Chatt-Box ${
      msg.direction === "received" ? "recivvv-Chatt-Box" : "SeNNdi-Chatt-Box"
    }`}
    variants={msgVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    onMouseEnter={() => msg.direction === "sent" && setShowDelete(msg.id)}
    onMouseLeave={() => setShowDelete(null)}
  >
    {/* ---------- AUDIO ---------- */}
    {msg.type === "audio" && (
      <div className="voice-preview">
        <div className="voice-playback">
          <span
            onClick={() => toggleAudioPlayback(msg.id)}
            className="fff-Controll cursor-pointer"
          >
            {playbackStates.current[msg.id]?.isPlaying ? (
              <PauseIcon className="h-5 w-5 text-blue-600" />
            ) : (
              <PlayIcon className="h-5 w-5 text-blue-600" />
            )}
          </span>

          <div className="voice-waveform">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`voice-wave-bar ${
                  msg.duration > 0 &&
                  i <
                    Math.floor(
                      (playbackStates.current[msg.id]?.currentTime / msg.duration) * 20
                    )
                    ? "active"
                    : ""
                }`}
              />
            ))}
          </div>

          {msg.direction === "sent" && showDelete === msg.id && (
            <span
              className="delete-message cursor-pointer ml-2"
              onClick={() => deleteMessage(msg.id)}
              aria-label="Delete message"
            >
              <XMarkIcon className="h-4 w-4 text-red-600" />
            </span>
          )}
        </div>

        <div className="ggyh-aolks">
          <span className="voice-time">
            {playbackStates.current[msg.id]?.isPlaying
              ? formatTime(playbackStates.current[msg.id]?.currentTime)
              : formatTime(msg.duration)}
          </span>

          {/* -------- timestamp / status ---------- */}
          <span className="timestamp-container">
            {msg.timestamp}
            {msg.direction !== "received" && (
              <span className="status-icons">
                {messageStatus[msg.id] === "sent" ? (
                  <CheckIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <span className="double-check">
                    <CheckIcon className="h-4 w-4 text-blue-500" />
                    <CheckIcon className="h-4 w-4 text-blue-500" />
                  </span>
                )}
              </span>
            )}
          </span>
        </div>

        <audio
          ref={(el) => (audioRefs.current[msg.id] = el)}
          src={msg.audioUrl}
          hidden
          preload="metadata"
          onTimeUpdate={() => {
            if (audioRefs.current[msg.id]) {
              playbackStates.current[msg.id] = {
                ...playbackStates.current[msg.id],
                currentTime: audioRefs.current[msg.id].currentTime,
              };
              setPlaybackTick((tick) => tick + 1);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRefs.current[msg.id] && !msg.duration) {
              playbackStates.current[msg.id].duration = audioRefs.current[msg.id].duration;
              setMessages((p) =>
                p.map((m) =>
                  m.id === msg.id
                    ? { ...m, duration: audioRefs.current[msg.id].duration }
                    : m
                )
              );
            }
          }}
          onEnded={() => {
            playbackStates.current[msg.id] = {
              ...playbackStates.current[msg.id],
              isPlaying: false,
              currentTime: 0,
            };
            setMessages((p) => [...p]);

            // auto‑play next audio note
            const nextIdx = messages.findIndex((m) => m.id === msg.id) + 1;
            if (nextIdx < messages.length && messages[nextIdx].type === "audio") {
              const nextId = messages[nextIdx].id;
              const nxtA = audioRefs.current[nextId];
              if (nxtA) {
                playbackStates.current[nextId] = {
                  ...playbackStates.current[nextId],
                  isPlaying: true,
                  currentTime: 0,
                };
                nxtA.currentTime = 0;
                nxtA.play().catch(console.error);
                setMessages((p) => [...p]);
              }
            }
          }}
        />
      </div>
    )}

    {/* ---------- FILE ---------- */}
  {msg.type === "file" && (
  <div className="file-message">
    <div className="file-icon-name">
      <img
        src={msg.previewUrl || FileIcon}
        alt={msg.fileName}
        className="file-preview-image"
      />
      <span>{msg.fileName}</span>

      {/* ▼▼ NEW: delete icon on hover, same rules as text/audio ▼▼ */}
      {msg.direction === "sent" && showDelete === msg.id && (
        <span
          className="delete-message cursor-pointer ml-2"
          onClick={() => deleteMessage(msg.id)}
          aria-label="Delete message"
        >
          <XMarkIcon className="h-4 w-4 text-red-600" />
        </span>
      )}
      {/* ▲▲ NEW lines end ▲▲ */}
    </div>

    <div className="file-meta">
      <span>{(msg.fileSize / 1024).toFixed(1)} KB</span>
      <span className="timestamp-container">
        {msg.timestamp}
        {msg.direction === "sent" && (
          <span className="status-icons">
            {messageStatus[msg.id] === "sent" ? (
              <CheckIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <span className="double-check">
                <CheckIcon className="h-4 w-4 text-blue-500" />
                <CheckIcon className="h-4 w-4 text-blue-500" />
              </span>
            )}
          </span>
        )}
      </span>
    </div>
  </div>
)}


    {/* ---------- TEXT ---------- */}
    {msg.type === "text" && (
      <>
        <p>{msg.text}</p>
        <span className="timestamp-container">
          {msg.timestamp}
          {msg.direction === "sent" && (
            <span className="status-icons">
              {messageStatus[msg.id] === "sent" ? (
                <CheckIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <span className="double-check">
                  <CheckIcon className="h-4 w-4 text-blue-500" />
                  <CheckIcon className="h-4 w-4 text-blue-500" />
                </span>
              )}

              {showDelete === msg.id && (
                <span
                  className="delete-message cursor-pointer ml-2"
                  onClick={() => deleteMessage(msg.id)}
                  aria-label="Delete message"
                >
                  <XMarkIcon className="h-4 w-4 text-red-600" />
                </span>
              )}
            </span>
          )}
        </span>
      </>
    )}
  </motion.div>
))}


          </AnimatePresence>
        )}
      </div>

         {/* ---------- FOOTER ---------- */}
      <div className="MMApss-Body-Foot">
        <div className="TTh-MM-TtaetBox">
          <div className="ool-taetga">
            {isRecording ? (
              <motion.div
                className="voice-recording-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                >
                  <MicrophoneIcon className="h-5 w-5 text-red-600" />
                </motion.div>
                <div className="voice-bars">
                  <div className="voice-bar" />
                  <div className="voice-bar" />
                  <div className="voice-bar" />
                  <div className="voice-bar" />
                  <div className="voice-bar" />
                </div>
                <span className="recording-timer">{recordingTime}</span>
              </motion.div>
            ) : recordedAudioUrl ? (
              <div className="voice-preview" key={recordedAudioUrl}>
                <div className="voice-playback">
                  <span onClick={togglePreviewPlayback} className="fff-Controll cursor-pointer">
                    {previewIsPlaying ? (
                      <PauseIcon className="h-5 w-5 text-blue-600" />
                    ) : (
                      <PlayIcon className="h-5 w-5 text-blue-600" />
                    )}
                  </span>
                  <div className="voice-waveform">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`voice-wave-bar ${
                          previewDuration > 0 && i < Math.floor((previewCurrentTime / previewDuration) * 20)
                            ? 'active'
                            : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className="voice-time">
                    {previewIsPlaying ? formatTime(previewCurrentTime) : formatTime(previewDuration)}
                  </span>
                  <span
                    className="delete-voice cursor-pointer"
                    onClick={resetPreviewState}
                  >
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </span>
                </div>
                <audio
                  ref={(el) => (audioRefs.current['preview'] = el)}
                  src={recordedAudioUrl}
                  hidden
                  preload="metadata"
                  onTimeUpdate={() => {
                    if (audioRefs.current['preview']) {
                      setPreviewCurrentTime(audioRefs.current['preview'].currentTime);
                    }
                  }}
                  onLoadedMetadata={() => {
                    if (audioRefs.current['preview']) {
                      setPreviewDuration(audioRefs.current['preview'].duration);
                    }
                  }}
                  onEnded={() => {
                    setPreviewIsPlaying(false);
                    setPreviewCurrentTime(0);
                  }}
                />
              </div>
            ) : (
              <div className="ssaa-Tcc-Area">
                <textarea
                  ref={textareaRef}
                  placeholder="Type a message"
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowEmojiPicker(false)}
                  style={{ maxHeight: '150px', overflowY: 'auto' }}
                  className="custom-scroll-bar"
                />

               {showEmojiPicker && (
                <div className="emoji-picker-container" ref={emojiPickerRef}>
                  <Picker
                    data={data}
                    onEmojiSelect={addEmoji}
                    theme="light"
                  />
                </div>
              )}

                <span>{wordCount}/100</span>
              </div>
            )}
          </div>
          <div className="GG-Cotrols">
            <div className="GG-Cotrols-Cont">
              <span onClick={() => setShowEmojiPicker((prev) => !prev)}>
                <FaceSmileIcon />
              </span>
              <span onClick={() => fileInputRef.current?.click()}>
              <PaperClipIcon className="h-6 w-6" />
            </span>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            </div>
            <div className="GG-Cotrols-Cont">
              {!messageText.trim() && !recordedAudioUrl && (
                <motion.span
                  onClick={toggleRecording}
                  className="cursor-pointer"
                  animate={isRecording ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                  transition={isRecording ? { repeat: Infinity, duration: 1.2 } : {}}
                >
                  <MicrophoneIcon className={`h-6 w-6 ${isRecording ? 'recording-active' : ''}`} />
                </motion.span>
              )}
              <span onClick={sendMessage} className="cursor-pointer">
                <PaperAirplaneIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
