const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowers = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

const getUpper = () => {
    const randomIdx = Math.floor(Math.random() * uppers.length);
    return uppers[randomIdx];
};

const getLower = () => {
    const randomIdx = Math.floor(Math.random() * lowers.length);
    return lowers[randomIdx];
};

const getDigit = () => {
    const randomIdx = Math.floor(Math.random() * digits.length);
    return digits[randomIdx];
};

const functionMap = [getUpper, getLower, getDigit];

const validatePassword = (password) => {
    let upperCount = 0;
    let lowerCount = 0;
    let digitCount = 0;
    for (let char of password) {
        if (uppers.search(char) >= 0) {
            upperCount += 1;
        } else if (lowers.search(char) >= 0) {
            lowerCount += 1;
        }
        else if (digits.search(char) >= 0) {
            digitCount += 1;
        } else {
            specailsCharCount += 1;
        }
    }
    return upperCount >= 3 && lowerCount >= 3 && digitCount >= 2;
}

exports.getPassword = (length) => {
    let password = "";
    while (true) {
        const randomIdx = Math.floor(Math.random() * functionMap.length);
        password += functionMap[randomIdx].call();
        if (password.length === length) {
            if (validatePassword(password)) {
                break;
            }
            password = "";
        }
    }
    return password;
};

