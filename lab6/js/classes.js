class Toy {
    constructor(id, name, manufacturer, description) {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
        this.description = description;
        this.additionalProperties = new Map();
    }

    static createWithNameAndId(id, name) {
        return new Toy(id, name, 'Неизвестный производитель', 'Краткое описание');
    }

    static createWithDescription(id, name, description) {
        return new Toy(id, name, 'Неизвестный производитель', description);
    }

    addProperty(key, value) {
        this.additionalProperties.set(key, value);
    }

    getDetailsText() {
        let details = `Название: ${this.name}\nПроизводитель: ${this.manufacturer}\nОписание: ${this.description}`;
        if (this.additionalProperties.size > 0) {
            details += '\nДополнительные свойства:';
            this.additionalProperties.forEach((value, key) => {
                details += `\n  ${key}: ${value}`;
            });
        }
        return details;
    }

    getDetailsHtmlList() {
        let html = `<ul>
                        <li>**Название:** ${this.name}</li>
                        <li>**Производитель:** ${this.manufacturer}</li>
                        <li>**Описание:** ${this.description}</li>`;
        if (this.additionalProperties.size > 0) {
            html += '<li>**Дополнительные свойства:**<ul>';
            this.additionalProperties.forEach((value, key) => {
                html += `<li>${key}: ${value}</li>`;
            });
            html += '</ul></li>';
        }
        html += '</ul>';
        return html;
    }

    getDropdownOption() {
        return `<option value="${this.id}">${this.name}</option>`;
    }

    updateDescription(newDescription) {
        this.description = newDescription;
    }
}

class InteractiveToy extends Toy {
    constructor(id, name, manufacturer, description, batteryRequired) {
        super(id, name, manufacturer, description);
        this.batteryRequired = batteryRequired;
    }

    static createElectronicToy(id, name, manufacturer) {
        return new InteractiveToy(id, name, manufacturer, 'Электронная игрушка.', true);
    }

    updateManufacturer(newManufacturer) {
        this.manufacturer = newManufacturer;
    }
}