peopleButton.addEventListener("click", () => {
    currentButton = "people"
    handlerButton();
});

vehiclesButton.addEventListener('click', () => {
    currentButton = "vehicles";
    handlerButton();
})

planetsButton.addEventListener('click', () => {
    currentButton = "planets";
    handlerButton();
})

function handlerButton() {
    parent.innerHTML = '';
    infoUrl = `https://swapi.dev/api/${currentButton}`;
    navigationDiv.classList.remove("active");
    setTimeout(() => {
        navigationDiv.classList.add("active");
    }, 10);
    loadData();
}

loadMoreButton.addEventListener('click', loadData);

async function loadData() {
    let data;
    try {
        const response = await fetch(infoUrl);
        data = await response.json();
        infoUrl = data.next;
        if (data.next) {
            document.querySelector('.load-more').classList.remove('hidden');
        } else {
            document.querySelector('.load-more').classList.add('hidden');
        }
        showData(data.results);
    }
    catch (error){
        console.error("Your request is not available now: ", error);
    }
}


/** 
 * @param {Array[]} data
*/

function showData(data) {
    data.forEach(item => {
        const element = document.createElement('div');
        element.addEventListener('click', () => {
            const modalTitle = document.querySelector('.modal-title');
            const modalBody = document.querySelector('.modal-body');
            if (currentButton === "people") {
                modalTitle.textContent = `${item.name}`;
                modalBody.innerHTML = `Gender: ${item.gender}.<br> Year of birth: ${item.birth_year}.<br> Height: ${item.height}cm.<br> Weight: ${item.mass}kg.`
            } else if (currentButton === "vehicles") {
                modalTitle.textContent = `${item.model}`;
                modalBody.innerHTML = `Length: ${item.length}.<br> Manufacturer: ${item.manufacturer}.<br> Max atmosphering speed: ${item.max_atmosphering_speed}km/h.`
            } else if (currentButton === "planets") {
                modalTitle.textContent = `${item.name}`;
                modalBody.innerHTML = `Population: ${item.population}.<br> Climate: ${item.climate}.<br> Diameter: ${item.diameter}.`
            }
            const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
            modal.show();
        })

        if (currentButton === "people") {
            element.textContent = `Name: ${item.name}`;
        } else if (currentButton === "vehicles") {
            element.textContent = `Model: ${item.model}`;
        } else if (currentButton === "planets") {
            element.textContent = `Name: ${item.name}`;
        }
        parent.appendChild(element);
    })
}