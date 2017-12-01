requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

require(['knockout', 'jquery'], function (ko, $) {

    var vm = (function () {
        var prev = ko.observable(null);
        var hasPrev = ko.computed(function () {
            return prev() != null;
        },
            this);

        var next = ko.observable(null);
        var hasNext = ko.computed(function () {
            return next() != null;
        },
            this);

        var currentPage = {
            page: ko.observable(0),
            posts: ko.observableArray()
        };
        var currentPost = ko.observable(null);
        var currentAnswers = ko.observableArray(null);

        function currentTemplate() {
            return currentPost()
                ? "postSingle"
                : "postList"; // null evaluerer som false, hvilket betyder at når der ikke er en currentPost, så vis listen
        }

        var getPosts = function (link) {
            console.log(`test: ${link}`);
            $.ajax({
                url: link,
                success: function (result) {
                    console.log(result);
                    currentPage.posts(result.items);
                    prev(result.prev);
                    next(result.next);
                }
            });

        }

        var back = function () {
            currentPost(null);
        }

        function getPost(post) {
            console.log(post);
            $.ajax({
                url: post.link,
                success: function (result) {
                    console.log(result);
                    currentPost(result);
                    getAnswers(result);
                }
            });
        }

        function getAnswers(post) {
            console.log(post);
            $.ajax({
                url: post.answers,
                success: function (result) {
                    console.log(result);
                    currentAnswers(result);
                }
            });
        }

        function prevPage() {
            if (hasPrev()) {
                currentPage.page(currentPage.page() - 1);
                getPosts(prev());
            }
            console.log(currentPage.page());
        }

        function nextPage() {
            if (hasNext()) {
                currentPage.page(currentPage.page() + 1);
                getPosts(next());
            }
            console.log(currentPage.page());
        }

        getPosts("/api/posts?pageSize=5");

        return {
            hasPrev,
            prevPage,
            hasNext,
            nextPage,
            currentPage,
            currentPost,
            currentAnswers,
            currentTemplate,
            back,
            getPost
        };
    })();

    ko.applyBindings(vm);
});