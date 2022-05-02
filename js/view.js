/*this file contains view related javascript functions related to what the user is seeing and interacting with*/

function renderTable(visitors) {//renders table from global 'visitors' object array
    $('#visitors tr').remove();

    $('#visitors table').append(
        '<tr>' +
            '<th>' + 'Name' + '</th>' +
            '<th>' + 'Address' + '</th>' +
            '<th>' + 'Phone' + '</th>' +
            '<th>' + 'Email' + '</th>' +
            '<th class="visitorId">' + 'id' + '</th>' +
            '<th>' + 'Actions' + '</th>' +
        '</tr>'
        )
        
        visitors.forEach(function(val, index) {
            $('#visitors table tr:last').after(
                '<tr>' +
                    '<td>' + val.fullName + '</td>' +
                    '<td>' + val.fullAddress + '</td>' +
                    /*cellNum = cellNum.slice(0,3) + '-' + cellNum.slice(3, 6) + '-' + cellNum.slice(6, 10);*/
                    '<td>' + val.cellNum.slice(0,3) + '-' + val.cellNum.slice(3, 6) + '-' + val.cellNum.slice(6, 10) + '</td>' +
                    '<td>' + val.email + '</td>' +
                    '<td class="visitorId">' + val.id + '</td>' +
                    '<td>' + 
                        '<button class=action onclick="deleteVisitor(' + val.id + ')">' + 
                            'delete' +
                            '<img src="../img/minus-solid.svg">' +
                        '</button>' +
                        '<button class=action onclick="editVisitor(' + val.id + ')">' +
                            'edit' +
                            '<img src="../img/edit-solid.svg">' + 
                        '</button>' +
                    '</td>' +
                '</tr>'
        )
    });
    $('.visitorId').hide();

}

function showVisitors()  {//shows visitor container and hides all other site content containers 
}
function showList() {//shows visitor list and hides form 
    navigateTo('#visitors');
}
function showForm() {//shows visitor form and hides list
    $('.errorMsg').hide();
    navigateTo('#logVisit');
}

function clearForm() {//clears values on inputs so next time form is loaded they don't have old contents
    $('#myform')[0].reset();
}
