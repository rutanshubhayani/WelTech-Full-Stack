$(document).ready(function () {
    const apiUrl = 'https://jsonplaceholder.typicode.com/comments';
    let comments = [];
    let currentPage = 1;
    const commentsPerPage = 10;
    const maxPageLinks = 5;

    function fetchComments() {
        $.get(apiUrl, function (data) {
            comments = data;
            renderComments();
            renderPagination();
        }).fail(function () {
            $('#comments').html('<p>Error loading comments. Please try again later.</p>');
        });
    }

    function renderComments() {
        const startIndex = (currentPage - 1) * commentsPerPage;
        const endIndex = Math.min(startIndex + commentsPerPage, comments.length);
        const pageComments = comments.slice(startIndex, endIndex);

        const commentsContainer = $('#comments');
        commentsContainer.empty();

        pageComments.forEach(comment => {
            commentsContainer.append(`
                <div class="col-md-4">
                    <div class="comment-item">
                        <h5>${comment.id}</h5>
                        <h6>${comment.name}</h6>
                        <p>${comment.email}</p>
                        <p>${comment.body}</p>
                    </div>
                </div>
            `);
        });
    }

    function renderPagination() {
        const totalPages = Math.ceil(comments.length / commentsPerPage);
        const paginationContainer = $('#pagination');
        paginationContainer.empty();

        if (currentPage > 1) {
            paginationContainer.append(`
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            `);
        }

        const startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
        const endPage = Math.min(totalPages, startPage + maxPageLinks - 1);

        if (startPage > 1) {
            paginationContainer.append(`
                <li class="page-item">
                    <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>
            `);
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationContainer.append(`
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#">${i}</a>
                </li>
            `);
        }

        if (endPage < totalPages) {
            paginationContainer.append(`
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">${totalPages}</a>
                </li>
            `);
        }

        if (currentPage < totalPages) {
            paginationContainer.append(`
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            `);
        }

        paginationContainer.find('a').on('click', function (event) {
            event.preventDefault();
            const pageNumber = $(this).text().trim();
            if (pageNumber === '«') {
                if (currentPage > 1) {
                    currentPage--;
                }
            } else if (pageNumber === '»') {
                if (currentPage < totalPages) {
                    currentPage++;
                }
            } else {
                currentPage = parseInt(pageNumber);
            }
            renderComments();
            renderPagination();
        });
    }

    fetchComments();
});
