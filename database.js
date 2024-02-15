const users = [{
    username: "Mithat",
    password: "1234",
    city: "Berlin",
    profilePicturePath:"/profile-pictures/pfp.png"
},{
    username: "Ema",
    password: "abcd",
    city: "London",
    profilePicturePath:"/profile-pictures/ema_pfp.jpg"
}]

const getUserCity = (username) => {
    const user = users.find((user) => user.username === username);
    return user ? user.city : null;
};

module.exports = {users, getUserCity}