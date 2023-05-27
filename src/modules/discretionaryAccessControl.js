export class DUser {
    constructor(username, password, isAdmin) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}

export class DFile {
    constructor(path, content) {
        this.path = path;
        this.content = content;
    }

    setAccessMatrix = function (accessMatrix) {
        this.accessMatrix = accessMatrix;
    }

    read = function (username) {
        const user = this.accessMatrix.get(username);
        if (user.permissions.includes('r')) {
            console.log(this.content);
            console.log(`Файл успішно прочитано користувачем ${username}`);
            return this.content;
        } else {
            console.warn(`У користувача ${username} немає доступу на читання файлу ${this.path}`);
        }
    }

    write = function (username, text) {
        const user = this.accessMatrix.get(username);
        if (user.permissions.includes('w')) {
            this.content += text;
            console.log(`Файл успішно змінено користувачем ${username}`);
        } else {
            console.warn(`У користувача ${username} немає доступу на запис для файлу ${this.path}`);
        }
    }

    grant = function (username, toUsername, permissions) {
        const userPermissions = this.accessMatrix.get(username);

        if (!userPermissions.includes('g')) {
            console.log('Немає прав на надачу доступу до файлу ' + this.path);
            return;
        }

        const toUser = this.accessMatrix.get(toUsername);

        if (!toUser) {
            alert(`Користувача ${toUsername} не знайдено`);
            return;
        }

        if (permissions.length !== 3) {
            alert('Неправильний формат строки!')
            return
        }

        this.accessMatrix.set(toUsername, permissions);
    }
}

function getRandomPermissions() {
    let permissions = 'rwg';
    for (let i = 0; i < 3; i++) {
        if (Math.random() > 0.5) {
            permissions = permissions.replace(permissions.charAt(i), '-');
        }
    }
    return permissions;
}

export function defineAccessMatrixRandomly(file, users) {
    const accessMatrix = new Map();
    for (const user of users) {
        let permissions;
        user.isAdmin ? permissions = 'rwg' : permissions = getRandomPermissions();
        accessMatrix.set(user.username, permissions);
    }
    file.setAccessMatrix(accessMatrix);
}
