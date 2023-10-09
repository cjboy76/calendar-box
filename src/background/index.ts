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
    chrome.identity.getAuthToken({ interactive: true }, (access_token) => {
      console.log(access_token)
    })
    sendResponse(true)
  }
})

export { }
