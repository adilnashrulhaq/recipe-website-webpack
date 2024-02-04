document.addEventListener('DOMContentLoaded', function () {
    const filterMealsContainer = document.getElementById('filterMeals');
    const mealPopup = document.getElementById('mealPopup');
    const mealPopupContent = document.getElementById('mealPopupContent');
    const popupOverlay = document.getElementById('popupOverlay');

    const messageHtml = `<p class="message">Pilih kategori terlebih dahulu</p>`;
    filterMealsContainer.innerHTML = messageHtml;

    window.openPopup = function(idMeal) {
        // Ambil data dari API berdasarkan idMeal
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then(response => response.json())
            .then(data => {
                const mealDetails = data.meals && data.meals[0];

                if (mealDetails) {
                    const popupContentHtml = createPopupContentHtml(mealDetails);
                    mealPopupContent.innerHTML = popupContentHtml;
                    mealPopup.style.display = 'block';
                    popupOverlay.style.display = 'block';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    window.closePopup = function() {
        mealPopup.style.display = 'none';
        popupOverlay.style.display = 'none';
    };

    function createPopupContentHtml(mealDetails) {
        // Menggabungkan bahan dan takaran
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = mealDetails[`strIngredient${i}`];
            const measurement = mealDetails[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${ingredient} - ${measurement}`);
            }
        }

        const ingredientsHtml = ingredients.length > 0
            ? `<h3>Bahan dan Takaran:</h3><ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>`
            : '<p>Tidak ada informasi bahan dan takaran.</p>';

        return `
            <h2>${mealDetails.strMeal}</h2>
            <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" style="width: 100%; max-width: 200px;">
            ${ingredientsHtml}
            <p>${mealDetails.strInstructions}</p>
        `;
    }
});

class modalPopup extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="mealPopup" class="popup">
                <button onclick="closePopup()">X</button>
                <div id="mealPopupContent"></div>
            </div>
            
            <!-- Overlay -->
            <div id="popupOverlay" class="popup-overlay" onclick="closePopup()"></div>
        `;
    }
}

customElements.define("modal-popup", modalPopup);
