export function preventScreenshot() {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            alert('Screenshots are disabled for this content.');
        }
    });
}
// Screenshot Prevention code...
