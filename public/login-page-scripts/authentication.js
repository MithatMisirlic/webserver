async function authenticateUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
            body:"username="+ username + "&password="+ password
        });

        if (!response.ok) {
            console.error(`Server responded with status ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log("Server Response:", data);

        const sessionToken = await response.text();
        document.cookie = 'sessionToken=&{sessionToken}';
        window.location.href = '/dashboard';

    } catch (error) {
        console.error("Error:", error);
    }
}