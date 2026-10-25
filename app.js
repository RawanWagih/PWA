
const accelX = document.getElementById("accelX");
const accelY = document.getElementById("accelY");
const accelZ = document.getElementById("accelZ");
const status = document.getElementById("status");
const startButton = document.getElementById("startButton");

// Register the service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(() => {
            console.log("Service worker registered.");
        })
        .catch((error) => {
            console.error("Service worker error:", error);
        });
}

// Start reading sensor data
startButton.addEventListener("click", async () => {
    if (!("DeviceMotionEvent" in window)) {
        status.textContent =
            "Device motion is not supported by this browser.";
        return;
    }

    // Some browsers require permission after a button press
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        try {
            const permission =
                await DeviceMotionEvent.requestPermission();

            if (permission !== "granted") {
                status.textContent = "Sensor permission was not granted.";
                return;
            }
        } catch (error) {
            status.textContent = "Could not request sensor permission.";
            return;
        }
    }

    window.addEventListener("devicemotion", handleMotion);
    startButton.disabled = true;
    status.textContent = "Waiting for sensor data...";
});

function handleMotion(event) {
    const acceleration = event.accelerationIncludingGravity;

    if (
        !acceleration ||
        acceleration.x == null ||
        acceleration.y == null ||
        acceleration.z == null
    ) {
        status.textContent = "Sensor readings are unavailable.";
        return;
    }

    accelX.textContent = acceleration.x.toFixed(2);
    accelY.textContent = acceleration.y.toFixed(2);
    accelZ.textContent = acceleration.z.toFixed(2);

    status.textContent = "Sensor is working!";
}
