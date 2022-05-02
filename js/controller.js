/*Any code you have right now for hiding/showing your content from previous projects should be integrated here into the controller*/ 

var currentPage = '#home';

function hideAll() {
    $('section').hide();
}

function navigateTo(to) {
    
    if (currentPage === '#logVisit') {
        let userChoice = confirm('Are you sure you want to leave?');
        if (!userChoice) {
            return 0;
        } 
    }
    $('nav #navBar button').css('color', '#38708a')
    if (to === '#home'){
        $('#homeButton').css('color', '#853100');
        $('header a').attr('href', '#home');
    }
    if (to === '#rules'){
        $('#rulesButton').css('color', '#853100');
        $('header a').attr('href', '#rules');
    }
    if (to === '#code'){
        $('#codeButton').css('color', '#853100');
        $('header a').attr('href', '#code');
    }
    if (to === '#display'){
        $('#displayButton').css('color', '#853100');
        $('header a').attr('href', '#display');
    }
    if (to === '#visitors'){
        $('#logButton').css('color', '#853100');
        $('header a').attr('href', '#visitors');
    }
    if (to === '#logVisit'){
        $('header a').attr('href', '#logVisit');
    }

    currentPage = to;

    hideAll();

    $(to).show();
}

hideAll();
navigateTo(currentPage);

function nextPage(){
    if (currentPage == '#home') {
        navigateTo('#rules');
        return 0;
    }
    else if (currentPage == '#rules') {
        navigateTo('#code');
        return 0;
    }
    else if (currentPage == '#code') {
        navigateTo('#display');
        return 0;
    }
    else if (currentPage == '#display') {
        navigateTo('#visitors');
        return 0;
    }
    else if (currentPage == '#visitors') {
        navigateTo('#home');
        return 0;
    }
    else {
        if (navigateTo('#home') === 0)
        {return 0;}
        currentPage = '#home';
        return 0;
    }
}
function lastPage(){
    if (currentPage == '#home') {
        navigateTo('#visitors');
        return 0;
    }
    else if (currentPage == '#rules') {
        navigateTo('#home');
        return 0;
    }
    else if (currentPage == '#code') {
        navigateTo('#rules');
        return 0;
    }
    else if (currentPage == '#display') {
        navigateTo('#code');
        return 0;
    }
    else if (currentPage == '#visitors') {
        navigateTo('#display');
        return 0;
    }
    else {
        if (navigateTo('#home') === 0)
        {return 0;}
        currentPage = '#home';
        return 0;
    }
}


//These next sessions were used in the examples and to calculate the formulas--------
function pointInArray(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++){
        if (arr2[i][0] == arr1[0] && arr2[i][1] == arr1[1])
        {return true;}
    }
    return false;
}
function canGo(toPoint, instructions) {
    let fromPoint = instructions[instructions.length-1];
    //Make sure we haven't 
        if (pointInArray(toPoint, instructions))
        {return false;}
    //Get midpoint
    let tmpX = (fromPoint[0] + toPoint[0]) / 2;
    let tmpY = (fromPoint[1] + toPoint[1]) / 2;

    //Make sure the midpoint values are whole numbers
    if (tmpX === Math.floor(tmpX) && tmpY === Math.floor(tmpY)){
        //If the midpoint is not taken
        if (!pointInArray([tmpX, tmpY], instructions))
        {return false;}
    }
    return true;
}

function getPoints(instructions) {
    let tmpArray = [];
    for (let x = 0; x < 3; x++){
        for (let y = 0; y < 3; y++){
            if (canGo([x, y], instructions)){
                tmpArray.push([x, y]);
            }
        }
    }
    return tmpArray;
}

let totalCombinations = [];
function bruteforce_helper(instructions){
    let cyclePoints = getPoints(instructions);
    if (instructions.length > 3) {
        totalCombinations.push(instructions.slice());
    }
    for (let i = 0; i < cyclePoints.length; i++) {
        instructions.push(cyclePoints[i]);
        bruteforce_helper(instructions);
        instructions.pop();
    }
    //Base case, returns if length is 9 or done cycling through cyclePoints
    return
}
function bruteforce() {
    for (let x = 0; x < 3; x++){
        for (let y = 0; y < 3; y++){
            bruteforce_helper([[x, y]])
        }
    }
}
bruteforce()

//Used to take in a list of coordinates and make them display better on a screen.
//[[0,0], [0, 1], [1, 1]] into [0, 0] => [0, 1] => [1, 1]
function setBetterLayout(listFun)
{
    tmpStr = "";
    for (let i = 0; i < listFun.length; i++)
    {
        tmpStr += "(";
        tmpStr += listFun[i][0].toString();
        tmpStr += ", ";
        tmpStr += listFun[i][1].toString();
        tmpStr += ")";
        if (i !== (listFun.length-1))
        {
            tmpStr += " => ";
        }
    }
    return tmpStr;
}


function openImages(fileNames) {
    $("#displayPatterns img").remove();
    for (var i = 0; i < fileNames.length; i+=2)
    {
        part1 = fileNames[i].toString() + fileNames[i+1].toString();
        part2 = fileNames[i+2].toString() + fileNames[i+3].toString();
        $( "#displayPatterns" ).append( '<img src="./img/patterns/' + part1 + '_' + part2 + '.png">' );
        if (i + 5 == fileNames.length)
        {
            break;
        }
    }
}


//This function displays the instructions on patternList
function fillCombos(start, stop) {
    while (document.getElementById("patternList").firstChild){
        document.getElementById("patternList").removeChild(document.getElementById("patternList").firstChild);
    }
    let counter = 0;
    let tmpStart = start + 1;
    let tmpCombos = [];
    let ulItem = document.createElement("ol");
    ulItem.setAttribute("start", tmpStart.toString());
    for (let i = start; i < stop; i++)
    {
        tmpCombos.push(document.createElement("li"));
        tmpButton = document.createElement("button");
        tmpButton.innerHTML = setBetterLayout(totalCombinations[i]);
        tmpButton.setAttribute("onclick", "openImages([" + totalCombinations[i] + "])");
        tmpCombos[counter].appendChild(tmpButton);
        ulItem.appendChild(tmpCombos[counter]);
        counter += 1;
    }
    document.getElementById("patternList").appendChild(ulItem);
}

//This creates all the buttons that you can pick between to display the values
function createComboButtons(){
    let tmp = 0;
    tmpButtons = [];
    let numButtons = 186;
    let numRange = 389112 / numButtons;
    for (let i = 0; i < numButtons; i++)
    {
        tmp = numRange * i;
        tmpButtons.push(document.createElement("button"))
        tmpButtons[i].innerHTML = (tmp+1).toString() + "-" + (numRange * (i+1)).toString();
        tmpButtons[i].setAttribute("onclick", "fillCombos("+(tmp).toString()+", "+(numRange*(i+1)).toString()+")");
        document.getElementById("buttonList").appendChild(tmpButtons[i]);
    }
}
createComboButtons();

$(document).ready(function() {
    initValidation();
});

function loadVisitors() {
    //called when 'visitors' menu item is clicked 
    //calls view 'renderTable'
    renderTable(visitors);
    navigateTo('#visitors');
    //calls view 'showTable'
}
uniqueIDs = [];
function getUniqueId() {
    tmpID = Math.ceil(Math.random()*1000000000);
    let isUnique = true;
    while (true) {
        for (let i = 0; i < uniqueIDs.length; i++) {
            if (uniqueIDs[i] === tmpID) {
                isUnique = false;
            }
        }
        if (isUnique) {
            uniqueIDs.push(tmpID);
            return tmpID;
        }
    }   
}

function submitForm() {
    //console.log($($('#vForm li')[1]).children('input').val());//.children('input').val());
    //called on form submit. Gets contents of form, creates visitor object,
    let id = -1;
    if (editMode) {
        id = editId;
    }
    else {
        id = getUniqueId();
    }
    let fName = $($('#vForm li')[0]).children('input').val();
    let lName = $($('#vForm li')[1]).children('input').val();
    let addr = $($('#vForm li')[2]).children('input').val();
    let cit = $($('#vForm li')[3]).children('input').val();
    let st = $($('#vForm li')[4]).children('input').val();
    let zip = $($('#vForm li')[5]).children('input').val();
    let cellNum = $($('#vForm li')[6]).children('input').val();
    cellNum = cellNum.slice(0,3) + '-' + cellNum.slice(3, 6) + '-' + cellNum.slice(6, 10);
    let emai = $($('#vForm li')[7]).children('input').val();
    let tmpVis = new Visitor(id, fName, lName, addr, cit, st, zip, cellNum, emai);
    
    if (editMode){
        modelUpdateVisitor(tmpVis);
    }
    else {
        //calls model 'modelAddVisitor' function
        modelAddVisitor(tmpVis);
    }
        
    //calls view 'renderTable' 
    renderTable(visitors);
    //calls view 'showTable'
    editMode = false;
    }
    
function addVisitor(visitor) {
    //called on 'click' of 'New Visitor' button
    //calls view 'clearForm' to clear form contents
    editMode = false;
    clearForm();
    //calls view 'showForm'
    showForm();
    currentPage='#logVisit';
 }
 
function deleteVisitor(id) {
    let userChoice = confirm('Are you sure you want to delete?');
    //called on 'click' of 'delete' icon in visitor list
    if (userChoice)
    { 
        //calls model.js modelDeleteVisitor
        modelDeleteVisitor(id);
        //calls view 'renderTable'
        //calls view 'showTable'
        loadVisitors();
    }
}

var editMode = false;
var editId = -1;
function editVisitor(id) {
    clearForm();
    tmpVisit = findVisitor(id);

    editId = id;
    editMode = true;

    $($('#vForm li')[0]).children('input').val(tmpVisit.firstName);
    $($('#vForm li')[1]).children('input').val(tmpVisit.lastName);
    $($('#vForm li')[2]).children('input').val(tmpVisit.address);
    $($('#vForm li')[3]).children('input').val(tmpVisit.city);
    $($('#vForm li')[4]).children('input').val(tmpVisit.state);
    $($('#vForm li')[5]).children('input').val(tmpVisit.zipCode);
    $($('#vForm li')[6]).children('input').val(tmpVisit.cellNum);
    $($('#vForm li')[7]).children('input').val(tmpVisit.email);
    
    showForm();
}

function cancelForm() {

    let userChoice = confirm('Are you sure you want to cancel?');
    if (userChoice) {
        clearForm();
        currentPage = '#visitors';
        navigateTo('#visitors')
    }
}