// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Your Firebase config (REPLACE WITH YOUR ACTUAL CONFIG - same as in dashboard.html)
const firebaseConfig = {
  apiKey: "AIzaSyAaAzrozCFskE7L-fc2fsN8EZNTAy_3rvI",
  authDomain: "skillswap-dbecc.firebaseapp.com",
  projectId: "skillswap-dbecc",
  storageBucket: "skillswap-dbecc.firebasestorage.app",
  messagingSenderId: "205182290305",
  appId: "1:205182290305:web:0050f1d8a489b1a5854080",
  measurementId: "G-MBKK19QG19"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Background message received:', payload);
    
    const notificationTitle = payload.notification?.title || 'SkillSwap PH';
    const notificationOptions = {
        body: payload.notification?.body || 'You have a new notification',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        data: payload.data || {}
    };
    
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const data = event.notification.data;
    let url = '/dashboard.html';
    
    if (data && data.type === 'message') {
        url = '/messages.html';
    } else if (data && data.type === 'session_proposal') {
        url = '/messages.html?tab=sessions';
    } else if (data && data.type === 'session_confirmed') {
        url = '/dashboard.html';
    }
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(windowClients => {
                for (let client of windowClients) {
                    if (client.url.includes(url) && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});