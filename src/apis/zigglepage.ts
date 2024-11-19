import axios from "axios";

export const getNoticeGroup = async (url:string) => {
    console.log(url)
    axios.get(url)
        .then(res => {
            return res
        })
}