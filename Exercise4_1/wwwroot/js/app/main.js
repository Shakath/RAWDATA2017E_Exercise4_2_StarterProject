define(function (require){
    var ko = require("knockout"),
        $ = require("jquery");

    var pageSize = 5,
        current = ko.observable(0),
        pages = ko.observable(1),
        hasNext = ko.computed(function() {
            return current() < pages()-1;
        }, this),
        hasPrev = ko.computed(function() {
             return current() > 0;
        }, this);
    var currentPage = ko.observable({ page: this.current, posts: ko.observableArray()});
    var currentPost = ko.observable(null);
    var currentAnswers = ko.observableArray(null);

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

    var vm = {
        input: ko.observable(""),
        json: ko.observableArray(),
        currentPage: current,
        totalPages: pages,
        hasNext: hasNext,
        hasPrev: hasPrev,
        currentPost: currentPost,
        currentAnswers: currentAnswers,
        currentTemplate: function() {
            return currentPost() ? "postSingle": "postList"; // null evaluerer som false, hvilket betyder at når der ikke er en currentPost, så vis listen
        },
        prevPage: function () {
            console.log("prev");
            if (hasPrev()) {
                this.currentPage(this.currentPage()-1);
                this.getPosts();
            }
            console.log(this.currentPage());
        },

        nextPage: function () {
            console.log("next" + hasNext());
            if (hasNext()) {
                this.currentPage(this.currentPage() + 1);
                this.getPosts();
            }
            console.log(this.currentPage());
        },
        getPosts: function () {
            $.ajax({
                url: "http://localhost:64166/api/posts?page="+vm.currentPage()+"&pageSize="+pageSize,
                success: function (result) {
                    vm.json([]);
                    for (let item of result.items) {
                        vm.json.push(item);
                    }
                    vm.totalPages(result.pages);
                }
            });

        },
        getPost: getPost
    };

    ko.applyBindings(vm);
    vm.getPosts();
});