import axios from "axios"

export default axios.create({
  baseURL: "http://localhost:1337/api", // TODO Update this url
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer 8910053e18cd2837aa4f27d2740f1b26850689c31d06a835061245858b7902443140c76ea9088b224e4137c977f4269c04aeb711e425a336b3c31c42cfeef969ddd1ebb66f8a3f566edd698f1956695e00c356628e3e8253e342c8ff395603a5f3f2151db2257b9106adaa9065458d35d8b386efa1c05f53865b61e557179603",
  },
})
