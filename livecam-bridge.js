// Provide a global helper expected by the vendor player when embedded via iframe.
(function () {
    function getUrlParameter(name) {
        const query = window.location.search ? window.location.search.substring(1) : '';
        const params = new URLSearchParams(query);
        return params.get(name) || '';
    }

    window.getUrlParameter = window.getUrlParameter || getUrlParameter;
})();
