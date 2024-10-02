import { getMessaging, getToken } from 'firebase/messaging';

const messaging = getMessaging();

getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' }).then((currentToken) => {
    if (currentToken) {
        console.log('Token received: ', currentToken);
        // Handle token for push notifications
    } else {
        console.log('No registration token available.');
    }
});
