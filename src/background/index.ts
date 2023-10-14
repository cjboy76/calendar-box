const API_KEY = 'AIzaSyDf5Mj605RVFn8nCJLoCuOeJl1HG7H3tSE'

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
  if (request.message === 'get_access_token') {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      console.log(token)
      sendResponse({ data: token })
    })
  }

  if (request.message === 'get_events') {
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
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
        console.log({ data })
        sendResponse({ data })
      })


    })
  }
})

export { }
