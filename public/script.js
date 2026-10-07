const form = document.getElementById("friendForm");

const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const data = {

        name: document.getElementById("name").value,

        mobile: document.getElementById("mobile").value,

        email: document.getElementById("email").value,

        department: document.getElementById("department").value

    };

    try {

        const response = await fetch("/submit", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (result.success) {

            message.textContent =
                "✅ Information submitted successfully!";

            message.style.color = "green";

            form.reset();

        } else {

            message.textContent =
                "❌ Submission failed.";

            message.style.color = "red";

        }

    }

    catch (error) {

        console.error(error);

        message.textContent =
            "❌ Server connection failed.";

        message.style.color = "red";

    }

});