//REGEX FOR VALIDATION
const uuid_re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i; //Accepts UUID format {8}{4}{3}{3}{12}
const email_re = /@.{1,}/; //Anything with an @ sign and characters after
const form = document.querySelector("#form");
const input = document.querySelector("#id");
const output = document.querySelector("#output");
const select = document.querySelector(".selector");
const emailURL = "https://dashboard.onesignal.com/super-user?email="
const uuidURL = "https://dashboard.onesignal.com/apps/"
const orgURL = "https://dashboard.onesignal.com/organizations/"

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const uuid_ok = uuid_re.exec(input.value);
    const email_ok = email_re.exec(input.value);
    if(select.value === "App ID") {
        console.log("Searching for app id on submit");
        output.textContent = uuid_ok
        ? `UUID Validated, one moment...`
        : `Invalid UUID!`;
        uuid_ok ? window.open(`${uuidURL}${input.value}`) : console.log("Validation Error")
    } else if (select.value === "Org ID") {
        console.log("Searching for org id on submit");
        output.textContent = uuid_ok
        ? `UUID Validated, one moment...`
        : `Invalid UUID!`;
        uuid_ok ? window.open(`${orgURL}${input.value}`) : console.log("Validation Error")
    } else {
        console.log("Searching for email on submit");
        output.textContent = email_ok
        ? `Email Validated, one moment...`
        : `Invalid email!`;
        email_ok ? window.open(`${emailURL}${input.value}`) : console.log("Validation Error");
    }
});

