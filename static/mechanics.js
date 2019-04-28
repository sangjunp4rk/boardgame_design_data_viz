// URL: https://observablehq.com/@tigerlily-he/matrix-of-board-game-mechanics
// Title: Matrix of Board Game Mechanics
// Author: Lily He (@tigerlily-he)
// Version: 429
// Runtime version: 1

const m0 = {
  id: "2d7af585c7b50d87@429",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Matrix of Board Game Mechanics
`
)})
    },
    {
      name: "chart2",
      inputs: ["d3","DOM","width","h","color2","margin","game_data","gridSize","mechanics","gridSizeH","legend"],
      value: (function(d3,DOM,width,h,color2,margin,game_data,gridSize,mechanics,gridSizeH,legend)
{
  const svg = d3.select(DOM.svg(width, h))
    .classed("game-mechanics", true)
  
  // code credit: https://observablehq.com/@tmcw/d3-scalesequential-continuous-color-legend-example
  // and: https://www.visualcinnamon.com/2016/05/smooth-color-legend-d3-svg-gradient.html
  const defs = svg.append("defs");
  const linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");
  
  linearGradient.selectAll("stop")
    .data(color2.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: color2(t) })))
    .enter().append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d=> d.color);
  
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
  
  g.selectAll("rect")
    .data(game_data)
    .enter().append("rect")
      .attr("x", d => (d.weight-1) * 5 * gridSize)
      .attr("y", (d,i) => mechanics.indexOf(d.mechanic) * gridSizeH)
      .attr("width", gridSize)
      .attr("height", gridSizeH)
      .attr("fill", d => color2(d.count))
      .attr("stroke", "#e2e2e2")
      .attr("id", (d,i) => `mech_${i}`)
      .attr("data-mech", d => d.mechanic)
      .on("mouseover", function (){
    d3.select(this).attr("fill", "orange")
    
     // Get this bar's x/y values, then augment for the tooltip
      var xpos = parseFloat(d3.select(this).attr("x"));
      var ypos = parseFloat(d3.select(this).attr("y"));
      // Create the tooltip label as an SVG group with a text and a rect inside
      var tgrp = svg.append("g")
        .attr("id", "tooltip")
        .attr("transform", (d, i) => `translate(${xpos+margin.left},${ypos - margin.top})`);
      tgrp.append("rect")
        .attr("width", "150px")
        .attr("height", "60px")
        .attr("fill", "burlywood")
      tgrp.append("text")
        .attr("x", 5)
        .attr("y", 15)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(game_data[d3.select(this).attr("id").substring(5)]['mechanic']);
    tgrp.append("text")
        .attr("x", 5)
        .attr("y", 30)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text("Difficulty: " + game_data[d3.select(this).attr("id").substring(5)]['weight'])
   tgrp.append("text")
        .attr("x", 5)
        .attr("y", 45)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text("Count: " + game_data[d3.select(this).attr("id").substring(5)]['count'])
        
  })
  .on("mouseout", function () {
    d3.select(this).attr("fill",  d => color2(d.count))
    d3.select("#tooltip").remove();
    
  })
  .on("click", function () {
    d3.select(this).attr("fill", "red");
  })
    // tooltip that displays after hovering for a long while
    // .append("title")
    //   .text(d => d.count)
  
  g.selectAll(".mech")
    .data(mechanics)
    .enter().append("text")
      .text(d => d)
      .classed("mech", true)
      .attr("x", 0)
      .attr("y", (d, i) => i * gridSizeH)
      .style("text-anchor", "end")
      .style("font-size", 12)
      .attr("transform", "translate(-6," + gridSizeH / 1.5 + ")")
  
  g.selectAll(".weight")
    .data(d3.range(1,5.2, 0.2))
    .enter().append("text")
      .text(d => d.toFixed(1))
      .classed("weight", true)
      .attr("x", (d, i) => i * gridSize)
      .attr("y", 0)
      .style("font-size", 12)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)");
  
  g.append("g")
    .call(legend)
  
  return svg.node();
}
)
    },
    {
      name: "legend",
      inputs: ["h","margin","legendBarHeight","w","axisBottom"],
      value: (function(h,margin,legendBarHeight,w,axisBottom){return(
g => {
  g.attr("transform", `translate(0, ${h - margin.bottom - legendBarHeight })`)
  .append("rect")
    .attr("width", w)
    .attr("height", legendBarHeight)
    .style("fill", "url(#linear-gradient)")
  
  g.call(axisBottom)
}
)})
    },
    {
      name: "axisScale",
      inputs: ["d3","color2","w"],
      value: (function(d3,color2,w){return(
d3.scaleLinear()
  .domain(color2.domain())
  .range([0, w])
)})
    },
    {
      name: "axisBottom",
      inputs: ["h","margin","legendBarHeight","d3","axisScale","width"],
      value: (function(h,margin,legendBarHeight,d3,axisScale,width){return(
g => {
  g.classed("axis axis--bottom", true)
  .attr("transform", `translate(0, ${h - margin.bottom - legendBarHeight})`)
  .call(d3.axisBottom(axisScale)
    .ticks(width / 80)
    .tickSize(legendBarHeight))
  .select(".domain")
  .remove()
}
)})
    },
    {
      name: "legendBarHeight",
      value: (function(){return(
10
)})
    },
    {
      name: "css",
      inputs: ["html"],
      value: (function(html){return(
html`<style>
  svg.crashes-heatmap text {
    font-family: sans-serif;
    font-size: 12px;
    fill: #333;
  }

  svg.crashes-heatmap .axis.axis--bottom line {
    stroke: #fff;
  }
</style>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Dependencies`
)})
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
      name: "game_data",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json("https://raw.githubusercontent.com/sangjunp4rk/boardgame_design_data_viz/master/data_processing_scripts/formatted_data.txt")
)})
    },
    {
      name: "margin",
      value: (function(){return(
{ top: 40, right: 30, bottom: 70, left: 200 }
)})
    },
    {
      name: "width",
      value: (function(){return(
1100
)})
    },
    {
      name: "w",
      inputs: ["width","margin"],
      value: (function(width,margin){return(
width - margin.left - margin.right
)})
    },
    {
      name: "gridSize",
      inputs: ["w"],
      value: (function(w){return(
Math.floor(w / 25 )
)})
    },
    {
      name: "gridSizeH",
      inputs: ["gridSize"],
      value: (function(gridSize){return(
gridSize*0.5
)})
    },
    {
      name: "h",
      inputs: ["gridSizeH","mechanics","margin"],
      value: (function(gridSizeH,mechanics,margin){return(
gridSizeH * mechanics.length + margin.top + margin.bottom
)})
    },
    {
      name: "color2",
      inputs: ["d3"],
      value: (function(d3){return(
d3.scaleSequential()
.domain([0, 120])
  .interpolator(d3.interpolateGnBu)
)})
    },
    {
      name: "mechanics",
      inputs: ["game_data"],
      value: (function(game_data){return(
[...new Set(game_data.map(x => x['mechanic']))].sort()
)})
    }
  ]
};

const notebook2 = {
  id: "2d7af585c7b50d87@429",
  modules: [m0]
};

export default notebook2;