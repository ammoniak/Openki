
Router.map(function () {
	this.route('home', {
		path: '/',
		template: 'start',
		onBeforeAction: function() {
			// Allow setting the region in the URL by parameter '?region=Testistan'
			if (this.params.query.region) {
				var region = Regions.findOne({ name: this.params.query.region })
				if (region) Session.set('region', region._id);
			};
			this.next();
		},
		waitOn: function () {
			var region = Session.get('region');
			return [
				regionSub,
				Meteor.subscribe('coursesFind', region, false, {}, 36)
			];
		},
		data: function() {
			return {
				results: Courses.find({}, {sort: {time_lastedit: -1}})
			}
		},
		onAfterAction: function() {
			document.title = webpagename + 'Home'
		}
	})
})
