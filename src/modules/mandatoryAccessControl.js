export class MUser {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    setAccessLevel = function (accessLevel) {
        this.accessLevel = accessLevel;
    }
}

export class MFile {
    constructor(path, content) {
        this.path = path;
        this.content = content;
    }

    setSecurityLevel = function (securityLevel) {
        this.securityLevel = securityLevel;
    }

    read = function (user) {
        if (user.accessLevel >= this.securityLevel) {
            console.log(this.content);
            console.log(`Файл успішно прочитано користувачем ${user.username}`);
            return this.content;
        } else {
            console.warn(`У користувача ${user.username} немає доступу на читання файлу ${this.path}`);
        }
    }

    write = function (user, text) {
        if (user.accessLevel >= this.securityLevel) {
            this.content += text;
            console.log(`Файл успішно змінено користувачем ${user.username}`);
        } else {
            console.warn(`У користувача ${user.username} немає доступу на запис для файлу ${this.path}`);
        }
    }
}

export function defineUserAccessLevelRandomly(users) {
    for(const user of users) {
        user.setAccessLevel(Math.floor(Math.random() * 3));
    }
}

export function defineFileSecurityLevelRandomly(files) {
    for(const file of files) {
        file.setSecurityLevel(Math.floor(Math.random() * 3));
    }
}