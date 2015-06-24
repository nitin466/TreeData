var myApp = angular.module('d3AngularApp', ['d3'])
myApp.directive('d3Bars', ['$window', '$timeout', 'd3Service', 
  function($window, $timeout, d3Service) {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        nodeList: '=',
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

        var i = 0,
        duration = 750,
        root;
        
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
        

      var nList = [];
      root = scope.data[0];
      nList = scope.nodeList; 
        
      update(root);
      d3.select(self.frameElement).style("height", "500px");

          function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(source).reverse(),
              links = tree.links(nodes);
              scope.nodes = nodes;

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Declare the nodesâ€¦
            var node = svg.selectAll("g.node")
              .data(nodes, function(d) { return d.id || (d.id = ++i); });
              
              console.log(node[0]);
               console.log(node[0].length);
                //console.log(root); 
                //console.log(emptyAr);
            

            // Enter the nodes.
            var nodeEnter = node.enter().append("g")
              .attr("class", "node")
              

              .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
    .on("click", click);

              // Toggle children on click.
          function click(d) {
            if (d.children) {
            d._children = d.children;
            d.children = null;
            } else {
            d.children = d._children;
            d._children = null;
            }
            update(root);
          }

            nodeEnter.append("circle")  
              //.attr("r", 10)
              .style("fill", "#fff")
              .attr("r", 10)
              .attr("tooltip-append-to-body", true)
              .attr("tooltip", function(d){
                 return d.name; })
              .on('click', function(node) {
                console.log("node is", node);
                  return scope.onClick({item: node});
              });

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



              // Transition nodes to their new position.
              var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });


                nodeUpdate.select("circle")
                .attr("r", 10)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

              nodeUpdate.select("text")
                .style("fill-opacity", 1);

                // Transition exiting nodes to the parent's new position.
              var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

              nodeExit.select("circle")
                .attr("r", 1e-6);

              nodeExit.select("text")
                .style("fill-opacity", 1e-6);

                // Update the links…
              var link = svg.selectAll("path.link")
                .data(links, function(d) { return d.target.id; });

              // Enter any new links at the parent's previous position.
              link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
                });

              // Transition links to their new position.
              link.transition()
                .duration(duration)
                .attr("d", diagonal);

              // Transition exiting nodes to the parent's new position.
              link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
                })
                .remove();  

                // Stash the old positions for transition.
                nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
                });

 /*// Toggle children on click.
          function click(d) {
            if (d.children) {
            d._children = d.children;
            d.children = null;
            } else {
            d.children = d._children;
            d._children = null;
            }
            update(d);
          }*/


          /*  // Declare the linksâ€¦
            var link = svg.selectAll("path.link")
              .data(links, function(d) { return d.target.id; });

            // Enter the links.
            link.enter().insert("path", "g")
              .attr("class", "link")
              .attr("d", diagonal);*/

          };


         

      })
    }
  }
}])

  myApp.controller('MainCtrl', ['$scope', function($scope){

    //$scope.greeting = "Resize the page to see the re-rendering";
    
      //$scope.nodes = nodes
      console.log($scope.data);
      $scope.itemDetails = undefined;
        $scope.printNode = function(item) {
          $scope.$apply(function() {
            if (!$scope.printNode)
              $scope.printNode = true;
              $scope.itemDetails = item;
            
            console.log(item);
          });
        };

        console.log($scope.itemDetails);
      $scope.nodeList = ['table', 'chair', 'book'];
      $scope.data1 = [
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
       "name": "flare",
       "children": [
        {
         "name": "analytics",
         "children": [
          {
           "name": "cluster",
           "children": [
            {"name": "AgglomerativeCluster", "size": 3938},
            {"name": "CommunityStructure", "size": 3812},
            {"name": "MergeEdge", "size": 743}
           ]
          },
          {
           "name": "graph",
           "children": [
            {"name": "BetweennessCentrality", "size": 3534},
            {"name": "LinkDistance", "size": 5731}
           ]
          }
         ]
        }
       ]
      }
    ]

   /*$scope.$watch('variable', function (value) {
        if (value) {
            console.log(value);
        }});*/

    console.log($scope.data[0].children);
    console.log($scope.data[0].children.length);
    console.log($scope.data[0].children[0]);
    console.log($scope.data[0].children[0].children);

 }]);
