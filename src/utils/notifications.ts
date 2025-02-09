export const showNotification = (title: string, message: string) => {
    if (window.Notification && Notification.permission === 'granted') {
        new Notification(title, { body: message });
    } else if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(title, { body: message });
            }
        });
    }
};