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

    var vm = {
        input: ko.observable(""),
        json: ko.observableArray(),
        currentPage: current,
        totalPages: pages,
        hasNext: hasNext,
        hasPrev: hasPrev,
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
            console.log("http://localhost:64166/api/posts?page=" + vm.currentPage() + "&pageSize=" + pageSize);
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

        }
    };

    ko.applyBindings(vm);
    vm.getPosts();
});