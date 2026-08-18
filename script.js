const shows = [
    {id:1, name: "Community", genre:"Sitcom", complete: 1 },
    {id:2, name: "True Detective", genre:"Crime Drama", complete: 1 },
    {id:3, name: "Malcom in the Middle", genre:"Sitcom", complete: 1},
    {id:4, name: "Vinland Saga", genre: "Historical Drama", complete: 0},
    {id:5, name: "Dungeon Meshi", genre: "Fantasy", complete: 0},
    {id:6, name: "Game of Thrones", genre: "Dark Fantasy", complete: 1},
    {id:7, name: "How I Met Your Mother", genre: "Sitcom", complete: 1}
]
const showList = document.getElementsByClassName("showList")[0];
console.log(showList);

shows.forEach(show => {
    //I want to create a table with the shows, showing all the values of the object. 
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let genreCell = document.createElement("td");
    let completeCell = document.createElement("td");

    nameCell.textContent = show.name;
    genreCell.textContent = show.genre;
    completeCell.textContent = show.complete ? "Complete" : "Incomplete";

    row.appendChild(nameCell);
    row.appendChild(genreCell);
    row.appendChild(completeCell);
    showList.appendChild(row);  
});

function addShow() { //This function will update the shows array with the new show, and then update the table with the new show.
    const nameInput = document.getElementById("nameInput").value;
    const genreInput = document.getElementById("genreInput").value;
    const completeInput = document.getElementById("completeInput").checked;

    const newShow = {
        name: nameInput,
        genre: genreInput,
        complete: completeInput
    };

    if (nameInput === "" || genreInput === "") {
        alert("Please fill in all fields.");
        return;
    }

    shows.push(newShow);

    // Clear the table and re-render all shows
    showList.innerHTML = '';
    shows.forEach(show => {
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let genreCell = document.createElement("td");
        let completeCell = document.createElement("td");

        nameCell.textContent = show.name;
        genreCell.textContent = show.genre;
        completeCell.textContent = show.complete ? "Complete" : "Incomplete";

        row.appendChild(nameCell);
        row.appendChild(genreCell);
        row.appendChild(completeCell);
        showList.appendChild(row);
    });
}
function filterShows() { 
    const filterSelect = document.getElementById("filterSelect").value;
    const filterInput = document.getElementById("filterInput").value.toLowerCase();

    const filteredShows = shows.filter(show => {
        const matchesFilter = filterSelect === "all" || (filterSelect === "complete" && show.complete) || (filterSelect === "incomplete" && !show.complete);
        const matchesInput = show.name.toLowerCase().includes(filterInput) || show.genre.toLowerCase().includes(filterInput);
        return matchesFilter && matchesInput;
    });

    showList.innerHTML = '';
    if (filteredShows.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 3;
        cell.textContent = "No shows match the filter criteria.";
        row.appendChild(cell);
        showList.appendChild(row);
    } else {
        filteredShows.forEach(show => {
            let row = document.createElement("tr");
            let nameCell = document.createElement("td");
            let genreCell = document.createElement("td");
            let completeCell = document.createElement("td");

            nameCell.textContent = show.name;
            genreCell.textContent = show.genre;
            completeCell.textContent = show.complete ? "Complete" : "Incomplete";

            row.appendChild(nameCell);
            row.appendChild(genreCell);
            row.appendChild(completeCell);
            showList.appendChild(row);
        });
    }
}

//The toggle: One control on your page toggles a state: a light and dark theme, sections that open and close, a panel that shows and hides. The toggle changes classes, not inline styles, and it updates the ARIA attribute that describes its state so that the change is announced and not only seen.
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    body.classList.toggle("dark-theme");
    const isDarkTheme = body.classList.contains("dark-theme");
    themeToggle.setAttribute("aria-pressed", isDarkTheme);

    // Save the theme preference in localStorage
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
}
