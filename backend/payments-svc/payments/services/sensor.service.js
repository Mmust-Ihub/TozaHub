import axios from "axios"
import { ApiError } from "../utils/APiError.js";

const getCarInfo = async(plate) => {
  const url = `https://toza-hub.vercel.app/api/vehicle/${plate}`
  const headers = {
    "Content-Type": "application/json"
  }
  const response = await axios.get(url, {headers})
  console.log(response)
}

