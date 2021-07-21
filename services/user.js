// 
const axios = require("axios");

// store user id values & birthdate values
let userIdMap = new Map();
let userMap = new Map();

const updateData = () => {
  userIdMap = new Map();
  userMap = new Map();

  // provided json objects
  const urlOne = "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";
  const urlTwo = "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: urlOne,
      responseType: "json",
    })
    .then((response) => {
      const userData = response.data;

      // insert data to userIdMap
      for (data of userData) {
        userIdMap.set(data.username, data.uid);
      }

      return axios({
        method: "get",
        url: urlTwo,
        responseType: "json",
      });
    })
    .then((response) => {
      const userProfile = response.data;

      // insert data to userMap
      for (data of userProfile) {
        userMap.set(data.userUid, data)
      }

      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}


const getData = (username) => {
  // username validation
  if (!username || !userIdMap.has(username)) {
    return null;
  }

  const userId = userIdMap.get(username);
  const birthdate = userMap.get(userId).birthdate;
  const { address } = userMap.get(userId);

  return {
    username, userId, birthday, address
  };
}

export { updateData, getData };
