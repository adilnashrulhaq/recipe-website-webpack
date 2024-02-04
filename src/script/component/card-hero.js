class cardHero extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="" style="height: 632px; display: flex; align-items: center;">
                <div class="card-head">
                    <div class="card-body">
                        <h1 class="card-title" style="color: #EBC54F; font-weight: 700;">Bisa Masak</h1>
                        <h1 class="card-title mb-3" style="font-weight: 700;">Delicious Dish</h1>
                        <p class="card-text mb-4">BisaMasak1 means being able to cook, we can cook delicious food for our daily dish with selected recipes from famous chefs.</p>
                        <a href="#" class="btn btn-recipe">Find the delicious recipes</a>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("card-hero", cardHero);