export default function authHeader() {
  if (typeof window !== "undefined") {
    const user: any = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.token) {
      return user.token;
    } else {
      return "";
    }
  }
}
