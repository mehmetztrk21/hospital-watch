const tbody = document.getElementById("tbody");
const tbody2 = document.getElementById("tbody2");
const getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v, i) => new Date(year, month - 1, i + 1)).filter(v => v.getMonth() === month - 1)


const date = new Date();
const days = getDaysInMonth(date.getMonth() + 1, date.getFullYear());
const days2 = [...days];
localStorage.setItem("users", ["Azad Öztürk", "Mehmet Öztürk", "Ali Can", "Veli Can", "Ayşe Sönmez", "Halit Can", "Kutlu Yılmaz", "Beyza Orman", "Yıldız Kara"])

const users = localStorage.getItem("users").split(",");

function plan() {
    console.log("başa geldi.")
    tbody.innerHTML = "";
    var line = "";
    let limit = Math.floor(days.length * 4 / users.length); //kişi en fazla ortalamanın 1 fazlası kadar nöbet tutabilir.
    let history = [days.length + 1];

    history[0] = {
        "tgunduz": -1,
        "tgece": -1,
        "pgunduz": -1,
        "pgece": -1
    };
    users_limit = [];
    console.log("limit, ", limit);
    for (let index = 0; index < days.length; index++) {
        let day = ""
        switch (days[index].getDay()) {
            case 0:
                day = "Pazar"
                break;
            case 1:
                day = "Pazartesi"
                break;
            case 2:
                day = "Salı"
                break;
            case 3:
                day = "Çarşamba"
                break;
            case 4:
                day = "Perşembe"
                break;
            case 5:
                day = "Cuma"
                break;
            case 6:
                day = "Cumartesi"
                break;
            default:
                day = "boş"
                break;
        }

        let tgunduz = Math.floor(Math.random() * users.length);
        let tgece = Math.floor(Math.random() * users.length);
        let pgunduz = Math.floor(Math.random() * users.length);
        let pgece = Math.floor(Math.random() * users.length);
        let count2 = 0;
        while (history[index].tgece == tgunduz || history[index].tgece == pgunduz || history[index].tgece == pgece || history[index].tgece == tgece ||
            history[index].pgece == pgunduz || history[index].pgece == tgece || history[index].pgece == tgunduz || history[index].pgece == pgece ||
            users_limit.filter(i => i == tgunduz).length > limit || users_limit.filter(i => i == tgece).length > limit || users_limit.filter(i => i == pgunduz).length > limit || users_limit.filter(i => i == pgece).length > limit ||
            //users_limit.filter(i => i == tgunduz).length < 13 || users_limit.filter(i => i == tgece).length < 13 || users_limit.filter(i => i == pgunduz).length < 13 || users_limit.filter(i => i == pgece).length < 13 ||
            tgunduz == tgece || tgunduz == pgunduz || tgunduz == pgece || tgece == pgunduz || tgece == pgece || pgunduz == pgece) {
            count2++;
            if (count2 > 2500)
                break;
            tgunduz = Math.floor(Math.random() * users.length);
            tgece = Math.floor(Math.random() * users.length);
            pgunduz = Math.floor(Math.random() * users.length);
            pgece = Math.floor(Math.random() * users.length);
        }
        if(count2>1700){
           
            console.log("girdi");
            document.getElementById("btn").click();
            break;
        }

        if (day == "Cumartesi" || day == "Pazar") {
            line += `<tr style="background-color:yellow;color:black;">`
        } else {
            line += `<tr>`
        }
        line += `
        <th scope="row" style="font-weight: bold">${days[index].getDate()}/${days[index].getMonth() + 1}/${days[index].getUTCFullYear()}</th>
        <td style="font-weight: bold">${day}</td>
        <td> ${users[tgunduz]}</td>
        <td>${users[tgece]}</td>
        <th>${users[pgunduz]}</th>
        <th>${users[pgece]}</th>
    </tr>
        `
        render(line);
        line = "";
        history[index + 1] = {
            "tgunduz": tgunduz,
            "tgece": tgece,
            "pgunduz": pgunduz,
            "pgece": pgece
        };
        users_limit.push(tgunduz, tgece, pgunduz, pgece);
    }
    console.log("users_limit : ", users_limit)
    console.log("history : ", history);
    tbody2.innerHTML = "";
    for (let x = 0; x < users.length; x++) {
        var total_days = history.filter(i => i.tgece == x).length + history.filter(i => i.tgunduz == x).length + history.filter(i => i.pgece == x).length + history.filter(i => i.pgunduz == x).length ;
        var total_hours = history.filter(i => i.tgece == x).length * 10 + history.filter(i => i.tgunduz == x).length * 8.5 + history.filter(i => i.pgece == x).length * 13.5 + history.filter(i => i.pgunduz == x).length * 8.5;
        tbody2.innerHTML += `
        <td> ${users[x]}</td>
        <td>${total_days}</td>
        <th>${total_hours}</th>
        `
    }
    users_limit = [];
    history = [];
}


const render = (line) => {
    tbody.innerHTML += line;
};
