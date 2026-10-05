// Function to handle color fill on click
function paintBox(element, colorName) {
    element.style.backgroundColor = colorName;
    if (colorName === 'yellow') {
        element.style.color = '#000';
    } else {
        element.style.color = '#fff';
    }
}

// Function to update header with user name
function updateGreeting() {
    const inputField = document.getElementById('user-name');
    const header = document.getElementById('greeting-header');
    
    const nameVal = inputField.value.trim();
    if (nameVal !== '') {
        header.textContent = "Hello, " + nameVal;
    } else {
        header.textContent = "Hello";
    }
}