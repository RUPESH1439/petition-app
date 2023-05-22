const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    continue: "Continue",
    change: "Change",
    viewMore: "View More",
    viewLess: "View Less",
    confirmation: "Confirmation",
  },
  errors: {
    pleaseTry: "Please Try",
    pleaseFill: "Please Fill The Field",
    pleaseChoose: "Please Choose",
  },
  homeTab: {
    profile: "profile",
    myPetitions: "my petitions",
    search: "search",
    home: "home",
  },
  myPetitions: {
    header: "My Petitions",
    newPetition: "New Petition",
    created: "Created",
    signed: "Signed",
  },
  accountInfo: {
    organizationInfo: "Organization Info",
    personalInfo: "My Info",
  },
  settings: {
    title: "Settings",
    placeholder: "Language - English",
  },
  petition: {
    views: "Views",
    signs: "Signs",
    signPetition: "Sign Petition",
    thankyou: "Thank You",
    cancel: "Cancel Sign",
    signupToParticipate: "Sign Up To Participate",
    share: {
      message: "Share",
    },
    analytics: "Analytics",
    analyticsSections: {
      age: "Age",
      number: "Number",
      ageGroup: "Age Group",
      youngerThan18: "Younger Than 18 Years",
      eighteenToThirty: "18 Years - 30 Years",
      thirtyToSixty: "30 Years - 60 Years",
      olderThanSixty: "Older Than 60 Years",
      gender: "Gender",
      male: "Male",
      female: "Female",
      governorate: "Governorate",
    },
  },
  home: {
    header: "Home",
  },
  walkthrough: {
    screen1: {
      first:
        "Ahmed's village does not have clean water, and this was a big problem for him and his village for a long time",
      second: "Ahmed is a smart young man, and he knows that rights are taken and not given.",
      third:
        "So he wanted his voice to be heard and used social media as his first choice, but unfortunately, he spent so much time and effort all in vain",
    },
    screen2: {
      first: `Ahmed's friend advised him to start a petition so that his entire village could stand as one voice, and the officials know the size of the problem and its impact on their lives`,
      second: "But Ahmed did not have time and money to reach every person in the village",
      third:
        "Ahmed was looking for a way to reach them quickly and easily, and to his surprise he discovered an Rai platform",
      fourth: "",
    },
    screen3: {
      first: `Ahmed published his petition on the platform and shared it with his family, friends, and his village, and he was able to collect their signatures quickly and easily, in the comfort of his home`,
      second: `Ahmed's petition reached the officials, and they noticed the number of signatures he had collected, and they felt the importance of the problem, and they did establish the water purification project.`,
      third: ``,
    },
    screen4: {
      first: `Ahmed felt extremely happy, he changed his life and the lives of the people around him for the better`,
      second: `Ahmed and the people of his area now know that one person can change the lives of many people, and that every person can take the initiative and make change for him and for his community`,
      third: `what you are waiting for, sign up and start a petition to change lives of people you care about`,
    },
  },
  auth: {
    signIn: "Login",
    signUp: "Sign Up",
    continueAsGuest: "Continue As A Guest",
  },
  signIn: {
    title: "Sign in",
    return: "Return",
    phoneNumber: "Mobile Number",
  },
  createAccount: {
    title: "Create Account",
    personal: "Personal",
    organization: "Organization",
  },
  createOrganizationAccount: {
    header: "Organization Info",
    ceoInfo: "CEO Info",
    contactInfo: "Contact Info",
    organizationNameArabic: "Organization Name In Arabic",
    organizationNameEnglish: "Organization Name In English",
    establishedDate: "Established Date",
    permitNumber: "Permit Number",
    addressCity: "Address - City",
    addressNearestLandmark: "Address - Nearest Landmark",
    name: "Name",
    phoeNumber: "Mobile Number - Confirmed By SMS",
    organizationPhoneNumber: "Organization Mobile Number",
    facebookLink: "Facebook Link - Optional",
    instagramLink: "Instagram Link - Optional",
    websiteLink: "Website Link - Optional",
    permitImage: "Permit Image",
    logo: "Logo",
    linkOptional: "Link - Optional",
    erros: {
      establishedDate: "Must be of 4 digits",
      organizationNameArabic: "Required",
      organizationNameEnglish: "Required",
      permitNumber: "Required",
      addressCity: "Required",
    },
  },
  createPersonalAccount: {
    name: "Name",
    dateOfBirth: "Date Of Birth",
    gender: "Gender",
    governorate: "Governorate",
    mobileNumber: "Mobile Number",
  },

  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  thankyouScreen: {
    title: "New Petition",
    headingTop: "Thank you \npetition is uploaded",
    headingBottom: "petition will be published after being reviewed",
  },
  search: {
    searchPlaceholder: "Search For A Word Or User",
    bodyText: "Search For A Petition Or User",
  },

  accountScreen: {
    title: "Account",
    name: "Growth Organization",
    phoneNumber: "07814135918",
    myInfo: "My Info",
    customerService: "Customer\nService",
    privatePolicy: "Privacy Policy",
    settings: "Settings",
    logout: "Logout",
    login: "Login",
    signUP: "Sign Up",
  },
  customerServiceScreen: {
    title: "Customer Service",
    heading: "Tell Us How We Can Help You",
  },
  privacyPolicyScreen: {
    title: "Privacy Policy",
    policy: "some text",
  },
  createPetition: {
    header: "New Petition",
    governorate: "Governorate",
    category: "Category",
    title: "Title",
    description: "Description",
    imageOptional: "Image - Optional",
    showName: "Show Name",
    hideName: "Hide Name",
    publish: "Publish",
  },
  userPageScreen: {
    accountName: "Growth Organization",
    petitions: "Petitions",
    views: "Views",
    signs: "Signs",
  },
  otpScreen: {
    headerTopPart: "Input The Code We Sent You On",
    headerBottomPart: "Your Number",
    changeNum: "change number",
    notificationText: "Didn't Recieve The Code",
    sendCodeAgain: "Send The Code Again",
    wrongCode: "wrong code",
    reEnter: "Re-Enter Code",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
