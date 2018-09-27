/*

{{#times 10}}
	<span>{{this}}</span>
{{/times}}

*/

module.exports.register = function(Handlebars) {
	Handlebars.registerHelper('times', function(n, block) {
		var accum = '';
		for (var i = 0; i < n; ++i) {
			accum += block.fn(i);
		}
		return accum;
	});
};
