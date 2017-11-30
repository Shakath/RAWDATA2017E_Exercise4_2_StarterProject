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
            this.title("Alex is a faggot");
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