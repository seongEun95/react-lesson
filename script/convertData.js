const fs = require('fs');

const targetList = ['coldBrew', 'fizzio', 'brewedCoffee'];
const result = {};

Promise.all(targetList.map(target => convert(target))) //
  .then(() =>
    fs.writeFileSync(
      __dirname + `/../public/data/menuData.json`,
      JSON.stringify(result, null, 2),
    ),
  );

async function convert(target) {
  const { data } = await require(`./${target}`);

  const converted = data.list.map(
    (
      {
        caffeine,
        fat,
        kcal,
        protein,
        sat_FAT,
        sodium,
        cate_NAME,
        product_NM,
        content,
        file_PATH,
        newicon,
      },
      idx,
    ) => ({
      id: idx,
      categoryName: cate_NAME,
      productNameKO: product_NM,
      content,
      url: 'https://image.istarbucks.co.kr' + file_PATH,
      kcal,
      satFat: sat_FAT,
      protein,
      sodium,
      caffeine,
      fat,
      isNew: newicon,
    }),
  );

  console.log(target, converted.length);
  result[target] = converted;
}
