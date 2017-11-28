

(function () {
	var vm = {
		title: ko.observable("Hello! :)"),

		changeTitle: function () {
			console.log(this.title);
			this.title("Martin is a fuckwit");
		},

		nextPage: function () {
			
		}
	};

	ko.applyBindings(vm);

})();
