const butInstall = document.getElementById('buttonInstall');
let installPrompt = null

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    console.log(event)
    installPrompt = event

    // butInstall.addEventListener('click', () => {
    //     event.prompt()
    //     butInstall.setAttribute('disabled', true)
    //     butInstall.textContent = 'Installed!'
    // })
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async (event) => {
    if (!installPrompt) {
        butInstall.textContent = 'Installed'
        return
    }
    const result = await installPrompt.prompt()
    disableInAppInstallPrompt()
});

function disableInAppInstallPrompt() {
    installPrompt = null
    butInstall.textContent = 'Installed'
}

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    disableInAppInstallPrompt()
});
