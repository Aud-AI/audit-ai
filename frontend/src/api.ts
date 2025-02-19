import axios from "axios";

interface UserChatObj {
  userRequest: string;
}

const api = axios.create({
  baseURL: "http://localhost:9090",
});

const postUserChat = (userChatObj: UserChatObj) => {
  return api
    .post("/ai-chat", userChatObj)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export { postUserChat };
