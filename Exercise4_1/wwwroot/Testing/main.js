var nextPage = "";
var prevPage = null;

(function () {
    var vm = {
        content: ko.observable("Content"),
        jsonArray: ko.observableArray([]),
        postArray: ko.observableArray([]),
        answerArray: ko.observableArray([]),

		nextPage: function () {
            $.ajax({
                url: nextPage,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    vm.content(JSON.stringify(data.items));
                    console.log(data.next);
                    vm.jsonArray(data.items);
                    nextPage = data.next;
                    prevPage = data.prev;
                    console.log("Next: " + nextPage);
                    console.log("Prev: " + prevPage);
                }
            });
        },

        getPost: function() {
            $.ajax({
                url: "http://localhost:64166/api/posts",
                method: "GET",
                dataType: "json",
                success: function (data) {
                    nextPage = data.next;
                    console.log("Next: " + nextPage);
                    vm.content(JSON.stringify(data.items));
                    vm.jsonArray(data.items);
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
                    vm.content(JSON.stringify(data.items));
                    vm.jsonArray(data.items);
                    console.log(data.next);
                    nextPage = data.next;
                    prevPage = data.prev;
                }
            });
        },

        singlePost: function (datalink) {
            console.log("ko: " + datalink);
            $.ajax({
                url: datalink,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    vm.postArray(data);

                    $.ajax({
                        url: data.answers,
                        method: "GET",
                        dataType: "json",
                        success: function (aData) {
                            console.log(aData);
                            vm.answerArray(aData);
                        }
                    });
                }
            });
        }
    };
    vm.getPost();
    ko.applyBindings(vm);
})();