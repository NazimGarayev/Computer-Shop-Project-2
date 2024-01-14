var computerCategoriesElement = document.getElementById('computer-categories-div');
var categoryNameInputElement = document.getElementById('category-name-input');
var saveCategoryButtonElement = document.getElementById('save-category-button');
var resetCategoryFormButtonElement = document.getElementById('reset-category-form-button');
var saveCategoryFormElement = document.getElementById('save-category-form');
var deleteCategoryButtonElement = document.getElementById('delete-category-button');
var mainContentElement = document.getElementById('main-content');
var categorySearchInputElement = document.getElementById('category-search-element');



deleteCategoryButtonElement.style.display = 'none';


var editMode = false;
var selectedComputerCategoryId = 0;
var categories = [];
var categoriesString = localStorage.getItem("categories");
var loggedInUserName = localStorage.getItem("logged-in-user-name");
var currentSelectedCategoryId = 0;
var currentSelectedCategoryName = '';
var categoriesGlobal = [];


if (categoriesString == null) {

} else {
    categories = JSON.parse(categoriesString);
    categoriesGlobal= categories.slice();
}


if (loggedInUserName != 'admin') {
    categories = [];
    window.location.href = 'index.html';
} else {
    mainContentElement.style.display = 'block';
}


function loadComputerCategories() {
    var computerCategoriesElementHTML = "<ul class='list-group'>";
    for (var i = 0; i < categories.length; i++) {
        const c = categories[i];
        computerCategoriesElementHTML += "<li class='list-group-item" +
        "list-item-action' id='computer-category-" + c.id + "' onclick='onCategorySelected(" + c.id + ")'>" +
        c.name + "</li>";
    }
    computerCategoriesElementHTML += "</ul>";
    computerCategoriesElement.innerHTML = computerCategoriesElementHTML;
}
loadComputerCategories();



function onCategorySelected(categoryId) {
    if (currentSelectedId === categoryId) { } else {
        currentSelectedCategoryId = categoryId;
        var categoryName = '';
        deleteCategoryButtonElement.style.display = 'inline-block';
        for (let index = 0; index < categories.length; index++) {
            const c = categories [index];
            if (c.id === categoryId) {
                document.getElementById('computer-category-' + c.id).style.color= 'blue';
                document.getElementById('computer-category-' + c.id).style.fontweight= 'bold';
            } else {
                document.getElementById('computer-category-' + c.id).style.color= 'black';
                document.getElementById('computer-category-' + c.id).style.fontWeight= 'normal';
            }
        }
        categoryNameInputElement.value = categoryName;
        currentSelectedCategoryName = categoryName;
        saveCategoryButtonElement.innerHTML = 'Edit';
        saveCategoryButtonElement.disabled = true;
        saveCategoryButtonElement.style.cursor = 'not-allowed';
        editMode = true;
    }
}



resetCategoryFormButtonElement.addEventListener('click', function () {
    resetForm();
});


function onSaveCategory(event) {
    event.preventDefault();
    var computerCategory = {};
    var categoryId = 0;
    for (let index = 0; index < categoriesGlobal.length; index++) {
        const c = categoriesGlobal[index];
        if (c.id > categoryId) {
            categoryId = c.id;
        }
    }
    categoryId++;
    computerCategory.id = categoryId;
    computerCategory.name = categoryNameInputElement.value.trism();
    if (editMode) {
        var categoryExists = false;
        for (let index = 0; index < categoriesGlobal.length; index++) {
            const c = categoriesGlobal[index];
            if (c.name == computerCategory.name) {
                categoryExists = true; break;
            }
        }
        if (categoryExists) {
            alert('The name of the category has been already taken');
        } else {

            computerCategory.id = selectedComputerCategoryId;
            for (let index = 0; index < categoriesGlobal.length; index++) {
                const c = categoriesGlobal[index];
                if (c.id == selectedComputerCategoryId) {
                    categoriesGlobal[index] = computerCategory; break;
                }
            }
            localStorage.setItem('categories', JSON.stringify(categoriesGlobal)); categories = categoriesGlobal.slice();
            loadComputerCategories();
            resetForm();
            alert('Editing categories went successful!');
            categorySearchInputElement.value = '';
        }
    } else {

        var categoryExists = false;
        for(let index = 0; index < categoriesGlobal.length; index++) {
            const c = categoriesGlobal[index];
            if (c.name == computerCategory.name) {
                categoryExists = true; break;
            }
        }
        if (categoryExists) {
            alert('Editing categoried went successful!');
        } else {
            categoriesGlobal.push(computerCategory);
            localStorage.setItem('categories', JSON.stringify(categoriesGlobal)); categories = categoriesGlobal.slice();
            loadComputerCategories();
            currentSelectedCategoryId = 0;
            currentSelectedCategoryName = '';
            alert("Category is successfuly registered!");
            categorySearchInputElement.value = '';
        }
    }
}


 deleteCategoryButtonElement.addEventListener('click', function () {
    if (editMode) {
        var result = confirm('Are you sure you want to delete category?');
        if (result)  {
            for (let index = 0; index < categoriesGlobal.length; index++) {
                const c = categoriesGlobal[index];
                if (c.id == currentSelectedCategoryId) {
                    categoriesGlobal.splice(index, 1); break;
                }
            }
            categories = categoriesGlobal.slice();
            loadComputerCategories();
            localStorage.setItem('categories', JSON.stringify(categories));
            resetForm();
            alert('Deleted');
            categorySearchInputElement.value = ''
        }
    } else {
        alert('Choise hasnt been made');
    }
 });


 function resetForm() {
    saveCategoryFormElement.reset();
    saveCategoryButtonElement.innerHTML = 'Register';
    editMode = false;
    deleteCategoryButtonElement.style.display = 'none';
    currentSelectedCategoryId = 0;
    currentSelectedCategoryName = '';
 }


 function onCategoryNameChanged(categoryNameInput) {
    var localName = categoryNameInput.value.trim();
    if (localName == currentSelectedCategoryName || localName == '') {
        saveCategoryButtonElement.disabled = true;
        saveCategoryButtonElement.style.cursor = 'not-allowed';
    } else {
        saveCategoryButtonElement.disabled = false;
        saveCategoryButtonElement.style.cursor = 'pointer';
    }
 }


 function searchCategory(searchInput) {
    var searchText = searchInput.value.trim();
    searchText = searchText.toLowerCase();
    categories= [];
    for (let index = 0; index < categoriesGlobal.length; index++) {
        const c = categoriesGlobal[index];
        if (c.name.toLowerCase().includes(searchText)) {
            categories.push(c)
        }
    }
    loadComputerCategories();
 }