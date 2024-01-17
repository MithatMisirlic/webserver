const users = [{
    username: "Mithat",
    password: "1234",
    city: "Berlin"
},{
    username: "Ema",
    password: "abcd",
    city: "London"
}]

const getUserCity = (username) => {
    const user = users.find((user) => user.username === username);
    return user ? user.city : null;
};

module.exports = {users, getUserCity}