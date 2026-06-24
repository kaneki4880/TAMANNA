import { X, Check, Bell, BellOff, Info, AlertTriangle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Notification } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export default function NotificationsDrawer({
  isOpen,
  notifications,
  onClose,
  onMarkAsRead,
  onClearAll,
}: NotificationsDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
          />

          {/* Slider Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#121212] shadow-2xl z-50 border-l border-white/10 flex flex-col h-full text-stone-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-[#C5A059]" />
                <h3 className="font-serif text-lg font-bold text-white">Push Updates Ledger</h3>
              </div>
              <div className="flex items-center space-x-4">
                {notifications.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-[#C5A059] cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-stone-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-20 space-y-4 text-stone-400">
                  <BellOff className="h-10 w-10 mx-auto text-stone-600 stroke-[1.5]" />
                  <p className="text-xs font-sans">You are fully synchronized. No new notifications.</p>
                </div>
              ) : (
                notifications.map((notif) => {
                  return (
                    <motion.div
                       layout
                      key={notif.id}
                      className={`p-4 rounded-sm border text-xs relative transition-all ${
                        notif.isRead
                          ? 'border-white/10 bg-white/5 opacity-60'
                          : 'border-[#C5A059]/20 bg-[#C5A059]/5 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start space-x-3 pr-6">
                        {notif.type === 'info' && (
                          <Info className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                        )}
                        {notif.type === 'success' && (
                          <Sparkles className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                        )}
                        {notif.type === 'alert' && (
                          <AlertTriangle className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                        )}

                        <div className="space-y-1">
                          <h4 className="font-bold text-white tracking-wide">{notif.title}</h4>
                          <p className="text-stone-400 font-sans leading-relaxed font-light">
                            {notif.message}
                          </p>
                          <span className="block text-[9px] text-stone-500 pt-1 font-mono uppercase">
                            {notif.time}
                          </span>
                        </div>
                      </div>

                      {/* Read tick action */}
                      {!notif.isRead && (
                        <button
                          onClick={() => onMarkAsRead(notif.id)}
                          className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-[#C5A059] hover:bg-white/5 cursor-pointer"
                          title="Mark as Read"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#0A0A0A] text-[10px] text-stone-500 font-sans text-center leading-relaxed">
              Push notification system initialized. Real-time websocket simulator is active to push live table cancellation alerts.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
