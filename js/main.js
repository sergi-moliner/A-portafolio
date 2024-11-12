    document.addEventListener("DOMContentLoaded", function() {
        // Función para actualizar el contador de artículos visibles
        function updateArticleCount() {
            const visibleArticles = Array.from(document.querySelectorAll('.article-card'))
                                          .filter(article => article.parentElement.style.display !== "none").length;
            const totalArticles = document.querySelectorAll('.article-card').length;
            document.getElementById('articleCount').innerText = `Número total de artículos mostrados: ${visibleArticles} / ${totalArticles}`;
        }

        // Inicializa el contador al cargar la página
        updateArticleCount();

        // Función para ordenar artículos
        function sortArticles() {
            const sortOption = document.getElementById("sortOptions").value;
            const articlesContainer = document.querySelector("#articulos .row");
            const articles = Array.from(document.querySelectorAll(".article-card"));

            if (sortOption === "dateDesc" || sortOption === "dateAsc") {
                articles.sort((a, b) => {
                    const dateA = new Date(a.querySelector(".card-subtitle").innerText.split(": ")[1]);
                    const dateB = new Date(b.querySelector(".card-subtitle").innerText.split(": ")[1]);
                    return sortOption === "dateDesc" ? dateB - dateA : dateA - dateB;
                });
            } else if (sortOption === "sourceAsc" || sortOption === "sourceDesc") {
                articles.sort((a, b) => {
                    const sourceA = a.dataset.source.toLowerCase();
                    const sourceB = b.dataset.source.toLowerCase();
                    return sortOption === "sourceAsc" ? sourceA.localeCompare(sourceB) : sourceB.localeCompare(sourceA);
                });
            }

            articlesContainer.innerHTML = "";
            articles.forEach(article => articlesContainer.appendChild(article.parentElement));
            updateArticleCount(); // Actualiza el contador después de ordenar
        }

        // Función para filtrar artículos por fuente
        function filterArticles() {
            const filterOption = document.getElementById("filterOptions").value;
            const articles = document.querySelectorAll(".article-card");

            articles.forEach(article => {
                if (filterOption === "all") {
                    article.parentElement.style.display = "";
                } else {
                    article.parentElement.style.display = article.dataset.source === filterOption ? "" : "none";
                }
            });
            updateArticleCount(); // Actualiza el contador después de aplicar el filtro
        }

        // Función para buscar artículos por palabras clave
        function searchArticles() {
            const searchInput = document.getElementById("searchInput").value.toLowerCase();
            const articles = document.querySelectorAll(".article-card");

            articles.forEach(article => {
                const title = article.querySelector(".card-title").innerText.toLowerCase();
                const content = article.querySelector(".card-text").innerText.toLowerCase();
                const isVisible = title.includes(searchInput) || content.includes(searchInput);
                article.parentElement.style.display = isVisible ? "" : "none";
            });
            updateArticleCount(); // Actualiza el contador después de realizar una búsqueda
        }

        // Event listeners para ordenar, filtrar y buscar
        document.getElementById("sortOptions").addEventListener("change", sortArticles);
        document.getElementById("filterOptions").addEventListener("change", filterArticles);
        document.getElementById("searchInput").addEventListener("input", searchArticles);
    });

// Buscador de artículos
function searchArticles() {
    const input = document.getElementById('articleSearch').value.toLowerCase();
    const articles = document.querySelectorAll('.article-card');

    articles.forEach(article => {
        const title = article.querySelector('.card-title').innerText.toLowerCase();
        const text = article.querySelector('.card-text').innerText.toLowerCase();
        if (title.includes(input) || text.includes(input)) {
            article.parentElement.style.display = 'block';
        } else {
            article.parentElement.style.display = 'none';
        }
    });
}

function sortArticles() {
    const sortOption = document.getElementById("sortOptions").value;
    const articlesContainer = document.querySelector("#articulos .row");
    const articles = Array.from(document.querySelectorAll(".article-card"));

    // Ordenar por fecha
    if (sortOption === "dateDesc" || sortOption === "dateAsc") {
        articles.sort((a, b) => {
            const dateA = new Date(a.querySelector(".card-subtitle").innerText.split(": ")[1]);
            const dateB = new Date(b.querySelector(".card-subtitle").innerText.split(": ")[1]);
            return sortOption === "dateDesc" ? dateB - dateA : dateA - dateB;
        });
    }
    // Ordenar por fuente
    else if (sortOption === "sourceAsc" || sortOption === "sourceDesc") {
        articles.sort((a, b) => {
            const sourceA = a.dataset.source.toLowerCase();
            const sourceB = b.dataset.source.toLowerCase();
            if (sourceA < sourceB) return sortOption === "sourceAsc" ? -1 : 1;
            if (sourceA > sourceB) return sortOption === "sourceAsc" ? 1 : -1;
            return 0;
        });
    }

    // Vaciar el contenedor y añadir los artículos en el nuevo orden
    articlesContainer.innerHTML = "";
    articles.forEach(article => articlesContainer.appendChild(article.parentElement));
}

// Función de filtrado de artículos por fuente
function filterArticles() {
    const filterOption = document.getElementById("filterOptions").value;
    const articles = document.querySelectorAll(".article-card");

    articles.forEach(article => {
        // Mostrar todos los artículos si la opción es "all"
        if (filterOption === "all") {
            article.parentElement.style.display = "";
        } else {
            // Mostrar u ocultar artículos según la fuente
            article.parentElement.style.display = article.dataset.source === filterOption ? "" : "none";
        }
    });
}