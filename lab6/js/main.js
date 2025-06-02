const toysData = new Map();

function initializeData() {
    const toy1 = new Toy('1', 'Конструктор "Лего"', 'LEGO Group', 'Набор для творчества и развития воображения.');
    toy1.addProperty('Количество деталей', 500);
    toy1.addProperty('Возраст', '6+');
    toysData.set(toy1.id, toy1);

    const toy2 = new InteractiveToy('2', 'Мягкая игрушка "Медведь"', 'TY Inc.', 'Милый плюшевый друг для объятий, издает звуки.');
    toy2.addProperty('Цвет', 'Коричневый');
    toy2.addProperty('Размер', '30 см');
    toysData.set(toy2.id, toy2);

    const toy3 = new Toy('3', 'Настольная игра "Монополия"', 'Hasbro', 'Экономическая стратегия для всей семьи, развивает мышление.');
    toy3.addProperty('Количество игроков', '2-6');
    toy3.addProperty('Время игры', '60-120 мин');
    toysData.set(toy3.id, toy3);

    const toy4 = InteractiveToy.createElectronicToy('4', 'Робот-трансформер', 'Takara Tomy');
    toy4.addProperty('Батарейки', 'AA x 2');
    toysData.set(toy4.id, toy4);
}

function loadToysIntoDropdown() {
    const dropdown = document.getElementById('toy-dropdown');
    dropdown.innerHTML = '';
    toysData.forEach(toy => {
        dropdown.innerHTML += toy.getDropdownOption();
    });
}

function displaySelectedToyInfo() {
    const dropdown = document.getElementById('toy-dropdown');
    const selectedToyId = dropdown.value;
    const selectedToy = toysData.get(selectedToyId);

    const manufacturerHeading = document.getElementById('manufacturer-heading');
    const descriptionContainer = document.getElementById('description-container');
    const toyImage = document.getElementById('toy-image');

    descriptionContainer.innerHTML = '';

    if (selectedToy) {
        manufacturerHeading.textContent = selectedToy.manufacturer;

        const p1 = document.createElement('p');
        p1.classList.add('description-paragraph');
        p1.textContent = selectedToy.description;
        descriptionContainer.appendChild(p1);

        if (selectedToy.additionalProperties.size > 0) {
            const p2 = document.createElement('p');
            p2.classList.add('description-paragraph');
            let additionalInfo = 'Дополнительно: ';
            selectedToy.additionalProperties.forEach((value, key) => {
                additionalInfo += `${key}: ${value}; `;
            });
            p2.textContent = additionalInfo.trim();
            descriptionContainer.appendChild(p2);
        }

        if (selectedToy.id === '1') {
            toyImage.src = '../resources/lego.jpg';
        } else if (selectedToy.id === '2') {
            toyImage.src = '../resources/bear.jpg';
        } else if (selectedToy.id === '3') {
            toyImage.src = '../resources/monopoly.jpg';
        } else if (selectedToy.id === '4') {
            toyImage.src = '../resources/robot.jpg';
        } else {
            toyImage.src = '../resources/default.jpg';
        }

    } else {
        manufacturerHeading.textContent = 'Игрушка не найдена';
        const p = document.createElement('p');
        p.textContent = 'Информация об игрушке отсутствует.';
        descriptionContainer.appendChild(p);
        toyImage.src = '../resources/default.jpg';
    }
}

function addNewToyName() {
    const newToyName = prompt('Введите новое название игрушки:');
    if (newToyName) {
        const newId = (toysData.size + 1).toString();
        const newToy = new Toy(newId, newToyName, 'Новый производитель', 'Это новая игрушка!');
        toysData.set(newId, newToy);
        loadToysIntoDropdown();
        document.getElementById('toy-dropdown').value = newId;
        displaySelectedToyInfo();
        alert(`Новое название "${newToyName}" добавлено!`);
    }
}

function changeManufacturerHeading() {
    const newManufacturer = prompt('Введите новое название производителя:');
    if (newManufacturer) {
        const dropdown = document.getElementById('toy-dropdown');
        const selectedToyId = dropdown.value;
        const selectedToy = toysData.get(selectedToyId);

        if (selectedToy) {
            selectedToy.updateManufacturer(newManufacturer);
            document.getElementById('manufacturer-heading').textContent = selectedToy.manufacturer;
            alert(`Заголовок производителя изменен на: ${newManufacturer}`);
        } else {
            alert('Сначала выберите игрушку из списка.');
        }
    }
}

function changeMainDescription() {
    const newDescriptionText = prompt('Введите новое основное описание игрушки:');
    if (newDescriptionText) {
        const dropdown = document.getElementById('toy-dropdown');
        const selectedToyId = dropdown.value;
        const selectedToy = toysData.get(selectedToyId);

        if (selectedToy) {
            selectedToy.updateDescription(newDescriptionText);
            displaySelectedToyInfo();
            alert('Основное описание успешно изменено!');
        } else {
            alert('Сначала выберите игрушку из списка.');
        }
    }
}

function insertNewParagraph() {
    const newParagraphText = prompt('Введите текст нового параграфа:');
    if (newParagraphText) {
        const positionDropdown = document.getElementById('paragraph-position-dropdown');
        const selectedPosition = positionDropdown.value;

        const dropdown = document.getElementById('toy-dropdown');
        const selectedToyId = dropdown.value;
        const selectedToy = toysData.get(selectedToyId);

        if (selectedToy) {
            const descriptionContainer = document.getElementById('description-container');
            const newParagraphElement = document.createElement('p');
            newParagraphElement.textContent = newParagraphText;
            newParagraphElement.classList.add('description-paragraph');

            if (selectedPosition === 'above') {
                descriptionContainer.insertBefore(newParagraphElement, descriptionContainer.firstChild);
            } else {
                descriptionContainer.appendChild(newParagraphElement);
            }
            alert('Новый параграф добавлен!');
        } else {
            alert('Сначала выберите игрушку из списка.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    loadToysIntoDropdown();
    displaySelectedToyInfo();

    document.getElementById('toy-dropdown').addEventListener('change', displaySelectedToyInfo);
    document.getElementById('add-toy-btn').addEventListener('click', addNewToyName);
    document.getElementById('change-heading-btn').addEventListener('click', changeManufacturerHeading);
    document.getElementById('add-paragraph-btn').addEventListener('click', insertNewParagraph);
    document.getElementById('change-description-btn').addEventListener('click', changeMainDescription);
});