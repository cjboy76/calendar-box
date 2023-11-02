const API_KEY = import.meta.env.VITE_API_KEY

chrome.runtime.onInstalled.addListener(async (opt) => {
  if (opt.reason === 'install') {
    await chrome.storage.local.clear()

    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL('./installed.html'),
    })
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.message === 'check_access_token') {
    chrome.storage.local.get('google_auth_token').then(result => {
      if (result.google_auth_token) {
        sendResponse({ status: 'success' })
      } else {
        sendResponse({ status: 'failed' })
      }
    })
  }


  if (request.message === 'get_access_token') {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      sendResponse({ status: 'success' })
      chrome.storage.local.set({ 'google_auth_token': token })
    })
  }

  if (request.message === 'get_events') {
    chrome.storage.local.get('google_auth_token').then(result => {
      const token = result.google_auth_token
      const currentDate = new Date()
      const timeMin = currentDate.toISOString()
      currentDate.setHours(currentDate.getHours() + 5);
      const timeMax = currentDate.toISOString()

      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}&timeMax=${timeMax}&timeMin=${timeMin}`
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      fetch(url, config).then(r => r.json()).then(data => {
        sendResponse({ status: 'success', data })
      })
    })
  }
  return true
})
