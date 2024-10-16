document.addEventListener('DOMContentLoaded', () => {
    fetch('test.json') // Adjust this if the JSON file is in a different location
        .then(response => response.json())
        .then(data => initializePage(data));
});

let courseData = {};

function initializePage(data) {
    courseData = data;  // Save the JSON data
    const courseSelect = document.getElementById('courseSelect');

    // Populate the courses dropdown
    Object.keys(courseData).forEach(courseKey => {
        const option = document.createElement('option');
        option.value = courseKey;
        option.textContent = courseKey.toUpperCase();
        courseSelect.appendChild(option);
    });
}

function populateDomains() {
    const courseSelect = document.getElementById('courseSelect');
    const selectedCourse = courseSelect.value;
    const domainSelect = document.getElementById('domainSelect');
    domainSelect.innerHTML = '<option value="" disabled selected>Select a Domain</option>';  // Reset domain options

    if (selectedCourse && courseData[selectedCourse]) {
        const domains = courseData[selectedCourse].domains;

        Object.keys(domains).forEach(domainKey => {
            const option = document.createElement('option');
            option.value = domainKey;
            option.textContent = domainKey;
            domainSelect.appendChild(option);
        });
    }
}

function showRoadmap() {
    const courseSelect = document.getElementById('courseSelect');
    const domainSelect = document.getElementById('domainSelect');
    const selectedCourse = courseSelect.value;
    const selectedDomain = domainSelect.value;
    const roadmapContainer = document.getElementById('roadmap');
    const referenceLink = document.getElementById('referenceLink');

    roadmapContainer.innerHTML = '';  // Clear previous roadmap

    if (selectedCourse && selectedDomain && courseData[selectedCourse].domains[selectedDomain]) {
        const roadmap = courseData[selectedCourse].domains[selectedDomain].roadmap;
        const reference = courseData[selectedCourse].domains[selectedDomain].reference;

        roadmap.forEach(step => {
            const listItem = document.createElement('li');
            listItem.textContent = step;
            roadmapContainer.appendChild(listItem);
        });

        referenceLink.href = reference;
        referenceLink.style.display = 'block';
    }
}
