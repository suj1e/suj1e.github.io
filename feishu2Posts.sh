#!/bin/bash

# 拷贝feishu的博客目录到posts下

rm -rf ./dist/
rm -rf ./src/posts/feishu
rm -rf ./src/.vuepress/public/assets/feishu

mkdir ./src/posts/feishu
mkdir ./src/.vuepress/public/assets/feishu

npx feishu-pages

cp -r ./dist/docs/ ./src/posts/feishu
mv ./src/posts/feishu/assets/* ./src/.vuepress/public/assets/feishu/
rm -rf ./src/posts/feishu/assets

cd ./src/posts/feishu
find . -name "*.md" -type f -exec sed -i '' 's|/assets|/assets/feishu|g' {} +

## git提交
#
#formatted_time=$(date "+%Y-%m-%d %H:%M:%S")
#
#cd ./src/posts/feishu/ && git add .
#cd ./src/.vuepress/public/assets/feishu/ && git add .
#
#git commit -m "publish: feishu2Posts, $formatted_time"
#
#git push