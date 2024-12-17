import axios from "../utils/axios.customize";
export const RegisterAPI = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};

export const LoginAPI = (username, password) => {
  return axios.post("/api/v1/auth/login", { username, password });
};

export const fetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const LogoutAPI = () => {
  return axios.post("/api/v1/auth/logout");
};

export const userPagination = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};

export const addUser = (fullName, password, email, phone) => {
  return axios.post("/api/v1/user", { fullName, password, email, phone });
};

export const importUser = (data) => {
  return axios.post("/api/v1/user/bulk-create", data);
};

export const deleteUser = (_id) => {
  return axios.delete(`/api/v1/user/${_id}`);
};

export const updateUser = (_id, fullName, phone) => {
  return axios.put("/api/v1/user", { _id, fullName, phone });
};

export const bookPagination = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callFetchCategory = () => {
  return axios.get(`/api/v1/database/category`);
};

export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

export const callCreateBook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.post("/api/v1/book", {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

export const callUpdateBook = (
  _id,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.put(`/api/v1/book/${_id}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

export const callDeleteBook = (_id) => {
  return axios.delete(`/api/v1/book/${_id}`);
};

export const getBookWithId = (_id) => {
  return axios.get(`/api/v1/book/${_id}`);
};

export const callCreateOrder = (data) => {
  return axios.post("/api/v1/order", { ...data });
};

export const callOrdersHistory = () => {
  return axios.get(`/api/v1/history`);
};

export const callUpdateAvatar = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar",
    },
  });
};

export const callUpdateUserInfo = (_id, phone, fullName, userAvatar) => {
  return axios.put(`/api/v1/user`, { _id, phone, fullName, userAvatar });
};

export const callUpdatePassword = (email, oldpass, newpass) => {
  return axios.post(`/api/v1/user/change-password`, {
    email,
    oldpass,
    newpass,
  });
};
