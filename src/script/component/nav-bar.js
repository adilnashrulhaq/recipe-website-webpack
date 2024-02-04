import logo from '../../images/logo.png';

class NavigationBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <nav class="navbar nav-custom navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img src="${ logo }" alt="" width="186" height="60">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item mr-2">
                                <a class="nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="#">Categories</a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link" href="#">Meals</a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link">About Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define("nav-bar", NavigationBar);