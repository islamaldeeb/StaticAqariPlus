// footer.js
document.addEventListener('DOMContentLoaded', function () {
    const footerContainer = document.getElementById('footer-container');

    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>حقوق النشر &copy; Aqari Plus ${new Date().getFullYear()}</span>
                    </div>
                </div>
            </footer>
        `;
    }
});