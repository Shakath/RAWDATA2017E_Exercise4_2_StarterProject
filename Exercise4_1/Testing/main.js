var nextPage = "";
var prevPage = null;
getPage();

/**
 * Henter den næste side med det samme og gemmer i variablen 'nextPage'
 */
function getPage() {
    $.ajax({
        url: "http://localhost:64166/api/posts",
        method: "GET",
        dataType: "json",
        success: function (data) {
            nextPage = data.next;
            console.log("Next: " + nextPage);
        }
    });
}

(function () {
	var vm = {
        title: ko.observable("Hello! :)"),
        content: ko.observable("Content"),

		changeTitle: function () {
			console.log(this.title);
            this.title("Martin is a fuckwit");
		},

		nextPage: function () {
            $.ajax({
                url: nextPage,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    this.content = $("#data").text(JSON.stringify(data.items));
                    console.log(data.next);
                    nextPage = data.next;
                    prevPage = data.prev;
                    console.log("Next: " + nextPage);
                    console.log("Prev: " + prevPage);
                }
            });
        },

        prevPage: function () {
            $.ajax({
                url: prevPage,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    this.content = $("#data").text(JSON.stringify(data.items));
                    console.log(data.next);
                    nextPage = data.next;
                    prevPage = data.prev;
                }
            });
        }
	};
	ko.applyBindings(vm);
})();

nextPage:function () {
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
        url: "http://localhost:64166/api/posts?page=" + vm.currentPage() + "&pageSize=" + pageSize,
        success: function (result) {
            vm.json([]);
            for (let item of result.items) {
                vm.json.push(item);
            }
            vm.totalPages(result.pages);
        }
    });
}