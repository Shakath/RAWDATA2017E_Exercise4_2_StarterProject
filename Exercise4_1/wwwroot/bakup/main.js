

(function () {

	var vm = {
		title: ko.observable("Hello! :)"),
        searchquestions: ko.observableArray([{score: 5, title:"What is the difference between a duck?"}]),
		changeTitle: function () {
			console.log(this.title);
			this.title("Alex and err");
		},

		nextPage: function () {
			
		}
	};

	ko.applyBindings(vm);

})();
