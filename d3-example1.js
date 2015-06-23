var myApp = angular.module('d3AngularApp', ['d3'])
myApp.directive('d3Bars', ['$window', '$timeout', 'd3Service', 
  function($window, $timeout, d3Service) {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
        d3Service.d3().then(function(d3) {

       


          var renderTimeout;
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;

          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%');

          $window.onresize = function() {
            scope.$apply();
          };

/*
          scope.data = [
      {
        "name": "root",
        "parent": "null",
        "children": [

          {
            "name": "Level 1",
            "parent": "root",
            "ruleId": "Rule 1",
            "children": [
              {
                "name": "Level 2: A",
                "parent": "Level 2: x",
                "ruleId": "Rule 2",
                "children": [
                  {
                    "name": "Level 3: B",
                    "parent": "Top Level",
                    "ruleId": "Rule 3"
                  },
                  {
                    "name": "Level 3: C",
                    "parent": "root",
                    "ruleId": "Rule 4"

                  }
                ]
              },
              {
              "name": "Level 2: D",
              "parent": "root",
              "ruleId": "Rule 5",
              "children":[
                {
                  "name": "Level 3: E",
                  "parent": "Top Level",
                  "ruleId" : "Rule 5",
                }

              ]
            }
            ]
          }
          
        ]
      }
    ];*/



          /* scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });*/

          /*  scope.$watch('data', function(newData) {
            scope.render(newData);
          });*/


          
                       // watch for data changes and re-render
           /* scope.$watch('data', function(newVals, oldVals) {
              return scope.render(newVals);
            }, true);


      /****/

//for Tree diagram

      var margin = {top: 20, right: 120, bottom: 20, left: 120},
        width = 960 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;
        
      var i = 0;

      var tree = d3.layout.tree()
        .size([height, width]);

      var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

      var svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      root = scope.data[0];
        
      update(root);

          function update(source) {

                      // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
              links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Declare the nodesâ€¦
            var node = svg.selectAll("g.node")
              .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter the nodes.
            var nodeEnter = node.enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { 
                return "translate(" + d.y + "," + d.x + ")"; });

            nodeEnter.append("circle")
              .attr("r", 10)
              .style("fill", "#fff");

            nodeEnter.append("text")
              .attr("x", function(d) { 
                return d.children || d._children ? 15 : 15; })
              .attr("y", function(d) {
                return d.children || d.children ? -15 : -15;  })
              .attr("dy", ".35em")
              .attr("text-anchor", function(d) { 
                return d.children || d._children ? "end" : "start"; })
              .text(function(d) { return  d.name; })
              .style("fill-opacity", 1);

              nodeEnter.append("text")
              .attr("x", function(d) { 
                return d.children || d._children ? 23 : 23; })
              .attr("y", function(d) {
                return d.children || d.children ? 25 : 25;  })
              .attr("dy", ".35em")
              .attr("text-anchor", function(d) { 
                return d.children || d._children ? "end" : "start"; })
              .text(function(d) { return d.ruleId; })
              .style("fill-opacity", 1);

            // Declare the linksâ€¦
            var link = svg.selectAll("path.link")
              .data(links, function(d) { return d.target.id; });

            // Enter the links.
            link.enter().insert("path", "g")
              .attr("class", "link")
              .attr("d", diagonal);

          };

      })
}
}
}
])

  myApp.controller('MainCtrl', ['$scope', function($scope){

    $scope.greeting = "Resize the page to see the re-rendering";
    /*$scope.data = [
      {name: "Greg", score: 98},
      {name: "Ari", score: 96},
      {name: 'Q', score: 75},
      {name: "Loser", score: 48} ]*/

      $scope.data = [
      {
        "name": "root",
        "parent": "null",
        "children": [

          {
            "name": "Level 1",
            "parent": "root",
            "ruleId": "Rule 1",
            "children": [
              {
                "name": "Level 2: A",
                "parent": "Level 2: x",
                "ruleId": "Rule 2",
                "children": [
                  {
                    "name": "Level 3: B",
                    "parent": "Top Level",
                    "ruleId": "Rule 3"
                  },
                  {
                    "name": "Level 3: C",
                    "parent": "root",
                    "ruleId": "Rule 4"

                  }
                ]
              },
              {
              "name": "Level 2: D",
              "parent": "root",
              "ruleId": "Rule 5",
              "children":[
                {
                  "name": "Level 3: E",
                  "parent": "Top Level",
                  "ruleId" : "Rule 5",
                }

              ]
            }
            ]
          }
          
        ]
      }
    ];

    $scope.data = [
      {
        "name": "root",
        "parent": "null",
        "children": [

          {
            "name": "Level 1",
            "parent": "root",
            "ruleId": "Rule 1",
            "children": [
              {
                "name": "Level 2: A",
                "parent": "Level 2: x",
                "ruleId": "Rule 2",
                "children": [
                  {
                    "name": "Level 3: B",
                    "parent": "Top Level",
                    "ruleId": "Rule 3"
                  },
                  {
                    "name": "Level 3: C",
                    "parent": "root",
                    "ruleId": "Rule 4"

                  }
                ]
              },
              {
              "name": "Level 2: D",
              "parent": "root",
              "ruleId": "Rule 5",
              "children":[
                {
                  "name": "Level 3: E",
                  "parent": "Top Level",
                  "ruleId" : "Rule 5",
                }

              ]
            }
            ]
          }
          
        ]
      }
    ];

console.log($scope.data);
        }]);
