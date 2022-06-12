function countAge(startDate) {
    return (new Date(new Date().getTime() - startDate.getTime()).getFullYear() - 1970);
}

function setHtmlOnClass(className, html) {
    Array.from(document.getElementsByClassName(className)).forEach(i => i.innerHTML = html)
}

const myPersonalInfo = {
    fullName: 'Marlon Klagenberg Conceição',
    shortName: 'Marlon Klagenberg',
    age: countAge(new Date('1992-02-23')),
    experienceTime: `+${countAge(new Date('2011-06-01')) -1} years`,
    aboutMe: `Hello... my name is <b>Marlon Klagenberg</b><br>
    Software Engineer from Brazil. I have rich experience in building applications to many customers and companies. On my free time I love to play games and play with my daughter.
    `,
    address: 'Rio Grande do Sul, BR',
    email: 'marlon.klc@gmail.com',
    phone: '+55 51 99563 4094',
    roles: ['Software Developer', 'Gamer', 'Daddy', 'Guitar Player'],
};

for (info in myPersonalInfo) {
    if (info === 'roles') continue;
    setHtmlOnClass(`personal-info-${info.toLowerCase()}`, myPersonalInfo[info])
}

function writeText(word, timeToWrite) {
    if (!word) return;
    let currentText = '';
    let currentChar = 0;

    const timer = setInterval(() => {
        if (currentText.length >= word.length) clearInterval(timer);

        currentText = word.substring(0, currentChar);
        currentChar++;
        if (currentText.length < word.length) currentText += '|';
        
        setHtmlOnClass('personal-info-roles', currentText);
    }, timeToWrite / word.length);
}

function eraseText(word, timeToWrite) {
    if (!word) return;
    let currentText = word;
    let currentChar = word.length - 1;

    const timer = setInterval(() => {
        if (currentText.length <= 0 || currentChar === 0) clearInterval(timer);

        currentText = word.substring(0, currentChar);
        currentChar--;

        setHtmlOnClass('personal-info-roles', currentText + '|');
    }, timeToWrite / word.length);
}

function startShuffleTechnologies() {
    let index = 0;
    setInterval(() => {
        const word = myPersonalInfo.roles[index];
        
        writeText(word, 900);

        setTimeout(() => { eraseText(word, 900) }, 3500);

        index++;
        if (index >= myPersonalInfo.roles.length) index = 0;
    }, 4500);
}

startShuffleTechnologies();