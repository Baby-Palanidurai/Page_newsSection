(function () {
  var resultData = [];
  Promise.all([
    fetch('./data.json').then((data) => data.json()),
    fetch('./detail.json').then((data) => data.json()),
    fetch('./latestnews.json').then((data) => data.json()),
  ])
    .then(([data, detail, newsData]) => {
      // Work with JSON data here
      resultData = data.data;
      var element = document.getElementsByClassName('parent_news_section')[0];
      resultData.forEach((item, index) => {
        var childElement = document.createElement('div');
        childElement.className = 'child_content';
        var innerElement = document.createElement('h3');
        innerElement.innerHTML = item.sectionName;
        childElement.appendChild(innerElement);

        var ulElement = (ulElement = document.createElement('ul'));
        detail.data
          .filter((e) => e.sectionId == item.sectionId)[0]
          .articleList.forEach((element, index) => {
            var liElement = document.createElement('li');
            var aElement = document.createElement('a');
            if (index < 3) {
              console.log(index)
              aElement.innerHTML =
                `<a href=` +
                element.articleUrl +
                `>` +
                (element.articleId === 'img'
                  ? `<img class="responsive"
         alt=""
         loading="lazy"
         src=` +
                    element.imgUrl +
                    `            />`
                  : '') +
                `
               <div class="clearfix">` +
                element.articleTitle +
                `</div></a>`;
              liElement.appendChild(aElement);
              ulElement.appendChild(liElement);
            } else if (index === 3) {
              aElement.innerHTML = `<a>
              <div class="clearfix_seeall"><a href="/life-style/relationships">See All</a></div></a>`;
              liElement.appendChild(aElement);
              ulElement.appendChild(liElement);
            }
          });
        childElement.appendChild(ulElement);
        element.appendChild(childElement);
      });
      var element = document.getElementById('aside_news');
      console.log(element);
      newsData.data.forEach((item, index) => {
        var childElement = document.createElement('div');
        childElement.className = 'weekly-subscription';
        var aElement = document.createElement('a');
        aElement.innerHTML =
          `<a href="` +
          item.articleUrl +
          `">
          <div class="news_right_image">
            <img
                    class="responsive"
                    src="` +
          item.imgUrl +
          `"
                    alt=""
                  />
          </div>
          <div class="news_left_content">
            <div>
              ` +
          item.articleTitle +
          `</div>
          </div>
        </a>`;
        childElement.appendChild(aElement);
        element.appendChild(childElement);
      });
    })
    .catch((err) => {
      // Do something for an error here
    });
})();
