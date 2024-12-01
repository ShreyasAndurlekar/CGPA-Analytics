// Extract the text content from the `result-text` element
const resultText = document.getElementById("result-text").innerText;

// Find the percentage increase using a regex
const match = resultText.match(/Rate of Change: (-?\d+\.\d+)%/);
if (match) {
    const percentageChange = parseFloat(match[1]); // Extract the numeric value
    const iconDiv = document.getElementById("icon");

    // Determine the image based on the percentage value
    const icon = document.createElement("img");
    icon.style.width = "16px";
    icon.style.height = "16px";
    icon.style.marginLeft = "5px";

    if (percentageChange < 0) {
        icon.src = "../static/red.png";
        icon.alt = "Negative change";
    } else {
        icon.src = "../static/green.png";
        icon.alt = "Positive change";
    }

    // Append the image beside the result
    iconDiv.appendChild(icon);
}