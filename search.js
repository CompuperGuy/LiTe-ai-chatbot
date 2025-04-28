// === search.js ===

// Use DuckDuckGo because it has easier access without login or API keys
const SEARCH_ENGINE = "https://duckduckgo.com/html/?q=";

class Searcher {
    async searchInternet(query) {
        const searchUrl = `${SEARCH_ENGINE}${encodeURIComponent(query)}`;

        try {
            const response = await fetch(searchUrl, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Accept": "text/html",
                    "Content-Type": "text/html"
                }
            });

            const html = await response.text();

            // Extract text inside <a> tags (first results)
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const links = doc.querySelectorAll(".result__snippet");

            if (links.length > 0) {
                let results = [];
                links.forEach(link => {
                    results.push(link.textContent.trim());
                });

                return results.slice(0, 3).join(" | ");
            } else {
                return "Sorry, I couldn't find information on that. Try asking me differently!";
            }
        } catch (error) {
            console.error("Search error:", error);
            return "Oops! There was an error searching for your answers online! We at LiTe apoligise and will look into it. :) ";
        }
    }
}

// Export for use
const LiTeSearcher = new Searcher();

