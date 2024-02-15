async function authenticateUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "username=" + username + "&password=" + password
        });

        if (!response.ok) {
            const errorMessageContainer = document.getElementById('error-message');
            errorMessageContainer.textContent = 'Incorrect username or password';
            return;
        }

        const sessionToken = await response.text();
        document.cookie = 'sessionToken=' + sessionToken;
        sessionStorage.setItem("username", username)
        window.location.href = '/dashboard';

    } catch (error) {
        console.error("Error:", error);
    }
}