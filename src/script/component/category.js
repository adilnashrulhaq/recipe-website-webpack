document.addEventListener('DOMContentLoaded', function () {
    const categoriesContainer = document.getElementById('categories');
    const filterMealsContainer = document.getElementById('filterMeals');
    

    const messageHtml = `<p class="message">Pilih kategori terlebih dahulu</p>`;
    filterMealsContainer.innerHTML = messageHtml;

    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => {
            const categories = data.categories || [];

            categories.forEach(category => {
                if (category.strCategory !== 'Pork') {
                    const buttonHtml = createButtonHtml(category);
                    categoriesContainer.innerHTML += buttonHtml;
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function createButtonHtml(category) {
        return `
            <button class="btn btn-recipe mb-1" onclick="handleCategoryClick('${category.strCategory}')">
                ${category.strCategory}
            </button>
        `;
    }

    //filteredMeals
    window.handleCategoryClick = function(category) {
        // Sembunyikan pesan
        filterMealsContainer.innerHTML = '';

        // Ambil data dari API berdasarkan kategori yang dipilih
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then(response => response.json())
            .then(data => {
                const filterMeals = data.meals || [];

                if (filterMeals.length === 0) {
                    // Jika tidak ada makanan untuk kategori yang dipilih
                    const messageHtml = `<p class="message">Tidak ada makanan untuk kategori ini</p>`;
                    filterMealsContainer.innerHTML = messageHtml;
                } else {
                    // Tampilkan makanan yang difilter
                    filterMeals.forEach(meal => {
                        if (meal.strMeal !== 'Pork') {
                            const cardHtml = createCardHtml(meal);
                            filterMealsContainer.innerHTML += cardHtml;
                        }
                    });
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    function createCardHtml(meal) {
        // Batasi jumlah karakter nama makanan
        const limitedName = meal.strMeal.length > 20 ? meal.strMeal.substring(0, 20) + '...' : meal.strMeal;

        return `
            <div class="filter-meal-box" onclick="openPopup('${meal.idMeal}')">
                <div class="meal-image">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%; height: 100%;">
                </div>
                <p class="meal-name">${limitedName}</p>
            </div>
        `;
    }
});

class CategoriesMeal extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="container-fluid mx-auto d-flex flex-column align-items-center justify-content-center" style="padding: 0 120px; margin: 80px 0;">
                <h2 class="card-title mb-1" style="font-weight: 700; width: fit-content !important;">Find the most</h2>
                <h2 class="card-title mb-3" style="color: #EBC54F; font-weight: 700; width: fit-content !important;">Delicious Recipes</h2>
                <p class="card-text" style="height: fit-content; text-align: center;">You can search and find the recipe you want based on the dish categories below.</p>
                <div class="mt-2" id="categories"></div>
                <div class="d-flex flex-wrap mt-3" id="filterMeals" style="justify-content: center;"></div>
            </div>
        `;
    }
}

customElements.define("category-card", CategoriesMeal);
