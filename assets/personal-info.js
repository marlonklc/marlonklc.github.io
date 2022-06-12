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
    technologies: ['Java', 'NodeJS', 'React', 'AWS'],
};

for (info in myPersonalInfo) {
    console.log(info)
    if (info === 'technologies') continue;
    setHtmlOnClass(`personal-info-${info.toLowerCase()}`, myPersonalInfo[info])
}

function startShuffleTechnologies() {
    let index = 0;
    setInterval(() => {
        const word = myPersonalInfo.technologies[index];
        //let currentText = '';
        //let currentChar = 0;

        // const write = () => {
        //     if (currentText.length >= word) return;
            
        //     console.log('times')
        //     currentText = word.substring(0, currentChar);
        //     currentChar++;
        //     setHtmlOnClass('personal-info-technologies', currentText + '|');
        // };

        setHtmlOnClass('personal-info-technologies', word);
        index++;
        if (index >= myPersonalInfo.technologies.length) index = 0;
    }, 4000);
}

startShuffleTechnologies();