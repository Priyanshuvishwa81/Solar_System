

class CreatePlanet {
    ctx = "";
    constructor(ctx) {
        // console.log("hii");
        // createPlanet();

        this.ctx = ctx;

    }
    createPlanet(MyPlanet) {


        ctx.fillStyle = MyPlanet.PlanetColor;
        ctx.beginPath();
        ctx.arc(MyPlanet.posX, MyPlanet.posY, MyPlanet.subPlanetRadius, 0, 44 / 7);     //create orbit of planet
        ctx.lineTo(MyPlanet.posX - MyPlanet.subPlanetRadius, MyPlanet.posY);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        // return MainPlanetXY; 
    }

    subPlanet(MySubPlanet, MainPlanetXY) {
        let subPlanetPosXY = {
            posX: "",
            posY: ""
            // basePlanetPosX: MainPlanetXY.basePlanetPosX,
            // basePlanetPosY: MainPlanetXY.basePlanetPosY
        }
        // if (angg <= Math.PI * 2) {
        var r = MySubPlanet.DisBwnPlentes_Val * (1 - MySubPlanet.eccentricity_Val * MySubPlanet.eccentricity_Val) / (1 + MySubPlanet.eccentricity_Val * Math.cos(MySubPlanet.speed));
        var xx = MainPlanetXY.posX + r * Math.cos(MySubPlanet.speed);
        var yy = MainPlanetXY.posY + r * Math.sin(MySubPlanet.speed);
        subPlanetPosXY.posX = xx;
        subPlanetPosXY.posY = yy;

        ctx.save();
        ctx.translate(xx, yy);          //rotate in its own  axis 
        ctx.rotate(MySubPlanet.OwnAxisOrbit);

        ctx.fillStyle = MySubPlanet.PlanetColor;
        ctx.beginPath();
        ctx.arc(0, 0, MySubPlanet.subPlanetRadius, 0, 44 / 7);     //create orbit of planet
        if (useRotation) {
            ctx.lineTo(0 - MySubPlanet.subPlanetRadius, 0);
        }
        // }
        ctx.fill()

        ctx.stroke();
        ctx.restore();
        ctx.closePath();

        return subPlanetPosXY;

    }




}




let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
let centerX = canvas.width / 2
canvas.height = window.innerHeight;
let centerY = canvas.height / 2
let ctx = canvas.getContext("2d");
let f = new CreatePlanet(ctx);
let PlanetsData = [];
let MoonsData = [];
// let f2 = new CreatePlanet(ctx);
// let addTime = 60;

let seconds = 60 * 30;
let useRotation = true;



$(document).ready(() => {
    let file1 = new XMLHttpRequest();
    let file2 = new XMLHttpRequest();
    let url1 = "solarSystem/allPlanets.json";
    let url2 = "solarSystem/allMoons.json";
    file1.onreadystatechange = function () {
        if (file1.readyState === XMLHttpRequest.DONE) {
            if (file1.status === 200) {
                const PlanetData = JSON.parse(file1.responseText);
                PlanetsData = PlanetData;
            }
        }

    }
    file2.onreadystatechange = function () {
        if (file2.readyState === XMLHttpRequest.DONE) {
            if (file2.status === 200) {
                const MoonData = JSON.parse(file2.responseText);
                MoonsData = MoonData;

            }
        }

    }
    file1.open('GET', url1)
    file2.open('GET', url2)
    file1.send();
    file2.send();
});


let StrToNumber2 = (str) => {
    let num = 0;
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let newStrArr = str.split("");
    for (let i = 0; i < newStrArr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (newStrArr[i] == arr[j]) {
                num = (arr[j] * (10 ** ((newStrArr.length - 1) - i))) + num
            }
            //2     32
            //2
        }
    }
    return num;
}

let StrToNumber = (str) => {


    let anum2 = "";
    let newStr2 = str.split(".");
    if (newStr2.length > 1) {
        let anum = "";
        let newStr = newStr2[0].split(",");

        if (newStr.length > 0) {
            for (let i = 0; i < newStr.length; i++) {
                anum = anum + StrToNumber2(newStr[i]);
            }
        }
        else {
            anum = StrToNumber2(anum);
        }


        return StrToNumber2(anum) + (StrToNumber2(newStr2[1]) / (10 ** newStr2[1].length));;
    }
    let anum = "";
    let newStr = str.split(",");

    if (newStr.length > 1) {
        for (let i = 0; i < newStr.length; i++) {
            anum = anum + StrToNumber2(newStr[i]);
        }
        return anum;
    }
    else {
        return StrToNumber2(str);
    }

}

// console.log(StrToNumber("98.22934"));

let MySubPlanet = [{
    //sun
    MyPlanetID: 0,
    mybasePlanetID: "none",
    BasePlanetX: centerX,
    BasePlanetY: centerY,
    eccentricity_Val: 0,
    DisBwnPlentes_Val: 1,
    subPlanetRadius: 30,
    PlanetOrbitalPeriod: 0,
    speed: 0,
    AddedSpeed: 0,
    OwnAxisOrbit: 0,
    OwnAxisOrbitAdd: 0,
    PlanetColor: "yellow",
    PlanetName: "Sun",
    posX: centerX,
    posY: centerY
}];
let PlanetSize = 0;
let PlanetDis =0;
let addColorSize = [
    { color: "white" },
    { color: "orange", size: 5-PlanetSize, dis: 70-PlanetDis},
    { color: "pink", size: 6-PlanetSize, dis: 150-PlanetDis},
    { color: "blue", size: 12-PlanetSize, dis: 203-PlanetDis},
    { color: "red", size: 15-PlanetSize, dis: 300-PlanetDis},
    { color: "wheat", size: 28-PlanetSize, dis: 403-PlanetDis},
    { color: "gray", size: 22-PlanetSize, dis: 520-PlanetDis},
    { color: "aqua", size: 21-PlanetSize, dis: 620-PlanetDis},
    { color: "purple", size: 25-PlanetSize, dis: 700-PlanetDis},
    { color: "green", size: 22-PlanetSize, dis: 1100-PlanetDis},

]
function ShapeTheData() {
    let fiftAdd = 60;
    for (let indx = 1; indx < PlanetsData.length; indx++) {

        MySubPlanet.push({
            Symbol: "planet",
            MyPlanetID: indx,
            mybasePlanetID: 0,
            BasePlanetX: centerX,
            BasePlanetY: centerY,
            eccentricity_Val: StrToNumber(PlanetsData[indx].allInfo[1].value[3].value),
            DisBwnPlentes_Val: addColorSize[indx].dis,
            subPlanetRadius: addColorSize[indx].size,
            PlanetOrbitalPeriod: StrToNumber(PlanetsData[indx].allInfo[1].value[1].value),
            speed: Math.floor(Math.random() * 100),
            OwnAxisOrbit: 0,
            AddedSpeed: 0.0614 / (StrToNumber(PlanetsData[indx].allInfo[1].value[1].value) * (seconds / 365)),
            OwnAxisOrbitAdd: ((StrToNumber(PlanetsData[indx].allInfo[1].value[1].value) / StrToNumber(PlanetsData[indx].allInfo[1].value[6].value)) / seconds) * 0.0614,
            AddedSpeed: 0,
            OwnAxisOrbitAdd: 0,
            PlanetColor: addColorSize[indx].color,
            PlanetName: PlanetsData[indx].name,
            posX: "",
            posY: ""
        })
        fiftAdd += 90;
    }



    for (let indx = 0; indx < MoonsData.length - 1; indx++) {


        for (let moon = 0; moon < MoonsData[indx].Moons.length; moon++) {
            MySubPlanet.push({
                Symbol: "moons",
                mybasePlanetID: indx,
                BasePlanetX: MySubPlanet[indx].posX,
                BasePlanetY: MySubPlanet[indx].posY,
                eccentricity_Val: StrToNumber(MoonsData[indx].Moons[moon].allInfo[1].value[2].value),
                DisBwnPlentes_Val: MySubPlanet[indx].subPlanetRadius + 15,
                subPlanetRadius: 5,
                PlanetOrbitalPeriod: StrToNumber(MoonsData[indx].Moons[moon].allInfo[1].value[1].value),
                speed: 0,
                AddedSpeed: 0.0614 / (StrToNumber(MoonsData[indx].Moons[moon].allInfo[1].value[1].value) * (seconds / 365)),
                OwnAxisOrbit: 0,
                OwnAxisOrbitAdd: ((StrToNumber(MoonsData[indx].Moons[moon].allInfo[1].value[1].value) / StrToNumber(MoonsData[indx].Moons[moon].allInfo[1].value[4].value)) / seconds) * 0.0614,
                PlanetColor: addColorSize[0].color,
                PlanetName: PlanetsData[indx].name,
                posX: "",
                posY: ""
            })
        }


    }


}

setTimeout(() => {
    ShapeTheData();
}, 500);



setInterval(() => {
    for (let i = 0; i < MySubPlanet.length; i++) {
        MySubPlanet[i].speed += MySubPlanet[i].AddedSpeed;
        MySubPlanet[i].OwnAxisOrbit += MySubPlanet[i].OwnAxisOrbitAdd;
    }
}, 10);


const isInsidePlanet = (x, y, planet) => {
    const dis = Math.sqrt((x - planet.posX) ** 2 + (y - planet.posY) ** 2)
    return dis <= planet.subPlanetRadius;
}
let SelectedPlanet = ""
canvas.addEventListener('click', function (event) {

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for (let i = 0; i < MySubPlanet.length; i++) {
        // console.log(MySubPlanet[i]);
        if (isInsidePlanet(x, y, MySubPlanet[i])) {
            // alert(`id is ${MySubPlanet[i].posX}`);
            SelectedPlanet = i;

            activePlanet = MySubPlanet[i].MyPlanetID;
            setData(activePlanet);
            info();
        }
    }

});


const setData = (P_ID) => {
    let getInfoID = 0;
    let get_Moon = -1;
    $('#Planet_Moons').text('');
    document.getElementById('Planet_Names').innerText = PlanetsData[P_ID].name;
    //for setting all moons 
    for (let i = 0; i <= MoonsData[P_ID].Moons.length - 1; i++) {
        $('#Planet_Moons').append(` <div class="moons" id="Moon${i}" value='${i}'><div class="Planet_Names fonts" id="F_Moon">${MoonsData[P_ID].Moons[i].name}</div></div>`);
    }
    if (MoonsData[P_ID].Moons.length != PlanetsData[P_ID].Moons) {
        $('#Planet_Moons').append(`<div class="OtherMoons">${PlanetsData[P_ID].Moons} Moons</div>`);
    }


    changeInsideData(P_ID, get_Moon, getInfoID);
    //moon click change data
    $(".moons").click(function () {
        getInfoID = 0;
        let valu = $(this).attr("value");
        get_Moon = valu;
        changeInsideData(P_ID, get_Moon, getInfoID);
    })

    $(".li").click(function () {
        let valu = $(this).attr("value");
        getInfoID = valu;
        changeInsideData(P_ID, get_Moon, getInfoID);
    })
    $("#Main_planet_body").click(function () {
        getInfoID = 0;
        get_Moon = -1;
        changeInsideData(P_ID, get_Moon, getInfoID);
    })



}

const changeInsideData = (P_ID, get_Moon, getInfoID) => {

    if (get_Moon >= 0) {

        $("#Info_Main_Body").text("");
        for (let i = 0; i < (MoonsData[P_ID].Moons[get_Moon].allInfo[getInfoID].value).length; i++) {
            $("#Info_Main_Body").append(`
                <div class="data" >
                        <div class="data_Key">${MoonsData[P_ID].Moons[get_Moon].allInfo[getInfoID].value[i].name}:-</div>
                        <div class="data_Value">${MoonsData[P_ID].Moons[get_Moon].allInfo[getInfoID].value[i].value}  ${MoonsData[P_ID].Moons[get_Moon].allInfo[getInfoID].value[i].unit !== undefined ? MoonsData[P_ID].Moons[get_Moon].allInfo[getInfoID].value[i].unit : ""}</div>
                </div>
        `);

        }
    }
    else {
        $("#Info_Main_Body").text("");
        for (let i = 0; i < (PlanetsData[P_ID].allInfo[getInfoID].value).length; i++) {
            $("#Info_Main_Body").append(`
                <div class="data" >
                        <div class="data_Key">${PlanetsData[P_ID].allInfo[getInfoID].value[i].name}:-</div>
                        <div class="data_Value">${PlanetsData[P_ID].allInfo[getInfoID].value[i].value}  ${PlanetsData[P_ID].allInfo[getInfoID].value[i].unit !== undefined ? PlanetsData[P_ID].allInfo[getInfoID].value[i].unit : ""}</div>
                </div>
        `);

        }


    }
    get_Status(get_Moon, getInfoID);

}

const get_Status = (get_Moon, getInfoID) => {

    //for properties
    $(".li").css("backgroundColor", "");
    $(".li").css("color", "");
    $(`#${getInfoID}`).css("backgroundColor", "white")
    $(`#${getInfoID}`).css("color", "black")

    //for moons
    let AllMoon = $(".moons");
    let SelectedMoon = $(`#Moon${get_Moon}`);

    AllMoon.css("color", "");
    AllMoon.css("border", "");
    SelectedMoon.css("color", "white");
    SelectedMoon.css("border", "1px solid white");

    if (`${get_Moon}` == -1) {
        $(`#Main_planet_body`).css("color", "white")
        $(`#Main_planet_body`).css("border", "1px solid white")
    }
    else {
        $(`#Main_planet_body`).css("color", "#3ea5b3")
        $(`#Main_planet_body`).css("border", "")
    }

}

const info = () => {
    let blockBtn = $('#changeUnits').css("zIndex","4");
    let info = document.getElementById("PlanetInfo");
    let hide = document.getElementById("hide");
    hide.style.display = "block";
    info.style.right = "0vw";
}

let isSlid = true;
const hide = () => {
    let blockBtn = $('#changeUnits').css("zIndex","7");
    let outerWidth = $('#changeUnits').outerWidth();
    let info = document.getElementById("PlanetInfo");
    $('#changeUnits').animate({ left: `-${outerWidth}px` }, 1000); 
    info.style.right = `-${info.getBoundingClientRect().width}px`;
    let hide = document.getElementById("hide");
    hide.style.display = "none"
    
    isSlid = true;
}




let Addfun = () => {
    let iTag = document.getElementById("inputTag");
    let v = StrToNumber(iTag.value) + 1;

    if (v >= 1 && v <= 60) {
        iTag.value = v;
    }
}
let Minfun = () => {
    let iTag = document.getElementById("inputTag");
    let v = StrToNumber(iTag.value) - 1;
    if (v >= 1 && v <= 60) {
        iTag.value = v;
    }
}



$(".update").click(() => {
    let m_s = $("#inputTag").val();

    let selectTime = $('input[name="selectTime"]:checked').val();
    let selectRotation = $('#Rotation').is(':checked');
    $('#S_M_val').text((m_s===""?1:m_s));
    $('#S_M').text(selectTime=="Minutes"?"Minutes":"Seconds");


    if (selectTime == "Minutes") {
        seconds = 60 * ( m_s===""?1:m_s);
    } if (selectTime == "Seconds") {
        seconds = (m_s===""?1:m_s);
    }
    useRotation = selectRotation;

})

$("#inputTag").on('input',() => {
    let m_s = $("#inputTag");
    let m_s_val = $("#inputTag").val();
    let v = StrToNumber(m_s_val);
    if ( v >= 60) {
        m_s.val(60);
    }
    if (v <= 1) {
        m_s.val("");
    }
    
    let c_val  = $("#inputTag").val();
    let selectTime = $('input[name="selectTime"]:checked').val();
    let selectRotation = $('#Rotation').is(':checked');
    $('#S_M_val').text((c_val===""?1:c_val));
    
    $('#S_M').text(selectTime=="Minutes"?"Minutes":"Seconds");

    if (selectTime == "Minutes") {
        seconds = 60 * ( m_s_val===""?1:m_s_val);
    } if (selectTime == "Seconds") {
        seconds = (m_s_val===""?1:m_s_val);
    }
    useRotation = selectRotation;

})


$('.PropToggel').click(function() {
    let outerWidth = $('#changeUnits').outerWidth();
    if (isSlid) {
        $('#changeUnits').animate({ left: '0px' }, 500); 
        isSlid= false;
        $("#hide").css("display","block");
    } else {
        $('#changeUnits').animate({ left: `-${outerWidth}px` }, 500);
        isSlid = true;
        $("#hide").css("display","none");
    }
   
       
});










function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let OnlyForSun = {
        mybasePlanetID: 0,
        posX: centerX,
        posY: centerY,
        BasePlanetX: centerX,
        BasePlanetY: centerY,
        subPlanetRadius: 30,
        PlanetColor: "yellow",
    };
   
    for (let i = 0; i < MySubPlanet.length; i++) {
        if (i > 0 && MySubPlanet[i].Symbol == "planet") {
            MySubPlanet[i].AddedSpeed = 0.0614 / (StrToNumber(PlanetsData[i].allInfo[1].value[1].value) * (seconds / 365));
            MySubPlanet[i].OwnAxisOrbitAdd = ((StrToNumber(PlanetsData[i].allInfo[1].value[1].value) / StrToNumber(PlanetsData[i].allInfo[1].value[6].value)) / seconds) * 0.0614;

        }
        let valu = {
            posX: MySubPlanet[i].BasePlanetX,
            posY: MySubPlanet[i].BasePlanetY,
        }
        let subPlanetPosXY = f.subPlanet(MySubPlanet[i], valu);
        UpdatePosXY(subPlanetPosXY, i);
    }

    requestAnimationFrame(update);
}
update();



function UpdatePosXY(subPlanetPosXY, indx) {

    MySubPlanet[indx].posX = subPlanetPosXY.posX;
    MySubPlanet[indx].posY = subPlanetPosXY.posY;
    // console.log(    MySubPlanet[1]);
    let baseIndx = MySubPlanet[indx].mybasePlanetID;

    if (baseIndx != "none") {
        MySubPlanet[indx].BasePlanetX = MySubPlanet[baseIndx].posX;
        MySubPlanet[indx].BasePlanetY = MySubPlanet[baseIndx].posY;
    }

}

