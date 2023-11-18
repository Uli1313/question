import * as d3 from "d3";

let svg = d3.select("svg");

const g = svg.append("g");

// 創建一個地圖投影
let projectmethod = d3.geoMercator().center([123, 24]).scale(5500);
// 地理路徑生成器
let pathGenerator = d3.geoPath().projection(projectmethod);
// 繪製地圖
d3.json("/assets/COUNTY_MOI_1090820.json").then((data) => {
  const geometries = topojson.feature(data, data.objects["COUNTY_MOI_1090820"]);

  g.append("path");
  const paths = g.selectAll("path").data(geometries.features);
  paths
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("class", "county")
    .append("title")
    .text((d) => d.properties["COUNTYNAME"]);

  currentCounty();
});

// 點擊顯示 當前縣市名稱 & icon 標示
function currentCounty() {
  const county = document.querySelectorAll(".county");
  const icon = document.querySelector(".icon");
  const countyLabel = document.querySelector(".county-label");
  county.forEach((e) => {
    e.addEventListener("click", (e) => {
      icon.style.left = `${e.offsetX - 12}px`;
      icon.style.top = `${e.offsetY - 20}px`;
      icon.classList.remove("d-none");

      countyLabel.style.left = `${e.offsetX - 108}px`;
      countyLabel.style.top = `${e.offsetY - 10}px`;
      countyLabel.classList.remove("d-none");
      countyLabel.textContent = e.target.textContent;
    });
  });
}

console.log(123);
