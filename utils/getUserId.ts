export default function getUserId() {
  if (typeof window !== "undefined") {
    const user: any = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.token) {
      return user.user.id;
    } else {
      return null;
    }
  }
}
