chrome.runtime.onInstalled.addListener(()=> {
    console.log("Extension Installed");
    chrome.contextMenus.create(
        {
            id: "1",
            title: "Search by App/Email \"%s\"",
            contexts: ["selection"]
        }
    )
    chrome.contextMenus.create(
        {
            id: "2",
            title: "Search by Org \"%s\"",
            contexts: ["selection"]
        }
    )
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    
    // console.log(typeof(info.menuItemId)) Comparisons should be made with strings

    //REGEX FOR VALIDATION
    const uuid_re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i; //Accepts UUID format {8}{4}{3}{3}{12}
    const email_re = /@.{1,}/; //Anything with an @ sign and characters after;
    //BASE URLS
    const emailURL = "https://dashboard.onesignal.com/super-user?email="
    const uuidURL = "https://dashboard.onesignal.com/apps/"
    const orgURL = "https://dashboard.onesignal.com/organizations/"
    //VALIDATE REGEX WITH SELECTIONS (org and app are both uuid)
    const uuid_ok = uuid_re.exec(info.selectionText);
    const email_ok = email_re.exec(info.selectionText);

    console.log("starting conditionals")
    if(info.menuItemId === '1') {
        console.log("start if")
        if(uuid_ok) {
            console.log("Searching for app id on submit");
            const newUrl = `${uuidURL + info.selectionText}`;
            chrome.tabs.create({url: newUrl});
        } else if (email_ok) {
            console.log("Searching for email on submit");
            const newUrl = `${emailURL + info.selectionText}`;
            chrome.tabs.create({url: newUrl});
        } else {
            console.log(info)
            console.log("Validation Error, please try again")
        }
    } 

    if(info.menuItemId === '2') {
        if(uuid_ok) {
            console.log("Searching for org id on submit");
            const newUrl = `${orgURL + info.selectionText}`;
            chrome.tabs.create({url: newUrl});
        } else {
            console.log(info)
            console.log("Validation Error, please try again")
        }
    }
    
    console.log("Done!");
});
