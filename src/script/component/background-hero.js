import hero from '../../images/hero-background.png';

class backgroundHero extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <img src="${ hero }" height="632" width="879" class="bg-right" alt="...">
        `;
    }
}

customElements.define("background-hero", backgroundHero);