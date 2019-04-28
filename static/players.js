// URL: https://observablehq.com/@tigerlily-he/30-minute-intervals
// Title: 30 minute intervals
// Author: Lily He (@tigerlily-he)
// Version: 2135
// Runtime version: 1

const m0 = {
  id: "a18ea2ebc3466068@2135",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# 30 minute intervals`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# A5: Designing the Perfect Board Game`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Chart`
)})
    },
    {
      name: "graphChart",
      inputs: ["d3","DOM","graphWidth","game_categories","order_of_categories_array","categories_circle"],
      value: (function(d3,DOM,graphWidth,game_categories,order_of_categories_array,categories_circle)
{
  
  const user_input = {
  "category": null
  }
  
  const svg = d3.select(DOM.svg(graphWidth, graphWidth+50));
  const category = svg.selectAll("g")
    .data(game_categories)
    .enter()
    .append("g")

    const category_dots = category.append("circle")
   .merge(category)
    .attr("r", 2.5)
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y ; })
    .attr("r", 3)
    .attr("id", d => d.name.replace(/['"&]+/g, '').split(" ").join("_").split("/").join("_") + "_dot")
    .attr("class", "dot")
     
   function draw_connectors(current, category_name){
        category.append("path")
        .merge(category)
        .datum([ 
            {x: game_categories[order_of_categories_array.indexOf(category_name)]['x'],     
             y: game_categories[order_of_categories_array.indexOf(category_name)]['y']}, 
        
           {x: game_categories[order_of_categories_array.indexOf(current)]['x'],     
             y: game_categories[order_of_categories_array.indexOf(current)]['y']} 
            ])
        .attr("class", "line")
        .style("stroke", d3.interpolateGreens(0.5))
        .attr("d", d3.line()
                .curve(d3.curveLinear)
                .x(function(d) { return d.x; })
                 .y(function(d) { return d.y; })
        )
        .attr("stroke-width", 2)
     
   d3.selectAll(`#${category_name.replace(/['"&]+/g, '').split(" ").join("_").split("/").join("_")}_dot`).attr("fill", "green");
     
          d3.selectAll(`#${category_name.replace(/['"&]+/g, '').split(" ").join("_").split("/").join("_")}`).attr("fill", "green").attr("font-weight", "bold");
  }

  
   const category_label = category.append("text")
   .attr("y", d => d.y)
   .attr("x", d=> d.x)
   .attr('text-anchor', d=> d.textanchor)
   .attr("class", "myLabel")
   .attr("transform", d=> d.rot)
   .text(d => d['name'])
   .style("cursor", "pointer")
   .attr("id", d => d.name.replace(/['"&]+/g, '').split(" ").join("_").split("/").join("_"))
   .on("mousedown", function (d) {
     d3.selectAll(".dot").attr("fill", "black");
     d3.selectAll(".line").remove();
      d3.selectAll("text")
        .attr("font-weight", "normal");
     if (d3.select(this).attr("fill") == "blue"){
       d3.selectAll("text")
        .attr("fill", "black");
       user_input.category = null;
     } else {
       d3.selectAll("text").attr("fill", "#ababab");
       d3.select(this)
        .attr("fill", "blue")
       .attr("font-weight", "bold");
       user_input.category = d3.select(this).text();
       console.log(categories_circle.get(user_input.category));
       categories_circle.get(user_input.category).forEach((value, key, map) =>{
       if (value > 100){
           draw_connectors(user_input.category, key);
         }  
        })
     }
    })

  return svg.node();
}
)
    },
    {
      name: "graphWidth",
      value: (function(){return(
1200
)})
    },
    {
      name: "radius",
      inputs: ["width"],
      value: (function(width){return(
width / 2
)})
    },
    {
      name: "line",
      inputs: ["d3"],
      value: (function(d3){return(
d3.radialLine()
    .curve(d3.curveBundle.beta(0.85))
    .radius(d => d.y)
    .angle(d => d.x)
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "slider",
      remote: "slider"
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Data`
)})
    },
    {
      name: "dataOfficial",
      inputs: ["d3"],
      value: (function(d3){return(
d3.csv("https://raw.githubusercontent.com/dvatvani/dvatvani.github.io/master/static/BGG-analysis/scraper_and_data/games_Jan2018.csv", d3.autoType)
)})
    },
    {
      name: "createStructure",
      value: (function(){return(
function createStructure(input){
  var graphMap = new Map();
  let i = 0;
  for(i = 0; i < input.length; i++){
  
    if(input[i].categories == null){
      continue; 
    }
    var categoryArr = input[i].categories.split(",");
    var arrLength = categoryArr.length;
    let j = 0;
    for(j = 0; j < arrLength; j++){
      let k = 0;
      var subMap = new Map();
      if(!graphMap.has(categoryArr[j])){
          graphMap.set(categoryArr[j], subMap);
        
      }
        for(k = 0; k < arrLength; k++){
        if(j == k){
          continue;
        }
   
        if(!graphMap.get(categoryArr[j]).has(categoryArr[k])){
            graphMap.get(categoryArr[j]).set(categoryArr[k], 1);
        }else{
            graphMap.get(categoryArr[j]).set(categoryArr[k], graphMap.get(categoryArr[j]).get(categoryArr[k]) + 1);
        }
      }
      
    }
   
  }
  return graphMap;

}
)})
    },
    {
      name: "categories_circle",
      inputs: ["createStructure","data"],
      value: (function(createStructure,data){return(
createStructure(data)
)})
    },
    {
      name: "order_of_categories_array",
      value: (function(){return(
["Economic", "Negotiation", "Political","Dice", "Puzzle", "Deduction", "Action / Dexterity", "Abstract Strategy", "Memory", "Number", "Math", "Card Game", "Educational", "Children's Game", "Racing", "Trivia", "Movies / TV / Radio theme", "Novel-based", "Book", "Video Game Theme", "Word Game", "Collectible Components", "Print & Play", "Electronic", "Animals","Humor", "Science Fiction", "Party Game", "Environmental", "Sports", "Murder/Mystery", "Mafia", "Fantasy", "Trains", "Transportation", "Travel", "Adventure", "Religious", "Bluffing", "Miniatures", "Ancient", "Civilization", "Industry / Manufacturing", "Exploration", "Mature / Adult", "Zombies", "Pirates", "Space Exploration", "Horror", "Real-time", "City Building", "Maze", "Medical", "Game System", "Arabian", "Prehistoric", "Comic Book / Strip", "Music", "Farming", "Fan Expansion", "Medieval", "Nautical", "Mythology", "Renaissance", "Fighting", "Territory Building", "American West", "Pike and Shot", "Spies/Secret Agents", "Aviation / Flight", "Wargame", "American Revolutionary War", "Civil War", "Age of Reason", "American Civil War", "American Indian Wars", "Napoleonic", "Post-Napoleonic", "World War I", "World War II", "Vietnam War", "Korean War", "Modern Warfare", "Expansion for Base-game"]
)})
    },
    {
      name: "order_of_categories",
      inputs: ["order_of_categories_array"],
      value: (function(order_of_categories_array){return(
order_of_categories_array.map(x => { return {"name": x}})
)})
    },
    {
      name: "game_categories",
      inputs: ["order_of_categories"],
      value: (function(order_of_categories)
{
  const c = []
  const total_count = order_of_categories.length;
  const angle = Math.PI * 2/ total_count;
  const angle_degrees = 360/total_count;
  const center_x = 500;
  const center_y = 500;
  const r = 290;
  order_of_categories.forEach(function (value, i) { 
   c.push(value)
    c[i]['x'] = center_x +(r*Math.cos(i *angle));
    c[i]['y'] = center_y - (r*Math.sin(i *angle));
    
    if (Math.cos(i*angle) < 0){
      if (Math.sin(i*angle) > 0.55){
        c[i]['rot'] = `translate (-5, -5) rotate(${180- (i*angle_degrees)} ${c[i]['x']} ${c[i]['y']})`;
      } 
      else if (Math.sin(i*angle) < -0.55) {
        c[i]['rot'] = `translate (0, 10) rotate(${180- (i*angle_degrees)} ${c[i]['x']} ${c[i]['y']})`;
      } else {
         c[i]['rot'] = `translate (-10, 5) rotate(${180- (i*angle_degrees)} ${c[i]['x']} ${c[i]['y']})`;    
      }
      
     
      c[i]['textanchor'] = "end";
    } else {
      
      if (Math.sin(i*angle) > 0.55){
        c[i]['rot'] = `translate (5, -5) rotate(${360- (i*angle_degrees)} ${c[i]['x']} ${c[i]['y']})`;
      } 
      else if (Math.sin(i*angle) < -0.55) {
        c[i]['rot'] = `translate (-5, 10) rotate(${360- (i*angle_degrees)} ${c[i]['x']} ${c[i]['y']})`;
      } else {
       c[i]['rot'] = `translate (10, 5) rotate(${360- (i*angle_degrees)} ${c[i]['x']} ${c[i]['y']})`;
      }
      
      c[i]['textanchor'] = "start";
    }
    
 
});
  return c;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Amount of Players`
)})
    },
    {
      name: "initializeHashmap",
      value: (function(){return(
function initializeHashmap(input){
   var players = new Map();
  var firstSubmap = new Map();
  var secondSubmap = new Map();
  var thirdSubmap = new Map();
  var fourthSubmap = new Map();
   var fifthSubmap = new Map();
   var otherSubmap = new Map();
  players.set("1", firstSubmap);
  players.set("2", secondSubmap);
  players.set("3", thirdSubmap);
  players.set("4", fourthSubmap);
  players.set("5", fifthSubmap);
  players.set("5+", otherSubmap);

  for (var [key, value] of players) {
    value.set("0-30", 0);

    value.set("30-60", 0);

    value.set("60-90", 0);

    value.set("90-120", 0);

    value.set("120-150", 0);

     value.set("150-180", 0);

    value.set("180-210", 0);

    value.set("210-240", 0);
    value.set("240+", 0);

 }
  return players;
}
)})
    },
    {
      inputs: ["initializeHashmap","data"],
      value: (function(initializeHashmap,data){return(
initializeHashmap(data)
)})
    },
    {
      name: "test",
      inputs: ["initializeHashmap","insertDataSubmaps15"],
      value: (function(initializeHashmap,insertDataSubmaps15){return(
function test(input){
   var players = initializeHashmap(input);
  var mySet = new Set();
  let i = 0;
  let count = 0;
  for(i = 0; i < input.length; i++){
   
     if(input[i].minplayers == 0 || input[i].minplayers == null){
      continue;
     } else if(input[i].minplayers == 1){
        insertDataSubmaps15(i, input, players, "1");
      
      
    }else if(input[i].minplayers == 2){
     insertDataSubmaps15(i, input, players, "2");
      
    }else if(input[i].minplayers == 3){
      insertDataSubmaps15(i, input, players, "3");
    }else if(input[i].minplayers == 4){
      insertDataSubmaps15(i, input, players, "4");
    }else if(input[i].minplayers == 5){
      insertDataSubmaps15(i, input, players, "5");
    }else{
      insertDataSubmaps15(i, input, players, "5+");
    }
   
  }
  return players;
}
)})
    },
    {
      name: "insertDataSubmaps15",
      value: (function(){return(
function insertDataSubmaps15(i, input, map, amountOfPlayers){
        if(input[i].minplaytime == 0 || input[i].minplaytime == null){
          
        } else if(input[i].minplaytime >= 1 && input[i].minplaytime <= 29 ){
          map.get(amountOfPlayers).set("0-30", map.get(amountOfPlayers).get("0-30") + 1);
        }
  
  

      else if(input[i].minplaytime >= 30 && input[i].minplaytime <= 59){
          map.get(amountOfPlayers).set("30-60", map.get(amountOfPlayers).get("30-60") + 1);
      }
       else if(input[i].minplaytime >= 60 && input[i].minplaytime <= 89){
           map.get(amountOfPlayers).set("60-90", map.get(amountOfPlayers).get("60-90") + 1);

        }else if(input[i].minplaytime >= 90 && input[i].minplaytime <= 119){
           map.get(amountOfPlayers).set("90-120", map.get(amountOfPlayers).get("90-120") + 1);

        }
    else if(input[i].minplaytime >= 120 && input[i].minplaytime <= 149){
           map.get(amountOfPlayers).set("120-150", map.get(amountOfPlayers).get("120-150") + 1);

        } 
  else if(input[i].minplaytime >= 150 && input[i].minplaytime <= 179){
           map.get(amountOfPlayers).set("150-180", map.get(amountOfPlayers).get("150-180") + 1);
        }
  else if(input[i].minplaytime >= 180 && input[i].minplaytime <= 209){
           map.get(amountOfPlayers).set("180-210", map.get(amountOfPlayers).get("180-210") + 1);
         }
 else if(input[i].minplaytime >= 210 && input[i].minplaytime <= 239){
           map.get(amountOfPlayers).set("210-240", map.get(amountOfPlayers).get("210-240") + 1);
        } 
  
  else{
           map.get(amountOfPlayers).set("240+", map.get(amountOfPlayers).get("240+") + 1);
        }
     
}
)})
    },
    {
      name: "mapdata",
      inputs: ["test","dataOfficial"],
      value: (function(test,dataOfficial){return(
test(dataOfficial)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Bar Charts`
)})
    },
    {
      name: "createBarGraph",
      value: (function(){return(
function createBarGraph(data, map, index){
  let container = []
  let i = 0 ;
  for (var [key, value] of map.get(index)) {
    let subcontainer = {};
    
      subcontainer["letter"] = key;
        
      subcontainer["frequency"]= value;
    i++;
    
    container.push(subcontainer);
  }
  return container;
}
)})
    },
    {
      name: "$",
      inputs: ["require"],
      value: (function(require){return(
require("jquery")
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Barchart for FivePlus Players`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Stacked Normalized Horizontal Bar Chart`
)})
    },
    {
      name: "createArr",
      value: (function(){return(
function createArr(map){
  let container = [];
  let columnDivision = ["-10-0", "0-30","30-60" ,  "60-90","90-120", "120-150", "150-180", "180-210", "210-240", "240+"];

  for (var [key, value] of map) {
    let obj = {};
    let count = 0;
    obj["name"] = key;
    for (var [subKey, subValue] of value) {
      count += subValue;
      obj[subKey] = subValue;
    }
    obj["total"] = count;
    container.push(obj);
  }

  container["columns"]= columnDivision;
  
  return container;
}
)})
    },
    {
      inputs: ["createArr","mapdata"],
      value: (function(createArr,mapdata){return(
createArr(mapdata)
)})
    },
    {
      name: "legend",
      inputs: ["d3","DOM","series","color"],
      value: (function(d3,DOM,series,color)
{
  const svg = d3.select(DOM.svg(series.length * 70, 40))
      .style("font", "10px sans-serif")
      .style("margin-left", `250px`)
      .style("display", "block")
      .attr("text-anchor", "middle")

  const g = svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("transform", (d, i) => `translate(${i * 55},0)`);

  g.append("rect")
      .attr("width", 36)
      .attr("height", 25)
      .attr("fill", d => color(d.key));

  g.append("text")
      .attr("x", 18)
      .attr("y", 32)
      .attr("dy", "0.35em")
      .text(d => d.key);
  
  return svg.node();
}
)
    },
    {
      name: "chart3",
      inputs: ["d3","DOM","width","height","series","color","x","y","convertPlayerNum","data","xAxis","yAxis"],
      value: (function(d3,DOM,width,height,series,color,x,y,convertPlayerNum,data,xAxis,yAxis)
{
  const svg = d3.select(DOM.svg(width, height))
      .style("overflow", "visible");

   var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);
  
  const stackedbar = svg.append("g")
    .selectAll("g")
    .data(series)
    .enter().append("g")
      .attr("fill", d => color(d.key))
      .classed("stacked_bar", true)
      .attr("class", d=> "b" + d.key.split("+").join("") + " stacked_bar")
      .attr("data-key", d=> d.key)
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", d => x(d[0]))
      .attr("y", (d, i) => y(d.data.name))
      .attr("width", d => x(d[1]) - x(d[0]))
      .attr("height", y.bandwidth())
      .attr("data-person", (d, i) => i)
      .attr("data-percent", d => ((d[1] - d[0])*100).toFixed(2)+"%")
      .classed("stacked-rect", true)
  
  stackedbar
    .on("mouseover", function (){
         // Get this bar's x/y values, then augment for the tooltip
      var xpos = parseFloat(d3.select(this).attr("x"));
      var ypos = parseFloat(d3.select(this).attr("y"));
      // Create the tooltip label as an SVG group with a text and a rect inside
      var tgrp = svg.append("g")
        .attr("id", "tooltip")
        // .attr("transform", (d, i) => `translate(${xpos},${ypos})`);
      tgrp.append("rect")
        .attr("width", "70px")
        .attr("height", "30px")
        .attr("fill", "#f2eff2")
        .attr("x", xpos + (parseInt(d3.select(this).attr("width"))/2) - 5)
        .attr("y", ypos-50)
      tgrp.append("text")
        .attr("x", xpos + (parseInt(d3.select(this).attr("width"))/2))
        .attr("y", ypos-40)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(d3.select(this).attr("data-percent"));
      tgrp.append("text")
        .attr("x", xpos + (parseInt(d3.select(this).attr("width"))/2))
        .attr("y", ypos-25)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(convertPlayerNum(d3.select(this).attr("data-person")));
    
      svg.append('line')
      .attr("x1", parseFloat(d3.select(this).attr("x"))+ (parseInt(d3.select(this).attr("width"))/3))
      .attr("y1", parseFloat(d3.select(this).attr("y")))
      .attr("x2", xpos + (parseInt(d3.select(this).attr("width"))/2) - 5)
      .attr("y2", ypos-15)
      .style("stroke", "black")
      .classed("percentage-line", true)

      // d3.selectAll(".stacked_bar").attr("fill", "#fafafa")
      d3.selectAll(".stacked_bar").attr("fill-opacity", "0.2")

      d3.select(this).attr("fill", color(d3.select(this.parentNode).attr("data-key")))
      d3.select(this).attr("fill-opacity", 1)
      
  })
    .on("mouseout", function () {
    d3.selectAll(".percentage-line").remove();
    d3.select(this).attr("stroke", "none");
    d3.select("#tooltip").remove();
    
    data.columns.slice(1).forEach(k => {
       d3.selectAll(`.b${k.split("+").join("")}`).attr("fill", color(k)).transition(t)
    })
    
    d3.selectAll(".stacked-rect").attr("fill", null).transition(t)
    d3.selectAll(".stacked-rect").attr("fill-opacity", null).transition(t)
    d3.selectAll(".stacked_bar").attr("fill-opacity", null)
   
  })
  

   
  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}
)
    },
    {
      name: "createStacked",
      value: (function(){return(
function createStacked(){
  let container = []
  let i = 0 ;
  let temp = "UT";
  for(i = 0; i< 10; i++){
    let subcontainer = {};
    
      subcontainer["name"] = temp;
    temp += "a";
        
      subcontainer["<10"]= 10;
   subcontainer["10-19"]= 20;
    subcontainer["20-29"]=  30;
  subcontainer["30-39"]= 40;
  subcontainer["40-49"]= 50;
  subcontainer["50-59"]= 60;
  subcontainer["60-69"]= 70;
  subcontainer["70-79"]= 10;
  subcontainer["80-89"]= 10;
    subcontainer["90-99"]= 10;
     subcontainer["100-109"]= 50;
  subcontainer["total"]= 370;
        

    
    container.push(subcontainer);
  }

container["columns"] = ["name", "<10", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-99", "100-109"];

  return container;
}
)})
    },
    {
      name: "data",
      inputs: ["createArr","mapdata"],
      value: (function(createArr,mapdata){return(
createArr(mapdata)
)})
    },
    {
      name: "x",
      inputs: ["d3","margin","width"],
      value: (function(d3,margin,width){return(
d3.scaleLinear()
    .range([margin.left, width - margin.right])
)})
    },
    {
      name: "y",
      inputs: ["d3","data","margin","height"],
      value: (function(d3,data,margin,height){return(
d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.top, height - margin.bottom])
    .padding(0.1)
)})
    },
    {
      name: "margin",
      value: (function(){return(
{top: 30, right: 10, bottom: 0, left: 30}
)})
    },
    {
      name: "height",
      inputs: ["data","margin"],
      value: (function(data,margin){return(
data.length * 25 + margin.top + margin.bottom
)})
    },
    {
      name: "yAxis",
      inputs: ["margin","d3","y"],
      value: (function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())
)})
    },
    {
      name: "series",
      inputs: ["d3","data"],
      value: (function(d3,data){return(
d3.stack()
    .keys(data.columns.slice(1))
    .offset(d3.stackOffsetExpand)
  (data)
)})
    },
    {
      name: "color",
      inputs: ["d3","series"],
      value: (function(d3,series){return(
d3.scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(d3.quantize(t => d3.interpolateGnBu(t * -0.6 + 0.9), series.length).reverse())
    .unknown("#ccc")
)})
    },
    {
      name: "xAxis",
      inputs: ["margin","d3","x","width"],
      value: (function(margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 100, "%"))
    .call(g => g.selectAll(".domain").remove())
)})
    },
    {
      name: "convertPlayerNum",
      value: (function(){return(
function convertPlayerNum(text){
  switch(text){
    case "0":
      return "1 player";
      break;
    case "1":
      return "2 players";
      break;
    case "2":
      return "3 players";
      break;
    case "3":
      return "4 players";
      break;
    case "4":
      return "5 players";
      break;
    case "5":
      return "5+ players";
      break;
    default:
      return "-1";
      break;
  }
}
)})
    },
    {
      name: "width",
      value: (function(){return(
900
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "slider",
      inputs: ["input"],
      value: (function(input){return(
function slider(config = {}) {
  let {value, min = 0, max = 1, step = "any", precision = 2, title, description, getValue, format, display, submit} = config;
  if (typeof config == "number") value = config;
  if (value == null) value = (max + min) / 2;
  precision = Math.pow(10, precision);
  if (!getValue) getValue = input => Math.round(input.valueAsNumber * precision) / precision;
  return input({
    type: "range", title, description, submit, format, display,
    attributes: {min, max, step, value},
    getValue
  });
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  const wrapper = html`<div></div>`;
  if (!form)
    form = html`<form>
  <input name=input type=${type} />
  </form>`;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) form.input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = typeof format === "function" ? format : d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
      ? "onclick"
      : type == "checkbox" || type == "radio"
      ? "onchange"
      : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(form.input) : form.input.value;
      if (form.output) {
        const out = display ? display(value) : format ? format(value) : value;
        if (out instanceof window.Element) {
          while (form.output.hasChildNodes()) {
            form.output.removeChild(form.output.lastChild);
          }
          form.output.append(out);
        } else {
          form.output.value = out;
        }
      }
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      wrapper.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  while (form.childNodes.length) {
    wrapper.appendChild(form.childNodes[0]);
  }
  form.append(wrapper);
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format@1")
)})
    }
  ]
};

const notebook_players = {
  id: "a18ea2ebc3466068@2135",
  modules: [m0,m1]
};

export default notebook_players;