import axios from "axios"

export default axios.create({
  baseURL: "https://sunbla.azurewebsites.net/api", // TODO Update this url
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer 4c3ee091c06c07dd2b3e7898ad768227680d31c7e7ddd9969efc4a64a4d8214f3363bdd910aa5f1b44d15071d96f73fec144f712b5b729d323ea2a19efe7cc79a1c3157d63e4816864cbcd1c41482ee5b80c2fe008ca6a407740b3e625388373858806119fe029420ab57609587dc0553e1ae54305efe3067377ba587a8eafd4",
  },
})
