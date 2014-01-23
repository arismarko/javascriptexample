YUI().use("node", "console", "test", function (Y) {
			
				var assert = Y.Assert;
				var addRectangleTestCase = new Y.Test.Case({
				
				// test case name - if not provided, one is generated
				name: "addRectangle",
				
				"test the addRectangle it should return 4": function () {
				
					var Container = Y.one('#rectangles-container');
					var ContainerInput = Y.one('#rectangles-input');
					
					rectangle.addRectangle(); 
				
					assert.areEqual(4, Container.get('children.length'));
					assert.areEqual(4, ContainerInput.get('value'));
					
					rectangle.rectangleNumberChange(5);
						
					assert.areEqual(5, Container.get('children.length'));
					assert.areEqual(5, ContainerInput.get('value'));
			
				}
			});
		
		//create the console
		var r = new Y.Console({
			newestOnTop : false
		});
			
		r.render("#testReport");
			Y.Test.Runner.add(addRectangleTestCase);
			
			Y.Test.Runner.run();
	});