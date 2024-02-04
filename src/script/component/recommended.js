document.addEventListener('DOMContentLoaded', function () {
    const recomRecipe = document.getElementById('recomRecipe');

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meals = data.meals || [];

            meals.forEach(meal => {
                const cardHtml = recommendMeal(meal);
                recomRecipe.innerHTML += cardHtml;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Tambahkan pesan kesalahan yang lebih informatif kepada pengguna jika diperlukan
        });

    function recommendMeal(meal) {
        const limitedInstructions = meal.strInstructions.length > 100 ?
            meal.strInstructions.substring(0, 100) + '...' :
            meal.strInstructions;

        return `
            <div class="card" style="max-width: 640px; max-height: 240px;" onclick="openPopup('${meal.idMeal}')">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${document.createTextNode(meal.strMeal).nodeValue}</h5>
                            <div class="row spesial">
                                <p class="card-text mb-1">${meal.strArea}</p>
                                <p class="card-text mb-1" style="color: #EBC54F; font-weight: 700">${meal.strCategory}</p>
                            </div>
                            <p class="card-text second-text">${limitedInstructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});

class recommendedMeals extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="container-fluid mx-auto" style="padding: 40px 120px; margin: 80px 0; background-color: #ebc44f18;">
                <div class="row recommended">
                    <div class="col-md-12" id="recomRecipe"></div>
                    <div class="row rec-recipe">
                        <div class="col-md-12">
                            <h2 class="card-title mb-3" style="font-weight: 700;">Our Recommended</h2>
                            <h2 class="card-title p-0" style="color: #EBC54F; font-weight: 700;">Recipe</h2>
                        </div>
                        <p class="card-text" style="text-align: center;">Would you like some delicious recipe recommendations to spice up your culinary adventures?</p>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("recommended-card", recommendedMeals);
