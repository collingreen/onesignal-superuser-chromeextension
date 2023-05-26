const MENU = {
  EMAIL_SEARCH: 'onesignalquicklink-email-search',
  APP: 'onesignalquicklink-app',
  ORG: 'onesignalquicklink-org'
};

const ONESIGNAL_URL = 'https://dashboard.onesignal.com';
const SUPERUSER_BASE_URL = `${ONESIGNAL_URL}/super-user`;
const APP_BASE_URL = `${ONESIGNAL_URL}/apps`;
const ORG_BASE_URL = `${ONESIGNAL_URL}/organizations`;

const urlCreator = {
  userSearch: (email) => `${SUPERUSER_BASE_URL}?email=${email}`,
  appPage: (appId) => `${APP_BASE_URL}/${appId}`,
  orgPage: (orgId) => `${ORG_BASE_URL}/${orgId}`,
};

const searchSuperuserByEmail = (email) => {
  // TODO: optionally validate email looks like an email -- do what if not?
  chrome.tabs.create({ url: urlCreator.userSearch(email) });
};

const openAppPage = (appId) => {
  // TODO: optionally validate this is a uuid -- do what if not?
  chrome.tabs.create({ url: urlCreator.appPage(appId) });
};

const openOrgPage = (orgId) => {
  // TODO: optionally validate this is a uuid -- do what if not?
  chrome.tabs.create({ url: urlCreator.orgPage(orgId) });
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU.EMAIL_SEARCH,
    title: 'Search Email: "%s"',
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: MENU.APP,
    title: 'OS App "%s"',
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: MENU.ORG,
    title: 'OS Org "%s"',
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case MENU.EMAIL_SEARCH:
      searchSuperuserByEmail(info.selectionText);
      break;
    case MENU.APP:
        openAppPage(info.selectionText);
      break;
    case MENU.ORG:
      openOrgPage(info.selectionText);
      break;
  }
});
