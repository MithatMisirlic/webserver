async function updateUserData() {
    const username = sessionStorage.getItem('username');
    document.getElementById("dashboard-heading").textContent = `${username}'s Dashboard`;
    document.getElementById("username_display").textContent = `Welcome, ${username}`;

    try {
        const picture_response = await fetch(`/api/${username}/profile-picture-url`);
        if (picture_response.ok) {
            const picture = await picture_response.json();
            console.log(picture.profilePictureUrl);
            document.getElementById("profile").src = picture.profilePictureUrl;
        } else {
            console.error('Failed to fetch profile picture:', picture_response.status);
        }
    } catch (error) {
        console.error('Error fetching profile picture:', error);
    }
}